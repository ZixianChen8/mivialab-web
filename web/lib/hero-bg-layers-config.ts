/**
 * Hero background layers — position, scale, and scrim spotlight.
 *
 * Eclipse / vignette: edit `spotlight` below and save. In dev, changes re-apply
 * automatically; in production, refresh the page.
 *
 * spotlight.darkness (0–100) — how dark the edges get
 * spotlight.fade (0–100) — soft falloff inside the ramp (100 = softest)
 * spotlight.fadeReach (0–100) — length of ramp toward edges (higher = longer, smoother)
 * spotlight.clear (0–95) — bright center size (%)
 */
export const HERO_BG_LAYERS = {
  sky: {
    scale: 1.12,
    positionX: 50,
    positionY: 0,
    /** Layer shift in vh (negative moves the sky up). background-position Y has little effect with cover on this asset. */
    offsetYVh: -18,
    insetPercent: 8,
    /** Mobile sky: edit web/app/hero-sky-mobile.css (not this file). */
  },
  foliage: {
    scale: 1.22,
    positionX: 50,
    positionY: 30,
    /** Layer shift in px (negative moves foliage up). */
    offsetYPx: -100,
  },
  spotlight: {
    x: 50,
    y: 36,
    width: 110,
    height: 42,
    clear: 65,
    /** Edge darkness, 0 (light) to 100 (very dark). */
    darkness: 52,
    /** Softness of the transition (0–100). */
    fade: 100,
    /** Stretch the ramp toward the frame (0–100). Higher = smoother, longer fade. */
    fadeReach: 90,
    /** Mobile ramp length (0–100). */
    fadeReachMobile: 84,
  },
  /**
   * Mouse depth parallax (desktop fine pointer only).
   * moveX/moveY: px multipliers for normalized pointer (-1…1).
   * rotateY/rotateX: deg multipliers. Sky uses opposite shift (negative move).
   */
  parallax: {
    enabled: true,
    followDuration: 0.7,
    followEase: "power3.out",
    perspectivePx: 1200,
    sky: {
      moveX: -12,
      moveY: -8,
      rotateY: 2,
      rotateX: -2,
    },
    foliage: {
      moveX: 28,
      moveY: 18,
      rotateY: 4,
      rotateX: -4,
    },
  },
} as const;

export type HeroBgLayersConfig = typeof HERO_BG_LAYERS;

/** Widened so runtime overrides (e.g. fadeReach from fadeReachMobile) type-check. */
export type HeroSpotlightConfig = {
  [K in keyof HeroBgLayersConfig["spotlight"]]: number;
};

type SpotlightColors = {
  scrimA: string;
  scrimB: string;
  veil: string;
};

/** Smoothstep 0…1 → 0…1 (ease in/out, no plateaus). */
function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/**
 * Build a seamless radial vignette (one hue, rising opacity).
 * Avoids the two-tone A/B banding from discrete scrim colors.
 */
export function buildHeroSpotlightScrim(
  spotlight: HeroSpotlightConfig,
  colors: SpotlightColors,
) {
  const clear = Math.min(95, Math.max(0, spotlight.clear));
  const remaining = Math.max(1, 100 - clear);
  const soft = Math.min(100, Math.max(0, spotlight.fade)) / 100;
  const reach = Math.min(100, Math.max(0, spotlight.fadeReach ?? 0)) / 100;
  const t = Math.min(100, Math.max(0, spotlight.darkness)) / 100;

  const fadeStart = clear + remaining * (0.02 + soft * 0.05);
  const fadeEnd = clear + remaining * (0.42 + soft * 0.22 + reach * 0.3);
  const strength = 0.35 + t * 0.65;

  // Even samples along the ramp; each stop is the same veil tint at rising opacity.
  const samples = [0, 0.12, 0.28, 0.45, 0.62, 0.78, 0.9, 1];
  const mixStops = samples.map((s) => {
    const pos = Math.round(fadeStart + (fadeEnd - fadeStart) * s);
    const amount = Math.round(smoothstep(s) * 100);
    return `color-mix(in oklch, ${colors.veil} ${amount}%, transparent) ${pos}%`;
  });

  const stops = [
    "transparent 0%",
    `transparent ${clear}%`,
    ...mixStops,
    `${colors.veil} 100%`,
  ];

  const gradient = [
    "radial-gradient(",
    `ellipse ${spotlight.width}% ${spotlight.height}% at ${spotlight.x}% ${spotlight.y}%,`,
    stops.join(", "),
    ")",
  ].join(" ");

  return { gradient, strength };
}

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  queueMicrotask(() => {
    window.dispatchEvent(new Event("hero-bg-layers-config:update"));
  });
}
