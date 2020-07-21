class Competition extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    
    <div id="league-info" class="row">
    </div>

    <div class="leagues-data row">
      <div class="col s12 m12 l12">
        <ul class="tabs tabs-fixed-width">
        <li class="tab col s6 l6 m6">
            <a class="active" href="#standings">Standings</a>
          </li>
          <li class="tab col s6 l6 m6">
            <a class="active" href="#all-match">All Match</a>
          </li>
        </ul>
      </div>
      <div id="standings" class="col s12 m12 l12">
        <div class="row">
          <div class="col s12 m12 l12">
            <div class="card darken-1">
              <table id="load-standings">
                <thead class="black-text">
                  <tr >
                    <th>Position</th>
                    <th colspan="2">Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                  </tr>
                  <tr>
                    <th colspan="7" class="left-th">Click Image or Name to See Team Detail</th>
                  </tr>
                </thead>
                <tbody id="data-standings" class="soft-black">
                </tbody>
              </table>

            </div>
          </div>
        </div>
        
      </div>
      
      <div id="all-match" class="col s12 m12 l12 tab-data">
        <div class="row">
          <div class="col s12 m12 l12">
            <div class="card darken-1">
              <table id="load-match">
                <thead>
                  <tr class="black-text">
                    <th>Home</th>
                    <th colspan="3">Match</th>
                    <th>Away</th>
                  </tr>
                </thead>
                <tbody id="data-matches" class="soft-black"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div id="loading">
      <img id="loading-image" src="src/images/loader.gif" alt="Loading..." />
    </div>
  </div>
  `;
  }
}

customElements.define("competition-app", Competition);
