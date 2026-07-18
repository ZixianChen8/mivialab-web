/**
 * Hero fly-through — all tweakable parameters in one place.
 * Edit values here, then reload. Comments note typical ranges.
 */
window.HERO_ANIM = {
  /* ── Smooth scroll (Lenis) ───────────────────────────────
   * Higher duration / smoother easing = creamier page scroll.
   * Set enabled: false to fall back to native scroll.
   */
  smoothScroll: {
    enabled: true,
    duration: 1.4,          // 0.8–2.0 · seconds of inertia after wheel/touch
    easing: function (t) {  // ease-out expo curve (leave unless you know)
      return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    },
    smoothWheel: true,
    wheelMultiplier: 0.85,  // 0.5–1.5 · lower = slower wheel response
    touchMultiplier: 1.2,   // 1–2 · touch drag speed
    syncTouch: true
  },

  /* ── Pin / scroll distance ───────────────────────────────
   * How tall the scroll runway is (in viewport heights).
   * Higher = longer pin + slower card motion.
   */
  pinHeightVh: 600,         // 400–900

  /* ── Scrub ───────────────────────────────────────────────
   * true = 1:1 with scroll · number = seconds of lag catch-up
   * A number feels smoother with Lenis (try 0.8–1.5).
   */
  scrub: 1.2,

  /* ── Card sequence timing ──────────────────────────────── */
  stepDesktop: 1,           // spacing between card starts (desktop)
  stepPortrait: 1.5,        // wider spacing on tall/narrow viewports
  cardDuration: 1.1,        // how long each card tween lasts on the timeline
  zIndexResetAt: '-=0.55',  // when stacking resets mid-tween
  ease: 'power1.inOut',     // GSAP ease for the tumble

  /* ── 3D tumble (mwg_effect068 rotation) ────────────────── */
  rotationStart: 20,       // rotateX at entry
  rotationEnd: -40,          // rotateX at exit
  xPercent: 100,            // travel by own width (%)

  /* ── Card layout (applied as CSS variables) ────────────── */
  mediaWidthVw: 14,         // card width · desktop
  mediaWidthMobileVw: 42,   // card width · ≤640px
  mediaTopVh: 42,           // vertical lane · desktop
  mediaTopMobileVh: 38,     // vertical lane · ≤640px
  mediaMinWidthRem: 7.5,
  perspectiveVw: 500,       // 3D depth · lower = more dramatic (try 60–100)
  imageScale: 1.2,          // overscale inside card
  imageZVw: 16,             // push toward camera
  borderRadiusVw: 1,
  grayscale: 30,            // 0–100

  /* ── Background while pinned ─────────────────────────────
   * Drift only. Position / scale live in hero-bg-layers-config.js.
   * Negative yPercent = sky moves UP as you scroll down.
   */
  bgDriftYPercent: -22,     // negative = up · try -12 to -30

  /* ── Scroll hint fade ──────────────────────────────────── */
  scrollHintDuration: 0.2
};
