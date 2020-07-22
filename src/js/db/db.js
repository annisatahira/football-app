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

const getAll = () => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        console.log(teams);
        resolve(teams);
      });
  });
};

const getById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
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

export { saveTeamForLater, deleteSavedTeam, getAll, getById };
