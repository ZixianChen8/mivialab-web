# MiviaLab Marketing Website — PRD (v1)

| | |
|---|---|
| **Product** | MiviaLab marketing website |
| **Version** | v1 |
| **Status** | Ready for design / implementation |
| **Owner** | MiviaLab |
| **Related docs** | [`mivialab-business.md`](./mivialab-business.md), [`mivialab-site-structure.md`](./mivialab-site-structure.md), [`adr/0001-lean-multi-page-v1.md`](./adr/0001-lean-multi-page-v1.md), [`CONTEXT.md`](../../CONTEXT.md) |

---

## 1. Summary

Build a lean marketing site that makes a stranger trust MiviaLab enough to reach out. Persuasion happens on one English landing page; one Work detail URL exists for the only real client. Everything funnels to a short contact form (WeChat QR strong secondary).

**One-line outcome:** A visitor understands who MiviaLab is, what outcomes they get, sees honest work, and can contact the studio in under a minute.

---

## 2. Problem

Small-business owners who might hire MiviaLab currently have no clear, credible public surface that:

- Positions the studio as a Canadian / Ottawa web design & development partner (not a niche or template shop)
- Shows real work without padding the portfolio with fake clients
- Makes the next step obvious (one contact action, not six equal channels)

Without this, referrals and community leads have nothing polished to land on, and cold visitors cannot evaluate trust quickly.

---

## 3. Goals

| Goal | How we know |
|---|---|
| Build trust fast | Visitor can state what MiviaLab does and for whom after one scroll of `/` |
| One clear action | Primary path is the short contact form; secondary channels do not compete visually |
| Honest portfolio | Real client vs concept samples are impossible to confuse |
| On-brand positioning | No “Chinese niche” framing in headline/nav; bilingual shown as capability |
| Ship thin, grow later | v1 matches lean multi-page IA; empty pages and placeholder Team/Blog are out |

### Non-goals (v1)

- Full agency sitemap (Services / About / Pricing / Contact as separate pages)
- Blog, Team page, careers, or CMS-heavy content engine
- Localized marketing site (FR / 中文 routes or language switcher)
- Published monthly care-plan price (still an open business decision)
- Digital marketing service pages
- Client login / project portal
- Choosing or locking the production tech stack in this PRD (`web/` remains the implementation home)

---

## 4. Users

### Primary — small-business owner (buyer)

- Runs a local business (Ottawa–Toronto corridor and similar)
- Needs a modern site and does not want to manage it day to day
- May arrive via referral, WeChat/RedNote, Google, or Instagram
- Judges trust from clarity, proof, and professionalism — not jargon

### Secondary — community / referral lead

- Often arrives via WeChat or personal intro
- May prefer WeChat to continue the conversation
- Still sees an English-first Canadian studio site (wedge ≠ public identity)

### Out of scope as v1 audiences

- Enterprise procurement
- Job seekers
- Other agencies looking for subcontract detail pages

---

## 5. Product principles

1. **One job** — trust → contact. Every section either builds trust or moves toward the form.
2. **Thin stays on the landing page** — no page until content earns a URL.
3. **Buyer outcomes, not engineering** — speed, security, custom build, full service in owner language.
4. **Never fake clients** — concept samples are labeled; Work details are real-client-only in v1.
5. **Contact hierarchy** — form primary; WeChat strong secondary; email/phone/social subordinate.
6. **Do not invent open business facts** — no fake price, fake testimonials, or fake metrics.

---

## 6. Scope — information architecture

Per [`mivialab-site-structure.md`](./mivialab-site-structure.md) and ADR-0001:

| URL | In v1? | Purpose |
|---|---|---|
| `/` | Yes | Landing page — full persuasion scroll |
| `/work/meng-wei-yue` | Yes | Work detail — Meng Wei Yue Opera Studio |
| `/work` index | No | — |
| `/services`, `/about`, `/pricing`, `/contact` | No | Covered as landing sections where needed |
| Locale routes / switcher | No | — |

**Site language:** English only. Bilingual (EN / FR / 中文) is described as a client capability in Offer/About, not as site locales.

---

## 7. Functional requirements

### 7.1 Landing page (`/`)

Must implement sections **in this order**:

| # | Section | Requirements |
|---|---|---|
| 1 | **Hero** | Brand-level signal for MiviaLab; one headline; one short supporting line; CTA toward Contact (scroll/anchor or equivalent). Positioning: Ottawa web design & development studio — English-first, not niche-labeled. |
| 2 | **Outcomes** | Present buyer outcomes: fast loads, security, full custom (not templates), full service (owner never has to touch the site). No engineering jargon as the lead. |
| 3 | **Work** | Show real client (Meng Wei Yue) with link to `/work/meng-wei-yue`. May show concept samples **only if clearly labeled** as concepts/samples. Concepts must not look like clients. |
| 4 | **Offer** | Describe site build + monthly care plan (maintenance, security, customization, ongoing SEO). State that new features/pages/integrations after delivery are quoted separately. **Do not invent a monthly dollar amount** while it remains open. |
| 5 | **About** | Short studio note (Ottawa–Toronto). Mention bilingual site builds (EN / FR / 中文) as a premium capability, not brand identity. |
| 6 | **Contact** | Short form as primary contact action. WeChat QR as strong secondary. Other channels (email, phone, Instagram, LinkedIn, RedNote, WeChat link) present but visually subordinate. |

