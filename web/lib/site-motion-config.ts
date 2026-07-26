/** Site-wide motion defaults (Lenis smooth scroll). */
export const SITE_MOTION = {
  smoothScroll: {
    enabled: true,
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.35,
    touchMultiplier: 1.2,
    syncTouch: true,
  },
} as const;
