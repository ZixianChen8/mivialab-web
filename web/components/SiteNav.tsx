"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FOOTER_SOCIAL } from "@/lib/footer";

type SiteNavProps = {
  variant?: "hero" | "page";
};

const SOCIAL_ICON_SRC: Partial<Record<string, string>> = {
  LinkedIn: "/assets/icons/linkedin.svg",
};

/**
 * Fade the solid nav in while the page sheet is still approaching,
 * so the bar is fully opaque before sheet content slides underneath.
 */
const NAV_FADE_START_EXTRA = 260;
const NAV_FADE_END_EXTRA = 24;

function SocialLinkContent({ label }: { label: string }) {
  const iconSrc = SOCIAL_ICON_SRC[label];
  if (iconSrc) {
    return (
      <img
        className="nav-social__icon"
        src={iconSrc}
        alt=""
        width={18}
        height={18}
        decoding="async"
      />
    );
  }
  return <>{label}</>;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function SiteNav({ variant = "hero" }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const homeHref = variant === "page" ? "/" : "#home";
  const servicesHref = variant === "page" ? "/#services" : "#services";
  const contactHref = variant === "page" ? "/#contact" : "#contact";

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    if (variant === "page") {
      backdrop.style.opacity = "1";
      return;
    }

    const sheet = document.querySelector(".page-sheet");
    const navBar = document.querySelector<HTMLElement>(".site-header .nav");
    if (!sheet || !navBar) return;

    let raf = 0;
    let current = Number(backdrop.style.opacity || "0") || 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readTarget = () => {
      const navHeight = navBar.getBoundingClientRect().height;
      const sheetTop = sheet.getBoundingClientRect().top;
      const start = navHeight + NAV_FADE_START_EXTRA;
      const end = navHeight + NAV_FADE_END_EXTRA;
      return clamp01((start - sheetTop) / Math.max(1, start - end));
    };

    const paint = (opacity: number) => {
      current = opacity;
      backdrop.style.opacity = String(opacity);
    };

    const tick = () => {
      raf = 0;
      const target = readTarget();
      if (reducedMotion) {
        paint(target);
        return;
      }
      const next = current + (target - current) * 0.22;
      const settled = Math.abs(target - next) < 0.002;
      paint(settled ? target : next);
      if (!settled) raf = requestAnimationFrame(tick);
    };

    const requestTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Drive from Lenis + native scroll; rAF catch-up finishes the fade between events.
    paint(readTarget());
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("mivia:scroll", requestTick);
    window.addEventListener("resize", requestTick, { passive: true });
    requestTick();

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("mivia:scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [variant]);

  const headerClass = [
    "site-header",
    variant === "page" ? "site-header--page" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <nav className="nav" aria-label="Primary">
        <div className="nav__backdrop" ref={backdropRef} aria-hidden="true" />

        <div className="nav-end">
          <ul className="nav-links">
            <li>
              <Link
                href="/about"
                {...(variant === "page" ? { "aria-current": "page" as const } : {})}
              >
                About
              </Link>
            </li>
            <li>
              <a href={servicesHref}>Services</a>
            </li>
            <li>
              <a href={contactHref}>Contact</a>
            </li>
          </ul>

          <ul className="nav-social" aria-label="Social">
            {FOOTER_SOCIAL.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <SocialLinkContent label={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Link className="nav-brand" href={homeHref} aria-label="MiviaLab home">
          <img
            src="/assets/images/logo/design1_bw_upscaled_tr.png"
            alt=""
            width={144}
            height={144}
          />
        </Link>

        <button
          className="nav-menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className="nav-mobile" id="mobile-nav" hidden={!open}>
        <div className="nav-mobile__links">
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <a href={servicesHref} onClick={() => setOpen(false)}>
            Services
          </a>
          <a href={contactHref} onClick={() => setOpen(false)}>
            Contact
          </a>
        </div>

        <div className="nav-mobile__social">
          {FOOTER_SOCIAL.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              onClick={() => setOpen(false)}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <SocialLinkContent label={link.label} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
