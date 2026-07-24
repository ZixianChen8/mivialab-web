"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

const LANGS = ["EN", "FR", "中文"] as const;

/**
 * Footer with a language toggle. The toggle is presentational only in this
 * design exploration (no full translation layer is built yet) — it shows the
 * premium EN / FR / 中文 capability without inventing copy we cannot deliver.
 */
export default function Footer() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("EN");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand} data-cursor>
            MiviaLab
          </a>
          <p className={styles.tagline}>
            Web design &amp; development studio.
            <br />
            Ottawa&ndash;Toronto corridor.
          </p>
        </div>

        <div
          className={styles.langs}
          role="group"
          aria-label="Language (preview)"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              className={styles.lang}
              data-active={l === lang || undefined}
              aria-pressed={l === lang}
              onClick={() => setLang(l)}
              data-cursor
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.legal}>
        <span>&copy; {year} MiviaLab. All rights reserved.</span>
        <span className={styles.note}>
          {/* REVIEW: this is the studio's own flagship site, not a client project. */}
          Built in-house by MiviaLab.
        </span>
      </div>
    </footer>
  );
}
