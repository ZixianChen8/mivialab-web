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
| `/work/meng-wei-yue` | Work detail — Meng Wei Yue Opera Studio (real client) |

### Explicitly not in v1

- `/work` index
- `/services`, `/about`, `/pricing`, `/contact` as pages
- Team page, Blog
- Language switcher / `/fr` / `/zh` routes
- Proof section (until real proof assets exist)

## Landing page (`/`)

English only. Section order:

1. **Hero** — brand, one headline, one short line, CTA into the funnel
2. **About** — studio note + positioning (between a freelance builder and a big agency); bilingual capability (EN / FR / 中文) as a premium feature, not brand identity
3. **Outcomes** — buyer results (speed, security, custom build, full service)
4. **Work** — real client + clearly labeled concept samples; link to Work detail when it exists
5. **Services** — five categories, dev-led (website design & development primary; SEO, maintenance, marketing support, promotional materials supporting); honesty note on out-of-scope work
6. **How we work** — 5-step process (talk it through, plan & scope, design & build, review & launch, ongoing care)
7. **Who we help** — "is this you?" fit list + client types
8. **Offer** — site build + monthly care plan; no fabricated monthly price while that amount is still open
9. **Contact** — short form (primary), WeChat QR (secondary), other channels subordinate

About moves to second so a stranger learns who MiviaLab is before the pitch. Services, How we work, and Who we help were added (from the capability report) to give the page more substance and to connect the sections into one funnel. This is richer than the original 6-section lean shape but stays a single landing page — no `/services`, `/about`, or `/process` routes yet.

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
| `/services` or `/pricing` | Offer content is thick enough that a landing section is no longer enough; monthly price / included-vs-extra line is clearer |
| Locale routes | Real translated copy and a clear buyer reason (e.g. Ottawa FR) |

## Open items (from business doc — do not invent)

- Ballpark monthly care-plan price
- Clearer line for “new feature = extra” vs included upkeep
