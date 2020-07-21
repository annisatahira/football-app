const CACHE_NAME = "football-app-v1";
var urlsToCache = [
  "/",
  "/index.html",
  "/team.html",
  "/service-worker.js",
  "/src/components/nav-menu.html",
  "/src/components/app-nav.js",

  "/src/components/pages/home.html",

  "/src/components/items/competition.js",

  "/src/css/materialize.min.css",
  "/src/css/style.css",
  "/src/css/nav.css",

  "/src/css/home/header.css",
  "/src/css/home/match.css",
  "/src/css/team/team.css",

  "/src/data/leagues.js",

  "/src/fonts/leaguespartan-bold.woff",

  "/src/images/loader.gif",
  "/src/images/no-image.svg",

  "/src/js/views/view.js",
  "/src/js/views/team.js",
  "/src/js/api.js",
  "/src/js/main.js",
  "/src/js/materialize.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
