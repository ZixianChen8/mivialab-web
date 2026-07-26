/**
 * Pitch scroll text — mwg_effect058 (letter rotate on scroll).
 * Tweak timing, motion, and scroll bands here; PitchSection reads this file only.
 */

export const PITCH_HEADING = "A website should feel like your business";

/** Small left-column metadata label (editorial chrome). */
export const PITCH_LABEL = "Our approach";

export const PITCH_PARAGRAPH =
  "A website should feel like your business. AI makes it easier to create polished websites quickly, but without enough human judgment, they still feel generic. At MiviaLab, we take time to understand your business, customers, and goals before we design. These insights guide the website's structure, content, visuals, and customer journey. Every element should help visitors understand your business and take the right next step.";

/** Short supporting line under the statement (reuses hero tagline). */
export const PITCH_SUPPORT = "Custom sites, cared for end to end.";

export const PITCH_PRIMARY = {
  href: "#contact",
  label: "Start a project",
} as const;

export const PITCH_LINK = {
  href: "/about",
  label: "More about the studio",
} as const;

export const PITCH_ANIM = {
  /** Letter motion states (degrees / xPercent). */
  letter: {
    rotateStart: -80,
    xPercentStart: -14,
    rotateVisible: 0,
    xPercentVisible: 0,
    rotateEnd: 80,
    xPercentEnd: 14,
  },

  /** Timeline for each line: letters rotate in, hold at visible, rotate out. */
  line: {
    duration: 0.4,
    /** Delay between letters within the same line (seconds). */
    stagger: 0.007,                                                                            
    easeIn: "back.out(1.1)",
    easeOut: "back.in(1.1)",
    /** Timeline label where the line reads fully upright (hold point). */
    visibleLabel: "visible",
  },

  /**
   * ScrollTrigger per line (trigger = first letter of that line).
   * startBasePercent: first line fires when its bottom crosses this viewport %.
   * startStepPercent: each following line waits this much more scroll (lower % = later).
   * endBasePercent / endStepPercent: when top of line crosses this %, line exits.
   *   Lower end % = exit later (more overlap). Line 0 uses endBase; later lines add endStep.
   */
  scrollTrigger: {
    startBasePercent: 95,
    startStepPercent: 2,
    endBasePercent: 5,
    endStepPercent: 1,
  },

  /** Visual setup applied as CSS custom properties on the section. */
  css: {
    transformOrigin: "50% 120%",
    letterClipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
  },

  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

export type PitchAnimConfig = typeof PITCH_ANIM;

/** ScrollTrigger start string for a given line index (0 = first line). */
export function pitchScrollTriggerStart(lineIndex: number): string {
  const { startBasePercent, startStepPercent } = PITCH_ANIM.scrollTrigger;
  const percent = startBasePercent - lineIndex * startStepPercent;
  return `bottom ${percent}%`;
}

/** ScrollTrigger end string for a given line index (0 = first line). */
export function pitchScrollTriggerEnd(lineIndex: number): string {
  const { endBasePercent, endStepPercent } = PITCH_ANIM.scrollTrigger;
  const percent = endBasePercent + lineIndex * endStepPercent;
  return `top ${percent}%`;
}

/** CSS custom properties consumed by .pitch.mwg_effect058 in style.css */
export function pitchAnimCssVars(): Record<string, string> {
  const { transformOrigin, letterClipPath } = PITCH_ANIM.css;
  return {
    "--pitch-letter-transform-origin": transformOrigin,
    "--pitch-letter-clip-path": letterClipPath,
  };
}
