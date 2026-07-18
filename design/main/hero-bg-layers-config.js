/**
 * Hero background layers — position, scale, and scrim spotlight.
 * Edit values here, then reload.
 *
 * positionX / positionY: background-position percentages
 * scale: CSS transform scale (1 = 100%)
 * insetPercent (sky only): extra bleed below for parallax room
 *
 * spotlight: clear center where no grey is applied; grey falls off toward edges
 */
window.HERO_BG_LAYERS = {
  /* ── Layer 1 — sky (drifts with scroll) ─────────────────── */
  sky: {
    scale: 1,            // 1–1.4 · zoom
    positionX: 50,       // % · 0 = left, 50 = center, 100 = right
    positionY: 0,        // % · 0 = top, 50 = middle, 100 = bottom
    insetPercent: 8      // bleed below for parallax · try 4–16
  },

  /* ── Layer 2 — foliage frame (fixed, above cards) ───────── */
  foliage: {
    scale: 1,            // 1–1.4 · zoom
    positionX: 50,       // %
    positionY: 30        // % · match sky Y to keep the composite aligned
  },

  /* ── Scrim spotlight (no grey in the clear zone) ────────── */
  spotlight: {
    x: 50,               // % · horizontal center of clear zone
    y: 42,               // % · vertical center of clear zone
    width: 55,           // % · ellipse width
    height: 50,          // % · ellipse height
    clear: 45            // % · how far from center stays fully clear · try 25–50
  }
};
