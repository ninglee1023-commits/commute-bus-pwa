const STORAGE_KEY = "aisg-lunch-picker-week4-er-sha-2026-05-25-luca-noah";

const MENU_ITEMS = [
  {
    id: "asian-mon-pork-mince-egg",
    day: "Monday",
    date: "2026/5/25",
    set: "Asian",
    title: "Marinated Pork Mince with Egg",
    titleZh: "台灣肉鹵配鹵雞蛋",
    image: "assets/food/asian-mon-pork-mince-egg.png",
    items: ["Green leafy vegetables", "Steamed rice", "Wax gourd pork soup"],
    itemsZh: ["上海春菜", "米飯", "冬瓜瘦肉湯"],
    allergens: ["Gluten", "Egg"],
    nutrition: { cal: "459 kcal", protein: "19.2g", fat: "30.4g", carb: "27g" }
  },
  {
    id: "western-mon-bbq-chicken",
    day: "Monday",
    date: "2026/5/25",
    set: "Western",
    title: "BBQ Chicken",
    titleZh: "BBQ烤雞",
    image: "assets/food/western-mon-bbq-chicken.png",
    items: ["Zucchini & carrot", "Roasted potato", "Pumpkin soup"],
    itemsZh: ["胡蘿蔔西葫蘆", "迷迭香烤土豆", "南瓜濃湯"],
    allergens: ["Gluten"],
    nutrition: { cal: "334 kcal", protein: "23.4g", fat: "12.1g", carb: "35.2g" }
  },
  {
    id: "veg-mon-udon-tofu",
    day: "Monday",
    date: "2026/5/25",
    set: "Vegetarian",
    title: "Udon Noodle, Fried Tofu, Vegetables",
    titleZh: "蔬油拌乌冬面，板豆腐，炒杂菜",
    image: "assets/food/veg-mon-udon-tofu.png",
    items: ["Fried tofu", "Mixed vegetables", "Udon noodle"],
    itemsZh: ["板豆腐", "炒雜菜", "蔬油拌烏冬面"],
    allergens: ["Gluten"],
    nutrition: { cal: "398 kcal", protein: "17.4g", fat: "6.1g", carb: "71.4g" }
  },
  {
    id: "asian-tue-salty-chicken-egg-custard",
    day: "Tuesday",
    date: "2026/5/26",
    set: "Asian",
    title: "Cantonese Salty Chicken with Egg Custard",
    titleZh: "咸香雞配蒸水蛋",
    image: "assets/food/asian-tue-salty-chicken-egg-custard.png",
    items: ["Long beans", "Pumpkin rice", "Tomato corn chicken soup"],
    itemsZh: ["蠔油豆角", "南瓜飯", "番茄玉米雞肉湯"],
    allergens: ["Egg", "Gluten"],
    nutrition: { cal: "434 kcal", protein: "38.5g", fat: "15.8g", carb: "35.9g" }
  },
  {
    id: "western-tue-beef-lasagna",
    day: "Tuesday",
    date: "2026/5/26",
    set: "Western",
    title: "Beef Lasagna",
    titleZh: "牛肉餡千層面",
    image: "assets/food/western-tue-beef-lasagna.png",
    items: ["Sauteed broccoli with cherry tomatoes", "Mixed beans", "Corn cream soup"],
    itemsZh: ["櫻桃番茄炒西蘭花", "彩虹豆", "玉米忌廉湯"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "511 kcal", protein: "31.9g", fat: "8.8g", carb: "76.3g" }
  },
  {
    id: "veg-tue-frittata-cheese-toast",
    day: "Tuesday",
    date: "2026/5/26",
    set: "Vegetarian",
    title: "Mini Frittata & Cheese Toast",
    titleZh: "迷你西式烘雞蛋，芝士烤吐司",
    image: "assets/food/veg-tue-frittata-cheese-toast.png",
    items: ["Vegetables", "Cheese toast", "Mini frittata"],
    itemsZh: ["時蔬", "芝士烤吐司", "迷你西式烘雞蛋"],
    allergens: ["Gluten", "Egg", "Dairy"],
    nutrition: { cal: "401 kcal", protein: "24.9g", fat: "11.9g", carb: "65.2g" }
  },
  {
    id: "asian-wed-pork-taro-soya",
    day: "Wednesday",
    date: "2026/5/27",
    set: "Asian",
    title: "Steamed Pork Taro with Soya Beans",
    titleZh: "豉汁香芋蒸肉粒",
    image: "assets/food/asian-wed-pork-taro-soya.png",
    items: ["Choy sum", "Brown rice", "Apple soup with pork"],
    itemsZh: ["菜心", "糙米飯", "蘋果瘦肉湯"],
    allergens: ["Gluten"],
    nutrition: { cal: "523 kcal", protein: "20.5g", fat: "30.1g", carb: "42g" }
  },
  {
    id: "western-wed-chicken-sausage-pasta",
    day: "Wednesday",
    date: "2026/5/27",
    set: "Western",
    title: "Chicken Sausage",
    titleZh: "雞肉香腸",
    image: "assets/food/western-wed-chicken-sausage-pasta.png",
    items: ["Baby corn & vegetables", "Pasta", "Minestrone soup"],
    itemsZh: ["玉米筍及時蔬", "美式意面", "意大利蔬菜湯"],
    allergens: ["Gluten", "Dairy"],
    nutrition: { cal: "419 kcal", protein: "38g", fat: "0.3g", carb: "80.7g" }
  },
  {
    id: "veg-wed-bean-curd-tempura",
    day: "Wednesday",
    date: "2026/5/27",
    set: "Vegetarian",
    title: "Baked Bean Curd, Vegetable Tempura, Brown Rice",
    titleZh: "酱烤豆腐，蔬菜天妇罗，日式糙米饭团",
    image: "assets/food/veg-wed-bean-curd-tempura.png",
    items: ["Baked bean curd", "Vegetable tempura", "Brown rice"],
    itemsZh: ["醬烤豆腐", "蔬菜天婦羅", "日式糙米飯團"],
    allergens: ["Gluten"],
    nutrition: { cal: "275 kcal", protein: "15.5g", fat: "7.2g", carb: "43.2g" }
  },
  {
    id: "asian-thu-beef-brisket-curry",
    day: "Thursday",
    date: "2026/5/28",
    set: "Asian",
    title: "Beef Brisket Curry",
    titleZh: "咖喱牛腩",
    image: "assets/food/asian-thu-beef-brisket-curry.png",
    items: ["Steamed cabbage", "Corn rice", "Corn & carrot pork soup"],
    itemsZh: ["鹽水大白菜", "玉米飯", "玉米胡蘿蔔豬骨湯"],
    allergens: ["Gluten"],
    nutrition: { cal: "296 kcal", protein: "24.2g", fat: "9.2g", carb: "29.8g" }
  },
  {
    id: "western-thu-ham-cheese-sandwich",
    day: "Thursday",
    date: "2026/5/28",
    set: "Western",
    title: "Ham & Cheese Sandwich",
    titleZh: "火腿芝士三文治",
    image: "assets/food/western-thu-ham-cheese-sandwich.png",
    items: ["Sauteed vegetable", "Hash browns", "Carrot soup"],
    itemsZh: ["炒雜菜", "笑臉薯餅", "甘筍濃湯"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "674 kcal", protein: "44.8g", fat: "27g", carb: "92.4g" }
  },
  {
    id: "veg-thu-cheese-macaroni",
    day: "Thursday",
    date: "2026/5/28",
    set: "Vegetarian",
    title: "Baked Cheese Macaroni, Broccoli, Scrambled Egg",
    titleZh: "芝士焗弯通心粉，白汁焗西兰花，炒滑蛋",
    image: "assets/food/veg-thu-cheese-macaroni.png",
    items: ["Baked cheese macaroni", "Broccoli", "Scrambled egg"],
    itemsZh: ["芝士焗彎通心粉", "白汁焗西蘭花", "炒滑蛋"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "359 kcal", protein: "12.4g", fat: "1.7g", carb: "74.1g" }
  },
  {
    id: "fri-mexican-food-festival",
    day: "Friday",
    date: "2026/5/29",
    set: "Festival",
    title: "Mexican Food Festival",
    titleZh: "墨西哥美食節",
    image: "assets/food/fri-mexican-food-festival.png",
    items: ["Chicken fajita", "Pulled pork", "Zucchini & carrot", "Nachos", "Corn & tomato soup"],
    itemsZh: ["雞肉法吉塔", "手撕豬肉", "胡蘿蔔西葫蘆", "墨西哥玉米片", "墨西哥玉米番茄湯"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "614.4 kcal", protein: "44.3g", fat: "40g", carb: "70.2g" }
  },
  {
    id: "veg-fri-quesadillas",
    day: "Friday",
    date: "2026/5/29",
    set: "Vegetarian",
    title: "Cheese Veggie Quesadillas, Vegetables, Nachos",
    titleZh: "芝士蔬菜薄餅，時蔬，玉米片",
    image: "assets/food/veg-fri-quesadillas.png",
    items: ["Cheese veggie quesadillas", "Vegetables", "Nachos"],
    itemsZh: ["芝士蔬菜薄餅", "時蔬", "玉米片"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "476 kcal", protein: "26.8g", fat: "22g", carb: "66.1g" }
  }
];

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const CHILD_KEYS = ["kid1", "kid2"];

