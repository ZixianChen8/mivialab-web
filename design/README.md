# Design explorations

Static design prototypes and layout experiments for the MiviaLab site.

**Working direction (reference):** [`main/`](main/) — cinematic hero + fashion-editorial body. Keep as the visual source of truth.

**Production implementation:** [`../web/`](../web/) — Next.js App Router port of Main (CSS + GSAP/Lenis + theme switcher).

**Archived explorations:** [`archive/`](archive/) — earlier directions plus the old Vite React scaffold (`archive/web-vite-react/`).

**Compare prototypes:** open the [website chooser](index.html) (`design/index.html`). Serve the folder locally (e.g. `python -m http.server 8000` from `design/`) so relative links work.

| Folder | Mood |
|--------|------|
| [`main/`](main/) | **Chosen reference** — cinematic fullscreen hero + fashion-editorial magazine body |
| [`archive/`](archive/) | Retired directions — see each subfolder's README |

Each subfolder is one explored direction. A direction can be a simple static HTML/CSS prototype or a full standalone app prototype (with its own `package.json`, dependencies, and build) — keep everything self-contained inside its own subfolder.
