const CACHE_NAME = "football-app-v1";
let urlsToCache = [
  "/",
  "/index.html",
  "/team.html",
  "/manifest.json",

  "/service-worker.js",
  "/src/components/nav-menu.html",
  "/src/components/app-nav.js",
  "/src/components/app-footer.js",
  "/index.js",
  "/team.js",
  "/src/js/api.js",
  "/src/css/materialize.min.css",
  "/src/css/style.css",
  "/src/data/leagues.js",
  "/src/images/loader.gif",
  "/src/images/no-image.svg",
  "/src/fonts/leaguespartan-bold.woff",
  "/src/components/items/competition.js",
  "/src/components/items/league.js",
  "/src/components/items/match.js",
  "/src/components/items/standings.js",
  "/src/components/items/team.js",
  "/src/components/pages/home.html",
  "/src/components/pages/saved.html",
  "/src/css/components/home.css",
  "/src/css/components/team.css",
  "/src/css/components/nav.css",
  "/src/css/components/footer.css",
  "/src/js/db/idb.js",
  "/src/js/db/db.js",
  "/src/js/views/materialize.min.js",
  "/src/js/views/nav.js",
  "/webpack.common.js",
  "/webpack.dev.js",
  "/webpack.prod.js",
  "/src/js/notification.js",

  "/src/images/icons/Icon-36.png",
  "/src/images/icons/Icon-48.png",
  "/src/images/icons/Icon-72.png",
  "/src/images/icons/Icon-96.png",
  "/src/images/icons/Icon-144.png",
  "/src/images/icons/Icon-192.png",
  "/src/images/icons/Icon-512.png",
  "/src/images/apple-icons/apple-60.png",
  "/src/images/apple-icons/apple-76.png",
  "/src/images/apple-icons/apple-120.png",
  "/src/images/apple-icons/apple-152.png",
  "/src/images/logo-app.png",
  "/src/images/favicon.ico",
  "/src/images/icon.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  const base_url = "https://api.football-data.org/v2/";
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

self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  let options = {
    body: body,
    icon: "/src/images/icon.png",
    badge: "/src/images/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification("Xoccer App", options));
});
