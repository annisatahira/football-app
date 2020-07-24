const CACHE_NAME = "football-app-v1";
let urlsToCache = [
  "/",
  "/index.html",
  "/team.html",

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
  // "/src/images/icons/icon-36.png",
  // "/src/images/icons/icon-48.png",
  // "/src/images/icons/icon-72.png",
  // "/src/images/icons/icon-96.png",
  // "/src/images/icons/icon-144.png",
  // "/src/images/icons/icon-192.png",
  // "/src/images/icons/icon-512.png",
  "/src/images/logo-app.png",
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

// // Notification
// self.addEventListener("notificationclick", function (event) {
//   event.notification.close();
//   if (!event.action) {
//     // Penguna menyentuh area notifikasi diluar action
//     console.log("Notification Click.");
//     return;
//   }
//   switch (event.action) {
//     case "yes-choice":
//       console.log("Pengguna memilih action yes.");
//       // buka tab baru
//       clients.openWindow("https://google.com");
//       break;
//     case "no-choice":
//       console.log("Pengguna memilih action no");
//       event.notification.close();
//       break;
//     default:
//       console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
//       break;
//   }
// });

// // Push Message
// self.addEventListener("push", function (event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = "Push message no payload";
//   }
//   var options = {
//     body: body,
//     icon: "img/notification.png",
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1,
//     },
//   };
//   event.waitUntil(
//     self.registration.showNotification("Push Notification", options)
//   );
// });
