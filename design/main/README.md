# Main design — MiviaLab

**Chosen working direction.** Combines:

1. **Hero** from [`cinematic/`](../archive/cinematic/) — fullscreen nature image, splash-mask reveal, brand mark, floating nav, side panel, scroll cue, parallax
2. **Body language** from [`fashion-editorial/`](../archive/fashion-editorial/) — magazine typography, bridge quote, grayscale→color imagery, contact poster

## Landing sections (site structure v1)

Order matches [`mivialab-site-structure.md`](../../assets/docs/mivialab-site-structure.md). No section labels — titles read as one story:

1. Hero  
2. Pitch  
3. Outcomes  
4. Work  
5. Pricing  
6. Contact  

Studio depth lives on [`about.html`](./about.html). Pricing copy draws from [`mivialab-services-capability.md`](../../assets/docs/mivialab-services-capability.md).

**Out of v1 as separate pages:** Proof strip, Team, Blog, Pricing/Contact as their own routes.

## Open locally

```bash
cd design/main
python -m http.server 8080
```

Then visit `http://localhost:8080`.

- About: `http://localhost:8080/about.html`
- Work detail stub: `http://localhost:8080/work/meng-wei-yue.html`

## Color systems

Ten live palettes in `themes.css`. Use the **Color systems** control (bottom-right) to preview; choice persists in `localStorage` (`mivialab-color-system`). Keys `1`–`0` while the panel is open.

| # | ID | Direction |
|---|----|-----------|
| 1 | `pine-fog` | Fogged trail at dusk (current baseline) |
| 2 | `slate-studio` | Cool Ottawa glass office |
| 3 | `ink-brass` | Evening gallery + brass |
| 4 | `harbour-blue` | Lake morning / navy + cobalt |
| 5 | `cedar-ember` | Cabin desk + ember accent |
| 6 | `snowfield` | Bright winter, light-first |
| 7 | `oxblood` | Committed red-black darks |
| 8 | `volt-night` | Near-black + chartreuse edge |
| 9 | `stone-clay` | Restrained stone + clay accent |
| 10 | `northern-teal` | Deep teal-black + mint |

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page + theme chooser |
| `about.html` | Studio about page |
| `work/meng-wei-yue.html` | Work detail (real client) |
| `themes.css` | 10 color systems (`data-theme`) |
| `style.css` | Layout / type / components |
| `script.js` | Motion, form, carousel, theme chooser |
| `images/` | Hero, covers, gallery, logo, WeChat QR placeholder |
