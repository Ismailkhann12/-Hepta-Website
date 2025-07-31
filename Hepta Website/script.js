// Hamburger menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navBg = document.getElementById("navBg");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open");
  navBg.classList.toggle("open");
});
// Close menu on link click (mobile UX)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    navBg.classList.remove("open");
  });
});
// Close menu if nav-bg is clicked
if (navBg) {
  navBg.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    navBg.classList.remove("open");
  });
}
// Close menu if close-nav is clicked
const closeNav = document.getElementById("closeNav");
if (closeNav) {
  closeNav.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    if (navBg) navBg.classList.remove("open");
  });
}
// Prevent newsletter form submission
const subscribeForm = document.querySelector(".subscribe-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    subscribeForm.querySelector('input[type="email"]').value = "";
    alert("Thank you for subscribing!");
  });
}
// Fade-in hero text on load
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = 0;
    setTimeout(() => {
      heroContent.style.transition = "opacity 1.2s cubic-bezier(.77,0,.18,1)";
      heroContent.style.opacity = 1;
    }, 100);
  }
});
// --- Video Modal Logic ---
const videoModal = document.getElementById("videoModal");
const videoIframeContainer = document.getElementById("videoIframeContainer");
const closeVideoModal = document.getElementById("closeVideoModal");
const playBtn = document.querySelector(".play-btn");
const playBtnText = document.querySelector(".play-btn-text");

const videoIds = [
  "dQw4w9WgXcQ",
  "3JZ_D3ELwOQ",
  "L_jWHffIx5E",
  "kXYiU_JCYtU",
  "9bZkp7q19f0",
];

// --- Hepta Theme Slider Functionality ---
const slides = document.querySelectorAll(".slider-image");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 2000);
}

// --- Welcome Section Video Modal ---
document.addEventListener("DOMContentLoaded", function () {
  const playBtn = document.getElementById("playVideoBtn");
  const videoModal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeVideoModal");
  const videoContainer = document.getElementById("videoIframeContainer");

  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/ysz5S6PUM-U",
  ];

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      const random = Math.floor(Math.random() * videos.length);
      videoContainer.innerHTML = `
          <iframe width="560" height="315" src="${videos[random]}?autoplay=1" 
          title="Video" frameborder="0" allow="autoplay; encrypted-media" 
          allowfullscreen></iframe>`;
      videoModal.style.display = "flex";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      videoModal.style.display = "none";
      videoContainer.innerHTML = "";
    });
  }

  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      videoContainer.innerHTML = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoModal.style.display === "flex") {
      videoModal.style.display = "none";
      videoContainer.innerHTML = "";
    }
  });
});

// --- Fade-up Animation on Scroll for Welcome Section ---
(function () {
  function onEntry(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    var fadeUps = document.querySelectorAll(".fade-up");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(onEntry, {
        threshold: 0.15,
      });
      fadeUps.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback for old browsers
      fadeUps.forEach(function (el) {
        el.classList.add("animated");
      });
    }
  });
})();
// Scroll to hero section on card click
document
  .querySelectorAll(".destination-card[data-scroll-hero]")
  .forEach((card) => {
    card.addEventListener("click", function () {
      document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
    });
  });

// Animate cards on scroll/refresh
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// Animate destination, blog, and testimonial cards
[
  ...document.querySelectorAll(
    ".destination-card.fade-up, .blog-card.fade-up, .testimonial-card.fade-up"
  ),
].forEach((card) => {
  observer.observe(card);
});
