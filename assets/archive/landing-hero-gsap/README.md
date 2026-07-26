# Landing hero GSAP (archived)

Snapshot of the home page hero that used **mwg_effect001** style horizontal scroll cards, splash reveal, and GSAP ScrollTrigger + Draggable.

Archived on 2026-07-25 when the live landing hero was simplified to a static cinematic stage (background layers + dock copy only).

## Contents

| File | Role |
|------|------|
| `HomePage.tsx` | Full home page component before archive (includes `HERO_CARDS`, splash SVG, `.hero-scroll-track`) |
| `SiteMotion.tsx` | Client motion shell with `enableHero` horizontal scrub, splash timer, and hero CSS var wiring |
| `hero-anim-config.ts` | Scrub, card layout, parallax, Lenis defaults |
| `hero-bg-layers-config.ts` | Sky / foliage / spotlight scrim (used by SiteMotion for CSS variables) |
| `hero-animation.css` | Extracted styles for cards, scroll track, and splash (from `web/app/style.css`) |

## What was removed from production

- Horizontal card rail and scroll runway
- GSAP scrub on `.hero__cards`, per-card parallax, drag-to-scroll
- CSS splash mask intro (`.artist-container.revealed`)
- `web/lib/hero-anim-config.ts` and `web/lib/hero-bg-layers-config.ts` (copies kept here)

## Restore (rough steps)

1. Copy markup from archived `HomePage.tsx` hero section back into `web/components/HomePage.tsx`.
2. Merge hero blocks from archived `SiteMotion.tsx` into `web/components/SiteMotion.tsx` and restore `enableHero` on home.
3. Restore lib configs under `web/lib/` and re-import them in SiteMotion.
4. Merge `hero-animation.css` back into `web/app/style.css` after the `.hero__clip` rule.

Reference GSAP demo: Made With Gaps **mwg_001** / effect001 horizontal sticky hero pattern.
