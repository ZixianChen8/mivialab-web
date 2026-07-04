# MiviaLab — Flagship homepage (Direction D)

A standalone, award-grade build of the MiviaLab homepage. Unlike the static
explorations alongside it, this direction is a full app prototype: it is the
flagship portfolio piece, so it doubles as proof that the studio builds premium
custom sites rather than templates. Every section funnels toward one action:
**contact**.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **CSS Modules** for styling (no Tailwind)
- **Lenis** smooth scroll + **GSAP** ScrollTrigger for motion
- One signature WebGL hero moment (raw WebGL, no extra dependency) with a
  static fallback on mobile and under `prefers-reduced-motion`

## Run it

```bash
cd design/flagship
npm install   # first time only
npm run dev   # http://localhost:3000
```

Production check:

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx            Fonts (Fraunces + Space Grotesk), Lenis, custom cursor
  page.tsx              Section composition + skip link
  globals.css           Color / type / motion tokens + reset
  components/           Nav, Footer, ContactForm, LenisProvider, CustomCursor
  sections/             Hero (+ HeroCanvas), Differentiators, Proof, Work,
                        Service, Studio, Contact
lib/                    gsap setup (+ signature ease), motion tokens, useReveal
public/                 WeChat QR + OG placeholders
```

## Notes / open items

Search the source for `// REVIEW` to find everything that needs real data
before this could ship: live Lighthouse scores, the bilingual testimonial and
before/after PageSpeed proof, the monthly price anchor, the included-vs-extra
line, real contact handles, the real WeChat QR, and a real form endpoint.

Portfolio integrity: **Meng Wei Yue Opera Studio Canada** is the only real
client and is labeled as such; every other project card is labeled
**Sample / Concept**.
