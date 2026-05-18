import { readFile, writeFile } from "node:fs/promises";

const DEFAULTS_PATH = new URL("../ride-defaults.json", import.meta.url);
const FETCH_TIMEOUT_MS = 12000;
const MAX_RIDE_SAMPLES = 30;

const MIN_RIDE_MINUTES = {
  "790:beaumount:hkPost": 6,
  "790:valleyRoad:capitol": 18,
  "795X:valleyRoad:tkoTunnel": 9,
  "796P:valleyRoad:tkoTunnel": 8,
  "98D:valleyRoad:tkoTunnel": 8,
  "296D:valleyRoad:tkoTunnel": 8,
  "49:valleyRoad:tkoTunnel": 15,
  "98:capitol:tkoTunnel": 7,
  "98:capitol:kwunTong": 13,
  "98:tkoTunnel:beaumount": 8,
  "797:capitol:tkoTunnel": 8,
  "797:tkoTunnel:capitol": 8,
  "796X:tkoTunnel:hungFuk": 11,
  "297P:tkoTunnel:hungFuk": 9,
  "11X:kaiFukTunnel:hungFuk": 6,
  "15X:kaiFukTunnel:hungFuk": 6,
  "11X:kwunTong:hungFuk": 9,
};

const ETA_PAIRING_MODE = {
  "790:beaumount:hkPost": "headway",
  "790:valleyRoad:capitol": "headway",
};

const STOP_ALIASES = {
  beaumount: ["峻瀅", "the beaumount"],
  capitol: ["日出康城首都", "首都", "the capitol"],
  hungFuk: ["鴻福街", "hung fook street", "hung fuk street"],
  hkPost: ["香港郵政大樓", "hongkong post", "hong kong post"],
  kaiFukTunnel: ["啟福隧道轉車站", "啟隧轉車站", "啟福道", "kai tak tunnel bbi", "kai fuk road"],
  tkoTunnel: [
    "將軍澳隧道巴士轉乘站",
    "將軍澳隧道轉車站",
    "tseung kwan o tunnel bus-bus interchange",
    "tseung kwan o tunnel bbi",
  ],
  kwunTong: [
    "觀塘轉車站 - 創紀之城",
    "觀塘轉車站-創紀之城",
    "kwun tong bbi - millennium city",
    "kwun tong bbi-millennium city",
  ],
  valleyRoad: ["山谷道", "valley road"],
};

const ROUTE_COMPANY = {
  "790": "ctb",
  "795X": "ctb",
  "796P": "ctb",
  "797": "ctb",
  "796X": "ctb",
  "296D": "kmb",
  "297P": "kmb",
  "49": "kmb",
  "98": "kmb",
  "98D": "kmb",
  "11X": "kmb",
  "15X": "kmb",
};

const LEGS = [
  ["790", "beaumount", "hkPost"],
  ["11X", "kaiFukTunnel", "hungFuk"],
  ["15X", "kaiFukTunnel", "hungFuk"],
  ["98", "capitol", "tkoTunnel"],
  ["797", "capitol", "tkoTunnel"],
  ["796X", "tkoTunnel", "hungFuk"],
  ["297P", "tkoTunnel", "hungFuk"],
  ["98", "capitol", "kwunTong"],
  ["11X", "kwunTong", "hungFuk"],
  ["790", "valleyRoad", "capitol"],
  ["795X", "valleyRoad", "tkoTunnel"],
  ["796P", "valleyRoad", "tkoTunnel"],
  ["98D", "valleyRoad", "tkoTunnel"],
  ["296D", "valleyRoad", "tkoTunnel"],
  ["49", "valleyRoad", "tkoTunnel"],
  ["98", "tkoTunnel", "beaumount"],
  ["797", "tkoTunnel", "capitol"],
];

const cache = new Map();

const iterations = Number(process.argv[2] || 1);
const intervalSeconds = Number(process.argv[3] || 60);

for (let i = 0; i < iterations; i += 1) {
  const samples = await collectOnce();
  await mergeSamples(samples);
  console.log(`iteration ${i + 1}/${iterations}: ${samples.length} samples`);
  if (i < iterations - 1) await delay(intervalSeconds * 1000);
}

