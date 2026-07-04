"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, MIVIA_EASE } from "@/lib/gsap";
import { DURATION, STAGGER } from "@/lib/motion";

/**
 * Scroll-reveal hook. Scoped to a section root, it animates:
 *   - any [data-reveal] element on its own as it enters the viewport
 *   - the direct children of any [data-stagger] container, with a stagger
 *
 * Under prefers-reduced-motion everything is shown immediately with no motion.
 * If JS never runs, content stays visible (the "from" state is only applied
 * once a tween is created), so the page degrades gracefully.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const singles = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-reveal]")
      );
      const groups = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-stagger]")
      );

      if (prefersReduced) {
        const items = groups.flatMap((g) =>
          Array.from(g.children) as HTMLElement[]
        );
        gsap.set([...singles, ...items], { autoAlpha: 1, y: 0 });
        return;
      }

      singles.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.reveal,
            ease: MIVIA_EASE,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      groups.forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.reveal,
            ease: MIVIA_EASE,
            stagger: STAGGER,
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
