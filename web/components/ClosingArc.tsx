"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_CLOSE, STORY_CLOSE_ANIM } from "@/lib/story-anim-config";

gsap.registerPlugin(ScrollTrigger);

/** Concentric arcs shrink toward the center; each inner ring scales down 10%. */
function scaleForIndex(index: number): number {
  return Math.max(0.1, 1 - 0.1 * (index - 1));
}

/** Circumcenter from three samples along the path (start, midpoint, end). */
function getArcCenter(path: SVGPathElement): { x: number; y: number } {
  const len = path.getTotalLength();
  const [a, b, c] = [0, len / 2, len].map((t) => path.getPointAtLength(t));
  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  return {
    x: (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d,
    y: (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d,
  };
}

/** Rotate each ring around the arc's circumcenter instead of the box center. */
function applyArcTransformOrigin(
  circle: HTMLDivElement,
  path: SVGPathElement,
  scale: number
) {
  const svg = circle.querySelector("svg");
  if (!svg) return;
  const vb = (svg as SVGSVGElement).viewBox.baseVal;
  const center = getArcCenter(path);
  const cxNorm = (center.x - vb.x) / vb.width;
  const cyNorm = (center.y - vb.y) / vb.width;
  const cxPct = (1 - scale) * 50 + cxNorm * scale * 100;
  const cyPct = cyNorm * scale * 100;
  circle.style.transformOrigin = `${cxPct}% ${cyPct}%`;
}

function measureTextLength(textPath: SVGTextPathElement, content: string): number {
  textPath.textContent = content;
  let length = 0;
  if (typeof textPath.getComputedTextLength === "function") {
    length = textPath.getComputedTextLength();
  }
  if (!length) {
    try {
      const bbox = textPath.getBBox();
      length = bbox ? bbox.width : 0;
    } catch {
      length = 0;
    }
  }
  return length;
}

/**
 * Closing arc (mwg_effect098).
 * The story's last line is split across concentric curved paths; on a
 * pinned stage each arc rotates level while its text types on, scrubbed
 * to scroll. Near-verbatim port of the template script.
 */
export function ClosingArc() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cfg = STORY_CLOSE_ANIM;
    const reducedMotion =
      cfg.setup.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("arc--static");
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let pathsContainer: HTMLElement | null = null;
    let svgTemplate: SVGSVGElement | null = null;
    const createdCircles: HTMLDivElement[] = [];

    const runSetup = () => {
      if (cancelled) return;

      const track = root.querySelector<HTMLElement>(".arc__track");
      const container = root.querySelector<HTMLElement>(".arc__container");
      pathsContainer = root.querySelector<HTMLElement>(".arc__paths");
      if (!track || !container || !pathsContainer) return;

      svgTemplate = pathsContainer.querySelector("svg");
      if (!svgTemplate) return;
      pathsContainer.removeChild(svgTemplate);

      let svgIndex = 0;

      const createArc = () => {
        svgIndex += 1;
        const svg = svgTemplate!.cloneNode(true) as SVGSVGElement;

        const path = svg.querySelector("path") as SVGPathElement;
        const pathId = `arc-path-${svgIndex}`;
        path.id = pathId;

        const textPath = svg.querySelector("textPath") as SVGTextPathElement;
        textPath.setAttribute("href", `#${pathId}`);
        textPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${pathId}`);

        const scale = scaleForIndex(svgIndex);
        svg
          .querySelector("text")
          ?.setAttribute("font-size", String(Math.round(cfg.svg.baseFontSize / scale)));

        const circle = document.createElement("div");
        circle.className = "arc__circle";
        circle.appendChild(svg);
        pathsContainer!.appendChild(circle);
        createdCircles.push(circle);

        applyArcTransformOrigin(circle, path, scale);

        return { path, textPath };
      };

      /* Fill arcs word by word; overflow spills onto the next (smaller) arc. */
      const splitTextAcrossSvgs = (text: string) => {
        const words = text.split(/\s+/).filter(Boolean);
        let wordIndex = 0;

        while (wordIndex < words.length) {
          const { path, textPath } = createArc();
          const pathLength = path.getTotalLength() * 0.98;

          let current = "";
          let lastGood = "";

          while (wordIndex < words.length) {
            const nextWord = words[wordIndex];
            const candidate = current ? current + " " + nextWord : nextWord;
            const textLength = measureTextLength(textPath, candidate);

            if (textLength <= pathLength) {
              current = candidate;
              lastGood = candidate;
              wordIndex += 1;
            } else {
              if (!current) {
                let fit = "";
                let charIdx = 0;
                while (charIdx < nextWord.length) {
                  const tryFit = fit + nextWord[charIdx];
                  if (measureTextLength(textPath, tryFit) <= pathLength) {
                    fit = tryFit;
                    charIdx += 1;
                  } else break;
                }
                if (fit) {
                  current = fit;
                  const remaining = nextWord.slice(fit.length);
                  if (remaining) words[wordIndex] = remaining;
                  else wordIndex += 1;
                }
              }
              break;
            }
          }

          textPath.textContent = current || lastGood;
        }
      };

      splitTextAcrossSvgs(STORY_CLOSE.text);

      ctx = gsap.context(() => {
        const master = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            pin: container,
            scrub: cfg.scrub,
          },
        });

        const circles = Array.from(root.querySelectorAll<HTMLDivElement>(".arc__circle"));
        const texts: string[] = [];

        circles.forEach((circle) => {
          const textPath = circle.querySelector("textPath");
          if (!textPath) return;
          texts.push(textPath.textContent ?? "");
          textPath.textContent = "";
        });

        circles.forEach((circle, i) => {
          const textPath = circle.querySelector("textPath");
          if (!textPath) return;
          const text = texts[i];

          const tween = gsap.to(circle, {
            rotate: 0,
            ease: cfg.arc.ease,
            duration: cfg.arc.duration,
            onUpdate() {
              const count = Math.floor(tween.progress() * text.length);
              textPath.textContent = text.substring(0, count);
            },
          });
          master.add(tween, i * (1 / circles.length));
        });
      }, root);

      if (cfg.setup.refreshAfterMount) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    if (cfg.setup.waitForFonts) {
      void document.fonts.ready.then(() => {
        runSetup();
      });
    } else {
      runSetup();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
      /* Restore the template so a remount (dev strict mode) can rebuild. */
      createdCircles.forEach((circle) => circle.remove());
      if (pathsContainer && svgTemplate && !pathsContainer.contains(svgTemplate)) {
        pathsContainer.appendChild(svgTemplate);
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="arc"
      aria-label="Our promise"
      style={{ "--arc-track-h": `${STORY_CLOSE_ANIM.trackHeightVh}vh` } as React.CSSProperties}
    >
      <div className="arc__track">
        <div className="arc__container">
          <p className="arc__fallback">{STORY_CLOSE.text}</p>
          <div className="arc__paths" aria-hidden="true">
            <svg
              viewBox={STORY_CLOSE_ANIM.svg.viewBox}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={STORY_CLOSE_ANIM.svg.pathD} />
              <text xmlSpace="preserve" textAnchor="middle" fontSize={STORY_CLOSE_ANIM.svg.baseFontSize}>
                <textPath startOffset="50%"></textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
