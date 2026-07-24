/**
 * Shared motion tokens for JS (GSAP) use. These mirror the CSS custom
 * properties declared in app/globals.css so motion stays consistent whether
 * it is driven by CSS transitions or GSAP tweens.
 */

export const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/** GSAP-friendly cubic bezier control points for the signature ease-out. */
export const EASE_OUT_POINTS = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.35,
  reveal: 0.9,
  slow: 1.4,
} as const;

export const STAGGER = 0.08;

/** Lenis smoothing factor (lower = smoother/heavier). */
export const LENIS_LERP = 0.1;
