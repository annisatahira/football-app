import leagues from "../data/leagues.js";
import $ from "jquery";
import { getAll, getById, deleteSavedTeam, checkTeamId } from "./db/db.js";
import standingItem from "../components/items/standings.js";
import matchItem from "../components/items/match.js";
import leagueItem from "../components/items/league.js";
import { teamItem, savedTeam, noTeam } from "../components/items/team.js";

const base_url = "https://api.football-data.org/v2/";
const API_KEY = "c197ffb8ed1844c38a962dd52dea74be";

const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  });
};

//blok kode yg dipanggil jika berhasil
const status = (res) => {
  if (res.status !== 200) {
    console.log(`Gagal ${res.status}`);
    //panggil method reject karena error
    return Promise.reject(new Error(res.statusText));
  } else {
    //jika berhasil ubah menjadi objeck promise
    console.log(`Berhasil ${res.status}`);
    return Promise.resolve(res);
  }
};

//parsing json menjadi array
const json = (res) => {
  return res.json();
};

//error
const error = (err) => {
  console.log(err);
};

const changeCellIfEmpty = () => {
  const matchEl = document.querySelectorAll("td");

  for (let i = 0; i < matchEl.length; i++) {
    if (matchEl[i].innerText === "null") {
      matchEl[i].innerText = "-";
    }
  }
};

const replaceNoImage = (image) => {
  if (image === "null" || image === "") {
    return (image = "src/images/no-image.svg");
  } else {
    return image;
  }
};

const showNav = () => {
  document.getElementById("nav").style.display = "block";
};

const showSpinner = () => {
  return Promise.resolve(
    (document.getElementById("loading").style.display = "block")
  );
};

const hideSpinner = () => {
  return Promise.resolve(
    (document.getElementById("loading").style.display = "none")
  );
};

const getLeagues = () => {
  let leaguesHTML = "";
  leagues.forEach(function (league) {
    leaguesHTML += `
    <a class="carousel-item league-item"> 
    <h4>${league.id}</h4>
      <div class="liga-img center">
        <img src=${league.image} alt=${league.name} />
      </div>
      <h6 class="league white-text center">${league.name}</h6>
    </a>
            `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("data-leagues").innerHTML = leaguesHTML;
};

//melakukan req data leagues info
const getLeaguesId = (id) => {
  return new Promise(function (resolve, reject) {
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}`)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              leagueItem(data);
              resolve(data);
            });
          }
        })
        // .then(hideSpinner)
        .then(changeCellIfEmpty);
    }
    // End of URL FETCH

    fetchApi(`${base_url}competitions/${id}`)
      .then(status)
      .then(json)
      .then(function (data) {
        leagueItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      // .then(hideSpinner)

      .catch(error);
  });
};

const getStandingId = (id) => {
  return new Promise(function (resolve, reject) {
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}/standings`)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              standingItem(data);
              resolve(data);
            });
          }
        })
        // .then(hideSpinner)
        .then(changeCellIfEmpty);
    }
    // End of URL FETCH

    fetchApi(`${base_url}competitions/${id}/standings`)
      .then(status)
      .then(json)
      .then(function (data) {
        standingItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      // .then(hideSpinner)
      .catch(error);
  });
};

//melakukan req data json competition id
const getMatchesId = (id) => {
  return new Promise(function (resolve, reject) {
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}/matches`)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              matchItem(data);
              resolve(data);
            });
          }
        })
        // .then(hideSpinner)
        .then(changeCellIfEmpty);
    }
    // End of URL FETCH

    fetchApi(`${base_url}competitions/${id}/matches`)
      .then(status)
      .then(json)
      .then(function (data) {
        matchItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      // .then(hideSpinner)
      .catch(error);
  });
};

//melakukan req data leagues info
const getLeaguesIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            leagueItem(data);
          });
        }
      })
      // .then(hideSpinner)
      .then(changeCellIfEmpty);
  }
  // End of URL FETCH

  fetchApi(`${base_url}competitions/2014`)
    .then(status)
    .then(json)
    .then(function (data) {
      leagueItem(data);
    })
    .then(changeCellIfEmpty)
    // .then(hideSpinner)
    .catch(error);
};

//matches awal

const getMatchesIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014/matches`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            matchItem(data);
          });
        }
      })
      // .then(hideSpinner)
      .then(changeCellIfEmpty);
  }
  // End of URL FETCH

  fetchApi(`${base_url}competitions/2014/matches`)
    .then(status)
    .then(json)
    .then(function (data) {
      matchItem(data);
    })
    .then(changeCellIfEmpty)
    // .then(hideSpinner)
    .catch(error);
};

const getStandingIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014/standings`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            standingItem(data);
          });
        }
      })
      // .then(hideSpinner)
      .then(changeCellIfEmpty);
  }
  // End of URL FETCH

  fetchApi(`${base_url}competitions/2014/standings`)
    .then(status)
    .then(json)
    .then(function (data) {
      standingItem(data);
    })
    .then(changeCellIfEmpty)
    // .then(hideSpinner)
    .catch(error);
};

// Get Detail Team
const getTeamId = () => {
  showNav();
  showSpinner();
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}teams/${idParam}`)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              teamItem(data);
              resolve(data);
            });
          }
        })
        .then(changeCellIfEmpty)
        .then(checkTeamId(idParam));
      // .then(hideSpinner);
    }
    // End of URL FETCH

    fetchApi(`${base_url}teams/${idParam}`)
      .then(status)
      .then(json)
      .then(function (data) {
        teamItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner)

      .catch(error);
  });
};

const getCompetitionById = (id) => {
  Promise.all([getLeaguesId(id), getStandingId(id), getMatchesId(id)]).then(
    function () {
      document.getElementById("loading").style.display = "none";
    }
  );
};

const getSavedTeams = () => {
  getAll()
    .then(function (teams) {
      // Menyusun komponen card artikel secara dinamis
      savedTeam(teams);
    })
    .then(function () {
      if (document.getElementById("teams").innerText === "") {
        noTeam();
      } else {
        document.getElementById("no-image").style.display = "none";
      }
    });
};

const getSavedTeamById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  showNav();
  showSpinner();
  getById(idParam).then(function (data) {
    teamItem(data);
  });
  // .then(hideSpinner);
};

const getDeletedTeamId = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  deleteSavedTeam(idParam);
  M.toast({ html: "Team Deleted" });
  $(location).attr("href", "index.html#saved");
};

export {
  replaceNoImage,
  getLeagues,
  getLeaguesId,
  getMatchesId,
  getStandingId,
  getLeaguesIdStart,
  getMatchesIdStart,
  getStandingIdStart,
  getTeamId,
  getSavedTeams,
  getSavedTeamById,
  getDeletedTeamId,
  getCompetitionById,
};
