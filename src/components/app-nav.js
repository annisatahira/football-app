class NavApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav role="navigation">
      <div class="nav-wrapper container">
        <span class="brand-logo">
          <img src="./src/images/logo-app.png" alt="logo-xoccer" />
        </span>
        <a href="#" class="sidenav-trigger white-text" data-target="nav-mobile">☰</a>
  
        <ul class="topnav right hide-on-med-and-down"></ul>
        <ul class="sidenav" id="nav-mobile"></ul>
      </div>
    </nav>`;
  }
}

customElements.define("app-nav", NavApp);
