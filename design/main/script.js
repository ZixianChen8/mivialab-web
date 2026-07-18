/**
 * MiviaLab — Main design
 * Cinematic hero (splash + GSAP 3D fly-through) + editorial body interactions
 */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cfg = window.HERO_ANIM || {};
  var bgLayers = window.HERO_BG_LAYERS || {};
  var skyCfg = bgLayers.sky || {};
  var foliageCfg = bgLayers.foliage || {};
  var spotCfg = bgLayers.spotlight || {};

  /* Apply layout knobs from config → CSS variables */
  function applyHeroCssVars() {
    var rootStyle = document.documentElement.style;
    rootStyle.setProperty('--hero-pin-vh', String(cfg.pinHeightVh != null ? cfg.pinHeightVh : 600));
    rootStyle.setProperty('--hero-perspective-vw', String(cfg.perspectiveVw != null ? cfg.perspectiveVw : 100));
    rootStyle.setProperty('--hero-media-w-vw', String(cfg.mediaWidthVw != null ? cfg.mediaWidthVw : 14));
    rootStyle.setProperty('--hero-media-w-mobile-vw', String(cfg.mediaWidthMobileVw != null ? cfg.mediaWidthMobileVw : 42));
    rootStyle.setProperty('--hero-media-top-vh', String(cfg.mediaTopVh != null ? cfg.mediaTopVh : 42));
    rootStyle.setProperty('--hero-media-top-mobile-vh', String(cfg.mediaTopMobileVh != null ? cfg.mediaTopMobileVh : 38));
    rootStyle.setProperty('--hero-media-min-rem', String(cfg.mediaMinWidthRem != null ? cfg.mediaMinWidthRem : 7.5));
    rootStyle.setProperty('--hero-img-scale', String(cfg.imageScale != null ? cfg.imageScale : 1.2));
    rootStyle.setProperty('--hero-img-z-vw', String(cfg.imageZVw != null ? cfg.imageZVw : 16));
    rootStyle.setProperty('--hero-radius-vw', String(cfg.borderRadiusVw != null ? cfg.borderRadiusVw : 1));
    rootStyle.setProperty('--hero-grayscale', String(cfg.grayscale != null ? cfg.grayscale : 30));

    /* Sky + foliage framing — from hero-bg-layers-config.js */
    rootStyle.setProperty('--hero-bg-scale', String(skyCfg.scale != null ? skyCfg.scale : 1));
    rootStyle.setProperty('--hero-bg-x', (skyCfg.positionX != null ? skyCfg.positionX : 50) + '%');
    rootStyle.setProperty('--hero-bg-y', (skyCfg.positionY != null ? skyCfg.positionY : 0) + '%');
    rootStyle.setProperty('--hero-bg-inset', (skyCfg.insetPercent != null ? skyCfg.insetPercent : 8) + '%');
    rootStyle.setProperty('--hero-fg-scale', String(foliageCfg.scale != null ? foliageCfg.scale : 1));
    rootStyle.setProperty('--hero-fg-x', (foliageCfg.positionX != null ? foliageCfg.positionX : 50) + '%');
    rootStyle.setProperty('--hero-fg-y', (foliageCfg.positionY != null ? foliageCfg.positionY : 0) + '%');

    /* Spotlight clear zone */
    rootStyle.setProperty('--hero-spot-x', (spotCfg.x != null ? spotCfg.x : 50) + '%');
    rootStyle.setProperty('--hero-spot-y', (spotCfg.y != null ? spotCfg.y : 42) + '%');
    rootStyle.setProperty('--hero-spot-w', (spotCfg.width != null ? spotCfg.width : 75) + '%');
    rootStyle.setProperty('--hero-spot-h', (spotCfg.height != null ? spotCfg.height : 60) + '%');
    rootStyle.setProperty('--hero-spot-clear', (spotCfg.clear != null ? spotCfg.clear : 38) + '%');
  }

  applyHeroCssVars();

  /* Splash reveal on load */
  var hero = document.querySelector('.artist-container');
  if (hero) {
    window.setTimeout(function () {
      hero.classList.add('revealed');
    }, 250);
  }

  /* Smooth page scroll (Lenis) — synced with ScrollTrigger */
  var lenisInstance = null;

  function initSmoothScroll() {
    var sc = cfg.smoothScroll || {};
    if (reducedMotion || sc.enabled === false) return null;
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return null;
    if (typeof ScrollTrigger === 'undefined') return null;

    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({
      duration: sc.duration != null ? sc.duration : 1.4,
      easing: typeof sc.easing === 'function' ? sc.easing : undefined,
      smoothWheel: sc.smoothWheel !== false,
      wheelMultiplier: sc.wheelMultiplier != null ? sc.wheelMultiplier : 0.85,
      touchMultiplier: sc.touchMultiplier != null ? sc.touchMultiplier : 1.2,
      syncTouch: sc.syncTouch !== false,
      anchors: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  /* Hero — scroll-pinned 3D media fly-through (GSAP ScrollTrigger) */
  function initHeroFlythrough() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    var root = document.querySelector('.hero');
    if (!root) return;

    var pinHeight = root.querySelector('.hero__pin-height');
    var stage = root.querySelector('.hero__stage');
    var medias = root.querySelectorAll('.hero__media');
    var scrollHint = root.querySelector('.hero-scroll');

    if (!pinHeight || !stage || !medias.length) return;

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) return;

    var scrub = cfg.scrub != null ? cfg.scrub : 1.2;
    var rotationStart = cfg.rotationStart != null ? cfg.rotationStart : -90;
    var rotationEnd = cfg.rotationEnd != null ? cfg.rotationEnd : 90;
    var xPercent = cfg.xPercent != null ? cfg.xPercent : 100;
    var cardDuration = cfg.cardDuration != null ? cfg.cardDuration : 1.1;
    var ease = cfg.ease || 'power1.inOut';
    var zIndexResetAt = cfg.zIndexResetAt || '-=0.55';
    var stepDesktop = cfg.stepDesktop != null ? cfg.stepDesktop : 1;
    var stepPortrait = cfg.stepPortrait != null ? cfg.stepPortrait : 1.5;
    var bgDrift = cfg.bgDriftYPercent != null ? cfg.bgDriftYPercent : -22;
    var hintDuration = cfg.scrollHintDuration != null ? cfg.scrollHintDuration : 0.2;

    /* Park cards in their start pose before the scrubbed timeline exists.
       immediateRender on nested fromTo breaks forward scrub (only reverse works). */
    gsap.set(medias, {
      x: 0,
      xPercent: 0,
      yPercent: -50,
      rotateX: rotationStart,
      force3D: true,
      visibility: 'visible'
    });

    gsap.to(scrollHint, {
      autoAlpha: 0,
      duration: hintDuration,
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'top top-=1',
        toggleActions: 'play none reverse none'
      }
    });

    var master = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        scrub: scrub,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    var isPortrait = window.innerHeight > window.innerWidth;
    var step = (isPortrait ? stepPortrait : stepDesktop) / medias.length;

    medias.forEach(function (media, i) {
      var tl = gsap.timeline();

      tl.fromTo(media, {
        x: 0,
        xPercent: 0,
        rotateX: rotationStart,
        zIndex: medias.length - i
      }, {
        x: function () { return window.innerWidth; },
        xPercent: xPercent,
        rotateX: rotationEnd,
        ease: ease,
        duration: cardDuration,
        immediateRender: false
      });

      tl.set(media, {
        zIndex: 0
      }, zIndexResetAt);

      master.add(tl, i * step);
    });

    var heroBg = root.querySelector('.hero-bg');
    if (heroBg && bgDrift) {
      var bgScale = skyCfg.scale != null ? skyCfg.scale : 1;

      /* Keep scale in GSAP so yPercent drift doesn't drop the CSS crop zoom */
      gsap.set(heroBg, { scale: bgScale, transformOrigin: '50% 0%' });

      gsap.fromTo(heroBg, {
        yPercent: 0
      }, {
        yPercent: bgDrift,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          scrub: scrub
        }
      });
    }

    function refreshTriggers() {
      ScrollTrigger.refresh();
    }

    window.addEventListener('load', refreshTriggers);
    requestAnimationFrame(function () {
      requestAnimationFrame(refreshTriggers);
    });
  }

  lenisInstance = initSmoothScroll();
  initHeroFlythrough();

  /* In-page anchors ride Lenis when available */
  if (lenisInstance) {
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenisInstance.scrollTo(target, { offset: 0 });
    });
  }

  /* Mobile navigation */
  var menuBtn = document.querySelector('.nav-menu-btn');
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

  /* ---- Color system chooser ---- */
  var THEMES = [
    {
      id: 'pine-fog',
      key: '1',
      name: 'Pine Fog',
      blurb: 'Forest restrained: pine darks, cool bone, amber CTAs',
      swatches: ['#0d1612', '#f7f8f7', '#1a2920', '#c4924a']
    },
    {
      id: 'slate-studio',
      key: '2',
      name: 'Slate Studio',
      blurb: 'Cold luxury: steel darks, silver lights, cobalt CTAs',
      swatches: ['#141c2c', '#f6f7f9', '#2a3548', '#3a6fb5']
    },
    {
      id: 'ink-brass',
      key: '3',
      name: 'Ink & Brass',
      blurb: 'Gallery committed: near-black with brass on every CTA',
      swatches: ['#0e0e0c', '#f7f7f5', '#1c1b18', '#d4a84a']
    },
    {
      id: 'harbour-blue',
      key: '4',
      name: 'Harbour Blue',
      blurb: 'Cobalt committed: navy surfaces, saturated blue CTAs',
      swatches: ['#122848', '#f6f8fb', '#1e3a6e', '#2f5fd4']
    },
    {
      id: 'cedar-ember',
      key: '5',
      name: 'Cedar Ember',
      blurb: 'Black and tan: charcoal ink, near-white body, ember CTAs',
      swatches: ['#241810', '#f7f5f2', '#3a2a1c', '#c45a28']
    },
    {
      id: 'snowfield',
      key: '6',
      name: 'Snowfield',
      blurb: 'Light-first winter: pale hero, ice accent, charcoal darks',
      swatches: ['#e4ecf4', '#f7fafc', '#1e2836', '#3d8fb5']
    },
    {
      id: 'oxblood',
      key: '7',
      name: 'Oxblood',
      blurb: 'Drenched red-black darks, cool stone body, blood CTAs',
      swatches: ['#4a1820', '#f7f6f5', '#6a2430', '#a83232']
    },
    {
      id: 'volt-night',
      key: '8',
      name: 'Volt Night',
      blurb: 'Full palette: near-black with chartreuse on CTAs and badges',
      swatches: ['#0e1410', '#f6f8f5', '#182018', '#b8f000']
    },
    {
      id: 'stone-clay',
      key: '9',
      name: 'Stone Clay',
      blurb: 'Slate and brick: cool gray body, terracotta CTAs',
      swatches: ['#2e333c', '#f6f7f8', '#3d4450', '#b05a32']
    },
    {
      id: 'northern-teal',
      key: '0',
      name: 'Northern Teal',
      blurb: 'Teal committed: teal-black darks, mint CTAs',
      swatches: ['#0c2428', '#f6f9f9', '#163840', '#3ecfb0']
    }
  ];

  var STORAGE_KEY = 'mivialab-color-system';
  var root = document.documentElement;
  var chooser = document.getElementById('theme-chooser');
  var toggle = document.getElementById('theme-chooser-toggle');
  var panel = document.getElementById('theme-chooser-panel');
  var list = document.getElementById('theme-chooser-list');
  var closeBtn = document.getElementById('theme-chooser-close');
  var currentLabel = document.getElementById('theme-chooser-current');
  var dots = document.getElementById('theme-chooser-dots');

  function getThemeById(id) {
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === id) return THEMES[i];
    }
    return THEMES[0];
  }

  function updateDots(theme) {
    if (!dots) return;
    var spans = dots.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.background = theme.swatches[i] || theme.swatches[0];
    }
  }

  function setTheme(id, persist) {
    var theme = getThemeById(id);
    root.setAttribute('data-theme', theme.id);

    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, theme.id);
      } catch (e) { /* ignore */ }
    }

    if (currentLabel) currentLabel.textContent = theme.name;
    updateDots(theme);

    if (list) {
      list.querySelectorAll('.theme-chooser__option').forEach(function (btn) {
        var active = btn.getAttribute('data-theme-id') === theme.id;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
  }

  function openPanel() {
    if (!panel || !toggle) return;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    if (!panel || !toggle) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  function isPanelOpen() {
    return panel && !panel.hidden;
  }

  if (chooser && list && toggle && panel) {
    THEMES.forEach(function (theme) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-chooser__option';
      btn.setAttribute('data-theme-id', theme.id);
      btn.setAttribute('aria-pressed', 'false');

      var swatches = document.createElement('span');
      swatches.className = 'theme-chooser__swatches';
      swatches.setAttribute('aria-hidden', 'true');
      theme.swatches.forEach(function (color) {
        var chip = document.createElement('i');
        chip.style.background = color;
        swatches.appendChild(chip);
      });

      var meta = document.createElement('span');
      meta.className = 'theme-chooser__meta';
      meta.innerHTML = '<strong></strong><span></span>';
      meta.querySelector('strong').textContent = theme.name;
      meta.querySelector('span').textContent = theme.blurb;

      var key = document.createElement('span');
      key.className = 'theme-chooser__key';
      key.textContent = theme.key;

      btn.appendChild(swatches);
      btn.appendChild(meta);
      btn.appendChild(key);

      btn.addEventListener('click', function () {
        setTheme(theme.id, true);
      });

      li.appendChild(btn);
      list.appendChild(li);
    });

    var initial = root.getAttribute('data-theme') || 'pine-fog';
    setTheme(initial, false);

    toggle.addEventListener('click', function () {
      if (isPanelOpen()) closePanel();
      else openPanel();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isPanelOpen()) {
        closePanel();
        return;
      }

      if (!isPanelOpen()) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      var match = THEMES.filter(function (t) {
        return t.key === e.key;
      })[0];

      if (match) {
        e.preventDefault();
        setTheme(match.id, true);
      }
    });

    document.addEventListener('click', function (e) {
      if (!isPanelOpen()) return;
      if (!chooser.contains(e.target)) closePanel();
    });
  }
})();
