import { replaceNoImage } from "../../js/api.js";

const teamItem = (data) => {
  let teamHTML = "";

  teamHTML += `
          <div id="team-info" class="row">
          <div class="col s12 m4 l4">
            <div class="card z-depth-3">
              <div class="card-image">
                <img src=${replaceNoImage(data.crestUrl)} />
              </div>
            </div>
          </div>
          <div class="col s12 m8 l8">
            <div class="card team-detail z-depth-3">
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
                  <div class="card player-item z-depth-3">
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
};

const savedTeam = (teams) => {
  let teamsHTML = "";
  teams.forEach(function (team) {
    teamsHTML += `
      <div class="savedTeam col s12 m4 l3">
        <div class="card">
        <a href="./team.html?id=${team.id}&saved=true">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${replaceNoImage(team.crestUrl)}" alt=${team.name} />
          </div>
        </a>
        <div class="card-content">
          <span class="card-title truncate">${team.name}</span>
        </div>
      </div>
      </div>  
                `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #body-content
  document.getElementById("teams").innerHTML = teamsHTML;
};

const noTeam = () => {
  let contentHTML = `
    <div class="container-image">
    <div class="no-team">
      <img src="src/images/no-team.png" />
    </div>
  </div>  
                  `;

  // Sisipkan komponen card ke dalam elemen dengan id #body-content

  document.getElementById("no-image").innerHTML = contentHTML;
};

export { teamItem, savedTeam, noTeam };
