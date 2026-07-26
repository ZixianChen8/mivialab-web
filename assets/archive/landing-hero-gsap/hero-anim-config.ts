/**
 * Hero horizontal cards — mwg_effect001 (sticky hero + scrub track) defaults.
 * Brand overlays / Lenis / bg layers are MiviaLab additions on top.
 * SiteMotion reads this file and pushes most values to CSS variables on :root.
 */
export const HERO_ANIM = {
  /** Lenis smooth scroll (home page). Disabled when prefers-reduced-motion. */
  smoothScroll: {
    /** Turn Lenis on or off for the site shell. */
    enabled: true,
    /** Lenis scroll smoothing duration in seconds. */
    duration: 1.4,
    /** Lenis easing curve; argument t is normalized progress 0–1. */
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    /** Apply smoothing to mouse wheel events. */
    smoothWheel: true,
    /** Wheel delta multiplier; lower = slower scroll per notch. */
    wheelMultiplier: 0.35,
    /** Touch drag multiplier on trackpads and touch devices. */
    touchMultiplier: 1.2,
    /** Sync touch scroll with Lenis on supported devices. */
    syncTouch: true,
  },

  /**
   * ScrollTrigger scrub for the card track (hero stays sticky via CSS).
   * true = progress locked to scroll; number = catch-up lag in seconds.
   */
  scrub: true as boolean | number,

  /** Seconds to fade out the hero "Scroll" hint after first scroll. */
  scrollHintDuration: 0.2,

  /** Left padding on the card row (vw). First card aligns near viewport left at scroll start. */
  cardsPadStartVw: 5,

  /** Right padding on the card row (vw). Last card aligns near viewport right at scroll end. */
  cardsPadEndVw: 5,

  /** cardsPadStartVw at max-width 900px. */
  cardsPadStartMobileVw: 4,

  /** cardsPadEndVw at max-width 900px. */
  cardsPadEndMobileVw: 4,

  /** Card width as a fraction of viewport width (--hero-card-w-vw). */
  cardWidthVw: 14,

  /** Minimum card width in pixels when vw would be smaller. */
  cardMinWidthPx: 160,

  /** Horizontal gap between cards (vw). */
  cardGapVw: 10,

  /** Card corner radius (vw). */
  cardRadiusVw: 1.15,

  /** Card border thickness (vw). Color comes from CSS nth-child accents. */
  cardBorderVw: 0.35,

  /**
   * Tilt the whole card strip (.hero__rail) as one unit.
   * Applied via CSS rotate; horizontal scroll stays on .hero__cards inside the rail.
   */

  /** Rail rotation in degrees. Negative values lower the right side in LTR layouts. */
  cardsRailRotateDeg: 5,

  /** transform-origin X for the rail tilt (percent of the rail box). */
  cardsRailRotateOriginXPercent: 50,

  /** transform-origin Y for the rail tilt (percent of the rail box). */
  cardsRailRotateOriginYPercent: 52,

  /** Vertical shift of the whole rail (vh). Positive moves the strip down. */
  cardsRailOffsetYVh: 4,

  /** cardsRailOffsetYVh at max-width 640px. */
  cardsRailOffsetYMobileVh: 5,

  /**
   * Per-card parallax while the track moves (random sign per card at setup).
   * Each card gets a value in [min, min + span], then negated at the end of its window.
   */

  /** Minimum random xPercent offset magnitude for card parallax. */
  xPercentMin: 30,

  /** Added to xPercentMin for the upper bound of random xPercent. */
  xPercentSpan: 20,

  /** Minimum random yPercent offset magnitude for card parallax. */
  yPercentMin: 10,

  /** Added to yPercentMin for the upper bound of random yPercent. */
  yPercentSpan: 6,

  /** Minimum random rotation magnitude in degrees for card parallax. */
  rotationMin: 10,

  /** Added to rotationMin for the upper bound of random rotation. */
  rotationSpan: 10,

  /**
   * ScrollTrigger start for each card's containerAnimation (relative to moving track).
   * GSAP format: when the card's left edge crosses this viewport line.
   */
  cardTriggerStart: "left 120%",

  /**
   * ScrollTrigger end for each card's containerAnimation.
   * When the card's right edge crosses this viewport line, parallax completes.
   */
  cardTriggerEnd: "right -20%",
} as const;

export type HeroAnimConfig = typeof HERO_ANIM;
