"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SITE_MOTION } from "@/lib/site-motion-config";
import { buildHeroSpotlightScrim, HERO_BG_LAYERS } from "@/lib/hero-bg-layers-config";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const heroSection = document.querySelector<HTMLElement>(".hero");
    let themeObserver: MutationObserver | undefined;
    let onHeroPointerMove: ((e: PointerEvent) => void) | undefined;
    let onHeroPointerLeave: (() => void) | undefined;

    if (heroSection) {
      const skyCfg = HERO_BG_LAYERS.sky;
      const foliageCfg = HERO_BG_LAYERS.foliage;
      const spotCfg = HERO_BG_LAYERS.spotlight;
      const parCfg = HERO_BG_LAYERS.parallax;

      const applyHeroCssVars = () => {
        const root = document.documentElement;
        const rootStyle = root.style;
        const computed = getComputedStyle(root);
        const { gradient, strength } = buildHeroSpotlightScrim(spotCfg, {
          scrimA: computed.getPropertyValue("--hero-scrim-a").trim(),
          scrimB: computed.getPropertyValue("--hero-scrim-b").trim(),
          veil: computed.getPropertyValue("--hero-veil").trim(),
        });

        rootStyle.setProperty("--hero-spotlight-scrim", gradient);
        rootStyle.setProperty("--hero-spot-strength", String(strength));
        rootStyle.setProperty("--hero-bg-scale", String(skyCfg.scale));
        rootStyle.setProperty("--hero-bg-x", `${skyCfg.positionX}%`);
        rootStyle.setProperty("--hero-bg-y", `${skyCfg.positionY}%`);
        rootStyle.setProperty("--hero-bg-offset-y", `${skyCfg.offsetYVh}vh`);
        rootStyle.setProperty("--hero-bg-inset", `${skyCfg.insetPercent}%`);
        rootStyle.setProperty("--hero-fg-scale", String(foliageCfg.scale));
        rootStyle.setProperty("--hero-fg-x", `${foliageCfg.positionX}%`);
        rootStyle.setProperty("--hero-fg-y", `${foliageCfg.positionY}%`);
        rootStyle.setProperty("--hero-fg-offset-y", `${foliageCfg.offsetYPx}px`);
        rootStyle.setProperty("--hero-spot-x", `${spotCfg.x}%`);
        rootStyle.setProperty("--hero-spot-y", `${spotCfg.y}%`);
        rootStyle.setProperty("--hero-spot-w", `${spotCfg.width}%`);
        rootStyle.setProperty("--hero-spot-h", `${spotCfg.height}%`);
        rootStyle.setProperty("--hero-spot-clear", `${spotCfg.clear}%`);
        rootStyle.setProperty("--hero-par-perspective", `${parCfg.perspectivePx}px`);
        rootStyle.setProperty("--hero-sky-par-mx", `${parCfg.sky.moveX}px`);
        rootStyle.setProperty("--hero-sky-par-my", `${parCfg.sky.moveY}px`);
        rootStyle.setProperty("--hero-sky-par-ry", `${parCfg.sky.rotateY}deg`);
        rootStyle.setProperty("--hero-sky-par-rx", `${parCfg.sky.rotateX}deg`);
        rootStyle.setProperty("--hero-fg-par-mx", `${parCfg.foliage.moveX}px`);
        rootStyle.setProperty("--hero-fg-par-my", `${parCfg.foliage.moveY}px`);
        rootStyle.setProperty("--hero-fg-par-ry", `${parCfg.foliage.rotateY}deg`);
        rootStyle.setProperty("--hero-fg-par-rx", `${parCfg.foliage.rotateX}deg`);
      };

      applyHeroCssVars();
      themeObserver = new MutationObserver(applyHeroCssVars);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (parCfg.enabled && !reducedMotion && !coarsePointer) {
        const root = document.documentElement;
        root.style.setProperty("--hero-par-x", "0");
        root.style.setProperty("--hero-par-y", "0");

        const xTo = gsap.quickTo(root, "--hero-par-x", {
          duration: parCfg.followDuration,
          ease: parCfg.followEase,
        });
        const yTo = gsap.quickTo(root, "--hero-par-y", {
          duration: parCfg.followDuration,
          ease: parCfg.followEase,
        });
        const clampNorm = gsap.utils.clamp(-1, 1);

        onHeroPointerMove = (e: PointerEvent) => {
          const rect = heroSection.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;
          const nx = clampNorm(((e.clientX - rect.left) / rect.width) * 2 - 1);
          const ny = clampNorm(((e.clientY - rect.top) / rect.height) * 2 - 1);
          xTo(nx);
          yTo(ny);
        };

        onHeroPointerLeave = () => {
          xTo(0);
          yTo(0);
        };

        heroSection.addEventListener("pointermove", onHeroPointerMove);
        heroSection.addEventListener("pointerleave", onHeroPointerLeave);
      }
    }

    let lenis: Lenis | null = null;
    const sc = SITE_MOTION.smoothScroll;
    const tickerCb = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (!reducedMotion && sc.enabled) {
      lenis = new Lenis({
        duration: sc.duration,
        easing: sc.easing,
        smoothWheel: sc.smoothWheel,
        wheelMultiplier: sc.wheelMultiplier,
        touchMultiplier: sc.touchMultiplier,
        syncTouch: sc.syncTouch,
        anchors: true,
      });
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        window.dispatchEvent(new Event("mivia:scroll"));
      });
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    const onAnchorClick = (e: MouseEvent) => {
      if (!lenis) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onAnchorClick);

    /* Carousel */
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev") as HTMLButtonElement | null;
    const nextBtn = document.getElementById("carousel-next") as HTMLButtonElement | null;
    let onCarouselScroll: (() => void) | undefined;
    let onCarouselResize: (() => void) | undefined;

    if (track && prevBtn && nextBtn) {
      const getScrollAmount = () => {
        const card = track.querySelector(".carousel__card") as HTMLElement | null;
        if (!card) return 360;
        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        return card.offsetWidth + gap;
      };

      const updateButtons = () => {
        const maxScroll = track.scrollWidth - track.clientWidth - 2;
        prevBtn.disabled = track.scrollLeft <= 2;
        nextBtn.disabled = track.scrollLeft >= maxScroll;
      };

      const onPrev = () => track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      const onNext = () => track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      prevBtn.addEventListener("click", onPrev);
      nextBtn.addEventListener("click", onNext);
      onCarouselScroll = updateButtons;
      onCarouselResize = updateButtons;
      track.addEventListener("scroll", onCarouselScroll, { passive: true });
      window.addEventListener("resize", onCarouselResize);
      requestAnimationFrame(() => {
        updateButtons();
        setTimeout(updateButtons, 250);
      });

      (prevBtn as HTMLButtonElement & { __onPrev?: () => void }).__onPrev = onPrev;
      (nextBtn as HTMLButtonElement & { __onNext?: () => void }).__onNext = onNext;
    }

    /* Marquee banner — opposite-direction infinite marquees (no pinning) */
    const marqueeTweens: gsap.core.Tween[] = [];
    if (!reducedMotion) {
      const banner = document.querySelector(".marquee-banner");
      const s1 = banner?.querySelector<HTMLElement>(".marquee-banner__sentence--1 p");
      const s2 = banner?.querySelector<HTMLElement>(".marquee-banner__sentence--2 p");

      if (banner && s1 && s2) {
        document.fonts.ready.then(() => {
          marqueeTweens.push(
            gsap.to(s1, { x: () => -s1.clientWidth / 2, ease: "none", duration: 18, repeat: -1 }),
            gsap.from(s2, { x: () => -s2.clientWidth / 2, ease: "none", duration: 18, repeat: -1 })
          );
        });

        marqueeTweens.push(
          gsap.to([s1, s2], {
            yPercent: "-=100",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: banner,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          })
        );
      }
    }

    /* Reveal */
    let observer: IntersectionObserver | null = null;
    if (!reducedMotion && "IntersectionObserver" in window) {
      const revealEls = document.querySelectorAll(".reveal");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const siblings = el.parentElement
              ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
              : [];
            const index = siblings.indexOf(el);
            const delay =
              index > 0 && siblings.length > 1 && siblings.length < 8 ? index * 90 : 0;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            observer?.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer?.observe(el));
    } else {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    }

    return () => {
      themeObserver?.disconnect();
      if (heroSection && onHeroPointerMove) {
        heroSection.removeEventListener("pointermove", onHeroPointerMove);
      }
      if (heroSection && onHeroPointerLeave) {
        heroSection.removeEventListener("pointerleave", onHeroPointerLeave);
      }
      gsap.killTweensOf(document.documentElement, "--hero-par-x,--hero-par-y");
      document.documentElement.style.setProperty("--hero-par-x", "0");
      document.documentElement.style.setProperty("--hero-par-y", "0");
      document.removeEventListener("click", onAnchorClick);
      if (track && onCarouselScroll) track.removeEventListener("scroll", onCarouselScroll);
      if (onCarouselResize) window.removeEventListener("resize", onCarouselResize);
      if (prevBtn) {
        const p = prevBtn as HTMLButtonElement & { __onPrev?: () => void };
        if (p.__onPrev) prevBtn.removeEventListener("click", p.__onPrev);
      }
      if (nextBtn) {
        const n = nextBtn as HTMLButtonElement & { __onNext?: () => void };
        if (n.__onNext) nextBtn.removeEventListener("click", n.__onNext);
      }
      marqueeTweens.forEach((t) => t.kill());
      observer?.disconnect();
      gsap.ticker.remove(tickerCb);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
