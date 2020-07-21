import "../idb.js";
import "../db/db.js";
import { getTeamId } from "../api.js";
import { saveTeamForLater } from "../db/db.js";

document.addEventListener("DOMContentLoaded", function () {
  let itemTeam = getTeamId();
  const saveTeam = document.getElementById("save");
  saveTeam.onclick = function () {
    console.log("Tombol FAB di klik.");
    itemTeam.then(function (team) {
      saveTeamForLater(team);
    });
  };

  // const saveTeam = document.getElementById("save");
  // saveTeam.onclick = function () {
  //   console.log("Tombol FAB di klik.");
  // };
});
