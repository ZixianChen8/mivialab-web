"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Lightfall from "@/components/Lightfall";

const LIGHTFALL_COLORS = ["#000000"];

export function AboutCta() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="page-about__cta" aria-labelledby="about-cta-heading">
      <div className="page-about__cta-bg" aria-hidden="true">
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
          paused={reduceMotion}
        />
      </div>
      <div className="page-about__cta-inner">
        <h2 id="about-cta-heading">Ready to talk about your site?</h2>
        <p>Same short contact form as the main page. Tell us what you need.</p>
        <Link className="page-about__cta-link" href="/#contact">
          Start a project
        </Link>
      </div>
    </section>
  );
}
