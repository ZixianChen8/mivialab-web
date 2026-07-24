"use client";

import Link from "next/link";
import { useState } from "react";

type SiteNavProps = {
  variant?: "hero" | "page";
};

export function SiteNav({ variant = "hero" }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  if (variant === "page") {
    return (
      <header className="page-nav">
        <Link className="page-nav__brand" href="/">
          <img
            src="/assets/images/logo/design1_bw_upscaled_tr.png"
            alt="MiviaLab"
            width={120}
            height={120}
          />
        </Link>
        <nav className="page-nav__links" aria-label="Primary">
          <Link href="/about" aria-current="page">
            About
          </Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
    );
  }

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <ul className="nav-links">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <a href="#contact" className="nav-contact">
              Contact
            </a>
          </li>
        </ul>
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
        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </div>
    </>
  );
}
