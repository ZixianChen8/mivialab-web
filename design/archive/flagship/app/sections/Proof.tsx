"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MIVIA_EASE } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import styles from "./Proof.module.css";

// REVIEW: placeholder scores. Replace with a live PageSpeed Insights / Lighthouse
// run for mivialab.ca before launch, and link to the public report.
const METRICS = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
];

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-count]");
      nums.forEach((node) => {
        const target = Number(node.dataset.count || "0");
        if (reduced) {
          node.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: MIVIA_EASE,
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.v));
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proof" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} data-reveal>
            <span className={styles.index}>02</span> Proof
          </p>
          <h2 className={styles.title} data-reveal>
            Proof, not promises.
          </h2>
          <p className={styles.lead} data-reveal>
            This very site is our benchmark. Here&rsquo;s how MiviaLab.ca scores
            on Google&rsquo;s own performance audit &mdash; the same test we hold
            every client site to.
          </p>
        </header>

        <ul className={styles.metrics} data-stagger>
          {METRICS.map((m) => (
            <li key={m.label} className={styles.metric}>
              <span className={styles.value}>
                <span data-count={m.value}>0</span>
                <span className={styles.outOf}>/100</span>
              </span>
              <span className={styles.metricLabel}>{m.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.source} data-reveal>
          {/* REVIEW: link to the live Lighthouse / PageSpeed Insights report. */}
          Measured with Google Lighthouse. {/* REVIEW */} Live report link to be
          added.
        </p>

        <div className={styles.grid}>
          <div className={styles.security} data-reveal>
            <h3 className={styles.cardTitle}>Security is not an add-on</h3>
            <p className={styles.cardText}>
              We run regular security reviews and keep every site patched,
              monitored, and backed up &mdash; so a small business never becomes
              an easy target, and customer data stays where it belongs.
            </p>
          </div>

          <figure className={styles.testimonial} data-reveal>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            {/* REVIEW: replace with the real bilingual testimonial from
                Meng Wei Yue Opera Studio (name, role, photo) once collected. */}
            <blockquote className={styles.quote}>
              Bilingual client testimonial goes here &mdash; a short, specific
              quote about speed, trust, or working with the studio.
            </blockquote>
            <figcaption className={styles.cite}>
              <span className={styles.reviewTag}>// REVIEW</span> Testimonial
              pending from Meng&nbsp;Wei&nbsp;Yue Opera Studio Canada
            </figcaption>
          </figure>

          <div className={styles.beforeAfter} data-reveal>
            <h3 className={styles.cardTitle}>Before / after</h3>
            <p className={styles.cardText}>
              <span className={styles.reviewTag}>// REVIEW</span> Drop in a
              before/after PageSpeed comparison and design screenshots from a
              real rebuild to make the speed story undeniable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
