"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import ContactForm from "@/app/components/ContactForm";
import styles from "./Contact.module.css";

// REVIEW: replace with real handles / addresses before launch.
const CHANNELS = [
  { label: "Email", value: "hello@mivialab.ca", href: "mailto:hello@mivialab.ca" },
  { label: "Phone", value: "+1 (000) 000-0000", href: "tel:+10000000000" },
  { label: "Instagram", value: "@mivialab", href: "#" },
  { label: "LinkedIn", value: "MiviaLab", href: "#" },
  { label: "RedNote", value: "MiviaLab", href: "#" },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="contact" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} data-reveal>
            <span className={styles.index}>06</span> Start here
          </p>
          <h2 className={styles.title} data-reveal>
            Tell us about your business.
          </h2>
          <p className={styles.lead} data-reveal>
            One short message is all it takes. We&rsquo;ll read it, ask a couple
            of questions, and tell you honestly how we&rsquo;d help &mdash; no
            pressure, no jargon.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.formCol} data-reveal>
            <ContactForm />
          </div>

          <aside className={styles.aside}>
            <div className={styles.wechat} data-reveal>
              <p className={styles.asideLabel}>Prefer WeChat?</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat-qr-placeholder.svg"
                alt="WeChat QR code (placeholder)"
                width={150}
                height={150}
                className={styles.qr}
              />
              <p className={styles.wechatNote}>
                Scan to message us on WeChat.
                <br />
                {/* REVIEW: drop in the real WeChat QR image. */}
                <span className={styles.reviewTag}>// REVIEW</span> placeholder
                QR
              </p>
            </div>

            <div className={styles.channels} data-reveal>
              <p className={styles.asideLabel}>Or reach us directly</p>
              <ul className={styles.channelList}>
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a className={styles.channel} href={c.href} data-cursor>
                      <span className={styles.channelLabel}>{c.label}</span>
                      <span className={styles.channelValue}>{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
