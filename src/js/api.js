import leagues from "../data/leagues.js";
import List from "../components/container/list.js";
import "../components/items/match-item.js";

const base_url = "https://api.football-data.org/v2/competitions/";

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
      matchEl[i].innerText = "";
    }
  }
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
    fetch(`${base_url}${id}`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log("ini yg info" + data);
        let leaguesHTML = `
          <div class="col s12 m12 l12">
          <div class="card white">
            <div class="card-content soft-black">
              <div class="row">
                <div class="col s6 m6 l6">
                  <span class="card-title">${data.name}</span>
                </div>
                <div class="col s6 m6 l6">
                  <a class="waves-effect waves-light btn purple lighten-1 right">Save</a>
                </div>
              </div>
              <table>
                <tr>
                  <th>Area</th>
                  <td>${data.area.name}</td>
                </tr>
                <tr>
                  <th>Start Date</th>
                  <td>${data.currentSeason.startDate}</td>
                </tr>
                <tr>
                  <th>End Date</th>
                  <td>${data.currentSeason.endDate}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
              `;

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("league-info").innerHTML = leaguesHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};

const getStandingId = (id) => {
  console.log(id);
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}${id}/standings`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        let standingHTML = "";
        data.standings.forEach(function (standing) {
          standingHTML += `
            <tr>
              <td>TYPE : ${standing.type}</td>
            </tr>
              `;
          standing.table.forEach(function (data) {
            standingHTML += `
            <tr>
              <td>${data.position}</td>
              <td>${data.team.name}</td>
              <td>${data.playedGames}</td>
              <td>${data.won}</td>
              <td>${data.draw}</td>
              <td>${data.lost}</td>
            </tr>
              `;
          });
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("data-standings").innerHTML = standingHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};

//melakukan req data json competition id
const getMatchesId = (id) => {
  console.log(id);
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}${id}/matches`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        let matchesHTML = "";
        data.matches.forEach(function (competitions) {
          matchesHTML += `
          <tr>
            <td>${competitions.homeTeam.name}</td>
            <td class="score">${competitions.score.fullTime.homeTeam}</td>
            <td class="score">-</td>
            <td class="score">${competitions.score.fullTime.awayTeam}</td>
            <td>${competitions.awayTeam.name}</td>
          </tr>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("data-matches").innerHTML = matchesHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};

//melakukan req data leagues info
const getLeaguesIdStart = () => {
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}/2016`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log("ini yg info" + data);
        let leaguesHTML = `
          <div class="col s12 m12 l12">
          <div class="card white">
            <div class="card-content soft-black">
              <div class="row">
                <div class="col s6 m6 l6">
                  <span class="card-title">${data.name}</span>
                </div>
                <div class="col s6 m6 l6">
                  <a class="waves-effect waves-light btn purple lighten-1 right">Save</a>
                </div>
              </div>
              <table>
                <tr>
                  <th>Area</th>
                  <td>${data.area.name}</td>
                </tr>
                <tr>
                  <th>Start Date</th>
                  <td>${data.currentSeason.startDate}</td>
                </tr>
                <tr>
                  <th>End Date</th>
                  <td>${data.currentSeason.endDate}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
              `;

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("league-info").innerHTML = leaguesHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};

//matches awal
//melakukan req data json competition match
const getMatchesIdStart = () => {
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}2016/matches`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);

        // let dataMatch = data.matches;

        // const elMatch = document.querySelector("#data-matches");
        // const matchList = new List(elMatch, "match-item", dataMatch);
        // matchList.render();
        let matchesHTML = "";
        data.matches.forEach(function (competitions) {
          matchesHTML += `
          <tr>
            <td>${competitions.homeTeam.name}</td>
            <td class="score">${competitions.score.fullTime.homeTeam}</td>
            <td class="score">-</td>
            <td class="score">${competitions.score.fullTime.awayTeam}</td>
            <td>${competitions.awayTeam.name}</td>
          </tr>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("data-matches").innerHTML = matchesHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};
const getStandingIdStart = (id) => {
  console.log(id);
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}2016/standings`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        let standingHTML = "";
        data.standings.forEach(function (standing) {
          standingHTML += `
            <tr>
              <td>TYPE : ${standing.type}</td>
            </tr>
              `;
          standing.table.forEach(function (data) {
            standingHTML += `
            <tr>
              <td>${data.position}</td>
              <td>${data.team.name}</td>
              <td>${data.playedGames}</td>
              <td>${data.won}</td>
              <td>${data.draw}</td>
              <td>${data.lost}</td>
            </tr>
              `;
          });
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("data-standings").innerHTML = standingHTML;
        resolve(data);
      })
      .then(changeCellIfEmpty)

      .catch(error);
  });
};
export {
  getLeagues,
  getLeaguesId,
  getMatchesId,
  getStandingId,
  getLeaguesIdStart,
  getMatchesIdStart,
  getStandingIdStart,
};
