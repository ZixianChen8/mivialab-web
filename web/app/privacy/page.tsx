import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { STUDIO_EMAIL } from "@/lib/mail";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site-config";
import "./privacy.css";

const PRIVACY_TITLE = "Privacy Policy";
const PRIVACY_DESCRIPTION =
  "Learn how MiviaLab handles contact form information, website analytics, browser preferences, and technical data.";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/privacy",
    siteName: SITE_NAME,
    title: `${PRIVACY_TITLE} | ${SITE_NAME}`,
    description: PRIVACY_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MiviaLab privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIVACY_TITLE} | ${SITE_NAME}`,
    description: PRIVACY_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const POLICY_SECTIONS = [
  ["scope", "Who this notice covers"],
  ["information", "Information we collect"],
  ["use", "How we use and share it"],
  ["analytics", "Analytics and cookies"],
  ["storage", "Storage and retention"],
  ["transfers", "Cross-border processing"],
  ["choices", "Your rights and choices"],
  ["security", "Security"],
  ["changes", "Changes to this notice"],
  ["contact", "Contact us"],
] as const;

function ExternalLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="page-privacy">
      <a className="privacy-skip-link" href="#privacy-content">
        Skip to privacy content
      </a>
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" />

      <main className="privacy-page" id="privacy-content">
        <article className="privacy-page__inner">
          <header className="privacy-page__header">
            <p className="privacy-page__eyebrow">Privacy</p>
            <h1>Privacy Policy</h1>
            <p className="privacy-page__lead">
              This privacy notice explains how MiviaLab handles personal
              information when you visit this website or send a project
              inquiry. It provides general information about this website and
              is not legal advice.
            </p>
            <p className="privacy-page__effective">
              Effective{" "}
              <time dateTime="2026-07-26">July 26, 2026</time>
            </p>
          </header>

          <div className="privacy-page__layout">
            <nav className="privacy-page__contents" aria-label="Privacy policy contents">
              <p className="privacy-page__contents-title">On this page</p>
              <ol>
                {POLICY_SECTIONS.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="privacy-page__body">
              <section className="privacy-page__section" id="scope">
                <h2>Who this notice covers</h2>
                <p>
                  MiviaLab is the public-facing operator of this website and is
                  responsible for the practices described in this notice. This
                  notice covers information handled through the MiviaLab
                  website, its project inquiry form, and its website analytics.
                </p>
                <p>
                  Links may take you to services or websites operated by other
                  organizations. Their own privacy notices apply once you leave
                  this website.
                </p>
              </section>

              <section className="privacy-page__section" id="information">
                <h2>Information we collect</h2>
                <h3>Information you provide</h3>
                <p>
                  The project inquiry form asks for your name, email address,
                  an optional company name, and project details. If you contact
                  MiviaLab another way, we receive the information you include
                  in that communication.
                </p>
                <p>
                  Please do not submit sensitive personal information, payment
                  card details, health information, government identifiers, or
                  passwords through the project inquiry form.
                </p>

                <h3>Technical information</h3>
                <p>
                  When your browser requests the website, hosting systems may
                  process technical information such as your IP address,
                  browser and device details, requested URL, date and time,
                  referring page, system configuration, and diagnostic or
                  security events.
                </p>

                <h3>Analytics information</h3>
                <p>
                  When Google Analytics 4 is active, MiviaLab may collect page
                  paths without query strings, page titles, referring-site
                  origins, general device and network information, and
                  interaction events such as calls to action, contact-link
                  clicks, and successful project inquiry submissions. MiviaLab
                  does not intentionally send the text you enter in the contact
                  form to Google Analytics.
                </p>
              </section>

              <section className="privacy-page__section" id="use">
                <h2>How we use and share information</h2>
                <p>MiviaLab uses information to:</p>
                <ul>
                  <li>respond to inquiries and discuss potential projects;</li>
                  <li>operate, secure, maintain, and troubleshoot the website;</li>
                  <li>understand website use and improve content and navigation;</li>
                  <li>protect MiviaLab, visitors, and the public from misuse; and</li>
                  <li>meet legal obligations and establish or defend legal claims.</li>
                </ul>

                <p>
                  MiviaLab uses service providers only for the functions needed
                  to operate this website and communicate with you:
                </p>
                <dl className="privacy-page__providers">
                  <div>
                    <dt>Resend</dt>
                    <dd>
                      The contact form sends your name, email address, optional
                      company name, and project details through Resend as an
                      email to MiviaLab. Read the{" "}
                      <ExternalLink href="https://resend.com/legal/privacy-policy">
                        Resend Privacy Policy
                      </ExternalLink>
                      .
                    </dd>
                  </div>
                  <div>
                    <dt>Vercel</dt>
                    <dd>
                      Vercel hosts and delivers the website. It may process
                      network requests, IP-derived location information, system
                      configuration, runtime logs, diagnostics, and security
                      data. Read the{" "}
                      <ExternalLink href="https://vercel.com/legal/privacy-notice">
                        Vercel Privacy Notice
                      </ExternalLink>
                      .
                    </dd>
                  </div>
                  <div>
                    <dt>Google Analytics</dt>
                    <dd>
                      Google processes website analytics data when analytics is
                      active. Read the{" "}
                      <ExternalLink href="https://policies.google.com/privacy">
                        Google Privacy Policy
                      </ExternalLink>
                      .
                    </dd>
                  </div>
                </dl>
                <p>
                  MiviaLab does not sell or rent project inquiry information.
                  Information may still be disclosed when required by law, to
                  protect rights or safety, or as part of a business
                  reorganization.
                </p>
              </section>

              <section className="privacy-page__section" id="analytics">
                <h2>Analytics and cookies</h2>
                <div className="privacy-page__notice">
                  <p className="privacy-page__notice-label">Default setting</p>
                  <p>
                    When Google Analytics is configured on the live,
                    indexable website, analytics is enabled by default. You can
                    opt out at any time through the Cookie settings control in
                    the footer. The website remains available if you opt out.
                  </p>
                </div>
                <p>
                  Google Analytics may set first-party cookies such as{" "}
                  <code>_ga</code> and{" "}
                  <code>_ga_&lt;container-id&gt;</code> to distinguish visitors
                  and maintain session state. Google may also process browser,
                  device, network, and approximate location information as part
                  of providing analytics.
                </p>
                <p>
                  MiviaLab&apos;s website code removes URL query strings from
                  the page locations and interaction events it sends to
                  analytics. The GA4 property must also keep browser-history
                  page views disabled to maintain this behavior. MiviaLab
                  disables Google signals and ad-personalization signals. The
                  analytics implementation records a successful inquiry event,
                  but it does not attach your name, email, company, or project
                  description to that event.
                </p>
                <p>
                  MiviaLab&apos;s retention limit for GA4 user-level and
                  event-level data is up to 14 months. Google explains that
                  this retention setting does not remove standard aggregated
                  reports on the same schedule.
                </p>
                <p>
                  Opting out controls future analytics activity in that
                  browser. MiviaLab stops future analytics, tries to remove
                  Google Analytics cookies set on this site, and reloads the
                  page to unload Analytics when needed. Browser and domain
                  restrictions can prevent every cookie from being removed.
                  Opting out does not automatically delete information that was
                  already received by Google.
                </p>
              </section>

              <section className="privacy-page__section" id="storage">
                <h2>Storage and retention</h2>
                <p>
                  The website stores a versioned analytics preference in your
                  browser&apos;s localStorage. This preference is necessary to
                  remember your choice and is not an analytics cookie. It stays
                  in that browser until you change the setting, clear site
                  storage, or MiviaLab replaces the preference format with a
                  newer version. The preference expires after one year, then
                  the website shows the analytics notice again on the next
                  full page load or storage change.
                </p>
                <p>
                  Contact inquiries and related correspondence are kept only as
                  long as reasonably needed to respond, manage a potential or
                  active business relationship, maintain appropriate business
                  records, resolve disputes, and meet legal obligations. There
                  is no single fixed retention period for every inquiry.
                </p>
                <p>
                  Vercel, Resend, and Google apply their own service settings
                  and retention practices to information they process.
                  MiviaLab&apos;s GA4 user-level and event-level retention limit
                  is up to 14 months, as described above.
                </p>
              </section>

              <section className="privacy-page__section" id="transfers">
                <h2>Cross-border processing</h2>
                <p>
                  MiviaLab is based in Canada, but Vercel, Resend, Google, and
                  related infrastructure may process or store information in
                  the United States and other countries. Information processed
                  outside Canada may be subject to the laws and lawful access
                  rules of those jurisdictions.
                </p>
              </section>

              <section className="privacy-page__section" id="choices">
                <h2>Your rights and choices</h2>
                <p>You can:</p>
                <ul>
                  <li>
                    use Cookie settings in the footer to opt out of or turn
                    analytics back on;
                  </li>
                  <li>
                    clear this site&apos;s cookies and localStorage through your
                    browser settings;
                  </li>
                  <li>
                    ask what personal information MiviaLab holds about you;
                  </li>
                  <li>
                    ask MiviaLab to correct or delete your information; and
                  </li>
                  <li>
                    object to or withdraw permission for certain uses where
                    applicable.
                  </li>
                </ul>
                <p>
                  These rights may depend on where you live and may be subject
                  to legal exceptions or record-keeping requirements. MiviaLab
                  may need to verify your identity before completing a request.
                  Contact MiviaLab using the address below.
                </p>
              </section>

              <section className="privacy-page__section" id="security">
                <h2>Security</h2>
                <p>
                  MiviaLab uses reasonable administrative and technical
                  safeguards intended to protect information from unauthorized
                  access, loss, misuse, or alteration. No website, email
                  service, network transmission, or storage system can be
                  guaranteed to be completely secure.
                </p>
              </section>

              <section className="privacy-page__section" id="changes">
                <h2>Changes to this notice</h2>
                <p>
                  MiviaLab may update this notice when the website, service
                  providers, analytics configuration, or legal requirements
                  change. The effective date at the top of this page will be
                  updated, and significant changes may also be highlighted on
                  the website.
                </p>
              </section>

              <section className="privacy-page__section" id="contact">
                <h2>Contact us</h2>
                <p>
                  For privacy questions or requests, contact MiviaLab at{" "}
                  <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>.
                </p>
                <address>
                  MiviaLab
                  <br />
                  Ottawa to Toronto corridor, Canada
                </address>
              </section>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
