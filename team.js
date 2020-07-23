import "regenerator-runtime";
import "./src/css/style.css";
import "./src/css/materialize.min.css";
import "./src/js/views/materialize.min.js";
import "./src/js/db/db.js";
import { getTeamId, getSavedTeamById, getDeletedTeamId } from "./src/js/api.js";
import { saveTeamForLater } from "./src/js/db/db.js";

document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");

  const btnSave = document.getElementById("save");
  const btnDelete = document.getElementById("delete");
  btnDelete.style.display = "none";
  btnSave.style.display = "block";

  let itemTeam;

  if (isFromSaved) {
    // Hide fab jika dimuat dari indexed db
    btnSave.style.display = "none";
    btnDelete.style.display = "block";

    // ambil team lalu tampilkan
    getSavedTeamById();
  } else {
    itemTeam = getTeamId();
  }

  btnSave.onclick = function () {
    btnDelete.style.display = "block";
    btnSave.style.display = "none";

    itemTeam.then(function (team) {
      saveTeamForLater(team);
    });
  };

  btnDelete.onclick = function () {
    console.log("Tombol FAB Delete di klik.");

    btnDelete.style.display = "none";
    getDeletedTeamId();
  };
});