const defaultState = {
  view: "kid1",
  names: { kid1: "Luca", kid2: "Noah" },
  picks: { kid1: [], kid2: [] },
  parentPick: null
};

let state = loadState();
let speakingMealId = null;

function cleanupLunchServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.getRegistrations?.().then((registrations) => {
    registrations.forEach((registration) => {
      if (registration.scope.includes("/lunch-menu/")) {
        registration.unregister();
      }
    });
  }).catch(() => {});
}

const elements = {
  menuLayout: document.querySelector("#menuLayout"),
  resultsLayout: document.querySelector("#resultsLayout"),
  matchGrid: document.querySelector("#matchGrid"),
  soloList: document.querySelector("#soloList"),
  modeLabel: document.querySelector("#modeLabel"),
  modeTitle: document.querySelector("#modeTitle"),
  matchCount: document.querySelector("#matchCount"),
  parentPickTitle: document.querySelector("#parentPickTitle"),
  parentPickMeta: document.querySelector("#parentPickMeta"),
  scoreStrip: document.querySelector("#scoreStrip"),
  template: document.querySelector("#mealCardTemplate"),
  childOneName: document.querySelector("#childOneName"),
  childTwoName: document.querySelector("#childTwoName"),
  copySummary: document.querySelector("#copySummary"),
  printPage: document.querySelector("#printPage"),
  resetWeek: document.querySelector("#resetWeek")
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...stored,
      names: { ...defaultState.names, ...stored.names },
      parentPick: normalizeParentPick(stored.parentPick),
      picks: {
        kid1: Array.isArray(stored.picks?.kid1) ? stored.picks.kid1 : [],
        kid2: Array.isArray(stored.picks?.kid2) ? stored.picks.kid2 : []
      }
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function mealById(id) {
  return MENU_ITEMS.find((item) => item.id === id);
}

function normalizeParentPick(value) {
  if (!value) return null;
  const key = String(value);
  if (key.includes(":")) return key;
  return mealById(key) ? `exact:${key}` : null;
}

function getMatchKey(match) {
  return match.type === "exact" ? `exact:${match.item.id}` : `same-day:${match.kid1.id}:${match.kid2.id}`;
}

function describeMatch(match) {
  if (!match) return "Not selected";
  if (match.type === "exact") {
    return `${match.day} ${match.date}: both chose ${match.item.title} (${match.item.set})`;
  }
  return `${match.day} ${match.date}: ${state.names.kid1} - ${match.kid1.title} (${match.kid1.set}); ${state.names.kid2} - ${match.kid2.title} (${match.kid2.set})`;
}

function getParentPickMatch(matches = getMatches()) {
  const key = normalizeParentPick(state.parentPick);
  if (!key) return null;
  return matches.find((match) => getMatchKey(match) === key) || null;
}

function getMatchedPickIds(matches) {
  const matched = { kid1: new Set(), kid2: new Set() };
  matches.forEach((match) => {
    if (match.type === "exact") {
      matched.kid1.add(match.item.id);
      matched.kid2.add(match.item.id);
    } else {
      matched.kid1.add(match.kid1.id);
      matched.kid2.add(match.kid2.id);
    }
  });
  return matched;
}

function speechSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function buildMealSpeech(item) {
  const english = [
    item.day,
    `${item.set} set`,
    item.title,
    ...item.items
  ].join(". ");
  const chineseParts = [item.titleZh, ...(item.itemsZh || [])].filter(Boolean);
  return {
    english,
    chinese: chineseParts.join("，")
  };
}

function pickPutonghuaVoice() {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === "zh-CN")
    || voices.find((voice) => voice.lang?.toLowerCase().startsWith("zh-cn"))
    || voices.find((voice) => /putonghua|mandarin|普通话|普通話|国语|國語/i.test(voice.name))
    || voices.find((voice) => voice.lang?.toLowerCase().startsWith("zh"));
}

