(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });
  }

  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');

  if (form && statusEl && submitBtn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.className = 'form-status';
      statusEl.textContent = '';

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var valid = true;

      if (!name.value.trim()) {
        valid = false;
        name.focus();
      } else if (!email.value.trim() || !email.validity.valid) {
        valid = false;
        email.focus();
      } else if (!message.value.trim()) {
        valid = false;
        message.focus();
      }

      if (!valid) {
        statusEl.className = 'form-status is-error';
        statusEl.textContent = 'Please fill in all required fields with a valid email.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.textContent = 'Send message';
        statusEl.className = 'form-status is-success';
        statusEl.textContent = 'Thanks — this is a prototype. Form submission is not connected yet.';
        form.reset();
      }, 1200);
    });
  }
})();
