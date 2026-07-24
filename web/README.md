# MiviaLab website (production)

Next.js App Router implementation of the Main design reference at [`../design/main/`](../design/main/).

**Stack:** Next.js · TypeScript · ported Main CSS (no Tailwind) · GSAP + ScrollTrigger + Lenis · Resend contact API · Vercel-ready

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Page |
|-------|------|
| `/` | Landing (hero + pitch + outcomes + work + pricing + contact) |
| `/about` | Studio about |
| `/work/meng-wei-yue` | Real client work detail |

## Contact form

Copy [`.env.local.example`](./.env.local.example) to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- optional `CONTACT_FROM_EMAIL`

In development without keys, `POST /api/contact` logs a stub and returns success so the UI can be tested.

## Design reference

Visual source of truth remains **`design/main/`**. Do not delete it. Port look and motion faithfully; do not cut GSAP/Lenis choreography without asking.

## Build

```bash
npm run build
npm start
```

Deploy the `web/` directory to Vercel.

## Reminders

1. **Add a loading animation** — Cover the gap between first paint and client-ready state (Google Fonts load, React hydration, GSAP/Lenis/hero splash init). Should mask FOUT and the hero looking “wrong” before `.revealed` and ScrollTrigger pin; dismiss once fonts + motion are ready (match `design/main` splash feel where possible).
