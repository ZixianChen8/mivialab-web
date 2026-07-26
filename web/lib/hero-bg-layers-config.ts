/**
 * Hero background layers — position, scale, and scrim spotlight.
 *
 * spotlight.darkness (0–100) — how dark the edges get
 * spotlight.fade (0–100) — falloff smoothness (0 = hard edge, 100 = soft/long blend)
 */
export const HERO_BG_LAYERS = {
  sky: {
    scale: 1.12,
    positionX: 50,
    positionY: 0,
    /** Layer shift in vh (negative moves the sky up). background-position Y has little effect with cover on this asset. */
    offsetYVh: -14,
    insetPercent: 8,
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
    y: 42,
    width: 110,
    height: 50,
    clear: 65,
    /** Edge darkness, 0 (light) to 100 (very dark). */
    darkness: 60,
    /** Falloff smoothness, 0 (hard) to 100 (soft). */
    fade: 100,
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

type SpotlightColors = {
  scrimA: string;
  scrimB: string;
  veil: string;
};

/** Build the full radial-gradient string (must be set as one CSS value from JS). */
export function buildHeroSpotlightScrim(
  spotlight: HeroBgLayersConfig["spotlight"],
  colors: SpotlightColors,
) {
  const clear = Math.min(95, Math.max(0, spotlight.clear));
  const remaining = Math.max(1, 100 - clear);
  const soft = Math.min(100, Math.max(0, spotlight.fade)) / 100;
  const t = Math.min(100, Math.max(0, spotlight.darkness)) / 100;

  const aStop = Math.round(clear + remaining * (0.08 + soft * 0.22));
  const bStop = Math.round(clear + remaining * (0.18 + soft * 0.4));
  const strength = 0.35 + t * 0.65;

  const gradient = [
    "radial-gradient(",
    `ellipse ${spotlight.width}% ${spotlight.height}% at ${spotlight.x}% ${spotlight.y}%,`,
    "transparent 0%,",
    `transparent ${clear}%,`,
    `${colors.scrimA} ${aStop}%,`,
    `${colors.scrimB} ${bStop}%,`,
    `${colors.veil} 100%)`,
  ].join(" ");

  return { gradient, strength };
}
