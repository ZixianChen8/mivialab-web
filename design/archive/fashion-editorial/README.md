# Fashion editorial — MiviaLab

Premium monochrome magazine landing with a cursor-driven color reveal on the hero portrait. Continuous editorial flow (not stacked slides): studio spread, chapter break, denser services, work carousel, honest proof slots, and a contact funnel.

## Open locally

```bash
cd design/fashion-editorial
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

Or open `index.html` directly (picsum placeholders need network).

## Images

All images currently use [picsum.photos](https://picsum.photos) seeded URLs so the prototype never looks empty. Replace with real assets when ready:

| Seed / role | Usage |
|-------------|--------|
| `mivialab-hero` | Hero portrait (BW + color layers — same seed) |
| `mivia-studio-a` … `d` | Studio collage |
| `mivia-chapter` | Full-bleed chapter break |
| `mivia-work-*` | Work carousel |
| `mivia-circle` | Circular statement |
| `mivia-proof-*` | Proof placeholders |
| `mivia-footer` | Contact portrait |

For the hero reveal, keep the grayscale and color layers as the **same crop**.

## Interactions

- **Hero:** hover (or tap) to reveal color via a soft radial mask
- **Images:** grayscale by default; color on hover in studio / work / proof
- **Carousel:** arrows + native swipe
- **Scroll:** staggered fade-up reveals
- **Contact:** short form → mailto draft; email / social secondary
