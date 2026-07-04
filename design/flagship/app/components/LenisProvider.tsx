"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LENIS_LERP } from "@/lib/motion";

/**
 * Initializes Lenis smooth scrolling and drives it from GSAP's ticker so that
 * ScrollTrigger stays perfectly in sync. Smooth scroll is skipped entirely
 * when the user prefers reduced motion (native scrolling is used instead).
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // No smooth scroll; nothing to clean up.
      return;
    }

    const lenis = new Lenis({ lerp: LENIS_LERP });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
