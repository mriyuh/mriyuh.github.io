// === Load Includes Dynamically ===
function loadInclude(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === "header-placeholder") highlightActiveNav();
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

// === Highlight Active Nav Link ===
function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-link-with-ornament").forEach(wrapper => {
    const anchor = wrapper.querySelector("a");
    const href = anchor.getAttribute("href");
    if (
      path === href ||
      (href.includes("/marketplace") && path.startsWith("/marketplace/"))
    ) {
      wrapper.classList.add("active");
    }
  });
}

// === Init Everything Once DOM is Ready ===
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Inject and load header
  const headerDiv = document.createElement("div");
  headerDiv.id = "header-placeholder";
  body.insertBefore(headerDiv, body.firstChild);
  loadInclude("header-placeholder", "/header.html");

  // Inject and load user menu
  const userMenuDiv = document.createElement("div");
  userMenuDiv.id = "user-menu-placeholder";
  headerDiv.insertAdjacentElement("afterend", userMenuDiv);
  loadInclude("user-menu-placeholder", "/user/user-menu.html");

  // Inject and load footer
  const footerDiv = document.createElement("div");
  footerDiv.id = "footer-placeholder";
  body.appendChild(footerDiv);
  loadInclude("footer-placeholder", "/footer.html");

  // === Drop Counter Logic ===
  const fill = document.getElementById("drop-fill");
  const count = document.getElementById("drop-count");
  let remaining = 1000;
  const max = 1000;

  function updateCounter() {
    if (count) count.textContent = remaining;
    if (fill) fill.style.width = (remaining / max * 100) + "%";
  }

  if (count && fill) {
    updateCounter();
    setInterval(() => {
      if (remaining > 0) {
        remaining--;
        updateCounter();
      }
    }, 15000);
  }

  // === Latest YouTube Video Info ===
  const container = document.getElementById("latest-video-link");
  if (container) {
    const videoUrl = container.dataset.url;
    const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = match ? match[1] : null;

    if (videoId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(res => res.json())
        .then(data => {
          document.getElementById("latest-video-thumb").src = data.thumbnail_url;
          document.getElementById("latest-video-title").textContent = data.title;
          document.getElementById("latest-video-date").textContent = "Click to watch →";
          container.href = videoUrl;
          document.getElementById("latest-video-button").href = videoUrl;
        })
        .catch(err => console.error("Video fetch error:", err));
    }
  }

  // === Slideshow Logic ===
  let currentSlide = 0;
  const slides = document.querySelectorAll(".gallery-slide");

  function changeSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  window.changeSlide = changeSlide;
});

// === User Menu Toggle ===
function toggleUserMenu() {
  const menu = document.querySelector(".user-menu");
  if (menu) {
    menu.classList.toggle("open");
  }
}
