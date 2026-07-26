"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_QUOTE, STORY_QUOTE_ANIM } from "@/lib/story-anim-config";

gsap.registerPlugin(ScrollTrigger);

/** mwg_011 letter wrap: every character becomes an inline-block span. */
function wrapLettersInSpan(element: HTMLElement) {
  const text = element.textContent ?? "";
  element.innerHTML = text
    .split("")
    .map((char) =>
      char === " "
        ? `<span class="quote__letter">&nbsp;</span>`
        : `<span class="quote__letter">${char}</span>`
    )
    .join("");
}

/**
 * Stance quote (mwg_effect011).
 * The story's thesis line rides horizontally across a pinned stage while
 * each letter bounces in elastically, driven by the ride's progress.
 *
 * Desktop: pin the whole section so the header stays over the ride.
 * Mobile: pin only the ride stage so the stance header scrolls off first.
 */
export function StanceQuote() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { scrub, letter, setup } = STORY_QUOTE_ANIM;
    const reducedMotion =
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("quote--static");
      return;
    }

    let cancelled = false;
    const mm = gsap.matchMedia();

    const runSetup = () => {
      if (cancelled) return;

      const container = root.querySelector<HTMLElement>(".quote__container");
      const text = root.querySelector<HTMLElement>(".quote__text");
      if (!container || !text) return;

      wrapLettersInSpan(text);
      const letters = Array.from(root.querySelectorAll<HTMLElement>(".quote__letter"));
      if (!letters.length) return;

      const buildRide = (pinTarget: HTMLElement) => {
        const distance = text.clientWidth - document.documentElement.clientWidth;

        const scrollTween = gsap.to(text, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: pinTarget,
            pin: true,
            end: "+=" + distance,
            scrub,
          },
        });

        letters.forEach((el) => {
          gsap.from(el, {
            yPercent: (Math.random() - 0.5) * letter.yPercentSpan,
            rotation: (Math.random() - 0.5) * letter.rotationSpan,
            ease: letter.ease,
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: letter.start,
              end: letter.end,
              scrub: letter.scrub,
            },
          });
        });
      };

      mm.add("(max-width: 768px)", () => {
        const ctx = gsap.context(() => buildRide(container), root);
        return () => ctx.revert();
      });

      mm.add("(min-width: 769px)", () => {
        const ctx = gsap.context(() => buildRide(root), root);
        return () => ctx.revert();
      });

      if (setup.refreshAfterMount) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    if (setup.waitForFonts) {
      void document.fonts.ready.then(() => {
        runSetup();
      });
    } else {
      runSetup();
    }

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="quote" aria-label="Our stance on AI">
      <div className="quote__header">
        <p className="quote__lead">{STORY_QUOTE.lead}</p>
        <p className="quote__meta">{STORY_QUOTE.meta}</p>
      </div>
      <div className="quote__container">
        <p className="quote__text">{STORY_QUOTE.text}</p>
      </div>
    </section>
  );
}
