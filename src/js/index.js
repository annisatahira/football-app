import "../components/app-nav.js";
import "../components/items/competition.js";
import "../js/idb.js";
import "../js/db/db.js";
import { requestPermission } from "./notification.js";

import main from "./views/view.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
  console.log("yippir");
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

document.addEventListener("DOMContentLoaded", main);
