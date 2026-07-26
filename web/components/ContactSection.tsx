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
              Explore ideas, strategies, and creative insights that help brands grow and digital
              experiences stand out.
            </p>
          </div>
        </header>

        <div className="contact-section__main">
          <aside className="contact-section__info" aria-label="Studio details">
            <div className="contact-section__group">
              <h3 className="contact-section__group-title">Support</h3>
              <p className="contact-section__group-text">
                <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
                <br />
                <a href="tel:+18192137859">819 213 7859</a>
                <br />
                <a href="tel:+17787914482">778 791 4482</a>
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
