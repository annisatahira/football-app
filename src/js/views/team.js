import "../idb.js";
import "../db/db.js";
import { getTeamId, getSavedTeamById, getDeletedTeamId } from "../api.js";
import { saveTeamForLater, deleteSavedTeam } from "../db/db.js";

document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");

  const btnSave = document.getElementById("save");
  const btnDelete = document.getElementById("delete");
  btnDelete.style.display = "none";

  let itemTeam;

  if (isFromSaved) {
    // Hide fab jika dimuat dari indexed db
    btnSave.style.display = "none";
    btnDelete.style.display = "block";

    // ambil team lalu tampilkan
    getSavedTeamById();

    if (btnDelete.onclick) {
      console.log("hi");
    }
  } else {
    itemTeam = getTeamId();
  }

  btnSave.onclick = function () {
    console.log("Tombol FAB di klik.");
    itemTeam.then(function (team) {
      saveTeamForLater(team);
    });
  };

  btnDelete.onclick = function () {
    console.log("Tombol FAB Delete di klik.");
    getDeletedTeamId();
    btnSave.style.display = "block";
    btnDelete.style.display = "none";
    // itemTeam.then(function (team) {
    //   deleteSavedTeam(team);
    // });
  };
});
