// === Load Header and Footer ===
function loadInclude(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;

      if (id === "header-placeholder") {
        highlightActiveNav();
      }
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

document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer
  loadInclude("header-placeholder", "/header.html");
  loadInclude("footer-placeholder", "/footer.html");

  // === Drop Counter (if present) ===
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

  // === Latest YouTube Video (if present) ===
  const container = document.getElementById("latest-video-link");
  if (container) {
    const videoUrl = container.dataset.url;
    const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = match ? match[1] : null;

    if (videoId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(res => res.json())
        .then(data => {
          document.getElementById("latest-video-thumb").src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          document.getElementById("latest-video-title").textContent = data.title;
          document.getElementById("latest-video-date").textContent = "Click to watch →";
          container.href = videoUrl;
        })
        .catch(err => console.error("Video fetch error:", err));
    }
  }

  // === Slideshow ===
  let currentSlide = 0;
  const slides = document.querySelectorAll(".gallery-slide");

  function changeSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  window.changeSlide = changeSlide; // expose to global for button onclick
});
