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

// Register service worker
const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("service-worker.js")
    .then(function (registration) {
      console.log("Registrasi service worker berhasil.");
      return registration;
    })
    .catch(function (err) {
      console.error("Registrasi service worker gagal.", err);
    });
};

// Periksa service worker
if (!("serviceWorker" in navigator)) {
  runtime.register();
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}

document.addEventListener("DOMContentLoaded", main);
