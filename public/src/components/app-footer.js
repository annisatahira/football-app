class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
        <img src="./src/images/logo-app.png" alt="logo-xoccer"/>
          <p class="grey-text text-lighten-4">
            Provide You Latest Match Your Favorite Team
          </p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h6 class="white-text">Inspiration</h6>
          <ul>
            <li>Canva</li>
          </ul>
          
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        © 2020 Submission PWA
        <a class="grey-text text-lighten-4 right" href="#!">Annisa Tahira</a>
      </div>
    </div>
  </footer>`;
  }
}

customElements.define("app-footer", Footer);
