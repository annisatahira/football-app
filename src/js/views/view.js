import { getMatches, getLeagues } from "../api.js";

const main = () => {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "src/components/nav-menu.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";

  const loadPage = (page) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector("#body-content");

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;

          if (page === "home") {
            getLeagues();
            const elems = document.querySelectorAll(".carousel");
            const option = {
              dist: 0,
              padding: 0,
              indicators: true,
              numVisible: 3,
            };
            M.Carousel.init(elems, option);
            const elem = document.querySelectorAll(".tabs");
            const options = {
              swipeable: true,
              indicators: false,
            };
            M.Tabs.init(elem, options);

            getMatches();
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "src/components/pages/" + page + ".html", true);
    xhttp.send();
  };

  loadPage(page);
};

export default main();
