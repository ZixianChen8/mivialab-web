(function () {
  "use strict";

  /* Mobile nav */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    var closeNav = function () {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      siteNav.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Contact form — demo submit feedback */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");
  var btnLabel = submitBtn.querySelector(".btn-label");
  var btnSpinner = submitBtn.querySelector(".btn-spinner");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var message = form.querySelector("#message");
    var valid = true;

    [name, email, message].forEach(function (field) {
      if (!field.value.trim()) {
        field.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        field.removeAttribute("aria-invalid");
      }
    });

    if (!valid) {
      status.textContent = "Please fill in all fields.";
      status.className = "form-status error";
      return;
    }

    submitBtn.disabled = true;
    btnLabel.textContent = "Sending…";
    btnSpinner.hidden = false;
    status.textContent = "";
    status.className = "form-status";

    window.setTimeout(function () {
      submitBtn.disabled = false;
      btnLabel.textContent = "Send message";
      btnSpinner.hidden = true;
      status.textContent =
        "Thank you — we'll reply within one business day. (Demo: form does not send.)";
      status.className = "form-status success";
      form.reset();
    }, 800);
  });
})();
