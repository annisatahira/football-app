class matchItem extends HTMLElement {
  set item(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.innerHTML = `
          <tr>
            <td>${this._data.homeTeam.name}</td>
            <td class="score">${this._data.score.fullTime.homeTeam}</td>
            <td class="score">-</td>
            <td class="score">${this._data.score.fullTime.awayTeam}</td>
            <td>${this._data.awayTeam.name}</td>
          </tr>`;
  }
}

customElements.define("match-item", matchItem);
