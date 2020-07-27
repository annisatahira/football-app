import * as idb from "./idb.js";

const dbPromised = idb.open("football-app", 1, function (upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

const saveTeamForLater = (team) => {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
};

const deleteSavedTeam = (id) => {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log("delete ini " + id);
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      console.log("item dihapus");
    });
};

const checkTeamId = (idParam) => {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      return store.openCursor();
    })
    .then(function checkTeam(cursor) {
      if (!cursor) {
        return;
      }
      console.log("Posisi cursos: ", cursor.key);
      for (let id in cursor.value) {
        console.log(cursor.value[id]);
      }
      if (cursor.key === parseInt(idParam)) {
        document.getElementById("delete").style.display = "block";
        document.getElementById("save").style.display = "none";
      }
      return cursor.continue().then(checkTeam);
    })
    .then(function () {
      console.log("Tidak ada data lain.");
    });
};

const getAll = () => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
};

const getById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        console.log("ini id dari function getbyid " + id);
        return store.get(parseInt(id));
      })
      .then(function (team) {
        console.log(team);
        resolve(team);
        reject(team);
      });
  });
};

export { saveTeamForLater, deleteSavedTeam, getAll, getById, checkTeamId };
