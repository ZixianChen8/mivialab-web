"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { STUDIO_EMAIL } from "@/lib/mail";

type FieldErrors = {
  name: boolean;
  email: boolean;
  project: boolean;
};

const EMPTY_ERRORS: FieldErrors = {
  name: false,
  email: false,
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

  function syncAriaInvalid(el: HTMLInputElement | HTMLTextAreaElement) {
    const invalid =
      el.name === "email"
        ? !validateEmail(el.value.trim())
        : el.name === "name" || el.name === "project"
          ? !el.value.trim()
          : !el.checkValidity();

    if (invalid) {
      el.setAttribute("aria-invalid", "true");
    } else {
      el.removeAttribute("aria-invalid");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const projectInput = form.elements.namedItem("project") as HTMLTextAreaElement;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
    const project = projectInput.value.trim();

    const nextErrors: FieldErrors = {
      name: !name,
      email: !validateEmail(email),
      project: !project,
    };
    setErrors(nextErrors);

    const controls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea",
    );
    syncAriaInvalid(nameInput);
    syncAriaInvalid(emailInput);
    syncAriaInvalid(projectInput);

    if (nextErrors.name || nextErrors.email || nextErrors.project) {
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
        body: JSON.stringify({ name, email, company, project }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus(data.error || `Something went wrong. Please try again or email ${STUDIO_EMAIL}.`);
        return;
      }

      setStatus("Thanks. Your message is on its way to MiviaLab.");
      trackEvent("generate_lead", {
        form_name: "project_inquiry",
        method: "contact_form",
      });
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
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
          if (target.required || target.type === "email") {
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
            onInput={(event) => {
              clearField("name");
              syncAriaInvalid(event.currentTarget);
            }}
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
            spellCheck={false}
            required
            aria-required="true"
            aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
            onInput={(event) => {
              clearField("email");
              syncAriaInvalid(event.currentTarget);
            }}
          />
          <p className="contact-form__error" id={`${baseId}-email-error`}>
            Please enter a valid email.
          </p>
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor={`${baseId}-company`}>Company name</label>
          <input
            id={`${baseId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
          />
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
            onInput={(event) => {
              clearField("project");
              syncAriaInvalid(event.currentTarget);
            }}
          />
          <p className="contact-form__error" id={`${baseId}-project-error`}>
            Tell us what you need built or improved.
          </p>
        </div>
      </div>

      <div className="contact-form__actions">
        <p className="contact-form__status">
          MiviaLab uses the details you submit to respond to your inquiry. See
          the{" "}
          <Link
            href="/privacy"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
            }}
          >
            Privacy Policy
          </Link>
          .
        </p>
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