function speakMeal(item) {
  if (!speechSupported()) {
    window.alert("Voice reading is not supported in this browser.");
    return;
  }

  const isSameMeal = speakingMealId === item.id && window.speechSynthesis.speaking;
  window.speechSynthesis.cancel();
  if (isSameMeal) {
    speakingMealId = null;
    render();
    return;
  }

  const speech = buildMealSpeech(item);
  const english = new SpeechSynthesisUtterance(speech.english);
  english.lang = "en-US";
  english.rate = 0.92;

  const chinese = new SpeechSynthesisUtterance(speech.chinese);
  const putonghuaVoice = pickPutonghuaVoice();
  if (putonghuaVoice) chinese.voice = putonghuaVoice;
  chinese.lang = putonghuaVoice?.lang || "zh-CN";
  chinese.rate = 0.86;

  const clearSpeakingState = () => {
    if (speakingMealId === item.id) {
      speakingMealId = null;
      render();
    }
  };
  english.onerror = clearSpeakingState;
  chinese.onend = clearSpeakingState;
  chinese.onerror = clearSpeakingState;

  speakingMealId = item.id;
  window.speechSynthesis.speak(english);
  window.speechSynthesis.speak(chinese);
  render();
}

function getMatches() {
  const kidOneItems = state.picks.kid1.map(mealById).filter(Boolean);
  const kidTwoItems = state.picks.kid2.map(mealById).filter(Boolean);
  const matches = [];
  const seen = new Set();

  kidOneItems.forEach((kidOneItem) => {
    kidTwoItems.forEach((kidTwoItem) => {
      if (kidOneItem.date !== kidTwoItem.date) return;

      const match = kidOneItem.id === kidTwoItem.id
        ? {
            type: "exact",
            day: kidOneItem.day,
            date: kidOneItem.date,
            item: kidOneItem
          }
        : {
            type: "same-day",
            day: kidOneItem.day,
            date: kidOneItem.date,
            kid1: kidOneItem,
            kid2: kidTwoItem
          };
      const key = getMatchKey(match);
      if (seen.has(key)) return;
      seen.add(key);
      matches.push(match);
    });
  });

  return matches;
}

