"use client";

import { useId, useState } from "react";

type Service = {
  name: string;
  meta: string;
  role: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    name: "Websites",
    meta: "Core offer",
    role: "Design & development",
    description:
      "We design and develop custom websites for small businesses that need a professional and effective online presence. Each website is built around the client's brand, services and business goals, with a strong focus on clear communication, responsive design, fast load times and ease of use. We also handle the essential technical setup required to launch the website, including domain connection, hosting configuration, contact forms, analytics and foundational SEO.",
  },
  {
    name: "SEO",
    meta: "Launch + care",
    role: "Search Engine Optimization",
    description:
      "We build your website using search-friendly structure and technical best practices, including metadata, mobile optimization, sitemap configuration, indexing setup and Google Search Console integration. Ongoing SEO can continue through a monthly care plan. New pages, features and integrations are quoted separately.",
  },
  {
    name: "Care",
    meta: "Ongoing",
    role: "Website maintenance",
    description:
      "We provide ongoing website maintenance to keep your website secure, reliable and current after launch. Our maintenance service covers routine updates, content changes, performance checks, backups and technical support. This helps prevent avoidable issues, protects the website from outdated software and ensures visitors continue to receive a smooth and professional experience.",
  },
  {
    name: "Content",
    meta: "Supporting",
    role: "promotional content",
    description:
      "We create professional promotional content that helps businesses communicate their offers, events and services clearly. Each design is adapted to the client's brand and intended audience, with formats prepared for both digital use and printing. From social media graphics and posters to flyers and brochures, we provide cohesive content that strengthens brand recognition and supports marketing campaigns.",
  },
];

export function ServicesSection() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="services section--cream" id="services" aria-labelledby="services-heading">
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
                  className="services__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={labelId}
                  aria-hidden={!isOpen}
                >
                  <div className="services__panel-clip">
                    <div className="services__panel-body">
                      <p className="services__desc">{service.description}</p>
                    </div>
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
