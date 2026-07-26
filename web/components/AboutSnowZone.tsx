"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import PixelSnow from "@/components/PixelSnow";

type AboutSnowZoneProps = {
  children: ReactNode;
};

/**
 * Viewport PixelSnow over the about story block only.
 * Fixed layer sits above ink sections; founders + CTA (siblings with higher
 * z-index and opaque grounds) slide over and cover it. Rendering pauses when
 * the zone leaves the viewport or when reduced-motion is preferred.
 */
export function AboutSnowZone({ children }: AboutSnowZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [zoneVisible, setZoneVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setZoneVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(zone);
    return () => observer.disconnect();
  }, []);

  const showSnow = !reduceMotion && zoneVisible;

  return (
    <div ref={zoneRef} className="about-snow-zone">
      {!reduceMotion ? (
        <div
          className={`about-snow-zone__fx${showSnow ? "" : " is-paused"}`}
          aria-hidden="true"
        >
          <PixelSnow
            color="#ffffff"
            flakeSize={0.004}
            minFlakeSize={0.7}
            pixelResolution={480}
            speed={0.4}
            density={0.08}
            direction={100}
            brightness={1.4}
            depthFade={9}
            farPlane={16}
            paused={!showSnow}
          />
        </div>
      ) : null}
      {children}
    </div>
  );
}
