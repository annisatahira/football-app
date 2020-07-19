import leagues from "../data/leagues.js";

const base_url = "https://api.football-data.org/v2/competitions/2001/";

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
    <a class="carousel-item" href="#one!"> 
      <div class="liga-img center">
        <img src=${league.image} />
      </div>
      <h6 class="league white-text center">${league.name}</h6>
    </a>
            `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("data-leagues").innerHTML = leaguesHTML;
};

//melakukan req data json competition match
const getMatches = () => {
  fetch(`${base_url}matches`, {
    mode: "cors",
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
    })
    .then(changeCellIfEmpty)

    .catch(error);
};

export { getLeagues, getMatches };
