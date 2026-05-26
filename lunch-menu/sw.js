const CACHE_NAME = "aisg-lunch-picker-20260525-v1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./assets/source/original-menu.jpg",
  "./assets/source/generated-meal-grid.png",
  "./assets/food/asian-mon-pork-mince-egg.png",
  "./assets/food/asian-tue-salty-chicken-egg-custard.png",
  "./assets/food/asian-wed-pork-taro-soya.png",
  "./assets/food/asian-thu-beef-brisket-curry.png",
  "./assets/food/fri-mexican-food-festival.png",
  "./assets/food/veg-fri-quesadillas.png",
  "./assets/food/veg-mon-udon-tofu.png",
  "./assets/food/veg-thu-cheese-macaroni.png",
  "./assets/food/veg-tue-frittata-cheese-toast.png",
  "./assets/food/veg-wed-bean-curd-tempura.png",
  "./assets/food/western-mon-bbq-chicken.png",
  "./assets/food/western-thu-ham-cheese-sandwich.png",
  "./assets/food/western-tue-beef-lasagna.png",
  "./assets/food/western-wed-chicken-sausage-pasta.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
