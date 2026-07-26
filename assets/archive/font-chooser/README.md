# Font chooser (archived)

Dev-only UI for previewing sans, serif, and slab stacks via `data-font` on `<html>` and `localStorage` key `mivialab-font-system`.

Archived on 2026-07-25 when typography was locked to **Libre Baskerville** for production.

## Contents

| File | Role |
|------|------|
| `FontChooser.tsx` | Fixed bottom-right panel and font list |
| `SiteChoosers.tsx` | Wrapper that mounted `FontChooser` on key pages |
| `fonts.ts` | Font catalog, Google Fonts bundle URL, helpers |
| `fonts.css` | Per-font CSS custom properties (`[data-font="…"]`) |
| `fonts-self-hosted.css` | Ranade, Object Sans, Soria, Sreda `@font-face` rules |
| `font-chooser-styles.css` | `.site-choosers` and `.font-chooser*` from `web/app/style.css` |

## What was removed from production

- `<SiteChoosers />` on home, about, and work detail pages
- Multi-font Google Fonts request (single Libre Baskerville link remains)
- Self-hosted preview fonts import in `globals.css`
- `data-font` attribute and font persistence in `theme-init-script.ts`

## Restore (rough steps)

1. Copy component and lib files back into `web/components/` and `web/lib/`.
2. Restore `fonts.css` and `fonts-self-hosted.css` under `web/app/`, re-import self-hosted in `globals.css`.
3. Merge `font-chooser-styles.css` into `web/app/style.css`.
4. Mount `<SiteChoosers />` where needed and restore `data-font` on `<html>` in `layout.tsx`.