function currentKidKey() {
  return state.view === "kid2" ? "kid2" : "kid1";
}

function setView(view) {
  state.view = view;
  saveState();
  render();
}

function togglePick(itemId) {
  const kid = currentKidKey();
  const picks = new Set(state.picks[kid]);
  if (picks.has(itemId)) {
    picks.delete(itemId);
  } else {
    picks.add(itemId);
  }
  state.picks[kid] = MENU_ITEMS.filter((item) => picks.has(item.id)).map((item) => item.id);
  const matchKeys = new Set(getMatches().map(getMatchKey));
  const parentPickKey = normalizeParentPick(state.parentPick);
  if (parentPickKey && !matchKeys.has(parentPickKey)) {
    state.parentPick = null;
  } else {
    state.parentPick = parentPickKey;
  }
  saveState();
  render();
}

function setParentPick(matchKey) {
  const normalizedKey = normalizeParentPick(matchKey);
  state.parentPick = normalizeParentPick(state.parentPick) === normalizedKey ? null : normalizedKey;
  saveState();
  render();
}

function render() {
  syncInputs();
  renderTabs();
  renderScores();

  const isResults = state.view === "results";
  elements.menuLayout.classList.toggle("hidden", isResults);
  elements.resultsLayout.classList.toggle("hidden", !isResults);
  elements.resultsLayout.classList.toggle("active", isResults);

  if (isResults) {
    elements.modeLabel.textContent = "Final decision";
    elements.modeTitle.textContent = "Choose from exact same-set matches or same-day matches.";
    renderResults();
  } else {
    const kid = currentKidKey();
    elements.modeLabel.textContent = `${state.names[kid]} choices`;
    elements.modeTitle.textContent = `Select every lunch ${state.names[kid]} would enjoy.`;
    renderMenu();
  }
}

