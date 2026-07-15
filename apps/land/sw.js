const CACHE_NAME = "land-pets-ipad-memo-v1";
const ASSETS = [
  "./ipad.html",
  "./index.html",
  "./styles.css",
  "./ipad-memo.css",
  "./app.js",
  "./ipad-memo.js",
  "./pet-data.js",
  "./manifest.webmanifest",
  "./build/icon.ico",
  "./elizardotchi/hatch-run/final/spritesheet.webp",
  "./furawatchi/hatch-run/final/spritesheet.webp",
  "./gumax/hatch-run/final/spritesheet.webp",
  "./hebitchi/hatch-run/final/spritesheet.webp",
  "./mametchi/hatch-run/final/spritesheet.webp",
  "./meowtchi/hatch-run/final/spritesheet.webp",
  "./mimitchi/hatch-run/final/spritesheet.webp",
  "./molmotchi/hatch-run/final/spritesheet.webp",
  "./pochi/hatch-run/final/spritesheet.webp",
  "./potsunentchi/hatch-run/final/spritesheet.webp",
  "./ratchi/hatch-run/final/spritesheet.webp",
  "./reopacchi/hatch-run/final/spritesheet.webp",
  "./sebiretchi/hatch-run/final/spritesheet.webp",
  "./shigemi-san/hatch-run/final/spritesheet.webp",
  "./shiipucchi/hatch-run/final/spritesheet.webp",
  "./tustustchi/hatch-run/final/spritesheet.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
    )
  );
});
