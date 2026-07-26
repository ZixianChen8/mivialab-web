"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  STORY_FLIP_ANIM,
  STORY_FLIP_LINES,
  flipTrackHeightVh,
} from "@/lib/story-anim-config";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mindset flip (mwg_effect102).
 * The mindless vs thoughtful contrast: two center-stage lines flip in 3D
 * (rotateX around an axis behind the text) as the pinned stage scrubs.
 */
export function MindsetFlip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { ease, spanAngle, scrub, setup } = STORY_FLIP_ANIM;
    const reducedMotion =
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("flip--static");
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const runSetup = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const track = root.querySelector<HTMLElement>(".flip__track");
        const stage = root.querySelector<HTMLElement>(".flip__stage");
        const lines = Array.from(root.querySelectorAll<HTMLElement>(".flip__line"));
        if (!track || !stage || lines.length < 2) return;

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub,
          },
        });

        const transitions = lines.length - 1;
        const step = transitions > 0 ? 1 / transitions : 1;

        gsap.set(lines, { rotateX: -90 });
        gsap.set(lines[0], { rotateX: 0 });

        for (let i = 0; i < lines.length - 1; i++) {
          const pos = i * step;
          const angle = i % 2 === 0 ? -spanAngle : spanAngle;
          const outSpan = lines[i].querySelector<HTMLElement>("span");
          const inSpan = lines[i + 1].querySelector<HTMLElement>("span");

          master.to(lines[i], { rotateX: 90, duration: step, ease }, pos);
          if (outSpan) {
            master.to(outSpan, { rotateZ: angle, duration: step, ease }, pos);
            master.to(
              outSpan,
              { autoAlpha: 0, duration: 0.2 * step, delay: 0.5 * step, ease },
              pos
            );
          }

          master.fromTo(
            lines[i + 1],
            { rotateX: -90 },
            { rotateX: 0, duration: step, ease },
            pos
          );
          if (inSpan) {
            master.from(inSpan, { rotateZ: angle, duration: step, ease }, pos);
            master.from(
              inSpan,
              { autoAlpha: 0, duration: 0.2 * step, delay: 0.3 * step, ease },
              pos
            );
          }
        }
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
    <section
      ref={rootRef}
      className="flip"
      aria-label="Mindless versus thoughtful AI"
      style={{ "--flip-track-h": `${flipTrackHeightVh(STORY_FLIP_LINES.length)}vh` } as React.CSSProperties}
    >
      <div className="flip__track">
        <div className="flip__stage">
          <div className="flip__header" aria-hidden="true">
            <span>{STORY_FLIP_ANIM.headerLeft}</span>
            <span>{STORY_FLIP_ANIM.headerRight}</span>
          </div>
          {STORY_FLIP_LINES.map((line) => (
            <p className="flip__line" key={line.slice(0, 16)}>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
