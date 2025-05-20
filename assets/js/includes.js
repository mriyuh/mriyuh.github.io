// === Load Header and Footer ===
function loadInclude(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;

      // If this is the header, wait until it's loaded before applying active highlight
      if (id === "header-placeholder") {
        highlightActiveNav();
      }
    });
}

// === Highlight Active Nav Link ===
function highlightActiveNav() {
  const path = window.location.pathname;

  document.querySelectorAll(".header-nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (
      path === href || 
      (href.includes("/marketplace") && path.startsWith("/marketplace/"))
    ) {
      link.classList.add("active");
    }
  });
}

// === Run on Page Load ===
document.addEventListener("DOMContentLoaded", () => {
  loadInclude("header-placeholder", "/header.html");
  loadInclude("footer-placeholder", "/footer.html");
});

let remaining = 1000;
const counterEl = document.getElementById('drop-count');

const dropInterval = setInterval(() => {
  if (remaining > 0) {
    remaining--;
    counterEl.textContent = remaining;
  } else {
    clearInterval(dropInterval);
  }
}, 15000); // drops every 15 seconds (adjust as needed)