**Proof strip:** Out of v1 unless real assets exist (testimonial with name/photo and/or PageSpeed before/after). Do not ship an empty Proof section.

**Explicitly exclude:** Team placeholders, Blog, equal-weight “contact menu” of six channels.

### 7.2 Work detail (`/work/meng-wei-yue`)

| # | Section | Requirements |
|---|---|---|
| 1 | **Hero** | Project name + clear real-client framing |
| 2 | **Story** | Short narrative (context → what was built → outcome). No padding. |
| 3 | **Visuals** | Real screenshots / design artifacts of the work |
| 4 | **Outcomes** | Only claims that are true for this project |
| 5 | **CTA** | Same primary contact action as the landing page (e.g. link/scroll to `/#contact`). No second funnel. |

**Exclude:** Related-work carousel mixing concepts, fake metrics, separate contact form with different fields/purpose unless it submits to the same primary action.

### 7.3 Navigation & chrome

- Header: brand/home; links that support the funnel (e.g. Work anchor or Work detail; Contact anchor). Not a five-item agency nav.
- Footer: may repeat subordinate channels and legal links if needed; must not outrank the Contact section form.
- Deep links to `/work/meng-wei-yue` must work (WeChat / referral sharing).

### 7.4 Contact form

| Requirement | Detail |
|---|---|
| Fields | Keep short — recommend name, contact method (email and/or phone), short message; avoid long questionnaires |
| Primary success | Submission reaches the studio (implementation may be form backend, email relay, or equivalent — choose in implementation; must be reliable) |
| Failure | User sees a clear error and can retry or use a visible fallback (e.g. email) |
| Success | Clear confirmation; no dead end |
| Spam | Basic abuse protection appropriate to the chosen implementation |
| Privacy | Do not promise policies you have not published; if personal data is collected, provide a minimal privacy notice when legal requires it |

Exact field list and vendor (Formspree, Resend, custom API, etc.) are **implementation decisions**, not locked in this PRD.

### 7.5 Content rules (copy & portfolio)

- Default copy language: English.
- Headline direction: Canadian / Ottawa studio; no “Chinese” in the primary headline.
- WeChat / RedNote: available as contact options, not the whole story.
- Concept samples: always labeled; never implied as clients.
- No fabricated testimonials, PageSpeed scores, or client logos.

### 7.6 Quality bar

- Usable on desktop and mobile.
- Fast, accessible enough for a professional studio site (keyboard-reachable primary actions, readable contrast, meaningful link text).
- Production implementation lives under `web/` when build starts; design explorations may continue under `design/` but v1 acceptance is against the production site.

---

## 8. Success metrics (v1)

Qualitative first (early studio, low traffic):

| Signal | Target |
|---|---|
| Inbound via form | Studio receives usable leads from the form |
| WeChat path | Community leads can continue on WeChat without hunting |
| Trust check | Internal review: stranger test — “Would I contact them?” |
| Honesty check | No reviewer mistakes a concept sample for a client |

Quantitative (track when analytics exist):

| Metric | Note |
|---|---|
| Form submit rate | Visits → successful submits |
| Work detail → Contact | Clicks from `/work/meng-wei-yue` CTA to Contact |
| Bounce / scroll depth on `/` | Directional only; do not optimize vanity |

Analytics tooling is optional for launch but recommended soon after.

---

## 9. Dependencies & open items

### Dependencies

- Real visuals / story content for Meng Wei Yue Work detail
- WeChat QR asset for Contact
- Final contact channels to show (email, phone, social URLs as available)
- Design direction chosen from `design/` (or new production design) before or during `web/` build

### Open business items (do not invent in the product)

- Ballpark monthly care-plan price
- Clearer line for included upkeep vs “new feature = extra”
- Final two target verticals for future concept samples
- Proof assets to collect: bilingual testimonial, PageSpeed before/after, design before/after

### Graduation (post-v1 triggers)

Documented in the site structure doc: Proof strip, more Work details, `/work` index, Services/Pricing pages, locales — only when content and business facts earn them.

---

## 10. Acceptance criteria (v1 done when)

- [ ] `/` ships with Hero → Outcomes → Work → Offer → About → Contact in that order
- [ ] `/work/meng-wei-yue` ships with Hero → Story → Visuals → Outcomes → CTA to primary contact
- [ ] Concept samples (if any) are explicitly labeled; cannot be read as clients
- [ ] Contact form works end-to-end; WeChat QR visible as secondary
- [ ] Other channels are subordinate to the form
- [ ] Site is English-only; bilingual mentioned only as capability
- [ ] No Team/Blog/empty Proof; no fabricated price or metrics
- [ ] Mobile and desktop usable; primary CTA reachable
- [ ] Positioning matches business doc (Ottawa studio, English-first, not niche-branded)

---

## 11. Out of scope checklist (quick reject list)

Anything that adds pages or funnels without earning them: pricing page with guessed $, multi-locale launch, blog, team grid, fake case studies, chatbot, lead-magnet popup walls, six equal contact buttons in the hero.
