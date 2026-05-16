const KMB_BASE = "https://data.etabus.gov.hk/v1/transport/kmb";
const CTB_BASE = "https://rt.data.gov.hk/v2/transport/citybus";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function isValley(stop) {
  return /山谷道|valley road/i.test(`${stop.name_tc || stop.name_chi || ""} ${stop.name_en || ""}`);
}

function isTkoTunnel(stop) {
  return /將軍澳隧道轉車站|將軍澳隧道巴士轉乘站|tseung kwan o tunnel bbi|tseung kwan o tunnel bus-bus interchange/i.test(
    `${stop.name_tc || stop.name_chi || ""} ${stop.name_en || ""}`,
  );
}

async function mapLimit(items, limit, worker) {
  const results = [];
  let next = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function kmbStopMap() {
  const payload = await fetchJson(`${KMB_BASE}/stop`);
  return new Map((payload.data || []).map((stop) => [stop.stop, stop]));
}

async function ctbStopGetter() {
  const cache = new Map();
  return async (stopId) => {
    if (!cache.has(stopId)) {
      cache.set(
        stopId,
        fetchJson(`${CTB_BASE}/stop/${stopId}`).then((payload) =>
          Array.isArray(payload.data) ? payload.data[0] : payload.data,
        ),
      );
    }
    return cache.get(stopId);
  };
}

async function scanKmb() {
  const stops = await kmbStopMap();
  const routes = (await fetchJson(`${KMB_BASE}/route/`)).data || [];
  const results = await mapLimit(routes, 20, async (entry) => {
    const direction = entry.bound === "O" ? "outbound" : "inbound";
    try {
      const rows = (
        await fetchJson(`${KMB_BASE}/route-stop/${entry.route}/${direction}/${entry.service_type}`)
      ).data || [];
      const withStops = rows
        .sort((a, b) => Number(a.seq) - Number(b.seq))
        .map((row) => ({ row, stop: stops.get(row.stop) }));
      return extract({
        company: "KMB",
        route: entry.route,
        bound: entry.bound,
        serviceType: entry.service_type,
        origin: entry.orig_tc,
        destination: entry.dest_tc,
        withStops,
      });
    } catch {
      return null;
    }
  });
  return results.filter(Boolean);
}

async function scanCtb() {
  const getStop = await ctbStopGetter();
  const routeRows = (await fetchJson(`${CTB_BASE}/route/ctb`)).data || [];
  const routeLookup = new Map(routeRows.map((row) => [row.route, row]));
  const routes = [...new Set(routeRows.map((row) => row.route))];
  const jobs = routes.flatMap((route) => [
    { route, direction: "outbound" },
    { route, direction: "inbound" },
  ]);
  const results = await mapLimit(jobs, 20, async (job) => {
    try {
      const rows = (await fetchJson(`${CTB_BASE}/route-stop/ctb/${job.route}/${job.direction}`)).data || [];
      const withStops = await Promise.all(
        rows
          .sort((a, b) => Number(a.seq) - Number(b.seq))
          .map(async (row) => ({ row, stop: await getStop(row.stop || row.stop_id) })),
      );
      const meta = routeLookup.get(job.route) || {};
      return extract({
        company: "CTB",
        route: job.route,
        bound: job.direction,
        serviceType: "",
        origin: meta.orig_tc || "",
        destination: meta.dest_tc || "",
        withStops,
      });
    } catch {
      return null;
    }
  });
  return results.filter(Boolean);
}

function extract(route) {
  const valleyIndex = route.withStops.findIndex(({ stop }) => stop && isValley(stop));
  if (valleyIndex < 0) return null;
  const tunnelIndex = route.withStops.findIndex(
    ({ stop }, index) => index > valleyIndex && stop && isTkoTunnel(stop),
  );
  if (tunnelIndex < 0) return null;
  const valley = route.withStops[valleyIndex];
  const tunnel = route.withStops[tunnelIndex];
  return {
    company: route.company,
    route: route.route,
    bound: route.bound,
    serviceType: route.serviceType,
    origin: route.origin,
    destination: route.destination,
    valleySeq: valley.row.seq,
    valleyStop: valley.stop.name_tc || valley.stop.name_chi,
    tunnelSeq: tunnel.row.seq,
    tunnelStop: tunnel.stop.name_tc || tunnel.stop.name_chi,
  };
}

const all = [...(await scanKmb()), ...(await scanCtb())].sort((a, b) =>
  `${a.company} ${a.route} ${a.bound} ${a.serviceType}`.localeCompare(
    `${b.company} ${b.route} ${b.bound} ${b.serviceType}`,
  ),
);
console.log(JSON.stringify(all, null, 2));
console.error(`FOUND ${all.length}`);
