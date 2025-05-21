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

  document.querySelectorAll(".nav-link-with-ornament").forEach(wrapper => {
    const anchor = wrapper.querySelector("a");
    const href = anchor.getAttribute("href");

    if (
      path === href || 
      (href.includes("/marketplace") && path.startsWith("/marketplace/"))
    ) {
      wrapper.classList.add("active"); // ✅ add to the wrapper <div>
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

// === Check out Latest Video ===

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("latest-video-link");
  const videoUrl = container.dataset.url;

  // Extract video ID
  const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  const videoId = match ? match[1] : null;

  if (!videoId) return;

  // Use YouTube oEmbed endpoint
  fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("latest-video-thumb").src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      document.getElementById("latest-video-title").textContent = data.title;
      document.getElementById("latest-video-date").textContent = "Click to watch →";
      container.href = videoUrl;
    })
    .catch(err => console.error("Video fetch error:", err));
});

// === Home Slideshow Logic ===

let currentSlide = 0;

function changeSlide(n) {
  const slides = document.querySelectorAll('.gallery-slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}



