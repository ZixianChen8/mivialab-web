"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FOUNDER_ANIM, FOUNDERS } from "@/lib/story-anim-config";

/**
 * Founder spotlight — mwg_effect039 cursor-follow card, MiviaLab remix.
 * Michael and Olivia each get a stacked near-full-viewport band with
 * left-biased name / role / bio. One shared portrait card trails the
 * pointer; its photo swaps when the cursor enters that founder's band.
 * Touch and reduced-motion drop the follower and show a static portrait
 * per section.
 */
export function FounderSpotlight() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cfg = FOUNDER_ANIM;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const useStatic = reducedMotion || coarsePointer;

    const card = root.querySelector<HTMLElement>(".founders__card");
    const media = root.querySelector<HTMLElement>(".founders__media");
    const bands = Array.from(root.querySelectorAll<HTMLElement>(".founder"));
    const photos = Array.from(root.querySelectorAll<HTMLElement>(".founders__photo"));
    if (!card || !media || !bands.length || !photos.length) return;

    if (useStatic) {
      root.classList.add("founders--static");
      /* Touch (not reduced-motion): a light idle float on each static portrait. */
      if (!reducedMotion && coarsePointer) {
        const staticPhotos = root.querySelectorAll<HTMLElement>(".founder__static-photo");
        const floats = Array.from(staticPhotos).map((photo) =>
          gsap.to(photo, {
            y: `+=${cfg.touchFloat.yPx}`,
            duration: cfg.touchFloat.duration,
            ease: cfg.touchFloat.ease,
            yoyo: true,
            repeat: -1,
          })
        );
        return () => {
          floats.forEach((t) => t.kill());
        };
      }
      return;
    }

    let activeId: string = FOUNDERS[0].id;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let onMove: ((e: MouseEvent) => void) | undefined;
    let onWindowLeave: (() => void) | undefined;

    const ctx = gsap.context(() => {
      photos.forEach((el) => {
        const id = el.dataset.founderId;
        gsap.set(el, { autoAlpha: id === activeId ? 1 : 0 });
      });

      /*
       * Hand the card's centering to GSAP. The CSS translate(-50%, -50%)
       * would be baked into pixels on the first quickTo write, anchoring the
       * card by its corner; xPercent/yPercent keep it centered while x/y
       * carry the pointer offset. Hidden until the pointer enters the wrap.
       */
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0, autoAlpha: 0 });

      const setActive = (id: string) => {
        if (id === activeId) return;
        activeId = id;
        const duration = cfg.swapDuration;
        photos.forEach((el) => {
          gsap.to(el, {
            autoAlpha: el.dataset.founderId === id ? 1 : 0,
            duration,
            overwrite: "auto",
          });
        });
      };

      const founderFromPoint = (clientX: number, clientY: number): string | null => {
        const hits = document.elementsFromPoint(clientX, clientY);
        for (const el of hits) {
          const band = (el as Element).closest?.(".founder") as HTMLElement | null;
          if (band?.dataset.founderId) return band.dataset.founderId;
        }
        /* Fallback: rect hit-test when overlays sit above the band. */
        for (const band of bands) {
          const rect = band.getBoundingClientRect();
          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            return band.dataset.founderId ?? null;
          }
        }
        return null;
      };

      const {
        followDuration,
        followEase,
        tiltMax,
        idleScale,
        idleZoomDuration,
        idleZoomEase,
        idleAfterMs,
        enterLeaveDuration,
        enterLeaveEase,
      } = cfg.card;

      const xTo = gsap.quickTo(card, "x", { duration: followDuration, ease: followEase });
      const yTo = gsap.quickTo(card, "y", { duration: followDuration, ease: followEase });
      const rotYTo = gsap.quickTo(card, "rotationY", { duration: followDuration, ease: followEase });
      const rotXTo = gsap.quickTo(card, "rotationX", { duration: followDuration, ease: followEase });
      const scaleXTo = gsap.quickTo(media, "scaleX", { duration: idleZoomDuration, ease: idleZoomEase });
      const scaleYTo = gsap.quickTo(media, "scaleY", { duration: idleZoomDuration, ease: idleZoomEase });

      const clampTilt = gsap.utils.clamp(-tiltMax, tiltMax);
      let oldPosX = 0;
      let oldPosY = 0;
      let hasMoved = false;
      let isInside = false;

      const fadeCard = (visible: boolean) => {
        gsap.to(card, {
          autoAlpha: visible ? 1 : 0,
          duration: enterLeaveDuration,
          ease: enterLeaveEase,
          overwrite: "auto",
        });
      };

      onMove = (e: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!inside) {
          if (isInside) {
            isInside = false;
            if (idleTimer) window.clearTimeout(idleTimer);
            fadeCard(false);
          }
          return;
        }

        if (!isInside) {
          isInside = true;
          /* Seed follow targets under the pointer before fading in. */
          oldPosX = e.clientX;
          oldPosY = e.clientY;
          hasMoved = true;
          gsap.set(card, {
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - rect.top - rect.height / 2,
          });
          fadeCard(true);
        }

        if (!hasMoved) {
          oldPosX = e.clientX;
          oldPosY = e.clientY;
          hasMoved = true;
        }

        const nextId = founderFromPoint(e.clientX, e.clientY);
        if (nextId) setActive(nextId);

        rotYTo(clampTilt(e.clientX - oldPosX));
        rotXTo(clampTilt(-(e.clientY - oldPosY)));

        xTo(e.clientX - window.innerWidth / 2);
        yTo(e.clientY - rect.top - rect.height / 2);

        scaleXTo(1);
        scaleYTo(1);

        oldPosX = e.clientX;
        oldPosY = e.clientY;

        if (idleTimer) window.clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          rotYTo(0);
          rotXTo(0);
          scaleXTo(idleScale);
          scaleYTo(idleScale);
        }, idleAfterMs);
      };

      /* mouseleave on <html> fires when the pointer exits the browser window;
       * mousemove alone stops and would leave the card stuck visible. */
      onWindowLeave = () => {
        if (!isInside) return;
        isInside = false;
        if (idleTimer) window.clearTimeout(idleTimer);
        fadeCard(false);
      };

      window.addEventListener("mousemove", onMove);
      document.documentElement.addEventListener("mouseleave", onWindowLeave);
    }, root);

    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onWindowLeave) {
        document.documentElement.removeEventListener("mouseleave", onWindowLeave);
      }
      if (idleTimer) window.clearTimeout(idleTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="founders" aria-labelledby="founders-heading">
      <h2 id="founders-heading" className="sr-only">
        The people behind MiviaLab
      </h2>

      {FOUNDERS.map((founder) => (
        <article
          className="founder"
          key={founder.id}
          data-founder-id={founder.id}
          aria-labelledby={`founder-${founder.id}-name`}
        >
          <div className="founder__text">
            <p className="founder__name" id={`founder-${founder.id}-name`}>
              {founder.name}
            </p>
            <p className="founder__role">{founder.role}</p>
            <p className="founder__bio">{founder.bio}</p>
          </div>

          <div className="founder__static-photo">
            <Image
              src={founder.photo}
              alt={founder.alt}
              width={founder.photoWidth}
              height={founder.photoHeight}
              sizes="(max-width: 768px) 72vw, 480px"
            />
          </div>
        </article>
      ))}

      <div className="founders__card" aria-hidden="true">
        <div className="founders__media">
          {FOUNDERS.map((founder, index) => (
            <Image
              className={`founders__photo${index === 0 ? " is-active" : ""}`}
              key={founder.id}
              data-founder-id={founder.id}
              src={founder.photo}
              alt=""
              width={founder.photoWidth}
              height={founder.photoHeight}
              sizes="480px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
