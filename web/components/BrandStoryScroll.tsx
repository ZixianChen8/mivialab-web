"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ANIM, STORY_BEATS, storyTrackHeightVh } from "@/lib/story-anim-config";

gsap.registerPlugin(ScrollTrigger);

/** mwg_022 word wrap: each word becomes an overflow-hidden shell + sliding inner span. */
function wrapWordsInSpan(element: HTMLElement) {
  const text = element.textContent ?? "";
  element.innerHTML = text
    .split(" ")
    .map((word) => `<span class="word"><span>${word}</span></span>`)
    .join(" ");
}

/**
 * Brand story as a pinned scroll timeline (mwg_effect022).
 * Three side-by-side columns sit on a pinned stage; as you scroll, each
 * column's words drop out while the next column's words rise in.
 */
export function BrandStoryScroll() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { swap, scrub, setup } = STORY_ANIM;
    const reducedMotion =
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("story--static");
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const runSetup = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const track = root.querySelector<HTMLElement>(".story__track");
        const stage = root.querySelector<HTMLElement>(".story__stage");
        const title = root.querySelector<HTMLElement>(".story__title");
        const beats = Array.from(root.querySelectorAll<HTMLElement>(".story__beat"));
        if (!track || !stage || !beats.length) return;

        beats.forEach((beat) => wrapWordsInSpan(beat));

        ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
        });

        if (title) {
          gsap.to(title, {
            autoAlpha: 0,
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.35}`,
              scrub: true,
            },
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub,
          },
        });

        beats.forEach((beat, index) => {
          const next = beats[index + 1];
          if (!next) return;

          tl.to(beat.querySelectorAll<HTMLElement>(".word span"), {
            y: "100%",
            duration: swap.duration,
            stagger: swap.stagger,
            ease: swap.easeOut,
          });
          tl.to(
            next.querySelectorAll<HTMLElement>(".word span"),
            {
              y: "0%",
              duration: swap.duration,
              delay: swap.delayIn,
              stagger: swap.stagger,
              ease: swap.easeIn,
            },
            "<"
          );
        });
      }, root);

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
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="story" aria-label="MiviaLab brand story">
      <div
        className="story__track"
        style={{ "--story-track-h": `${storyTrackHeightVh(STORY_BEATS.length)}vh` } as React.CSSProperties}
      >
        <div className="story__stage">
          <h1 className="story__title">The story behind MiviaLab</h1>
          <div className="story__beats">
            {STORY_BEATS.map((beat) => (
              <p className="story__beat" key={beat.slice(0, 24)}>
                {beat}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
