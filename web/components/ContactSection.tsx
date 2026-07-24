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
              <h3 className="contact-section__group-title">Office Location</h3>
              <p className="contact-section__group-text">
                12273 Dream Avenue, London,
                <br />
                123456 United Kindom
              </p>
            </div>

            <div className="contact-section__group">
              <h3 className="contact-section__group-title">Office Time</h3>
              <p className="contact-section__group-text">
                Monday - Sunday
                <br />
                11am - 7pm
              </p>
            </div>

            <div className="contact-section__group">
              <h3 className="contact-section__group-title">Support</h3>
              <p className="contact-section__group-text">
                <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
                <br />
                <a href="tel:+1234567899">123 456 7899</a>
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
