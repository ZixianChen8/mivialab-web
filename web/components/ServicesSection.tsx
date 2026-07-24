"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";

type Service = {
  name: string;
  meta: string;
  role: string;
  description: string;
  details: string[];
};

const SERVICES: Service[] = [
  {
    name: "Websites",
    meta: "Core offer",
    role: "Design & development",
    description:
      "Custom, mobile-friendly sites built around your services, customers, and how people reach you.",
    details: [
      "New builds, redesigns, branch sites, and landing pages",
      "Structure and content shaped around real business goals",
      "Clean custom code instead of template platforms",
    ],
  },
  {
    name: "SEO",
    meta: "Launch + care",
    role: "Search & optimization",
    description:
      "Basic setup at launch plus ongoing improvements so search engines understand your business and local customers can find what you offer.",
    details: [
      "Titles, descriptions, and page structure done right from day one",
      "Local search signals that match how people look for you",
      "Ongoing tweaks as content and offerings change",
    ],
  },
  {
    name: "Care",
    meta: "Ongoing",
    role: "Website maintenance",
    description:
      "Keep content, contact details, and technical basics current without you logging into a builder or chasing broken links.",
    details: [
      "Content and contact updates handled for you",
      "Security reviews and routine technical upkeep",
      "You stay focused on the business, not the CMS",
    ],
  },
  {
    name: "Materials",
    meta: "Supporting",
    role: "Promotional graphics",
    description:
      "AI-assisted posters, social graphics, and short video edits that match your site, events, and outreach.",
    details: [
      "Visuals aligned with your website look and voice",
      "Event and campaign pieces when you need them",
      "Fast turnaround without a separate design vendor",
    ],
  },
];

const PANEL_EASE = "power2.out";
const PANEL_DURATION = 0.55;

export function ServicesSection() {
  const baseId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTweenRef = useRef<gsap.core.Timeline | null>(null);
  const prevOpenRef = useRef<number | null>(null);
  const readyRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [openIndex, setOpenIndex] = useState(0);

  function killActiveTween() {
    activeTweenRef.current?.kill();
    activeTweenRef.current = null;
    panelRefs.current.forEach((panel) => {
      if (panel) gsap.killTweensOf(panel);
    });
    bodyRefs.current.forEach((body) => {
      if (body) gsap.killTweensOf(body);
    });
  }

  function measurePanel(panel: HTMLElement) {
    const prevHeight = panel.style.height;
    const prevOverflow = panel.style.overflow;
    panel.style.height = "auto";
    panel.style.overflow = "hidden";
    const height = panel.scrollHeight;
    panel.style.height = prevHeight;
    panel.style.overflow = prevOverflow;
    return height;
  }

  function applyClosed(panel: HTMLElement, body: HTMLElement) {
    gsap.set(panel, { height: 0, overflow: "hidden" });
    gsap.set(body, { autoAlpha: 0, y: 0 });
  }

  function applyOpen(panel: HTMLElement, body: HTMLElement) {
    gsap.set(panel, { height: "auto", overflow: "hidden" });
    gsap.set(body, { autoAlpha: 1, y: 0, clearProps: "transform" });
  }

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    readyRef.current = true;
    rootRef.current?.setAttribute("data-services-ready", "true");

    panelRefs.current.forEach((panel, index) => {
      const body = bodyRefs.current[index];
      if (!panel || !body) return;
      if (index === openIndex) applyOpen(panel, body);
      else applyClosed(panel, body);
    });

    prevOpenRef.current = openIndex;

    return () => {
      killActiveTween();
      readyRef.current = false;
    };
    // Mount baseline only; openIndex changes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;

    const previous = prevOpenRef.current;
    if (previous === openIndex) return;

    killActiveTween();

    const nextPanel = openIndex >= 0 ? panelRefs.current[openIndex] : null;
    const nextBody = openIndex >= 0 ? bodyRefs.current[openIndex] : null;
    const prevPanel = previous != null && previous >= 0 ? panelRefs.current[previous] : null;
    const prevBody = previous != null && previous >= 0 ? bodyRefs.current[previous] : null;

    if (reducedMotionRef.current) {
      if (prevPanel && prevBody) applyClosed(prevPanel, prevBody);
      if (nextPanel && nextBody) applyOpen(nextPanel, nextBody);
      prevOpenRef.current = openIndex;
      return;
    }

    const targetOpenIndex = openIndex;
    const tl = gsap.timeline({
      defaults: { ease: PANEL_EASE },
      onComplete: () => {
        // Only commit final open styles if this timeline still matches state.
        if (prevOpenRef.current !== targetOpenIndex) return;
        if (nextPanel && nextBody) applyOpen(nextPanel, nextBody);
      },
    });
    activeTweenRef.current = tl;

    if (prevPanel && prevBody) {
      const fromHeight = prevPanel.offsetHeight || measurePanel(prevPanel);
      gsap.set(prevPanel, { height: fromHeight, overflow: "hidden" });
      tl.to(prevBody, { autoAlpha: 0, y: 8, duration: PANEL_DURATION * 0.4 }, 0);
      tl.to(prevPanel, { height: 0, duration: PANEL_DURATION }, 0);
    }

    if (nextPanel && nextBody) {
      gsap.set(nextPanel, { height: 0, overflow: "hidden" });
      gsap.set(nextBody, { autoAlpha: 0, y: 14 });
      const targetHeight = measurePanel(nextPanel);
      tl.to(nextPanel, { height: targetHeight, duration: PANEL_DURATION }, 0);
      tl.to(nextBody, { autoAlpha: 1, y: 0, duration: PANEL_DURATION }, 0.06);
    }

    prevOpenRef.current = openIndex;

    return () => {
      tl.kill();
      if (activeTweenRef.current === tl) activeTweenRef.current = null;
    };
  }, [openIndex]);

  return (
    <section
      ref={rootRef}
      className="services section--light"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="services__inner">
        <div className="services__head reveal">
          <h2 className="services__title" id="services-heading">
            What we do for your business
          </h2>
          <p className="services__sub">
            Clear, professional websites at the center, with the support most small businesses need
            around them.
          </p>
        </div>

        <ul className="services__list">
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const labelId = `${baseId}-label-${index}`;

            return (
              <li key={service.name} className={`services__item${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="services__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={labelId}
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                >
                  <span className="services__name">{service.name}</span>
                  <span className="services__summary">
                    <span className="services__meta-block">
                      <span className="services__meta">({service.meta})</span>
                      <span className="services__role">{service.role}</span>
                    </span>
                    <span className="services__icon" aria-hidden="true">
                      <span className="services__icon-h" />
                      <span className="services__icon-v" />
                    </span>
                  </span>
                </button>

                <div
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="services__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={labelId}
                  aria-hidden={!isOpen}
                >
                  <div
                    ref={(el) => {
                      bodyRefs.current[index] = el;
                    }}
                    className="services__panel-body"
                  >
                    <p className="services__desc">{service.description}</p>
                    <ul className="services__details">
                      {service.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