function syncInputs() {
  if (document.activeElement !== elements.childOneName) {
    elements.childOneName.value = state.names.kid1;
  }
  if (document.activeElement !== elements.childTwoName) {
    elements.childTwoName.value = state.names.kid2;
  }
}

function renderTabs() {
  document.querySelectorAll(".segment").forEach((button) => {
    const isActive = button.dataset.view === state.view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    if (button.dataset.view === "kid1") button.textContent = state.names.kid1 || "Child 1";
    if (button.dataset.view === "kid2") button.textContent = state.names.kid2 || "Child 2";
  });
}

function renderScores() {
  const matches = getMatches();
  elements.scoreStrip.replaceChildren(
    makeScore(state.picks.kid1.length, state.names.kid1),
    makeScore(state.picks.kid2.length, state.names.kid2),
    makeScore(matches.length, "Orderable")
  );
}

function makeScore(value, label) {
  const node = document.createElement("div");
  node.className = "score";
  const strong = document.createElement("strong");
  strong.textContent = String(value);
  const span = document.createElement("span");
  span.textContent = label;
  node.append(strong, span);
  return node;
}

function renderMenu() {
  elements.menuLayout.replaceChildren();
  DAY_ORDER.forEach((day) => {
    const dayItems = MENU_ITEMS.filter((item) => item.day === day);
    const column = document.createElement("section");
    column.className = "day-column";
    column.append(makeDayHeader(day, dayItems[0]?.date));
    dayItems.forEach((item) => {
      column.append(makeMealCard(item, "picker"));
    });
    elements.menuLayout.append(column);
  });
}

function makeDayHeader(day, date) {
  const header = document.createElement("div");
  header.className = "day-header";
  const strong = document.createElement("strong");
  strong.textContent = day;
  const span = document.createElement("span");
  span.textContent = date;
  header.append(strong, span);
  return header;
}

function makeMealCard(item, mode) {
  const node = elements.template.content.firstElementChild.cloneNode(true);
  const isPicker = mode === "picker";
  const selectionKey = `exact:${item.id}`;
  const selected = isPicker
    ? state.picks[currentKidKey()].includes(item.id)
    : normalizeParentPick(state.parentPick) === selectionKey;

  node.dataset.id = item.id;
  node.classList.toggle("is-selected", isPicker && selected);
  node.classList.toggle("is-parent-pick", !isPicker && selected);

  const imageButton = node.querySelector(".image-button");
  const image = node.querySelector("img");
  const selectedMark = node.querySelector(".selected-mark");
  const dayPill = node.querySelector(".day-pill");
  const setPill = node.querySelector(".set-pill");
  const voiceButton = node.querySelector(".voice-button");
  const title = node.querySelector("h3");
  const titleZh = node.querySelector(".chinese-title");
  const itemList = node.querySelector(".item-list");
  const nutrition = node.querySelector(".nutrition");
  const allergy = node.querySelector(".allergy");

  image.src = item.image;
  image.alt = `${item.title} lunch set`;
  imageButton.setAttribute("aria-pressed", String(selected));
  imageButton.setAttribute(
    "aria-label",
    isPicker ? `Toggle ${item.title}` : `Choose ${item.title} as final lunch`
  );
  selectedMark.textContent = isPicker ? "Selected" : "Final pick";
  dayPill.textContent = item.day;
  setPill.textContent = item.set;
  setPill.classList.add(item.set.toLowerCase());
  voiceButton.setAttribute("aria-label", `Read ${item.title} in English and Putonghua`);
  voiceButton.setAttribute("aria-pressed", String(speakingMealId === item.id));
  voiceButton.classList.toggle("is-speaking", speakingMealId === item.id);
  title.textContent = item.title;
  titleZh.textContent = item.titleZh;

  item.items.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    itemList.append(li);
  });

  [
    ["Cal", item.nutrition.cal],
    ["Protein", item.nutrition.protein],
    ["Fat", item.nutrition.fat],
    ["Carb", item.nutrition.carb]
  ].forEach(([label, value]) => {
    const span = document.createElement("span");
    span.textContent = `${label}: ${value}`;
    nutrition.append(span);
  });

  allergy.textContent = `Allergy: ${item.allergens.join(", ")}`;
  imageButton.addEventListener("click", () => {
    if (isPicker) {
      togglePick(item.id);
    } else {
      setParentPick(selectionKey);
    }
  });
  voiceButton.addEventListener("click", (event) => {
    event.stopPropagation();
    speakMeal(item);
  });
  node.addEventListener("dblclick", () => {
    if (isPicker) togglePick(item.id);
  });

  return node;
}

