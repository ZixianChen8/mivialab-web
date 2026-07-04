"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

/**
 * The primary contact action. Front-end only in this design exploration:
 * submitting shows a success state. Wire to a real endpoint / email service
 * when the site goes live.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // REVIEW: connect to a real form handler (email / CRM) before launch.
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successMark} aria-hidden="true">
          &#10003;
        </span>
        <h3 className={styles.successTitle}>Thanks &mdash; message received.</h3>
        <p className={styles.successText}>
          We&rsquo;ll get back to you within one business day. In a hurry? Reach
          us on WeChat or by email, just over there.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="cf-name" className={styles.label}>
          Your name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className={styles.input}
          placeholder="Jane Tremblay"
          autoComplete="name"
          required
          data-cursor
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-business" className={styles.label}>
          Your business
        </label>
        <input
          id="cf-business"
          name="business"
          type="text"
          className={styles.input}
          placeholder="Bakery, clinic, studio&hellip;"
          autoComplete="organization"
          required
          data-cursor
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className={styles.label}>
          What do you need?
        </label>
        <textarea
          id="cf-message"
          name="message"
          className={styles.textarea}
          placeholder="A few lines about your business and what you're hoping for."
          rows={4}
          required
          data-cursor
        />
      </div>

      <button type="submit" className={styles.submit} data-cursor>
        Send message
        <span aria-hidden="true">&rarr;</span>
      </button>

      <p className={styles.assurance}>
        No obligation. We usually reply within one business day.
      </p>
    </form>
  );
}
