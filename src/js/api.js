import leagues from "../data/leagues.js";
import $ from "jquery";
import { getAll, getById, deleteSavedTeam, checkTeamId } from "./db/db.js";
import standingItem from "../components/items/standings.js";
import matchItem from "../components/items/match.js";
import leagueItem from "../components/items/league.js";
import { teamItem, savedTeam } from "../components/items/team.js";

const base_url = "https://api.football-data.org/v2/";
const token = "c197ffb8ed1844c38a962dd52dea74be";

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
  document.getElementById("loading").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("loading").style.display = "none";
};

const getLeagues = () => {
  console.log(leagues);
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
    showSpinner();
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}`, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              leagueItem(data);
              resolve(data);
            });
          }
        })
        .then(changeCellIfEmpty)
        .then(hideSpinner);
    }
    // End of URL FETCH

    fetch(`${base_url}competitions/${id}`, {
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        leagueItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner)

      .catch(error);
  });
};

const getStandingId = (id) => {
  showSpinner();
  return new Promise(function (resolve, reject) {
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}/standings`, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              standingItem(data);
              resolve(data);
            });
          }
        })
        .then(changeCellIfEmpty)
        .then(hideSpinner);
    }
    // End of URL FETCH

    fetch(`${base_url}competitions/${id}/standings`, {
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        standingItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner)

      .catch(error);
  });
};

//melakukan req data json competition id
const getMatchesId = (id) => {
  showSpinner();
  return new Promise(function (resolve, reject) {
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}competitions/${id}/matches`, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              console.log("ini data cache standings" + data);
              matchItem(data);
              resolve(data);
            });
          }
        })
        .then(changeCellIfEmpty)
        .then(hideSpinner);
    }
    // End of URL FETCH

    fetch(`${base_url}competitions/${id}/matches`, {
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        matchItem(data);
        resolve(data);
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner)

      .catch(error);
  });
};

//melakukan req data leagues info
const getLeaguesIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014`, {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log("ini yg icache nfo" + data);
            leagueItem(data);
          });
        }
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner);
  }
  // End of URL FETCH

  fetch(`${base_url}competitions/2014`, {
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      leagueItem(data);
    })
    .then(changeCellIfEmpty)
    .catch(error);
};

//matches awal

const getMatchesIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014/matches`, {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            matchItem(data);
          });
        }
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner);
  }
  // End of URL FETCH

  fetch(`${base_url}competitions/2014/matches`, {
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      matchItem(data);
    })
    .then(changeCellIfEmpty)

    .catch(error);
};

const getStandingIdStart = () => {
  // Match URL FETCH
  if ("caches" in window) {
    caches
      .match(`${base_url}competitions/2014/standings`, {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            standingItem(data);
          });
        }
      })
      .then(changeCellIfEmpty)
      .then(hideSpinner);
  }
  // End of URL FETCH

  showSpinner();
  fetch(`${base_url}competitions/2014/standings`, {
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      standingItem(data);
    })
    .then(changeCellIfEmpty)
    .then(hideSpinner)

    .catch(error);
};

// Get Detail Team
const getTeamId = () => {
  // console.log();
  showNav();
  showSpinner();
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    // Match URL FETCH
    if ("caches" in window) {
      caches
        .match(`${base_url}teams/${idParam}`, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              teamItem(data);
              resolve(data);
            });
          }
        })
        .then(changeCellIfEmpty)
        .then(checkTeamId(idParam))
        .then(hideSpinner);
    }
    // End of URL FETCH

    console.log(idParam);
    fetch(`${base_url}teams/${idParam}`, {
      headers: {
        "X-Auth-Token": token,
      },
    })
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

const getSavedTeams = () => {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    savedTeam(teams);
  });
};

const getSavedTeamById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  showNav();
  showSpinner();
  getById(idParam)
    .then(function (data) {
      teamItem(data);
    })
    .then(hideSpinner);
};

const getDeletedTeamId = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  console.log(idParam);
  deleteSavedTeam(idParam);
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
};
