const leagueItem = (data) => {
  let leaguesHTML = `
          <div class="col s12 m12 l12">
          <div class="card white">
            <div class="card-content soft-black">
              <div class="row">
                <div class="col s6 m6 l6">
                  <span class="card-title">${data.name}</span>
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
};

export default leagueItem;
