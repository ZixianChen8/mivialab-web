"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HERO_ANIM } from "@/lib/hero-anim-config";
import { buildHeroSpotlightScrim, HERO_BG_LAYERS } from "@/lib/hero-bg-layers-config";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

type SiteMotionProps = {
  /** Enable Lenis + hero horizontal cards (home only). */
  enableHero?: boolean;
};

function signedRange(min: number, span: number) {
  const magnitude = Math.random() * span + min;
  return magnitude * (Math.random() < 0.5 ? 1 : -1);
}

export function SiteMotion({ enableHero = false }: SiteMotionProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cfg = HERO_ANIM;
    const skyCfg = HERO_BG_LAYERS.sky;
    const foliageCfg = HERO_BG_LAYERS.foliage;
    const spotCfg = HERO_BG_LAYERS.spotlight;

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    function applyHeroCssVars() {
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
      rootStyle.setProperty("--hero-cards-pad-start-vw", String(cfg.cardsPadStartVw));
      rootStyle.setProperty("--hero-cards-pad-end-vw", String(cfg.cardsPadEndVw));
      rootStyle.setProperty("--hero-cards-pad-start-mobile-vw", String(cfg.cardsPadStartMobileVw));
      rootStyle.setProperty("--hero-cards-pad-end-mobile-vw", String(cfg.cardsPadEndMobileVw));
      rootStyle.setProperty("--hero-card-w-vw", String(cfg.cardWidthVw));
      rootStyle.setProperty("--hero-card-min-px", String(cfg.cardMinWidthPx));
      rootStyle.setProperty("--hero-card-gap-vw", String(cfg.cardGapVw));
      rootStyle.setProperty("--hero-card-radius-vw", String(cfg.cardRadiusVw));
      rootStyle.setProperty("--hero-card-border-vw", String(cfg.cardBorderVw));
      rootStyle.setProperty("--hero-rail-rotate", `${cfg.cardsRailRotateDeg}deg`);
      rootStyle.setProperty(
        "--hero-rail-origin",
        `${cfg.cardsRailRotateOriginXPercent}% ${cfg.cardsRailRotateOriginYPercent}%`
      );
      rootStyle.setProperty("--hero-rail-offset-y-vh", String(cfg.cardsRailOffsetYVh));
      rootStyle.setProperty("--hero-rail-offset-y-mobile-vh", String(cfg.cardsRailOffsetYMobileVh));

      rootStyle.setProperty("--hero-bg-scale", String(skyCfg.scale));
      rootStyle.setProperty("--hero-bg-x", `${skyCfg.positionX}%`);
      rootStyle.setProperty("--hero-bg-y", `${skyCfg.positionY}%`);
      rootStyle.setProperty("--hero-bg-inset", `${skyCfg.insetPercent}%`);
      rootStyle.setProperty("--hero-fg-scale", String(foliageCfg.scale));
      rootStyle.setProperty("--hero-fg-x", `${foliageCfg.positionX}%`);
      rootStyle.setProperty("--hero-fg-y", `${foliageCfg.positionY}%`);

      rootStyle.setProperty("--hero-spot-x", `${spotCfg.x}%`);
      rootStyle.setProperty("--hero-spot-y", `${spotCfg.y}%`);
      rootStyle.setProperty("--hero-spot-w", `${spotCfg.width}%`);
      rootStyle.setProperty("--hero-spot-h", `${spotCfg.height}%`);
      rootStyle.setProperty("--hero-spot-clear", `${spotCfg.clear}%`);
    }

    applyHeroCssVars();

    const themeObserver = new MutationObserver(() => {
      applyHeroCssVars();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let splashTimer: ReturnType<typeof setTimeout> | undefined;
    if (enableHero) {
      const hero = document.querySelector(".artist-container");
      if (hero) {
        splashTimer = setTimeout(() => {
          hero.classList.add("revealed");
        }, 250);
      }
    }

    let lenis: Lenis | null = null;
    const sc = cfg.smoothScroll;
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

    /* Hero horizontal cards — sticky hero + scrub track, then page-sheet cover */
    let onLoadRefresh: (() => void) | undefined;
    let onRefreshInit: (() => void) | undefined;
    let heroDraggable: Draggable | undefined;
    if (enableHero && !reducedMotion) {
      const root = document.querySelector(".hero");
      const scrollTrack = document.querySelector<HTMLElement>(".hero-scroll-track");
      if (root) {
        const cardsTrack = root.querySelector<HTMLElement>(".hero__cards");
        const cards = root.querySelectorAll<HTMLElement>(".hero__card");
        const scrollHint = root.querySelector(".hero-scroll");

        if (cardsTrack && cards.length && scrollTrack) {
          const scrub = cfg.scrub;
          const hintDuration = cfg.scrollHintDuration;
          const getDistance = () => Math.max(0, cardsTrack.scrollWidth - window.innerWidth);

          const syncTrackHeight = () => {
            scrollTrack.style.height = `${getDistance()}px`;
          };
          syncTrackHeight();
          onRefreshInit = syncTrackHeight;
          ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

          const setScrollY = (y: number) => {
            if (lenis) {
              lenis.scrollTo(y, { immediate: true });
            } else {
              window.scrollTo(0, y);
            }
          };

          if (scrollHint) {
            gsap.to(scrollHint, {
              autoAlpha: 0,
              duration: hintDuration,
              scrollTrigger: {
                trigger: scrollTrack,
                start: "top bottom",
                end: "top bottom-=1",
                toggleActions: "play none reverse none",
              },
            });
          }

          /* Sticky CSS holds the hero; this track supplies scrub distance (no GSAP pin). */
          const scrollTween = gsap.to(cardsTrack, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: scrollTrack,
              scrub,
              start: "top bottom",
              end: "bottom bottom",
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card) => {
            const values = {
              x: signedRange(cfg.xPercentMin, cfg.xPercentSpan),
              y: signedRange(cfg.yPercentMin, cfg.yPercentSpan),
              rotation: signedRange(cfg.rotationMin, cfg.rotationSpan),
            };

            gsap.fromTo(
              card,
              {
                rotation: values.rotation,
                xPercent: values.x,
                yPercent: values.y,
              },
              {
                rotation: -values.rotation,
                xPercent: -values.x,
                yPercent: -values.y,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: cfg.cardTriggerStart,
                  end: cfg.cardTriggerEnd,
                  scrub: true,
                },
              }
            );
          });

          const st = scrollTween.scrollTrigger;
          if (st) {
            const proxy = document.createElement("div");
            let pressScroll = 0;

            heroDraggable = Draggable.create(proxy, {
              trigger: cardsTrack,
              type: "x",
              inertia: true,
              lockAxis: true,
              allowContextMenu: true,
              onPress() {
                cardsTrack.classList.add("is-dragging");
                pressScroll = st.scroll();
              },
              onDrag() {
                const next = gsap.utils.clamp(
                  st.start,
                  st.end,
                  pressScroll - (this.x - this.startX)
                );
                setScrollY(next);
              },
              onThrowUpdate() {
                const next = gsap.utils.clamp(
                  st.start,
                  st.end,
                  pressScroll - (this.x - this.startX)
                );
                setScrollY(next);
              },
              onRelease() {
                if (!this.tween) cardsTrack.classList.remove("is-dragging");
              },
              onThrowComplete() {
                cardsTrack.classList.remove("is-dragging");
              },
            })[0];
          }

          onLoadRefresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", onLoadRefresh);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          });
        }
      }
    }

    return () => {
      if (splashTimer) clearTimeout(splashTimer);
      document.removeEventListener("click", onAnchorClick);
      if (onLoadRefresh) window.removeEventListener("load", onLoadRefresh);
      if (onRefreshInit) ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      heroDraggable?.kill();
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
      themeObserver.disconnect();
      gsap.ticker.remove(tickerCb);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enableHero, JSON.stringify(HERO_BG_LAYERS.spotlight), JSON.stringify(HERO_BG_LAYERS.sky), JSON.stringify(HERO_BG_LAYERS.foliage)]);

  return null;
}
