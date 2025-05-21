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

// === Load Latest YouTube Video Preview ===
document.addEventListener("DOMContentLoaded", () => {
  const videoLink = document.getElementById('latest-video-link');
  const videoThumb = document.getElementById('latest-video-thumb');
  const videoTitle = document.getElementById('latest-video-title');
  const videoDate  = document.getElementById('latest-video-date');

  if (videoLink && videoThumb && videoTitle && videoDate) {
    fetch('/site/data/latest-video.json')
      .then(res => res.json())
      .then(data => {
        const videoUrl = `https://www.youtube.com/watch?v=${data.videoId}`;
        const publishDate = new Date(data.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });

        videoLink.href = videoUrl;
        videoThumb.src = data.thumbnail;
        videoTitle.textContent = data.title;
        videoDate.textContent = `Uploaded on ${publishDate}`;
      })
      .catch(err => console.error("Error loading latest video:", err));
  }
});


