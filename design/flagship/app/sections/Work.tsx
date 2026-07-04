"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Work.module.css";

type Project = {
  no: string;
  name: string;
  category: string;
  scope: string;
  blurb: string;
  real: boolean;
  tone: string;
};

const PROJECTS: Project[] = [
  {
    no: "01",
    name: "Meng Wei Yue Opera Studio Canada",
    category: "Cantonese opera \u00b7 arts & education",
    scope: "Bilingual site \u00b7 events \u00b7 ongoing care",
    blurb:
      "A living home for a Cantonese opera studio \u2014 performances, classes, and history \u2014 built bilingual and kept current by MiviaLab.",
    real: true,
    tone: "linear-gradient(135deg, #2a1410, #ff5436 160%)",
  },
  {
    no: "02",
    name: "Lumi\u00e8re Acad\u00e9mie",
    category: "Music & arts studio",
    scope: "Concept \u00b7 enrolment-focused",
    blurb:
      "A concept site for a music & arts academy: clear class schedules, instructor profiles, and a low-friction sign-up flow for parents.",
    real: false,
    tone: "linear-gradient(135deg, #131b2a, #3a5a8c 150%)",
  },
  {
    no: "03",
    name: "Maple & Moon",
    category: "TCM clinic & acupuncture",
    scope: "Concept \u00b7 booking-focused",
    blurb:
      "A concept for a traditional Chinese medicine clinic \u2014 calm, trustworthy, bilingual, with online booking front and centre.",
    real: false,
    tone: "linear-gradient(135deg, #10231a, #2f8f6a 150%)",
  },
  {
    no: "04",
    name: "Tealeaf Bakehouse",
    category: "Bakery & bubble tea",
    scope: "Concept \u00b7 menu & orders",
    blurb:
      "A concept for a neighbourhood bakery and tea shop: mouth-watering menu, store hours, and a fast path to order ahead.",
    real: false,
    tone: "linear-gradient(135deg, #2a1f10, #d99a3a 150%)",
  },
];

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Mixed-scroll moment: vertical scroll drives a horizontal pan across the
    // work, but only on wider screens with motion allowed. Otherwise the track
    // is a normal horizontal swipe / stack (see CSS).
    mm.add(
      "(min-width: 760px) and (prefers-reduced-motion: no-preference)",
      () => {
        const trackEl = track.current;
        const stageEl = stage.current;
        if (!trackEl || !stageEl) return;

        const amount = () =>
          Math.max(0, trackEl.scrollWidth - stageEl.clientWidth);

        const tween = gsap.to(trackEl, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: stageEl,
            start: "top top",
            end: () => "+=" + amount(),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={root} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span className={styles.index}>03</span> Selected work
        </p>
        <h2 className={styles.title}>One real client. A few honest concepts.</h2>
        <p className={styles.note}>
          We only have one live client so far &mdash; and we label it clearly.
          Everything marked <em>Sample / Concept</em> is our own design study,
          never a real client. Trust matters more than a long list.
        </p>
      </div>

      <div ref={stage} className={styles.stage}>
        <div ref={track} className={styles.track}>
          {PROJECTS.map((p) => (
            <article key={p.no} className={styles.card} data-cursor>
              <div
                className={styles.thumb}
                style={{ background: p.tone }}
                aria-hidden="true"
              >
                <span className={styles.thumbNo}>{p.no}</span>
                <span
                  className={styles.badge}
                  data-real={p.real || undefined}
                >
                  {p.real ? "Real client" : "Sample / Concept"}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardCat}>{p.category}</p>
                <p className={styles.cardBlurb}>{p.blurb}</p>
                <p className={styles.cardScope}>{p.scope}</p>
              </div>
            </article>
          ))}

          <div className={styles.endCard}>
            <p className={styles.endText}>Your business could be next.</p>
            <a href="#contact" className={styles.endCta} data-cursor>
              Start your project &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
