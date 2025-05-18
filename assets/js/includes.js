// === header and footer ===
function loadInclude(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadInclude("header-placeholder", "/header.html");
  loadInclude("footer-placeholder", "/footer.html");
});

// === Active page highlight ===

document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer
  fetch("/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;

      // === After header is loaded ===
      highlightActiveNav();
    });

  fetch("/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-placeholder").innerHTML = html;
    });

  // Function to highlight current nav link
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".header-nav a");

    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }
});
