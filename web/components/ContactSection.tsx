import { ContactForm } from "@/components/ContactForm";
import { STUDIO_EMAIL } from "@/lib/mail";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-section__inner">
        <header className="contact-section__header">
          <div className="contact-section__intro">
            <h2 className="contact-section__title" id="contact-heading">
              Contact Us
            </h2>
            <p className="contact-section__lede">
              Tell us what you need built or improved. We will review your
              project and come back with a clear next step.
            </p>
          </div>
        </header>

        <div className="contact-section__main">
          <aside className="contact-section__info" aria-label="Studio details">
            <div className="contact-section__group">
              <h3 className="contact-section__group-title">Start a project</h3>
              <p className="contact-section__group-text">
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  data-analytics-event="contact_click"
                  data-analytics-placement="contact_section"
                  data-analytics-method="email"
                >
                  {STUDIO_EMAIL}
                </a>
                <br />
                <a
                  href="tel:+18192137859"
                  data-analytics-event="contact_click"
                  data-analytics-placement="contact_section"
                  data-analytics-method="phone"
                >
                  819 213 7859
                </a>
                <br />
                <a
                  href="tel:+17787914482"
                  data-analytics-event="contact_click"
                  data-analytics-placement="contact_section"
                  data-analytics-method="phone"
                >
                  778 791 4482
                </a>
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
