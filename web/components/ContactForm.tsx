"use client";

import { FormEvent, useId, useState } from "react";
import { STUDIO_EMAIL } from "@/lib/mail";

const SERVICE_OPTIONS = [
  "Websites",
  "SEO",
  "Care",
  "Materials",
  "Something else",
] as const;

type FieldErrors = {
  name: boolean;
  email: boolean;
  service: boolean;
  project: boolean;
};

const EMPTY_ERRORS: FieldErrors = {
  name: false,
  email: false,
  service: false,
  project: false,
};

export function ContactForm() {
  const baseId = useId();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>(EMPTY_ERRORS);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function clearField(field: keyof FieldErrors) {
    setErrors((prev) => ({ ...prev, [field]: false }));
    setStatus("");
  }

  function syncAriaInvalid(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    if (!el.checkValidity()) {
      el.setAttribute("aria-invalid", "true");
    } else {
      el.removeAttribute("aria-invalid");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
    const website = (form.elements.namedItem("website") as HTMLInputElement).value.trim();
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value.trim();
    const project = (form.elements.namedItem("project") as HTMLTextAreaElement).value.trim();

    const nextErrors: FieldErrors = {
      name: !name,
      email: !validateEmail(email),
      service: !service,
      project: !project,
    };
    setErrors(nextErrors);

    const controls = form.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >("input, textarea, select");
    controls.forEach(syncAriaInvalid);

    if (nextErrors.name || nextErrors.email || nextErrors.service || nextErrors.project) {
      setStatus("Please complete the highlighted fields.");
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setSending(true);
    setStatus("Sending…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, website, service, project }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus(data.error || `Something went wrong. Please try again or email ${STUDIO_EMAIL}.`);
        return;
      }

      setStatus("Thanks. We’ll get back to you within one business day.");
      form.reset();
      setErrors(EMPTY_ERRORS);
      controls.forEach((el) => el.removeAttribute("aria-invalid"));
    } catch {
      setStatus(`Network error. Please try again or email ${STUDIO_EMAIL}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      noValidate
      onSubmit={onSubmit}
      onBlur={(e) => {
        const target = e.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          if (target.required || target.type === "email" || target.type === "url") {
            syncAriaInvalid(target);
          }
        }
      }}
    >
      <div className="contact-form__grid">
        <div className={`contact-form__field${errors.name ? " has-error" : ""}`}>
          <label htmlFor={`${baseId}-name`}>Enter your name</label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
            onInput={() => clearField("name")}
          />
          <p className="contact-form__error" id={`${baseId}-name-error`}>
            Please enter your name.
          </p>
        </div>

        <div className={`contact-form__field${errors.email ? " has-error" : ""}`}>
          <label htmlFor={`${baseId}-email`}>Email address</label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
            onInput={() => clearField("email")}
          />
          <p className="contact-form__error" id={`${baseId}-email-error`}>
            Please enter a valid email.
          </p>
        </div>

        <div className="contact-form__field">
          <label htmlFor={`${baseId}-company`}>Company name</label>
          <input
            id={`${baseId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor={`${baseId}-website`}>www.example.com</label>
          <input
            id={`${baseId}-website`}
            name="website"
            type="url"
            autoComplete="url"
            inputMode="url"
          />
        </div>

        <div
          className={`contact-form__field contact-form__field--full${errors.service ? " has-error" : ""}`}
        >
          <label htmlFor={`${baseId}-service`}>Select your services</label>
          <div className="contact-form__select-wrap">
            <select
              id={`${baseId}-service`}
              name="service"
              required
              aria-required="true"
              defaultValue=""
              aria-describedby={errors.service ? `${baseId}-service-error` : undefined}
              onChange={() => clearField("service")}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <p className="contact-form__error" id={`${baseId}-service-error`}>
            Please select a service.
          </p>
        </div>

        <div
          className={`contact-form__field contact-form__field--full${errors.project ? " has-error" : ""}`}
        >
          <label htmlFor={`${baseId}-project`}>Project description</label>
          <textarea
            id={`${baseId}-project`}
            name="project"
            rows={3}
            required
            aria-required="true"
            aria-describedby={errors.project ? `${baseId}-project-error` : undefined}
            onInput={() => clearField("project")}
          />
          <p className="contact-form__error" id={`${baseId}-project-error`}>
            Tell us what you need built or improved.
          </p>
        </div>
      </div>

      <div className="contact-form__actions">
        <button className="contact-form__submit" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className="contact-form__status" id="contact-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}
