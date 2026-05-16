const KMB_BASE = "https://data.etabus.gov.hk/v1/transport/kmb";
const CTB_BASE = "https://rt.data.gov.hk/v2/transport/citybus";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function isValleyRoad(stop) {
  const text = `${stop.name_tc || stop.name_chi || ""} ${stop.name_en || ""}`;
  return /山谷道|valley road/i.test(text);
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
  const stopsPayload = await fetchJson(`${KMB_BASE}/stop`);
  const valleyStops = (stopsPayload.data || []).filter(isValleyRoad);
  const valleyIds = new Set(valleyStops.map((stop) => stop.stop));
  const stopNames = new Map(valleyStops.map((stop) => [stop.stop, `${stop.name_tc} | ${stop.name_en}`]));

  const routesPayload = await fetchJson(`${KMB_BASE}/route/`);
  const entries = routesPayload.data || [];
  const matches = await mapLimit(entries, 20, async (entry) => {
    const direction = entry.bound === "O" ? "outbound" : "inbound";
    try {
      const payload = await fetchJson(
        `${KMB_BASE}/route-stop/${entry.route}/${direction}/${entry.service_type}`,
      );
      return (payload.data || [])
        .filter((row) => valleyIds.has(row.stop))
        .map((row) => ({
          company: "KMB",
          route: entry.route,
          bound: entry.bound,
          direction,
          serviceType: entry.service_type,
          origin: entry.orig_tc,
          destination: entry.dest_tc,
          seq: row.seq,
          stopId: row.stop,
          stopName: stopNames.get(row.stop),
        }));
    } catch {
      return [];
    }
  });
  return matches.flat();
}

async function scanCtb() {
  const stopCache = new Map();
  const routesPayload = await fetchJson(`${CTB_BASE}/route/ctb`);
  const routeLookup = new Map(
    (routesPayload.data || []).map((entry) => [
      entry.route,
      { origin: entry.orig_tc, destination: entry.dest_tc },
    ]),
  );
  const routes = [...new Set((routesPayload.data || []).map((entry) => entry.route))];
  const jobs = routes.flatMap((route) => [
    { route, direction: "outbound" },
    { route, direction: "inbound" },
  ]);

  const matches = await mapLimit(jobs, 20, async (job) => {
    try {
      const payload = await fetchJson(`${CTB_BASE}/route-stop/ctb/${job.route}/${job.direction}`);
      const meta = routeLookup.get(job.route) || {};
      const rows = payload.data || [];
      const stops = await Promise.all(
        rows.map(async (row) => {
          const stopId = row.stop || row.stop_id;
          if (!stopCache.has(stopId)) {
            stopCache.set(
              stopId,
              fetchJson(`${CTB_BASE}/stop/${stopId}`).then((stopPayload) =>
                Array.isArray(stopPayload.data) ? stopPayload.data[0] : stopPayload.data,
              ),
            );
          }
          const stop = await stopCache.get(stopId);
          return { row, stopId, stop };
        }),
      );
      return stops.filter(({ stop }) => isValleyRoad(stop)).map(({ row, stopId, stop }) => ({
        company: "CTB",
        route: job.route,
        bound: job.direction,
        direction: job.direction,
        serviceType: "",
        origin: meta.origin || "",
        destination: meta.destination || "",
        seq: row.seq,
        stopId,
        stopName: `${stop.name_tc || stop.name_chi} | ${stop.name_en}`,
      }));
    } catch {
      return [];
    }
  });
  return matches.flat();
}

const [kmb, ctb] = await Promise.all([scanKmb(), scanCtb()]);
const all = [...kmb, ...ctb].sort((a, b) =>
  `${a.company} ${a.route} ${a.bound} ${a.serviceType}`.localeCompare(
    `${b.company} ${b.route} ${b.bound} ${b.serviceType}`,
  ),
);

console.log(JSON.stringify(all, null, 2));
console.error(`FOUND ${all.length}`);
