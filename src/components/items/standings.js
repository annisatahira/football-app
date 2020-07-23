import { replaceNoImage } from "../../js/api.js";

const standingItem = (data) => {
  let standingHTML = "";
  data.standings.forEach(function (standing) {
    standingHTML += `
        <tr>
          <td>TYPE : ${standing.type}</td>
        </tr>`;
    standing.table.forEach(function (data) {
      standingHTML += `
            <tr>
              <td>${data.position}</td>
              <td>
                <a href="./team.html?id=${data.team.id}">
                  <img src=${replaceNoImage(data.team.crestUrl)} alt=${
        data.team.name
      }/>
                </a>
              </td>
              <td>
                <a href="./team.html?id=${data.team.id}">
                  ${data.team.name}
                </a>
              </td>
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
};

export default standingItem;
