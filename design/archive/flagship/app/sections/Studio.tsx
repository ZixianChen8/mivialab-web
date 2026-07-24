"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import styles from "./Studio.module.css";

const FOUNDERS = [
  {
    initials: "M",
    name: "Michael",
    role: "Development & engineering",
  },
  {
    initials: "O",
    name: "Olivia",
    role: "Design & client experience",
  },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="studio" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-reveal>
            <span className={styles.index}>05</span> The studio
          </p>
          <h2 className={styles.title} data-reveal>
            A small studio that treats your site like our own.
          </h2>
          <p className={styles.body} data-reveal>
            MiviaLab is Michael and Olivia &mdash; a two-person studio working
            across the Ottawa&ndash;Toronto corridor. We&rsquo;re small on
            purpose: you work directly with the people building your site, not a
            queue of account managers.
          </p>
          <p className={styles.body} data-reveal>
            We build and run sites fully bilingual &mdash; English and French,
            with 中文 available too. For an Ottawa business that means you can
            meet customers in the language they&rsquo;re most comfortable in,
            without bolting on a clumsy translation plugin.
          </p>

          <ul className={styles.langs} data-stagger>
            <li className={styles.lang}>English</li>
            <li className={styles.lang}>Fran&ccedil;ais</li>
            <li className={styles.lang}>中文</li>
          </ul>
        </div>

        <div className={styles.people} data-reveal>
          {FOUNDERS.map((f) => (
            <div key={f.name} className={styles.person}>
              <span className={styles.avatar} aria-hidden="true">
                {f.initials}
              </span>
              <div>
                <p className={styles.personName}>{f.name}</p>
                <p className={styles.personRole}>{f.role}</p>
              </div>
            </div>
          ))}
          <p className={styles.location}>
            <span className={styles.locDot} aria-hidden="true" />
            Ottawa &ndash; Toronto, Canada
          </p>
        </div>
      </div>
    </section>
  );
}
