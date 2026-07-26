/**
 * About-2 brand story scroll — one continuous story split across presets:
 * mwg_022 (pinned column swap) → mwg_011 (horizontal quote) → mwg_102
 * (3D line flip) → mwg_097 (essay word-reveal) → mwg_098 (typewriter arcs)
 * → mwg_039 (founder cursor card). The story components read this file only.
 */

/**
 * 022 columns: paragraph one of the story (origin and the AI-slop problem).
 */
export const STORY_BEATS = [
  "We're two University of Ottawa students, and MiviaLab began when our technical co-founder, Michael, kept getting asked by friends to build websites for their small businesses and community groups.",
  "Through that work, we noticed a growing problem: as AI made website creation faster, more and more sites started drowning in the same generic look.",
  "Soulless layouts, lifeless copy, the kind of AI-generated filler that feels empty and forgettable.",
] as const;

/** 011 stance quote: the story's thesis line rides horizontally. */
export const STORY_QUOTE = {
  /** Header paragraph (top left), continues the story before the big line. */
  lead: "AI isn't going away, and pretending otherwise helps no one.",
  /** Small meta label (top right). */
  meta: "Our stance",
  /** The giant horizontal line. */
  text: "The real question is how you use it.",
} as const;

export const STORY_QUOTE_ANIM = {
  /** Track scrub for the horizontal ride. */
  scrub: true as boolean | number,
  /** Letter entrances (from mwg_011). */
  letter: {
    /** gsap.from yPercent spread: (random - 0.5) * span. */
    yPercentSpan: 400,
    /** gsap.from rotation spread (deg): (random - 0.5) * span. */
    rotationSpan: 60,
    ease: "elastic.out(1.2, 1)",
    start: "left 90%",
    end: "left 10%",
    scrub: 0.5,
  },
  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

/** 102 mindset flip: the mindless vs thoughtful contrast. */
export const STORY_FLIP_LINES = [
  "Used mindlessly, it churns out templates that all look the same.",
  "Used thoughtfully, it's a powerful tool.",
] as const;

export const STORY_FLIP_ANIM = {
  /** Scroll (vh) per flip; pin height = 100 + (lines - 1) * this. */
  perTransitionVh: 150,
  ease: "expo.inOut",
  /** Span counter-rotation (deg); sign alternates per transition. */
  spanAngle: 20,
  scrub: true as boolean | number,
  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

/** Total height of the flip scroll track (vh) for a given line count. */
export function flipTrackHeightVh(lineCount: number): number {
  return 100 + Math.max(0, lineCount - 1) * STORY_FLIP_ANIM.perTransitionVh;
}

/**
 * 097 essay: the founding idea and the price promise, as long paragraphs.
 * The closing line lives in STORY_CLOSE (098 arcs).
 */
export const STORY_ESSAY = [
  {
    title: "The founding idea",
    body: "That's the idea MiviaLab was founded on: we use AI strategically to cut down the time cost of the technical work, and we pass those savings on to you through lower prices.",
  },
  {
    title: "Still human",
    body: "But every site is still shaped by careful human input and real creative judgment. The result is a website that feels polished, personal, and unmistakably yours, at a price a small business can actually afford.",
  },
] as const;

/** 098 closing arcs: the story's last line typed along rotating curves. */
export const STORY_CLOSE = {
  text: "Smart technology and human creativity come together to build websites with true character.",
} as const;

export const STORY_CLOSE_ANIM = {
  /** Scroll track height (vh) behind the pinned arc stage. */
  trackHeightVh: 500,
  /** Scrub catch-up lag in seconds (098 uses 1). */
  scrub: 1,
  /** Per-arc rotation tween inside the master timeline. */
  arc: {
    duration: 2,
    ease: "power2.inOut",
  },
  /** Template arc geometry (from mwg_098). */
  svg: {
    viewBox: "0 0 845 80",
    pathD: "M0 74.5322C135.056 25.4113 278.148 0 422.938 0C567.414 0 710.2 25.3004 845 74.2129",
    baseFontSize: 60,
  },
  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

export const STORY_ANIM = {
  /**
   * Scroll track length per beat swap (vh). The pinned stage holds for
   * (beats - 1) * swapDistanceVh of scroll. 022 uses ~150vh per swap
   * (400vh total for three columns).
   */
  swapDistanceVh: 150,

  /** Word swap tweens (from mwg_022): out drops words down, in raises the next beat. */
  swap: {
    /** Tween duration inside the scrubbed timeline (proportional units). */
    duration: 1,
    /** Delay before the incoming beat starts, relative to the outgoing tween. */
    delayIn: 1,
    /** Stagger between words within a beat. */
    stagger: 0.2,
    easeOut: "power4.in",
    easeIn: "power4.out",
  },

  /** true = locked to scroll; number = catch-up lag in seconds. */
  scrub: true as boolean | number,

  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

/** mwg_097: lines scrub from justified word spread back to natural spacing. */
export const STORY_ESSAY_ANIM = {
  /** Scrub catch-up lag (seconds). 097 uses 0.2. */
  scrub: 0.2,
  /** ScrollTrigger start / end for each line (relative to the line). */
  lineStart: "top bottom",
  lineEnd: "top 60%",
  ease: "power2.out",
  setup: {
    waitForFonts: true,
    refreshAfterMount: true,
    respectReducedMotion: true,
  },
} as const;

/** Total height of the story scroll track (vh) for a given beat count. */
export function storyTrackHeightVh(beatCount: number): number {
  return 100 + Math.max(0, beatCount - 1) * STORY_ANIM.swapDistanceVh;
}

/** Founder spotlight content. Display name for Shunan is Olivia. */
export const FOUNDERS = [
  {
    id: "michael",
    name: "Michael",
    role: "Tech Lead",
    photo: "/images/people/michael.png",
    alt: "Portrait of Michael, tech lead at MiviaLab",
    bio: "Computer Science student at the University of Ottawa, passionate about web development and artificial intelligence. Also explores digital design and video editing, and spends free time playing piano and gaming.",
  },
  {
    id: "olivia",
    name: "Olivia",
    role: "Business Development Lead",
    photo: "/images/people/shunan.jpg",
    alt: "Portrait of Olivia, business development lead of MiviaLab",
    bio: "Business Technology Management graduate and Big Data Analytics master's student. Enjoys handcrafting, exploring new foods, and finding inspiration in the small details of everyday life.",
  },
] as const;

export const FOUNDER_ANIM = {
  /** Minimum height (vh) of each stacked founder band. */
  sectionMinVh: 100,

  /** Photo crossfade when the pointer enters another founder band (seconds). */
  swapDuration: 0.45,

  /** Cursor-follow card (from mwg_039). */
  card: {
    /** quickTo duration/ease for x/y follow and tilt. */
    followDuration: 1,
    followEase: "power4",
    /** Max tilt (deg) applied from pointer delta, either axis. */
    tiltMax: 35,
    /** Photo zoom while the pointer rests; returns to 1 while moving. */
    idleScale: 1.2,
    idleZoomDuration: 2,
    idleZoomEase: "power1",
    /** Pointer considered idle after this many ms without movement. */
    idleAfterMs: 66,
    /** Fade card in/out when the pointer enters or leaves the founders wrap. */
    enterLeaveDuration: 0.35,
    enterLeaveEase: "power2.out",
  },

  /** Touch fallback: gentle idle float on each section's static portrait. */
  touchFloat: {
    yPx: 12,
    duration: 2.6,
    ease: "sine.inOut",
  },
} as const;

export type StoryAnimConfig = typeof STORY_ANIM;
export type FounderAnimConfig = typeof FOUNDER_ANIM;
