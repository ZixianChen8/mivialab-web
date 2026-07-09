/**
 * MiviaLab — Fashion-editorial magazine landing
 * Hero color reveal, carousel, scroll reveals, mobile nav, contact form
 */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Image fallback if a placeholder fails to load */
  var transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('is-missing');
      img.src = transparentPixel;
    }, { once: true });
  });

  /* Mobile navigation */
  var menuBtn = document.querySelector('.hero__menu-btn');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }

  /* Hero color reveal — radial mask follows cursor */
  var portrait = document.getElementById('hero-portrait');
  var colorLayer = portrait ? portrait.querySelector('.hero__img--color') : null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches;

  var reveal = {
    x: 0,
    y: 0,
    radius: 0,
    targetRadius: 0,
    active: false,
    raf: null
  };

  var REVEAL_SIZE = 160;
  var EASE = 0.12;

  function applyMask() {
    if (!colorLayer) return;

    var mask = 'radial-gradient(circle ' + reveal.radius + 'px at ' +
      reveal.x + 'px ' + reveal.y + 'px, ' +
      'rgba(0,0,0,1) 0%, ' +
      'rgba(0,0,0,1) 22%, ' +
      'rgba(0,0,0,0.72) 48%, ' +
      'rgba(0,0,0,0.28) 66%, ' +
      'rgba(0,0,0,0) 84%)';

    colorLayer.style.webkitMaskImage = mask;
    colorLayer.style.maskImage = mask;
  }

  function tick() {
    reveal.radius += (reveal.targetRadius - reveal.radius) * EASE;

    if (Math.abs(reveal.targetRadius - reveal.radius) < 0.5) {
      reveal.radius = reveal.targetRadius;
    }

    applyMask();

    if (reveal.active || Math.abs(reveal.targetRadius - reveal.radius) > 0.5) {
      reveal.raf = requestAnimationFrame(tick);
    } else {
      reveal.raf = null;
    }
  }

  function startLoop() {
    if (!reveal.raf) {
      reveal.raf = requestAnimationFrame(tick);
    }
  }

  function setPosition(clientX, clientY) {
    if (!portrait) return;

    var rect = portrait.getBoundingClientRect();
    reveal.x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    reveal.y = Math.max(0, Math.min(rect.height, clientY - rect.top));
  }

  function activateReveal() {
    if (!portrait || !colorLayer) return;

    reveal.active = true;
    reveal.targetRadius = REVEAL_SIZE;
    portrait.classList.add('is-active');
    startLoop();
  }

  function deactivateReveal() {
    if (!portrait || !colorLayer) return;

    reveal.active = false;
    reveal.targetRadius = 0;
    portrait.classList.remove('is-active');
    startLoop();
  }

  if (portrait && colorLayer && !reducedMotion) {
    portrait.addEventListener('mouseenter', function (e) {
      setPosition(e.clientX, e.clientY);
      activateReveal();
    });

    portrait.addEventListener('mousemove', function (e) {
      setPosition(e.clientX, e.clientY);
      startLoop();
    });

    portrait.addEventListener('mouseleave', function () {
      deactivateReveal();
    });

    if (isTouch) {
      portrait.style.cursor = 'pointer';

      portrait.addEventListener('touchstart', function (e) {
        var touch = e.touches[0];
        setPosition(touch.clientX, touch.clientY);

        if (portrait.classList.contains('is-active')) {
          deactivateReveal();
        } else {
          activateReveal();
        }
      }, { passive: true });
    }
  } else if (portrait && colorLayer && reducedMotion) {
    portrait.addEventListener('mouseenter', function () {
      colorLayer.style.opacity = '1';
      colorLayer.style.webkitMaskImage = 'none';
      colorLayer.style.maskImage = 'none';
      portrait.classList.add('is-active');
    });

    portrait.addEventListener('mouseleave', function () {
      colorLayer.style.opacity = '0';
      portrait.classList.remove('is-active');
    });
  }

  /* Contact form — validate, then mailto draft */
  var contactForm = document.getElementById('contact-form');
  var contactStatus = document.getElementById('contact-status');

  function setFieldError(field, hasError) {
    var row = field.closest('.contact-form__row');
    if (row) {
      row.classList.toggle('has-error', hasError);
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.elements.name;
      var email = contactForm.elements.email;
      var project = contactForm.elements.project;

      var nameInvalid = !name.value.trim();
      var emailInvalid = !validateEmail(email.value.trim());
      var projectInvalid = !project.value.trim();

      setFieldError(name, nameInvalid);
      setFieldError(email, emailInvalid);
      setFieldError(project, projectInvalid);

      if (nameInvalid || emailInvalid || projectInvalid) {
        if (contactStatus) {
          contactStatus.textContent = 'Please complete the highlighted fields.';
        }
        return;
      }

      var subject = encodeURIComponent('MiviaLab project inquiry from ' + name.value.trim());
      var body = encodeURIComponent(
        'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n\n' +
        'Project note:\n' + project.value.trim()
      );

      if (contactStatus) {
        contactStatus.textContent = 'Opening your email app with the project note.';
      }

      window.location.href = 'mailto:hello@mivialab.com?subject=' + subject + '&body=' + body;
    });

    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        setFieldError(field, false);
        if (contactStatus) {
          contactStatus.textContent = '';
        }
      });
    });
  }

  /* Gallery carousel */
  var track = document.getElementById('carousel-track');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');

  if (track && prevBtn && nextBtn) {
    var getScrollAmount = function () {
      var card = track.querySelector('.carousel__card');
      if (!card) return 360;
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      return card.offsetWidth + gap;
    };

    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    var updateButtons = function () {
      var maxScroll = track.scrollWidth - track.clientWidth - 2;
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    window.addEventListener('load', updateButtons);
    requestAnimationFrame(function () {
      updateButtons();
      setTimeout(updateButtons, 250);
    });
  }

  /* Scroll reveal with light stagger for sibling lists */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var siblings = el.parentElement
              ? Array.prototype.filter.call(el.parentElement.children, function (child) {
                  return child.classList.contains('reveal');
                })
              : [];
            var index = siblings.indexOf(el);
            var delay = index > 0 && siblings.length > 1 && siblings.length < 8
              ? index * 90
              : 0;

            if (delay) {
              el.style.transitionDelay = delay + 'ms';
            }

            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Subtle parallax on hero background word */
  if (!reducedMotion && !isTouch) {
    var bgWord = document.querySelector('.hero__bg-word');

    if (bgWord) {
      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          bgWord.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
        }
      }, { passive: true });
    }
  }

})();