function makeMatchCard(match) {
  if (match.type === "exact") return makeMealCard(match.item, "results");

  const key = getMatchKey(match);
  const selected = normalizeParentPick(state.parentPick) === key;
  const node = document.createElement("article");
  node.className = "meal-card match-card same-day-match";
  node.classList.toggle("is-parent-pick", selected);

  const button = document.createElement("button");
  button.className = "match-pick-button";
  button.type = "button";
  button.setAttribute("aria-pressed", String(selected));
  button.setAttribute("aria-label", `Choose ${match.day} same-day match as final lunch`);

  const selectedMark = document.createElement("span");
  selectedMark.className = "selected-mark";
  selectedMark.setAttribute("aria-hidden", "true");
  selectedMark.textContent = "Final pick";

  const summary = document.createElement("div");
  summary.className = "match-summary";

  const meta = document.createElement("div");
  meta.className = "meal-meta";
  const dayPill = document.createElement("span");
  dayPill.className = "day-pill";
  dayPill.textContent = match.day;
  const setPill = document.createElement("span");
  setPill.className = "set-pill festival";
  setPill.textContent = "Same day";
  meta.append(dayPill, setPill);

  const title = document.createElement("h3");
  title.textContent = `${match.day} lunch match`;
  const detail = document.createElement("p");
  detail.className = "match-detail";
  detail.textContent = `${match.date} - order one set for each child.`;

  const pairGrid = document.createElement("div");
  pairGrid.className = "match-pair-grid";
  pairGrid.append(
    makePairChoice(state.names.kid1, match.kid1),
    makePairChoice(state.names.kid2, match.kid2)
  );

  summary.append(meta, title, detail);
  button.append(selectedMark, summary, pairGrid);
  button.addEventListener("click", () => setParentPick(key));
  node.append(button);
  return node;
}

function makePairChoice(childName, item) {
  const node = document.createElement("div");
  node.className = "match-choice";

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = `${item.title} lunch set`;

  const child = document.createElement("span");
  child.className = "match-child";
  child.textContent = childName;

  const title = document.createElement("strong");
  title.textContent = item.title;

  const meta = document.createElement("span");
  meta.className = "match-choice-meta";
  meta.textContent = item.set;

  node.append(image, child, title, meta);
  return node;
}

