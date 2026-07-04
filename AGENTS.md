# AGENTS.md

Guidance for AI agents working in the **mivialab-web** repository.

## Project overview

Monorepo for the **MiviaLab** marketing website: design explorations, production code, and shared assets.

**MiviaLab** is a web development and digital design studio that builds modern, fast, custom websites for small businesses, with supporting branding/graphic design (and possibly digital marketing later).

- **Mission:** Help small businesses succeed online with websites that are modern, professional, easy to use, and built around real business needs.
- **Vision:** Become a trusted web development partner for small businesses through high-quality design and a straightforward development process.
- **Based in:** Ottawa–Toronto corridor.

The production tech stack is **not chosen yet** — `web/` is a placeholder until implementation begins.

## Repository structure

```
mivialab-web/
├── design/          # Design prototypes (one self-contained subfolder per direction: static HTML/CSS or full standalone app)
├── web/             # Production site — full tech stack lives here
├── assets/          # Docs, images, and other shared files (not the web app's public folder)
│   ├── docs/        # Strategy and reference documents
│   └── images/      # Logos, photos, raw media
├── .cursor/rules/   # Cursor agent rules (always-applied context)
├── AGENTS.md        # This file
└── README.md
```

### Where things go

| What | Where |
|---|---|
| Layout / visual experiments | `design/<name>/` |
| Deployable website | `web/` |
| Business strategy, copy docs | `assets/docs/` |
| Logos, photos, raw media | `assets/images/` |
| Agent rules | `.cursor/rules/` |

### Folder rules

- **`design/`** — One subfolder per explored direction (e.g. `design/option-a/`). A direction may be simple static HTML/CSS, or a full standalone app prototype with its own `package.json`, dependencies, and build tooling — as long as everything stays self-contained inside that subfolder.
- **`web/`** — Production app, build config, and deployable output. Runtime public assets live in `web/`'s own public/static path, not in `assets/`.
- **`assets/`** — Shared source files. Copy or link into `web/` when the site needs them at runtime.

When a design direction is chosen in `design/`, implement it in `web/`.

## Business context (read before copy or UX work)

**Full document:** [`assets/docs/mivialab-business.md`](assets/docs/mivialab-business.md)

Read that file before writing copy, CTAs, portfolio content, pricing language, or any user-facing material.

### Website goal

Get strangers to trust MiviaLab enough to reach out. The entire site funnels toward **one primary contact action**.

- **Primary CTA:** Short contact form (recommended). WeChat QR as a strong secondary for community leads.
- **Secondary contact:** Email, phone, Instagram, LinkedIn, RedNote, WeChat — present but smaller and below the primary action. Keep hierarchy disciplined; six equal options is a menu, not a funnel.

### Positioning

- **Public brand:** Canadian / Ottawa web design & development studio. English-first, premium, broad. **Not** labeled as a "Chinese niche" studio.
- **Headline direction:** "MiviaLab — web design & development studio in Ottawa."
- **Bilingual capability** (EN / FR / 中文) is a premium feature, not the brand identity. French is genuinely deliverable.
- **Go-to-market wedge:** Chinese community network (WeChat, RedNote, community referrals) lands early clients — but the public site reads as a clean Canadian studio to everyone.

### Differentiators — use buyer outcomes, not jargon

| Capability | Message |
|---|---|
| Speed / no bloat | Loads fast so you stop losing customers (prove with PageSpeed Insights) |
| Security | Protect customer data; regular reviews and updates |
| Full custom build | Clean code vs. Wix/Squarespace templates |
| Full service | Owner never has to touch their site |

### Pricing model

- Monthly subscription: maintenance, security updates, ongoing customization, continuous SEO.
- **Included:** Edits to existing content and upkeep.
- **Extra (quoted separately):** New features, pages, or integrations after delivery — even for subscribers.

### Languages

- **Default:** English
- **Available:** EN / FR / 中文

### Portfolio & proof

- **Real client:** Meng Wei Yue Opera Studio (only real project so far).
- **Sample sites:** Must be clearly labeled as samples/concepts — never implied as real clients.
- **Proof to collect:** Bilingual testimonial, before/after PageSpeed, before/after design screenshots.

### Target verticals (for sample sites & outreach)

Pick two — final choice still open. Suggested combo: education/arts (#4) + one high-value vertical (#2 or #5).

1. Restaurants / bubble tea / bakeries
2. TCM clinics / acupuncture / massage / dental
3. Beauty: nail / hair / lash / med-spa
4. Tutoring / education / music & arts studios *(recommended — matches real client)*
5. Immigration / accounting / real estate

## Open items (do not invent answers)

These are unresolved in the business doc — flag them rather than making up values:

- Clear line for what counts as "new feature = extra" vs. included upkeep
- Ballpark monthly subscription price

## Agent conventions

- Prefer minimal, focused changes scoped to the correct folder (`design/` vs. `web/` vs. `assets/`).
- Match existing conventions in each folder once code exists.
- Do not commit unless explicitly asked.
- Do not put shared docs or raw media in `web/public` — use `assets/` and copy in when needed.
- For business decisions, treat `assets/docs/mivialab-business.md` as source of truth.

## Related files

| File | Purpose |
|---|---|
| [`assets/docs/mivialab-business.md`](assets/docs/mivialab-business.md) | Full strategy & positioning |
| [`.cursor/rules/mivialab-business.mdc`](.cursor/rules/mivialab-business.mdc) | Cursor rule — business quick reference |
| [`.cursor/rules/project-structure.mdc`](.cursor/rules/project-structure.mdc) | Cursor rule — repo layout |
| [`README.md`](README.md) | Human-readable repo overview |
