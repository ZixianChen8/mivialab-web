"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import styles from "./Differentiators.module.css";

const ITEMS = [
  {
    no: "01",
    title: "Loads fast so you stop losing customers",
    body: "Every extra second of load time sends visitors away before they ever see you. We build lean, hand-written code that opens instantly — even on a phone, on patchy data.",
  },
  {
    no: "02",
    title: "Your customers' data stays safe",
    body: "Security reviews and updates are built into every site we run, so the trust people place in your business — and the details they hand over — stay protected.",
  },
  {
    no: "03",
    title: "Fully custom code, no Wix or Squarespace bloat",
    body: "Your site is built from scratch around how your business actually works — not forced into a template you'll outgrow and can't truly own.",
  },
  {
    no: "04",
    title: "You never have to touch your site — we handle it",
    body: "Edits, fixes, and improvements are on us. You run your business; we keep the website fast, current, and working.",
  },
];

export default function Differentiators() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="differentiators" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} data-reveal>
            <span className={styles.index}>01</span> Why MiviaLab
          </p>
          <h2 className={styles.title} data-reveal>
            What you actually get &mdash; in plain terms.
          </h2>
        </header>

        <ul className={styles.list} data-stagger>
          {ITEMS.map((item) => (
            <li key={item.no} className={styles.item}>
              <span className={styles.no} aria-hidden="true">
                {item.no}
              </span>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
