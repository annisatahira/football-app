import leagues from "../data/leagues.js";
import "../components/items/match-item.js";

const base_url = "https://api.football-data.org/v2/";

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
    fetch(`${base_url}competitions/${id}`, {
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
    fetch(`${base_url}competitions/${id}/standings`, {
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
              <td class="team">${data.team.name}</td>
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
    fetch(`${base_url}competitions/${id}/matches`, {
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
            <td class="team">${competitions.homeTeam.name}</td>
            <td class="score">${competitions.score.fullTime.homeTeam}</td>
            <td class="score">-</td>
            <td class="score">${competitions.score.fullTime.awayTeam}</td>
            <td class="team">${competitions.awayTeam.name}</td>
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
    fetch(`${base_url}competitions/2016`, {
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
    fetch(`${base_url}competitions/2016/matches`, {
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
            <td class="team">
              <a href="./team.html?id=${competitions.homeTeam.id}">
                ${competitions.homeTeam.name}
              </a>
            </td>
            <td class="score">${competitions.score.fullTime.homeTeam}</td>
            <td class="score">-</td>
            <td class="score">${competitions.score.fullTime.awayTeam}</td>
            <td class="team">${competitions.awayTeam.name}</td>
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
const getStandingIdStart = () => {
  console.log();
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}competitions/2016/standings`, {
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

// Get Detail Team
const getTeamId = () => {
  console.log();
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    console.log(idParam);
    fetch(`${base_url}teams/${idParam}`, {
      headers: {
        "X-Auth-Token": "c197ffb8ed1844c38a962dd52dea74be",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        let teamHTML = "";

        teamHTML += `
          <div id="team-info" class="row">
          <div class="col s12 m4 l4">
            <div class="card z-depth-3">
              <div class="card-image">
                <img src=${data.crestUrl} />
              </div>
            </div>
          </div>
          <div class="col s12 m8 l8">
            <div class="card z-depth-3">
              <div class="card-content black-text">
                <span class="card-title">${data.name}</span>
                <table>
                  <tr>
                    <th class="left">Addres</th>
                    <td>${data.address}</td>
                  </tr>
                  <tr>
                    <th class="left">Email</th>
                    <td>${data.email}</td>
                  </tr>
                  <tr>
                    <th class="left">Venue</th>
                    <td>${data.venue}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id="team-squad">
            <h1>Meet The Squad</h1>
            <div class="row">`;
        data.squad.forEach(function (player) {
          teamHTML += `
              <div class="col s12 m6 l6 xl4">
                  <div class="card z-depth-3">
                    <div class="card-content center">
                      <span class="card-title grey-text text-darken-4"
                        ><p>${player.name}</p></span
                      >
                      <p>${player.position}</p>
                      <a
                        class="btn-player waves-effect waves-light purple lighten-1 btn-small activator"
                        >Detail</a
                      >
                    </div>
                    <div class="card-reveal">
                      <span class="card-title black-text text-darken-4"
                        ><i class="material-icons right">close</i></span
                      >
                      <table>
                        <tr class="black-text">
                          <th class="left">Birth</th>
                          <td>${player.dateOfBirth}</td>
                        </tr>
                        <tr class="black-text">
                          <th class="left">Country of Birth</th>
                          <td>${player.countryOfBirth}</td>
                        </tr>
                        <tr class="black-text">
                          <th class="left">Nationality</th>
                          <td>${player.nationality}</td>
                        </tr>
                        <tr class="black-text">
                          <th class="left">Shirt Number</th>
                          <td>${player.shirtNumber}</td>
                        </tr>
                        <tr class="black-text">
                          <th class="left">Role</th>
                          <td>${player.role}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                `;
        });
        ` </div>
          </div>`;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("data-team").innerHTML = teamHTML;
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
  getTeamId,
};
