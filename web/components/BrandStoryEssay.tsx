"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { STORY_ESSAY, STORY_ESSAY_ANIM } from "@/lib/story-anim-config";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Brand story continuation (mwg_effect097 default look).
 * Tall runway, fixed dual header, body column with small left titles.
 * Body lines scrub from justified word-spread back to natural spacing.
 */
export function BrandStoryEssay() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { scrub, lineStart, lineEnd, ease, setup } = STORY_ESSAY_ANIM;
    const reducedMotion =
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("essay--static");
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];

    const runSetup = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const container = root.querySelector<HTMLElement>(".essay__container");
        if (!container) return;

        const paragraphs = Array.from(
          container.querySelectorAll<HTMLElement>(".essay__body")
        );
        if (!paragraphs.length) return;

        paragraphs.forEach((paragraph) => {
          splits.push(
            SplitText.create(paragraph, {
              type: "lines, words",
              linesClass: "essay__line",
              wordsClass: "essay__word",
            })
          );
        });

        const lines = Array.from(root.querySelectorAll<HTMLElement>(".essay__line"));
        const containerWidth = container.clientWidth;
        const containerRect = container.getBoundingClientRect();

        lines.forEach((line) => {
          const words = Array.from(line.querySelectorAll<HTMLElement>(".essay__word"));
          if (!words.length) return;

          const totalWordsWidth = words.reduce(
            (acc, word) => acc + word.getBoundingClientRect().width,
            0
          );
          const gaps = words.length - 1;
          const freeSpace = Math.max(containerWidth - totalWordsWidth, 0);
          const gapSize = gaps > 0 ? freeSpace / gaps : 0;

          let targetLeft = 0;

          words.forEach((word, index) => {
            const rect = word.getBoundingClientRect();
            const currentLeft = rect.left - containerRect.left;
            const deltaX = targetLeft - currentLeft;
            gsap.set(word, { x: deltaX });
            targetLeft += rect.width + (index < words.length - 1 ? gapSize : 0);
          });

          gsap.to(words, {
            x: 0,
            ease,
            scrollTrigger: {
              trigger: line,
              start: lineStart,
              end: lineEnd,
              scrub,
            },
          });
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
      splits.forEach((split) => split.revert());
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="essay" aria-label="How MiviaLab uses AI">
      <div className="essay__container">
        <div className="essay__header">
          <p>MiviaLab</p>
          <p>What we believe</p>
        </div>
        <div className="essay__content">
          {STORY_ESSAY.map((block) => (
            <div className="essay__block" key={block.title}>
              <p className="essay__title">{block.title}</p>
              <p className="essay__body">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
