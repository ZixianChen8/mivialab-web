/**
 * Hero background layers — position, scale, and scrim spotlight.
 *
 * spotlight.darkness (0–100) — how dark the edges get
 * spotlight.fade (0–100) — falloff smoothness (0 = hard edge, 100 = soft/long blend)
 */
export const HERO_BG_LAYERS = {
  sky: {
    scale: 1,
    positionX: 50,
    positionY: 0,
    insetPercent: 8,
  },
  foliage: {
    scale: 1,
    positionX: 50,
    positionY: 30,
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

  // Soft: stops spread across remaining radius. Hard: darkens quickly after clear.
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
