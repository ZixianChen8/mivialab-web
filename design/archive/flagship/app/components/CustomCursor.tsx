"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Lightweight custom cursor: a precise accent dot plus a trailing ring.
 * Renders nothing (native cursor) on touch devices or under
 * prefers-reduced-motion. Sets body[data-custom-cursor="on"] so globals.css
 * hides the native cursor only when this is active.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reduced.matches) {
      return;
    }

    setEnabled(true);
    document.body.dataset.customCursor = "on";

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      // Ring trails the dot with a simple lerp.
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      delete document.body.dataset.customCursor;
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.cursor} aria-hidden="true" />
    </>
  );
}
