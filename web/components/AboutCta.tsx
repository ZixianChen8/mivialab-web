"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Lightfall = dynamic(() => import("@/components/Lightfall"), {
  ssr: false,
});

const LIGHTFALL_COLORS = ["#000000"];

export function AboutCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="page-about__cta"
      aria-labelledby="about-cta-heading"
    >
      <div className="page-about__cta-bg" aria-hidden="true">
        {isNearViewport && !reduceMotion ? (
          <Lightfall
            colors={LIGHTFALL_COLORS}
            blackStreaks
            backgroundColor="#ffffff"
            speed={0.3}
            streakCount={8}
            streakWidth={0.2}
            streakLength={0.3}
            glow={0.9}
            density={0.4}
            twinkle={0}
            zoom={2.5}
            backgroundGlow={0}
            opacity={0.55}
            mouseInteraction
            mouseStrength={0}
            mouseRadius={0.1}
          />
        ) : null}
      </div>
      <div className="page-about__cta-inner">
        <h2 id="about-cta-heading">Ready to talk about your site?</h2>
        <p>
          Based in the Ottawa to Toronto corridor, we build custom sites in
          English, French, and Chinese. Tell us what you need.
        </p>
        <Link
          className="page-about__cta-link"
          href="/#contact"
          data-analytics-event="cta_click"
          data-analytics-placement="about"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
