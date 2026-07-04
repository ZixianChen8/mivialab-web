"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import styles from "./Service.module.css";

const INCLUDED = [
  "Hosting, maintenance & uptime monitoring",
  "Security reviews, updates & backups",
  "Edits to your existing content & pages",
  "Ongoing design tweaks & refinements",
  "Continuous SEO & performance tuning",
];

const EXTRA = [
  "Brand-new pages or sections",
  "New features & functionality",
  "Third-party integrations (booking, payments, etc.)",
  "Additional languages beyond your launch set",
];

export default function Service() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="service" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} data-reveal>
            <span className={styles.index}>04</span> How it works
          </p>
          <h2 className={styles.title} data-reveal>
            One monthly plan. We run the whole site.
          </h2>
          <p className={styles.lead} data-reveal>
            MiviaLab works on a simple monthly subscription. Your site stays
            fast, secure, and up to date &mdash; and you have a team to ask
            whenever something needs to change. No surprise bills for everyday
            upkeep.
          </p>
        </header>

        <div className={styles.priceRow} data-reveal>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Starting from</span>
            <span className={styles.priceValue}>
              {/* REVIEW: monthly price anchor TBD */}
              <span className={styles.reviewTag}>// REVIEW</span>
              <span className={styles.priceTbd}>$&mdash;&mdash;</span>
              <span className={styles.priceUnit}>/mo</span>
            </span>
            <span className={styles.priceNote}>
              Monthly price anchor still to be set.
            </span>
          </div>
          <a href="#contact" className={styles.priceCta} data-cursor>
            Get a quote for your business &rarr;
          </a>
        </div>

        <div className={styles.cols}>
          <div className={styles.col} data-reveal>
            <h3 className={styles.colTitle}>
              <span className={styles.tick} aria-hidden="true">
                &#10003;
              </span>
              Included every month
            </h3>
            <ul className={styles.list}>
              {INCLUDED.map((i) => (
                <li key={i} className={styles.listItem}>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.colExtra}`} data-reveal>
            <h3 className={styles.colTitle}>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
              Quoted separately
            </h3>
            <ul className={styles.list}>
              {EXTRA.map((i) => (
                <li key={i} className={styles.listItem}>
                  {i}
                </li>
              ))}
            </ul>
            <p className={styles.colFoot}>
              {/* REVIEW: define the precise line between "included upkeep" and
                  "new feature = extra" so quotes stay predictable. */}
              <span className={styles.reviewTag}>// REVIEW</span> Exact line
              between upkeep and &ldquo;new feature&rdquo; to be finalized.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
