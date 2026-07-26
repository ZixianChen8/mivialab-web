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
| `/` | Landing (hero + approach + services + contact) |
| `/about` | Studio about |
| `/privacy` | Privacy policy and website data practices |

Inactive route source is preserved under `app/_inactive/` for future reuse.

## Contact form

Copy [`.env.local.example`](./.env.local.example) to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- optional `CONTACT_FROM_EMAIL`

In development without keys, `POST /api/contact` logs a stub and returns success so the UI can be tested.

## Search and analytics configuration

Set `NEXT_PUBLIC_SITE_URL` to the verified production origin before launch. The
site remains `noindex` when a public canonical origin is unavailable, which
prevents preview and local builds from entering search results.

Optional launch settings:

- `GOOGLE_SITE_VERIFICATION` for Google Search Console
- `BING_SITE_VERIFICATION` for Bing Webmaster Tools
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` for privacy-limited GA4 page views, CTA
  clicks, contact clicks, and successful lead submissions. Analytics runs only
  on an indexable production build and strips query strings from page data.

When GA4 is configured, analytics starts after the browser preference check.
New visitors see a cookie banner with Accept, Decline, and Cookie settings
controls. A decline prevents GA4 from loading on later visits in that browser.
The saved choice expires after one year and is rechecked on the next full page
load or storage change. Visitors can reopen Cookie settings from the footer at
any time.

Only `/`, `/about`, and `/privacy` are included in the sitemap. After deployment,
verify the production domain, submit `/sitemap.xml`, and inspect all 3 active
URLs in Search Console.

In the GA4 property:

- set event-data retention to 14 months;
- disable Enhanced Measurement page views based on browser-history changes,
  because the site sends its own App Router page views; and
- mark `generate_lead` as a key event after it first appears.

### One-time page and query ownership

No verified production domain or Search Console query data was available during
the July 2026 optimization pass. The provisional map below uses MiviaLab's
business positioning and a live review of Ottawa web design search results:

- `/` owns commercial Ottawa intent for web design, web development, custom
  websites, and small-business websites.
- `/about` owns branded studio-story and founder intent.

Review Search Console page and query data after launch before materially
changing titles, H1s, descriptions, or page intent.

## Design reference

Visual source of truth remains **`design/main/`**. Do not delete it. Port look and motion faithfully; do not cut GSAP/Lenis choreography without asking.

## Build

```bash
npm run build
npm start
```

Deploy the `web/` directory to Vercel.

## Reminders

1. **Add a loading animation:** Cover the gap between first paint and client-ready state (Google Fonts load, React hydration, GSAP/Lenis/hero splash init). Should mask FOUT and the hero looking “wrong” before `.revealed` and ScrollTrigger pin; dismiss once fonts + motion are ready (match `design/main` splash feel where possible).
