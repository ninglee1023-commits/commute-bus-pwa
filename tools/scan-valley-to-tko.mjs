const KMB_BASE = "https://data.etabus.gov.hk/v1/transport/kmb";
const CTB_BASE = "https://rt.data.gov.hk/v2/transport/citybus";

const valleyPatterns = [
  /紅磡山谷道/i,
  /山谷道/i,
  /valley road/i,
];

const tkoTunnelPatterns = [
  /將軍澳隧道轉車站/i,
  /將軍澳隧道巴士轉乘站/i,
  /tseung kwan o tunnel bbi/i,
  /tseung kwan o tunnel bus-bus interchange/i,
];

const stopCache = new Map();

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function matches(patterns, stop) {
  const text = `${stop.nameTc || ""} ${stop.nameEn || ""}`;
  return patterns.some((pattern) => pattern.test(text));
}

async function getKmbStop(id) {
  const key = `kmb:${id}`;
  if (!stopCache.has(key)) {
    stopCache.set(
      key,
      fetchJson(`${KMB_BASE}/stop/${id}`).then((payload) => ({
        id,
        nameTc: payload.data?.name_tc || "",
        nameEn: payload.data?.name_en || "",
      })),
    );
  }
  return stopCache.get(key);
}

async function getCtbStop(id) {
  const key = `ctb:${id}`;
  if (!stopCache.has(key)) {
    stopCache.set(
      key,
      fetchJson(`${CTB_BASE}/stop/${id}`).then((payload) => {
        const data = Array.isArray(payload.data) ? payload.data[0] : payload.data;
        return {
          id,
          nameTc: data?.name_tc || data?.name_chi || "",
          nameEn: data?.name_en || "",
        };
      }),
    );
  }
  return stopCache.get(key);
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

async function scanKmb() {
  const payload = await fetchJson(`${KMB_BASE}/route/`);
  const entries = payload.data || [];

  const results = await mapLimit(entries, 10, async (entry) => {
    const direction = entry.bound === "O" ? "outbound" : "inbound";
    try {
      const routeStops = await fetchJson(
        `${KMB_BASE}/route-stop/${entry.route}/${direction}/${entry.service_type}`,
      );
      const rows = (routeStops.data || []).sort((a, b) => Number(a.seq) - Number(b.seq));
      const stops = await Promise.all(
        rows.map(async (row) => ({ row, stop: await getKmbStop(row.stop) })),
      );
      return findValleyToTunnel({
        company: "KMB",
        route: entry.route,
        bound: entry.bound,
        serviceType: entry.service_type,
        origin: entry.orig_tc,
        destination: entry.dest_tc,
        stops,
      });
    } catch {
      return null;
    }
  });

  return results.filter(Boolean);
}

async function scanCtb() {
  const payload = await fetchJson(`${CTB_BASE}/route/ctb`);
  const routes = [...new Set((payload.data || []).map((entry) => entry.route))];
  const directions = ["outbound", "inbound"];
  const jobs = routes.flatMap((route) => directions.map((direction) => ({ route, direction })));

  const results = await mapLimit(jobs, 10, async (job) => {
    try {
      const routeStops = await fetchJson(
        `${CTB_BASE}/route-stop/ctb/${job.route}/${job.direction}`,
      );
      const rows = (routeStops.data || []).sort((a, b) => Number(a.seq) - Number(b.seq));
      const stops = await Promise.all(
        rows.map(async (row) => ({ row, stop: await getCtbStop(row.stop || row.stop_id) })),
      );
      return findValleyToTunnel({
        company: "CTB",
        route: job.route,
        bound: job.direction,
        serviceType: "",
        origin: "",
        destination: "",
        stops,
      });
    } catch {
      return null;
    }
  });

  return results.filter(Boolean);
}

function findValleyToTunnel(route) {
  const valleyIndex = route.stops.findIndex(({ stop }) => matches(valleyPatterns, stop));
  if (valleyIndex < 0) return null;

  const tunnelIndex = route.stops.findIndex(
    ({ stop }, index) => index > valleyIndex && matches(tkoTunnelPatterns, stop),
  );
  if (tunnelIndex < 0) return null;

  const valley = route.stops[valleyIndex];
  const tunnel = route.stops[tunnelIndex];
  return {
    company: route.company,
    route: route.route,
    bound: route.bound,
    serviceType: route.serviceType,
    origin: route.origin,
    destination: route.destination,
    valleySeq: valley.row.seq,
    valleyStop: valley.stop.nameTc,
    valleyStopEn: valley.stop.nameEn,
    tunnelSeq: tunnel.row.seq,
    tunnelStop: tunnel.stop.nameTc,
    tunnelStopEn: tunnel.stop.nameEn,
  };
}

const [kmb, ctb] = await Promise.all([scanKmb(), scanCtb()]);
const all = [...kmb, ...ctb].sort((a, b) =>
  `${a.company} ${a.route} ${a.bound} ${a.serviceType}`.localeCompare(
    `${b.company} ${b.route} ${b.bound} ${b.serviceType}`,
  ),
);

for (const item of all) {
  const service = item.serviceType ? ` svc ${item.serviceType}` : "";
  const termini = item.origin || item.destination ? ` ${item.origin}->${item.destination}` : "";
  console.log(
    `${item.company} ${item.route} ${item.bound}${service}${termini} | ${item.valleySeq} ${item.valleyStop} -> ${item.tunnelSeq} ${item.tunnelStop}`,
  );
}

console.error(`FOUND ${all.length}`);
