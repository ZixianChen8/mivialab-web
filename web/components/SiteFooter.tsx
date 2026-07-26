import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import {
  FOOTER_ADDRESS,
  FOOTER_CONTACT_LINKS,
  FOOTER_SOCIAL,
  FOOTER_STATEMENT,
  FOOTER_WORDMARK,
  type FooterLink,
} from "@/lib/footer";

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      width="10"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 9.5L9.5 2.5M4 2.5h5.5V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function FooterTextLink({ link }: { link: FooterLink }) {
  const className = [
    "site-footer__text-link",
    link.underline ? "site-footer__text-link--underline" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const analyticsProps = link.href.startsWith("mailto:")
    ? {
        "data-analytics-event": "contact_click",
        "data-analytics-placement": "footer",
        "data-analytics-method": "email",
      }
    : link.href === "/#contact"
      ? {
          "data-analytics-event": "cta_click",
          "data-analytics-placement": "footer",
        }
      : {};

  const content = (
    <>
      <span>{link.label}</span>
      {link.external ? <ExternalArrow className="site-footer__arrow" /> : null}
    </>
  );

  if (link.href.startsWith("/")) {
    return (
      <Link className={className} href={link.href} {...analyticsProps}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={link.href}
      {...analyticsProps}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <p className="site-footer__statement">
            {FOOTER_STATEMENT.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          <div className="site-footer__columns">
            <nav className="site-footer__col" aria-label="Social">
              <ul className="site-footer__list">
                {FOOTER_SOCIAL.map((link) => (
                  <li key={link.label}>
                    <FooterTextLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>

            <address className="site-footer__col site-footer__address">
              {FOOTER_ADDRESS.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <nav className="site-footer__col" aria-label="Footer">
              <ul className="site-footer__list">
                {FOOTER_CONTACT_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterTextLink link={link} />
                  </li>
                ))}
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
            </nav>

            <p className="site-footer__copy site-footer__copy--in-columns">
              ©MiviaLab {year} | All rights reserved
            </p>
          </div>
        </div>

        <div className="site-footer__brand">
          <p className="site-footer__wordmark" aria-label="MiviaLab">
            {FOOTER_WORDMARK}
          </p>
          <p className="site-footer__copy site-footer__copy--brand">
            ©MiviaLab <span id="year">{year}</span> | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
