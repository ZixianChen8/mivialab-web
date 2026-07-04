"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#service", label: "How it works" },
  { href: "#studio", label: "Studio" },
];

/**
 * Fixed top navigation. The primary contact CTA lives here so it is reachable
 * from every screen, satisfying the "form wins every screen" funnel rule.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.nav} data-scrolled={scrolled || undefined}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} data-cursor aria-label="MiviaLab home">
          MiviaLab
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} data-cursor>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.cta} data-cursor>
          Start your project
        </a>
      </div>
    </header>
  );
}
