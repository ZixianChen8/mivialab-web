# Hero kicker + brand tagline (archived)

Snapshot of the two supporting hero lines above/beside the main headline and CTAs in the lower **hero dock** layout.

Archived on 2026-07-26 when the live hero was simplified to headline + actions only (same markup on mobile and desktop; responsive rules lived on `.hero-dock` only).

## Contents

| File | Role |
|------|------|
| `HomePage.fragment.tsx` | Removed JSX for kicker and tagline |
| `hero-kicker-tagline.css` | Styles for `.hero-kicker` and `.brand-tagline` |

## Copy

- **Kicker:** Ottawa–Toronto studio
- **Tagline:** Custom sites, cared for end to end. (same line as `PITCH_SUPPORT` in `web/lib/pitch-anim-config.ts`)

## Restore

1. Merge `hero-kicker-tagline.css` back into `web/app/style.css` (near other hero dock rules).
2. Paste fragments from `HomePage.fragment.tsx` into `web/components/HomePage.tsx` inside `.hero-dock__intro` and `.hero-dock__support`.
3. Restore `.hero-actions { margin-top: 1.15rem; }` on the support column if you removed the zero margin tweak.
