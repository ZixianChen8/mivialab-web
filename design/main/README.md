# Main design — MiviaLab

**Chosen working direction.** Combines:

1. **Hero** from [`cinematic/`](../cinematic/) — fullscreen nature image, splash-mask reveal, brand mark, floating nav, side panel, scroll cue, parallax
2. **Body language** from [`fashion-editorial/`](../fashion-editorial/) — magazine typography, bridge quote, grayscale→color imagery, contact poster

## Landing sections (site structure v1)

Order matches [`mivialab-site-structure.md`](../../assets/docs/mivialab-site-structure.md):

1. Hero  
2. About  
3. Outcomes  
4. Work  
5. Services  
6. How we work  
7. Who we help  
8. Offer  
9. Contact  

Services, How we work, and Who we help draw copy from [`mivialab-services-capability.md`](../../assets/docs/mivialab-services-capability.md).

**Out of v1 on this page:** Proof strip, Team, Blog, and Services/About/Pricing as *separate pages* (they live as landing sections for now).

## Open locally

```bash
cd design/main
python -m http.server 8080
```

Then visit `http://localhost:8080`.

Work detail stub: `http://localhost:8080/work/meng-wei-yue.html`

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
| `work/meng-wei-yue.html` | Work detail (real client) |
| `themes.css` | 10 color systems (`data-theme`) |
| `style.css` | Layout / type / components |
| `script.js` | Motion, form, carousel, theme chooser |
| `images/` | Hero, covers, gallery, logo, WeChat QR placeholder |
