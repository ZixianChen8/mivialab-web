/* =========================================================
   MiviaLab — Cinematic direction
   Slow parallax, fade-in reveals, splash reveal on load.
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Splash reveal on load (mask expands from center) ---- */
  const hero = document.querySelector(".artist-container");
  if (hero) {
    // Small delay so the first paint shows the covered state, then reveals.
    window.setTimeout(function () {
      hero.classList.add("revealed");
    }, 250);
  }

  /* ---- Slow parallax on the hero background ---- */
  const heroBg = document.querySelector(".hero-bg");
  let latestScroll = 0;
  let ticking = false;

  function applyParallax() {
    if (heroBg) {
      // Move slower than scroll for a subtle, immersive drift.
      const shift = latestScroll * 0.35;
      heroBg.style.transform = "translate3d(0, " + shift + "px, 0) scale(1.12)";
    }
    ticking = false;
  }

  if (heroBg && !prefersReduced) {
    window.addEventListener(
      "scroll",
      function () {
        latestScroll = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(applyParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---- Fade-in reveals on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Stagger cards / photos / tour rows within a group ---- */
  function stagger(selector, step) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.style.transitionDelay = i * step + "ms";
    });
  }
  stagger(".cards .card", 120);
  stagger(".grid .photo", 120);
  stagger(".tour-list .tour-row", 90);
})();
