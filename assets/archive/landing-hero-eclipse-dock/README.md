# Landing hero: eclipse spotlight + dock layout (archived)

Snapshot of the home page hero that used a **radial eclipse/spotlight scrim** over the cinematic background, with copy in a lower **editorial dock** (headline left, tagline + CTAs right).

Archived on 2026-07-25 when the live landing hero switched to a full-section dark shader with centered titles and buttons.

Related earlier archive: `assets/archive/landing-hero-gsap/` (horizontal card rail + splash).

## Contents

| File | Role |
|------|------|
| `HomePage.tsx` | Full home page with `.hero-dock` two-column layout |
| `SiteMotion.tsx` | Applies spotlight scrim + bg layer CSS vars from config |
| `hero-bg-layers-config.ts` | Sky / foliage / spotlight (clear hole, darkness, fade) |
| `hero-eclipse-dock.css` | Extracted hero CSS (spotlight overlay, dock, responsive) |

## What was removed from production

- Radial `ellipse` spotlight scrim (`--hero-spotlight-scrim`, `buildHeroSpotlightScrim`)
- Masked foliage darken (`hero-bg-fg::after` using the same scrim)
- Lower two-zone dock (`.hero-dock`, `.hero-dock__intro`, `.hero-dock__support`)

## Restore (rough steps)

1. Copy markup from archived `HomePage.tsx` hero section back into `web/components/HomePage.tsx`.
2. Restore `web/lib/hero-bg-layers-config.ts` and the hero CSS-var block in `web/components/SiteMotion.tsx` from the archived copies.
3. Merge `hero-eclipse-dock.css` back into `web/app/style.css` (hero vars in `:root`, then hero stage / overlay / dock rules).
4. Keep `--hero-scrim-a`, `--hero-scrim-b`, `--hero-veil` in `themes.css` (they may still exist for other uses).