function renderResults() {
  const matches = getMatches();
  const matchKeys = new Set(matches.map(getMatchKey));
  const parentPickKey = normalizeParentPick(state.parentPick);
  if (parentPickKey && !matchKeys.has(parentPickKey)) {
    state.parentPick = null;
    saveState();
  } else {
    state.parentPick = parentPickKey;
  }

  elements.matchGrid.replaceChildren();
  elements.soloList.replaceChildren();
  elements.matchCount.textContent = matches.length === 1
    ? "1 orderable match"
    : `${matches.length} orderable matches`;

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No exact same-set or same-day match yet. Switch back to each child and add more lunches they would accept.";
    elements.matchGrid.append(empty);
  } else {
    matches.forEach((match) => elements.matchGrid.append(makeMatchCard(match)));
  }

  const parentPick = getParentPickMatch(matches);
  if (parentPick) {
    elements.parentPickTitle.textContent = parentPick.type === "exact"
      ? parentPick.item.title
      : `${parentPick.day} lunch match`;
    elements.parentPickMeta.textContent = describeMatch(parentPick);
  } else {
    elements.parentPickTitle.textContent = "No final choice selected";
    elements.parentPickMeta.textContent = "Choose one exact or same-day match when both children have finished.";
  }

  renderSoloList(matches);
}

function renderSoloList(matches) {
  const matched = getMatchedPickIds(matches);
  const solo = [];

  MENU_ITEMS.forEach((item) => {
    const inKid1 = state.picks.kid1.includes(item.id);
    const inKid2 = state.picks.kid2.includes(item.id);
    if (inKid1 && !matched.kid1.has(item.id)) {
      solo.push({ item, owner: state.names.kid1 });
    }
    if (inKid2 && !matched.kid2.has(item.id)) {
      solo.push({ item, owner: state.names.kid2 });
    }
  });

  if (solo.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "None";
    elements.soloList.append(empty);
    return;
  }

  solo.forEach(({ item, owner }) => {
    const node = document.createElement("div");
    node.className = "solo-item";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const meta = document.createElement("span");
    meta.textContent = `${item.day} · ${item.set} · ${owner}`;
    node.append(title, meta);
    elements.soloList.append(node);
  });
}

function buildSummary() {
  const matches = getMatches();
  const lines = [
    "AISG Lunch Picker - Week 4 Er Sha",
    `${state.names.kid1}: ${state.picks.kid1.length} choices`,
    `${state.names.kid2}: ${state.picks.kid2.length} choices`,
    "",
    "Orderable matches:"
  ];

  if (matches.length === 0) {
    lines.push("None yet");
  } else {
    matches.forEach((match) => {
      lines.push(`- ${describeMatch(match)}`);
    });
  }

  const parentPick = getParentPickMatch(matches);
  lines.push("", "Parent pick:");
  lines.push(parentPick ? describeMatch(parentPick) : "Not selected");

  return lines.join("\n");
}

async function copySummary() {
  const originalText = elements.copySummary.textContent;
  try {
    await navigator.clipboard.writeText(buildSummary());
    elements.copySummary.textContent = "Copied";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = buildSummary();
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    elements.copySummary.textContent = "Copied";
  }
  window.setTimeout(() => {
    elements.copySummary.textContent = originalText;
  }, 1300);
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.childOneName.addEventListener("input", (event) => {
  state.names.kid1 = event.target.value.trim() || "Child 1";
  saveState();
  renderTabs();
  renderScores();
  if (state.view === "kid1") {
    elements.modeLabel.textContent = `${state.names.kid1} choices`;
    elements.modeTitle.textContent = `Select every lunch ${state.names.kid1} would enjoy.`;
  }
});

elements.childTwoName.addEventListener("input", (event) => {
  state.names.kid2 = event.target.value.trim() || "Child 2";
  saveState();
  renderTabs();
  renderScores();
  if (state.view === "kid2") {
    elements.modeLabel.textContent = `${state.names.kid2} choices`;
    elements.modeTitle.textContent = `Select every lunch ${state.names.kid2} would enjoy.`;
  }
});

elements.copySummary.addEventListener("click", copySummary);
elements.printPage.addEventListener("click", () => window.print());
elements.resetWeek.addEventListener("click", () => {
  if (!window.confirm("Clear this week's names, picks, and parent choice?")) return;
  if (speechSupported()) window.speechSynthesis.cancel();
  speakingMealId = null;
  state = structuredClone(defaultState);
  localStorage.removeItem(STORAGE_KEY);
  render();
});

window.addEventListener("pagehide", () => {
  if (speechSupported()) window.speechSynthesis.cancel();
});

cleanupLunchServiceWorker();
render();
