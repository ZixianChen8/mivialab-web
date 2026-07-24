# MiviaLab — Website Structure (v1)

Source of positioning and messaging: [`mivialab-business.md`](./mivialab-business.md).  
Services / process / capability source: [`mivialab-services-capability.md`](./mivialab-services-capability.md).  
Vocabulary: [`CONTEXT.md`](../../CONTEXT.md) at repo root.  
Decision record: [`adr/0001-lean-multi-page-v1.md`](./adr/0001-lean-multi-page-v1.md).

## Single job

Get strangers to trust MiviaLab enough to reach out. The site funnels to one **primary contact action** (short form; WeChat QR as strong secondary).

## Shape

**Lean multi-page:** the landing page does the persuasion work. Additional URLs exist only when content earns them. Topics that are still thin stay as **landing sections**, not separate pages.

### URLs in v1

| URL | Role |
|---|---|
| `/` | Landing page — full persuasion scroll |
| `/about` | Studio story — who MiviaLab is |
| `/work/meng-wei-yue` | Work detail — Meng Wei Yue Opera Studio (real client) |

### Explicitly not in v1

- `/work` index
- `/services`, `/pricing`, `/contact` as pages
- Team page, Blog
- Language switcher / `/fr` / `/zh` routes
- Proof section (until real proof assets exist)

## Landing page (`/`)

English only. No section labels or numbered section chrome. Section titles read as one continuous story.

Section order:

1. **Hero** — brand, one headline, one short line, CTA into the funnel
2. **Pitch** — problem/promise (why a custom site matters); link to `/about` for studio depth
3. **Outcomes** — buyer results (speed, security, custom build, full service)
4. **Work** — real client + clearly labeled concept samples; link to Work detail when it exists
5. **Pricing** — three build packages starting at $999 / $1,499 / $2,999; monthly care priced on request
6. **Contact** — short form (primary), WeChat QR (secondary), other channels subordinate

## About page (`/about`)

Studio positioning: Canadian / Ottawa–Toronto corridor, between freelance and agency, bilingual capability as a premium feature. Ends with CTA into the same primary contact action (`/#contact`).

## Work detail (`/work/[slug]`)

### Who gets a URL

- **Real client work** may get a Work detail. v1: Meng Wei Yue Opera Studio only.
- **Concept samples** stay on the landing Work section, clearly labeled. They do not get a Work detail until they have enough substance — and remain labeled as concepts even then.

### Section order

1. **Hero** — project name + real-client framing
2. **Story** — short narrative
3. **Visuals** — the work itself
4. **Outcomes** — only facts you can stand behind
5. **CTA** — into the same primary contact action on the landing page (`/#contact`)

No related-work carousel, fake metrics, or a second contact funnel.

## Language

The marketing site ships **English only** in v1. “We build bilingual sites (EN / FR / 中文)” is an Offer/About capability, not a requirement that this site is translated.

## Graduation rules (when to grow)

| Add… | When… |
|---|---|
| Proof strip on `/` | Real testimonial and/or PageSpeed before/after exists |
| Another `/work/[slug]` | Real client, or a concept sample with enough depth (still labeled concept) |
| `/work` index | Enough Work details that browsing needs its own page |
| `/pricing` as its own page | Pricing content outgrows the landing section; monthly care price / included-vs-extra line is clearer |
| Locale routes | Real translated copy and a clear buyer reason (e.g. Ottawa FR) |

## Open items (from business doc — do not invent)

- Clearer line for “new feature = extra” vs included upkeep
- Ballpark monthly care-plan price (build starting prices are published on the landing Pricing section)
