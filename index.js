import "regenerator-runtime";
import "./src/css/style.css";
import "./src/css/materialize.min.css";
import "./src/js/views/materialize.min.js";

import "./src/components/app-nav.js";
import "./src/components/app-footer.js";
import "./src/components/items/competition.js";

import "./src/js/db/db.js";
import { requestPermission } from "./src/js/notification.js";

import main from "./src/js/views/nav.js";

import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ("serviceWorker" in navigator) {
  runtime.register();
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
