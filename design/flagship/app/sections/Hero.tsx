"use client";

import { useEffect, useRef } from "react";
import { gsap, MIVIA_EASE } from "@/lib/gsap";
import HeroCanvas from "./HeroCanvas";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.lineInner}`);
      const fadeUps = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");

      if (reduced) {
        gsap.set([...lines, ...fadeUps], { yPercent: 0, autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(lines, { yPercent: 110 });
      gsap.set(fadeUps, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: MIVIA_EASE,
        stagger: 0.08,
      }).to(
        fadeUps,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: MIVIA_EASE,
          stagger: 0.08,
        },
        "-=0.6"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        <HeroCanvas className={styles.canvas} />
      </div>

      <div className={styles.inner}>
        <p className={styles.kicker} data-hero-fade>
          <span className={styles.kickerDot} aria-hidden="true" />
          Web design &amp; development studio &middot; Ottawa&ndash;Toronto
        </p>

        <h1 className={styles.title}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Custom websites</span>
          </span>
          <span className={styles.line}>
            <span className={styles.lineInner}>
              that <em>earn trust</em>
            </span>
          </span>
          <span className={styles.line}>
            <span className={styles.lineInner}>&mdash; and win customers.</span>
          </span>
        </h1>

        <p className={styles.lead} data-hero-fade>
          MiviaLab builds fast, secure, fully custom sites for small businesses
          across the Ottawa&ndash;Toronto corridor. No templates, no bloat, and
          nothing for you to maintain &mdash; we handle all of it.
        </p>

        <div className={styles.actions} data-hero-fade>
          <a href="#contact" className={styles.cta} data-cursor>
            Start your project
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a href="#work" className={styles.ghost} data-cursor>
            See the work
          </a>
        </div>
      </div>

      <a href="#differentiators" className={styles.scroll} data-cursor>
        <span>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
