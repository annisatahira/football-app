class Nav extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav role="navigation">
      <div class="nav-wrapper container">
        <span class="brand-logo" id="logo-container"
          ><img src="./src/images/logo.png"
        /></span>
        <a href="#" class="sidenav-trigger" data-target="nav-mobile">☰</a>
  
        <ul class="topnav right hide-on-med-and-down"></ul>
        <ul class="sidenav" id="nav-mobile"></ul>
      </div>
    </nav>`;
  }
}

customElements.define("app-nav", Nav);
