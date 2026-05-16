const TRANSFER_BUFFER_MS = 2 * 60 * 1000;
const DEFAULT_MIN_RIDE_MINUTES = 6;

const MIN_RIDE_MINUTES = {
  "790:beaumount:hkPost": 20,
  "790:valleyRoad:capitol": 18,
  "795X:valleyRoad:tkoTunnel": 9,
  "796P:valleyRoad:tkoTunnel": 8,
  "98D:valleyRoad:tkoTunnel": 8,
  "98:capitol:tkoTunnel": 7,
  "98:capitol:kwunTong": 13,
  "98:tkoTunnel:beaumount": 10,
  "797:capitol:tkoTunnel": 8,
  "797:tkoTunnel:capitol": 8,
  "796X:tkoTunnel:hungFuk": 11,
  "297P:tkoTunnel:hungFuk": 9,
  "296D:valleyRoad:tkoTunnel": 8,
  "49:valleyRoad:tkoTunnel": 15,
  "11X:kaiFukTunnel:hungFuk": 6,
  "15X:kaiFukTunnel:hungFuk": 6,
  "11X:kwunTong:hungFuk": 9,
};

const STOP_ALIASES = {
  beaumount: ["峻瀅", "the beaumount", "wan po road"],
  capitol: ["首都", "the capitol", "lohas park"],
  hungFuk: ["鴻福街", "hung fook street", "hung fuk street"],
  hkPost: ["香港郵政大樓", "hongkong post", "hong kong post"],
  kaiFukTunnel: [
    "啟福隧道轉車站",
    "啟隧轉車站",
    "啟福道",
    "kai tak tunnel bbi",
    "kai fuk road",
  ],
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
  hungHomCorridor: ["山谷道", "紅磡南道", "機利士南路", "valley road", "hung hom south road", "gillies avenue south"],
};

const ROUTE_COMPANY = {
  "790": "ctb",
  "795X": "ctb",
  "796P": "ctb",
  "797": "ctb",
  "796X": "ctb",
  "297P": "kmb",
  "296D": "kmb",
  "49": "kmb",
  "98": "kmb",
  "98D": "kmb",
  "11X": "kmb",
  "15X": "kmb",
};

