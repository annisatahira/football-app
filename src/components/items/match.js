const matchItem = (data) => {
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
            <td class="team"><a href="./team.html?id=${competitions.awayTeam.id}">
            ${competitions.awayTeam.name}
          </a></td>
          </tr>
              `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("data-matches").innerHTML = matchesHTML;
};

export default matchItem;
