"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PITCH_ANIM,
  PITCH_HEADING,
  PITCH_LABEL,
  PITCH_LINK,
  PITCH_PARAGRAPH,
  PITCH_PRIMARY,
  PITCH_SUPPORT,
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
    const reducedMotion =
      setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const runSetup = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        if (!reducedMotion) {
          const entrance = root.querySelectorAll<HTMLElement>(
            ".pitch__label, .pitch__support, .pitch__actions .pitch__cta"
          );

          gsap.from(entrance, {
            opacity: 0,
            y: 18,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              once: true,
              toggleActions: "play none none none",
            },
          });
        }

        const paragraph = root.querySelector<HTMLElement>(".pitch__paragraph");
        if (!paragraph || reducedMotion) return;

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
      className="pitch pitch--animated section--cream mwg_effect058"
      id="pitch"
      aria-labelledby="pitch-heading"
      style={pitchAnimCssVars()}
    >
      <h2 id="pitch-heading" className="sr-only">
        {PITCH_HEADING}
      </h2>
      <div className="pitch__inner">
        <p className="pitch__label">{PITCH_LABEL}</p>
        <div className="pitch__content">
          <p className="pitch__paragraph">{PITCH_PARAGRAPH}</p>
          <p className="pitch__support">{PITCH_SUPPORT}</p>
          <div className="pitch__actions">
            <a className="pitch__cta pitch__cta--primary" href={PITCH_PRIMARY.href}>
              {PITCH_PRIMARY.label}
            </a>
            <Link className="pitch__cta pitch__cta--secondary" href={PITCH_LINK.href}>
              {PITCH_LINK.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
