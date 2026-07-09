# Cinematic direction

A moody, minimal, nature-inspired landing page where the **image dominates** and the UI floats above it. Inspired by atmospheric artist sites (e.g. Sivert Høyem), re-cast for **MiviaLab** — the studio is the "artist," projects are the "work," and the process replaces tour dates.

## Run

Static HTML/CSS/JS — no build step. Open `index.html` directly, or serve the folder:

```bash
cd design/cinematic
python3 -m http.server 8000
# visit http://localhost:8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Structure: hero, nav, brand mark, side social panel, work, process, reel, gallery, contact, footer |
| `style.css` | Cinematic dark theme, fullscreen hero, splash mask, hover zooms, reveals |
| `script.js` | Parallax hero, scroll fade-ins, splash reveal on load, footer year |
| `images/` | Generated cinematic imagery + MiviaLab logo |

## Design notes

- **Hero** is `100vh` with a fullscreen `background-size: cover` image and a dark gradient overlay (`rgba(0,0,0,0.35) → rgba(0,0,0,0.6)`) for text legibility.
- **Splash reveal**: an SVG mask of white circles centered at `50% 50%` scales up (`scale(0) → scale(13–18)`) to reveal the hero. It fires on load (`.revealed`) and also responds to hover.
- **Parallax**: the hero background drifts slower than scroll via `requestAnimationFrame`.
- **Motion is slow and calm** — long eases, no flashy effects. Respects `prefers-reduced-motion`.

## Content mapping (artist template → MiviaLab)

| Artist site | MiviaLab |
|---|---|
| Artist name (SIVERT / HØYEM) | MIVIA / LAB |
| MUSIC / LIVE / VIDEO / ABOUT | Work / Process / Reel / Studio |
| Latest music (albums) | Selected work (Opera Studio client + labeled sample concepts) |
| Live tour dates | How we work (4-step process) |
| Video embed | Studio reel |
| Photo gallery | Studio field notes |
| Follow / Listen | Instagram · LinkedIn · RedNote · WeChat (secondary) |

Sample projects are clearly labeled as **concepts**, per business rules. Meng Wei Yue Opera Studio is the only real client shown.
