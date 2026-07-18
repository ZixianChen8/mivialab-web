# Design explorations

Static design prototypes and layout experiments for the MiviaLab site.

**Working direction:** [`main/`](main/) — cinematic hero + fashion-editorial body. Iterate here going forward.

**Compare archives:** open the [website chooser](index.html) (`design/index.html`). Serve the folder locally (e.g. `python -m http.server 8000` from `design/`) so relative links work.

| Folder | Mood |
|--------|------|
| [`main/`](main/) | **Chosen** — cinematic fullscreen hero + fashion-editorial magazine body |
| [`editorial/`](editorial/) | Editorial minimal — typography-led, premium studio |
| [`fashion-editorial/`](fashion-editorial/) | Fashion editorial — monochrome + hero color reveal, magazine layout *(body source for main)* |
| [`warm-studio/`](warm-studio/) | Warm & trustworthy — card-based, small-business friendly |
| [`precision-dark/`](precision-dark/) | Precision dark — proof-forward, developer credibility |
| [`cinematic/`](cinematic/) | Cinematic — fullscreen moody nature hero *(hero source for main)* |
| [`flagship/`](flagship/) | Flagship build — full Next.js + Lenis + GSAP app prototype (see its README to run) |
| [`trust-minimal/`](trust-minimal/) | Trust minimal — ui-ux-pro-max step-1 demo; single-column, Inter, contact-first |
| [`cartoon-motion/`](cartoon-motion/) | Cartoon motion — playful sticker look, centered transparent logo with mouse-reactive tilt |

Each subfolder is one explored direction. A direction can be a simple static HTML/CSS prototype or a full standalone app prototype (with its own `package.json`, dependencies, and build) — keep everything self-contained inside its own subfolder.

When the main design is ready for production, implement it in `web/`.