async function collectOnce() {
  const results = await Promise.allSettled(
    LEGS.map(async ([route, from, to]) => collectLeg({ route, from, to })),
  );
  return results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function collectLeg(leg) {
  const segment = await resolveSegment(leg);
  const fromEtas = await getEta(segment.company, segment.route, segment.direction, segment.fromStop.id);
  const toEtas = await getEta(segment.company, segment.route, segment.direction, segment.toStop.id);
  if (ETA_PAIRING_MODE[segment.rideKey] === "headway") {
    return collectHeadwayLeg(segment, fromEtas, toEtas);
  }
  let toIndex = 0;
  const samples = [];

  for (const fromEta of fromEtas) {
    const earliest = new Date(fromEta.time.getTime() + segment.baseMinRideMinutes * 60 * 1000);
    while (toIndex < toEtas.length && toEtas[toIndex].time < earliest) toIndex += 1;
    const toEta = toEtas[toIndex];
    if (!toEta) continue;
    toIndex += 1;
    const minutes = Math.round((toEta.time - fromEta.time) / 60000);
    if (minutes < Math.max(3, segment.baseMinRideMinutes - 3)) continue;
    if (minutes > getMaxRideSampleMinutes(segment)) continue;
    samples.push({
      key: segment.rideKey,
      sample: {
        id: `${fromEta.time.toISOString()}|${toEta.time.toISOString()}`,
        minutes,
      },
    });
  }

  return samples;
}

function collectHeadwayLeg(segment, fromEtas, toEtas) {
  const samples = [];
  let toIndex = 0;
  for (const fromEta of fromEtas) {
    while (toIndex < toEtas.length && toEtas[toIndex].time <= fromEta.time) toIndex += 1;
    const toEta = toEtas[toIndex];
    if (toEta) toIndex += 1;
    if (!toEta) continue;
    const minutes = Math.round((toEta.time - fromEta.time) / 60000);
    if (minutes < 1 || minutes > getMaxRideSampleMinutes(segment)) continue;
    samples.push({
      key: segment.rideKey,
      sample: {
        id: `${fromEta.time.toISOString()}|${toEta.time.toISOString()}`,
        minutes,
      },
    });
  }
  return samples;
}

function getMaxRideSampleMinutes(segment) {
  const strictCaps = {
    "790:beaumount:hkPost": 20,
    "790:valleyRoad:capitol": 30,
    "98:tkoTunnel:beaumount": 16,
  };
  if (strictCaps[segment.rideKey]) return strictCaps[segment.rideKey];
  return Math.max(60, segment.baseMinRideMinutes * 4);
}

async function resolveSegment(leg) {
  const company = ROUTE_COMPANY[leg.route];
  const variants = await Promise.all(
    ["outbound", "inbound"].map(async (direction) => {
      const stops = await getRouteStops(company, leg.route, direction);
      return findSegmentInStops(stops, leg.from, leg.to, direction);
    }),
  );
  const segment = variants.filter(Boolean).sort((a, b) => a.stopGap - b.stopGap)[0];
  if (!segment) throw new Error(`No segment for ${leg.route}:${leg.from}:${leg.to}`);
  const rideKey = `${leg.route}:${leg.from}:${leg.to}`;
  return {
    ...segment,
    company,
    route: leg.route,
    rideKey,
    baseMinRideMinutes: MIN_RIDE_MINUTES[rideKey] || Math.max(6, Math.ceil(segment.stopGap * 1.5)),
  };
}

function findSegmentInStops(stops, fromKey, toKey, direction) {
  const matches = [];
  for (let fromIndex = 0; fromIndex < stops.length; fromIndex += 1) {
    if (!matchesStop(stops[fromIndex], fromKey)) continue;
    for (let toIndex = fromIndex + 1; toIndex < stops.length; toIndex += 1) {
      if (!matchesStop(stops[toIndex], toKey)) continue;
      matches.push({
        direction,
        fromStop: stops[fromIndex],
        toStop: stops[toIndex],
        stopGap: stops[toIndex].seq - stops[fromIndex].seq,
      });
      break;
    }
  }
  return matches.sort((a, b) => a.stopGap - b.stopGap)[0] || null;
}

async function getRouteStops(company, route, direction) {
  const key = `route-stops:${company}:${route}:${direction}`;
  if (cache.has(key)) return cache.get(key);
  const rows =
    company === "kmb"
      ? await fetchJson(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${direction}/1`)
      : await fetchJson(`https://rt.data.gov.hk/v2/transport/citybus/route-stop/ctb/${route}/${direction}`);
  const stops = await Promise.all(
    (rows.data || []).map(async (row) => {
      const stopId = row.stop || row.stop_id;
      const stop = await getStop(company, stopId);
      return { id: stopId, seq: Number(row.seq), ...stop };
    }),
  );
  const sorted = stops.sort((a, b) => a.seq - b.seq);
  cache.set(key, sorted);
  return sorted;
}

async function getStop(company, stopId) {
  const key = `stop:${company}:${stopId}`;
  if (cache.has(key)) return cache.get(key);
  const payload =
    company === "kmb"
      ? await fetchJson(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${stopId}`)
      : await fetchJson(`https://rt.data.gov.hk/v2/transport/citybus/stop/${stopId}`);
  const data = Array.isArray(payload.data) ? payload.data[0] : payload.data;
  const stop = {
    nameTc: data.name_tc || data.name_chi || "",
    nameEn: data.name_en || "",
  };
  cache.set(key, stop);
  return stop;
}

async function getEta(company, route, direction, stopId) {
  const apiDirection = direction === "outbound" ? "O" : "I";
  const payload =
    company === "kmb"
      ? await fetchJson(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${stopId}/${route}/1`)
      : await fetchJson(`https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stopId}/${route}`);
  const now = new Date();
  return (payload.data || [])
    .filter((row) => !row.dir || row.dir === apiDirection)
    .map((row) => ({ time: row.eta ? new Date(row.eta) : null }))
    .filter((eta) => eta.time && eta.time > now)
    .sort((a, b) => a.time - b.time);
}

async function mergeSamples(samples) {
  const defaults = JSON.parse(await readFile(DEFAULTS_PATH, "utf8"));
  defaults.routes ||= {};
  for (const { key, sample } of samples) {
    const existing = defaults.routes[key] || [];
    if (existing.some((item) => item.id === sample.id)) continue;
    existing.push(sample);
    defaults.routes[key] = existing.slice(-MAX_RIDE_SAMPLES);
  }
  defaults.updatedAt = new Date().toISOString();
  await writeFile(DEFAULTS_PATH, `${JSON.stringify(defaults, null, 2)}\n`);
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const separator = url.includes("?") ? "&" : "?";
    const response = await fetch(`${url}${separator}_=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function matchesStop(stop, key) {
  const haystack = normalize(`${stop.nameTc} ${stop.nameEn}`);
  return STOP_ALIASES[key].some((alias) => haystack.includes(normalize(alias)));
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
