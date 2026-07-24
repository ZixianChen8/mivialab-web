"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PITCH_ANIM,
  PITCH_HEADING,
  PITCH_LINK,
  PITCH_PARAGRAPH,
  pitchAnimCssVars,
  pitchScrollTriggerStart,
} from "@/lib/pitch-anim-config";

gsap.registerPlugin(ScrollTrigger);

function wrapLettersInSpan(element: HTMLElement) {
  const text = element.textContent ?? "";
  element.innerHTML = text
    .split(" ")
    .map((word) =>
      `<span class="word">${word
        .split("")
        .map((char) => `<span class="letter"><span>${char}</span></span>`)
        .join("")}</span>`
    )
    .join(" ");
}

function groupLettersIntoLines(root: HTMLElement) {
  const letters = Array.from(root.querySelectorAll<HTMLElement>(".letter span"));
  if (!letters.length) return [];

  const lines: HTMLElement[][] = [[]];
  let lineIndex = 0;

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const offsetTop = letter.offsetTop;

    if (i > 0 && offsetTop !== letters[i - 1].offsetTop) {
      lines.push([]);
      lineIndex++;
    }

    lines[lineIndex].push(letter);
  }

  return lines;
}

export function PitchSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { setup, letter, line } = PITCH_ANIM;

    if (
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const paragraph = root.querySelector<HTMLElement>(".pitch__paragraph");
    if (!paragraph) return;

    let cancelled = false;

    const runSetup = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        wrapLettersInSpan(paragraph);

        const letters = root.querySelectorAll<HTMLElement>(".letter span");
        if (!letters.length) return;

        const lines = groupLettersIntoLines(root);

        gsap.set(letters, {
          rotate: letter.rotateStart,
          xPercent: letter.xPercentStart,
        });

        lines.forEach((lineLetters, lineIndex) => {
          const tl = gsap.timeline({ paused: true });

          tl.to(lineLetters, {
            rotate: letter.rotateVisible,
            xPercent: letter.xPercentVisible,
            duration: line.duration,
            stagger: line.stagger,
            ease: line.easeIn,
          });

          ScrollTrigger.create({
            trigger: lineLetters[0],
            start: pitchScrollTriggerStart(lineIndex),
            onEnter: () => tl.play(),
            onEnterBack: () => {
              if (tl.progress() < 1) tl.play();
            },
          });
        });
      }, root);

      if (setup.refreshAfterMount) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }

      return ctx;
    };

    let ctx: gsap.Context | undefined;

    if (setup.waitForFonts) {
      void document.fonts.ready.then(() => {
        ctx = runSetup();
      });
    } else {
      ctx = runSetup();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="pitch pitch--animated section--light mwg_effect058"
      id="pitch"
      aria-labelledby="pitch-heading"
      style={pitchAnimCssVars()}
    >
      <h2 id="pitch-heading" className="sr-only">
        {PITCH_HEADING}
      </h2>
      <div className="pitch__inner">
        <p className="pitch__paragraph">{PITCH_PARAGRAPH}</p>
        <p className="pitch__link">
          <Link href={PITCH_LINK.href}>{PITCH_LINK.label}</Link>
        </p>
      </div>
    </section>
  );
}