const COMMUTES = {
  work: {
    title: "上班：峻瀅 / 首都 → 土瓜灣鴻福街",
    plans: [
      {
        name: "790 轉 11X",
        legs: [
          { route: "790", from: "beaumount", to: "hkPost" },
          { route: "11X", from: "kaiFukTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "790 轉 15X",
        legs: [
          { route: "790", from: "beaumount", to: "hkPost" },
          { route: "15X", from: "kaiFukTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "98 轉 796X",
        legs: [
          { route: "98", from: "capitol", to: "tkoTunnel" },
          { route: "796X", from: "tkoTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "797 轉 796X",
        legs: [
          { route: "797", from: "capitol", to: "tkoTunnel" },
          { route: "796X", from: "tkoTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "98 轉 297P",
        legs: [
          { route: "98", from: "capitol", to: "tkoTunnel" },
          { route: "297P", from: "tkoTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "797 轉 297P",
        legs: [
          { route: "797", from: "capitol", to: "tkoTunnel" },
          { route: "297P", from: "tkoTunnel", to: "hungFuk" },
        ],
      },
      {
        name: "98 轉 11X",
        legs: [
          { route: "98", from: "capitol", to: "kwunTong" },
          { route: "11X", from: "kwunTong", to: "hungFuk" },
        ],
      },
      {
        name: "11X 直達",
        legs: [{ route: "11X", from: "capitol", to: "hungFuk" }],
      },
    ],
  },
  home: {
    title: "下班：紅磡山谷道 → 峻瀅 / 首都",
    plans: [
      {
        name: "790 直達",
        legs: [{ route: "790", from: "valleyRoad", to: "capitol" }],
      },
      {
        name: "795X 轉 98",
        legs: [
          { route: "795X", from: "valleyRoad", to: "tkoTunnel" },
          { route: "98", from: "tkoTunnel", to: "beaumount" },
        ],
      },
      {
        name: "796P 轉 98",
        legs: [
          { route: "796P", from: "valleyRoad", to: "tkoTunnel" },
          { route: "98", from: "tkoTunnel", to: "beaumount" },
        ],
      },
      {
        name: "98D 轉 98",
        legs: [
          { route: "98D", from: "valleyRoad", to: "tkoTunnel" },
          { route: "98", from: "tkoTunnel", to: "beaumount" },
        ],
      },
      {
        name: "296D 轉 98",
        legs: [
          { route: "296D", from: "valleyRoad", to: "tkoTunnel" },
          { route: "98", from: "tkoTunnel", to: "beaumount" },
        ],
      },
      {
        name: "49 轉 98",
        legs: [
          { route: "49", from: "valleyRoad", to: "tkoTunnel" },
          { route: "98", from: "tkoTunnel", to: "beaumount" },
        ],
      },
      {
        name: "795X 轉 797",
        legs: [
          { route: "795X", from: "valleyRoad", to: "tkoTunnel" },
          { route: "797", from: "tkoTunnel", to: "capitol" },
        ],
      },
      {
        name: "796P 轉 797",
        legs: [
          { route: "796P", from: "valleyRoad", to: "tkoTunnel" },
          { route: "797", from: "tkoTunnel", to: "capitol" },
        ],
      },
      {
        name: "98D 轉 797",
        legs: [
          { route: "98D", from: "valleyRoad", to: "tkoTunnel" },
          { route: "797", from: "tkoTunnel", to: "capitol" },
        ],
      },
      {
        name: "296D 轉 797",
        legs: [
          { route: "296D", from: "valleyRoad", to: "tkoTunnel" },
          { route: "797", from: "tkoTunnel", to: "capitol" },
        ],
      },
      {
        name: "49 轉 797",
        legs: [
          { route: "49", from: "valleyRoad", to: "tkoTunnel" },
          { route: "797", from: "tkoTunnel", to: "capitol" },
        ],
      },
    ],
  },
};

const cache = new Map();
let activeMode = "work";

const $ = (selector) => document.querySelector(selector);

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    document.querySelectorAll(".mode-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    refresh();
  });
});

$("#refreshBtn").addEventListener("click", refresh);

refresh();

async function refresh() {
  const refreshBtn = $("#refreshBtn");
  refreshBtn.disabled = true;
  refreshBtn.textContent = "更新中";
  $("#subtitle").textContent = COMMUTES[activeMode].title;
  setSummary("正在讀取實時 ETA...", "官方資料有時會略慢，請等一等。");
  $("#results").innerHTML = "";

  try {
    const results = await Promise.all(
      COMMUTES[activeMode].plans.map((plan) =>
        evaluatePlan(plan).catch((error) => ({
          ...plan,
          arrival: null,
          error: error.message,
          legResults: [],
        })),
      ),
    );
    const sorted = results.sort((a, b) => {
      if (a.arrival && b.arrival) return a.arrival - b.arrival;
      if (a.arrival) return -1;
      if (b.arrival) return 1;
      return a.name.localeCompare(b.name);
    });
    renderResults(sorted);
  } catch (error) {
    setSummary("讀取失敗", error.message);
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = "更新";
  }
}

async function evaluatePlan(plan) {
  let earliestBoardAfter = new Date();
  const legResults = [];

  for (const leg of plan.legs) {
    const segment = await resolveSegment(leg);
    const candidates = await getLegCandidates(segment);
    const chosen = candidates.find((candidate) => candidate.boardTime > earliestBoardAfter);

    if (!chosen) {
      return {
        ...plan,
        arrival: null,
        error: `${leg.route} 沒有合適班次或下游 ETA`,
        legResults,
      };
    }

    legResults.push({ ...leg, ...segment, ...chosen });
    earliestBoardAfter = new Date(chosen.arrivalTime.getTime() + TRANSFER_BUFFER_MS);
  }

  return {
    ...plan,
    arrival: legResults.at(-1).arrivalTime,
    depart: legResults[0].boardTime,
    legResults,
  };
}

async function resolveSegment(leg) {
  const company = ROUTE_COMPANY[leg.route];
  if (!company) throw new Error(`未設定 ${leg.route} 的巴士公司`);

  const directions = company === "kmb" ? ["outbound", "inbound"] : ["outbound", "inbound"];
  const variants = await Promise.all(
    directions.map(async (direction) => {
      const stops = await getRouteStops(company, leg.route, direction);
      return findSegmentInStops(stops, leg.from, leg.to, direction);
    }),
  );

  const segment = variants.find(Boolean);
  if (!segment) {
    throw new Error(`${leg.route} 找不到 ${labelFor(leg.from)} → ${labelFor(leg.to)} 的站序`);
  }

  return {
    ...segment,
    company,
    route: leg.route,
    minRideMinutes: getMinRideMinutes(leg, segment),
  };
}

function findSegmentInStops(stops, fromKey, toKey, direction) {
  const fromIndex = stops.findIndex((stop) => matchesStop(stop, fromKey));
  const toIndex = stops.findIndex((stop, index) => index > fromIndex && matchesStop(stop, toKey));
  if (fromIndex < 0 || toIndex < 0) return null;
  return {
    direction,
    fromStop: stops[fromIndex],
    toStop: stops[toIndex],
  };
}

async function getLegCandidates(segment) {
  const [fromEtas, toEtas] = await Promise.all([
    getEta(segment.company, segment.route, segment.direction, segment.fromStop.id),
    getEta(segment.company, segment.route, segment.direction, segment.toStop.id),
  ]);

  return fromEtas
    .map((fromEta) => {
      const earliestPlausibleArrival = new Date(
        fromEta.time.getTime() + segment.minRideMinutes * 60 * 1000,
      );
      const toEta = toEtas.find((eta) => eta.time >= earliestPlausibleArrival);
      if (!toEta) return null;
      return {
        etaSeq: fromEta.seq,
        boardTime: fromEta.time,
        arrivalTime: toEta.time,
        minRideMinutes: segment.minRideMinutes,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.boardTime - b.boardTime);
}

function getMinRideMinutes(leg, segment) {
  const key = `${leg.route}:${leg.from}:${leg.to}`;
  if (MIN_RIDE_MINUTES[key]) return MIN_RIDE_MINUTES[key];

  const stopGap = Math.max(1, segment.toStop.seq - segment.fromStop.seq);
  return Math.max(DEFAULT_MIN_RIDE_MINUTES, Math.ceil(stopGap * 1.5));
}

async function getRouteStops(company, route, direction) {
  const key = `route-stops:${company}:${route}:${direction}`;
  if (cache.has(key)) return cache.get(key);

  const rows =
    company === "kmb"
      ? await fetchJson(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${direction}/1`)
      : await fetchJson(`https://rt.data.gov.hk/v2/transport/citybus/route-stop/ctb/${route}/${direction}`);

  const routeStops = rows.data || [];
  const stops = await Promise.all(
    routeStops.map(async (row) => {
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

  return (payload.data || [])
    .filter((row) => !row.dir || row.dir === apiDirection)
    .map((row) => ({
      seq: Number(row.eta_seq),
      time: row.eta ? new Date(row.eta) : null,
      raw: row,
    }))
    .filter((eta) => eta.time && eta.time > new Date())
    .sort((a, b) => a.time - b.time);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function matchesStop(stop, key) {
  const haystack = normalize(`${stop.nameTc} ${stop.nameEn}`);
  return STOP_ALIASES[key].some((alias) => haystack.includes(normalize(alias)));
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function labelFor(key) {
  return STOP_ALIASES[key][0];
}

function renderResults(results) {
  const valid = results.filter((result) => result.arrival);
  if (!valid.length) {
    setSummary("暫時沒有可用路線", "可能是路線方向、站名配對或官方 ETA 暫時沒有資料。");
  } else {
    const best = valid[0];
    setSummary(
      `最快：${best.name}，${formatClock(best.arrival)} 到`,
      `約 ${minutesFromNow(best.arrival)} 分鐘後到達，${formatClock(best.depart)} 上車`,
    );
  }

  $("#results").innerHTML = results.map(renderCard).join("");
}

function renderCard(result, index) {
  const isBest = index === 0 && result.arrival;
  const body = result.legResults.length
    ? result.legResults.map(renderLeg).join("")
    : `<div class="error">${escapeHtml(result.error || "沒有資料")}</div>`;
  const time = result.arrival
    ? `<div class="eta">${formatClock(result.arrival)}</div><div class="minutes">${minutesFromNow(result.arrival)} 分鐘</div>`
    : `<div class="eta">--:--</div><div class="minutes error">${escapeHtml(result.error || "不可用")}</div>`;

  return `
    <article class="route-card ${isBest ? "best" : ""}">
      <div>
        <div class="route-title">
          <span class="rank">${index + 1}</span>
          <span class="name">${escapeHtml(result.name)}</span>
          ${isBest ? '<span class="badge">最快</span>' : ""}
        </div>
        <div class="legs">${body}</div>
      </div>
      <div class="time-block">${time}</div>
    </article>
  `;
}

function renderLeg(leg, index) {
  const transferText = index === 0 ? "" : "，已套用 +2 分鐘轉乘";
  const rideText = leg.minRideMinutes ? `，最少 ${leg.minRideMinutes} 分鐘車程` : "";
  return `
    <div class="leg">
      <div class="route-no">${escapeHtml(leg.route)}</div>
      <div>
        ${escapeHtml(leg.fromStop.nameTc)} → ${escapeHtml(leg.toStop.nameTc)}
        <br />
        ${formatClock(leg.boardTime)} 上車，${formatClock(leg.arrivalTime)} 到${transferText}${rideText}
      </div>
    </div>
  `;
}

function setSummary(main, meta) {
  $("#summary").innerHTML = `
    <div class="summary-main">${escapeHtml(main)}</div>
    <div class="summary-meta">${escapeHtml(meta)}</div>
  `;
}

function formatClock(date) {
  return new Intl.DateTimeFormat("zh-HK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function minutesFromNow(date) {
  return Math.max(0, Math.round((date - new Date()) / 60000));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}
