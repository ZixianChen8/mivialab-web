(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Contact form (prototype — no backend)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (form && status && submitBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      const fields = ["name", "email", "message"];
      let firstInvalid = null;

      fields.forEach((id) => {
        const input = form.querySelector(`#${id}`);
        if (!input) return;
        const ok = input.checkValidity();
        input.classList.toggle("is-invalid", !ok);
        if (!ok && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        status.textContent = "Please fill in the required fields.";
        status.classList.add("is-error");
        firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      window.setTimeout(() => {
        status.textContent = "Thanks! We'll be in touch soon. (Prototype — message not sent.)";
        status.classList.add("is-success");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }, 650);
    });

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.hasAttribute("required")) {
          input.classList.toggle("is-invalid", !input.checkValidity());
        }
      });
    });
  }

  // ---------- Storytelling: stagger delays within each chapter ----------
  document.querySelectorAll(".chapter").forEach((chapter) => {
    const staggered = chapter.querySelectorAll("[data-stagger]");
    staggered.forEach((el, i) => {
      el.style.transitionDelay = `${i * 110}ms`;
    });
  });

  // Chain chapter heads slightly ahead of their children
  document.querySelectorAll(".chapter-head.reveal").forEach((head) => {
    head.style.transitionDelay = "0ms";
  });

  // ---------- Chained scroll reveals ----------
  const reveals = document.querySelectorAll(".reveal");
  const chapters = document.querySelectorAll(".chapter");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
    chapters.forEach((el) => el.classList.add("is-in", "is-active"));
  } else {
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    reveals.forEach((el) => revealIo.observe(el));

    // Chapter active state — drives the hairline + story feel
    const chapterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          }
        });
      },
      { threshold: 0.28, rootMargin: "-10% 0px -20% 0px" }
    );

    chapters.forEach((el) => chapterIo.observe(el));
  }

  // ---------- Story progress rail ----------
  const railFill = document.getElementById("story-rail-fill");
  if (railFill && !reduceMotion) {
    let ticking = false;

    function updateRail() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      railFill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateRail);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateRail();
  }

  // ---------- Hero: mouse-reactive logo ----------
  const hero = document.getElementById("hero");
  const logoTilt = document.getElementById("logo-tilt");
  const parallaxEls = document.querySelectorAll("[data-parallax]");

  if (!hero || !logoTilt || reduceMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;
  let active = false;

  const maxTilt = 12;

  function onPointerMove(clientX, clientY) {
    const rect = hero.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
    targetX = Math.max(-1, Math.min(1, nx));
    targetY = Math.max(-1, Math.min(1, ny));
    if (!active) {
      active = true;
      rafId = requestAnimationFrame(tick);
    }
  }

  function tick() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    const rotY = currentX * maxTilt;
    const rotX = -currentY * maxTilt;

    logoTilt.style.transform =
      `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

    parallaxEls.forEach((el) => {
      const factor = parseFloat(el.getAttribute("data-parallax") || "0.05");
      const tx = currentX * 40 * factor * 20;
      const ty = currentY * 40 * factor * 20;
      el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
    });

    const settled =
      Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;

    if (!settled) {
      rafId = requestAnimationFrame(tick);
    } else {
      active = false;
    }
  }

  function resetTilt() {
    targetX = 0;
    targetY = 0;
    if (!active) {
      active = true;
      rafId = requestAnimationFrame(tick);
    }
  }

  hero.addEventListener(
    "pointermove",
    (e) => {
      onPointerMove(e.clientX, e.clientY);
    },
    { passive: true }
  );

  hero.addEventListener("pointerleave", resetTilt);

  hero.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      onPointerMove(t.clientX, t.clientY);
    },
    { passive: true }
  );

  window.addEventListener("pagehide", () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
})();
