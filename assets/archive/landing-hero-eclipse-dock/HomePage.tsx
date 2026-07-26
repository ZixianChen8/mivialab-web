import { Fragment } from "react";
import { ContactSection } from "@/components/ContactSection";
import { PitchSection } from "@/components/PitchSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteNav } from "@/components/SiteNav";

const MARQUEE_REPEAT = Array.from({ length: 6 });

function MarqueeGlyph() {
  return (
    <svg
      className="marquee-banner__glyph"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 0c.7 6.3 5 10.6 12 12-7 1.4-11.3 5.7-12 12-.7-6.3-5-10.6-12-12C7 10.6 11.3 6.3 12 0Z"
      />
    </svg>
  );
}

function MarqueeLine({ text }: { text: string }) {
  return (
    <p>
      {MARQUEE_REPEAT.map((_, i) => (
        <Fragment key={i}>
          <span>{text}</span>
          <MarqueeGlyph />
        </Fragment>
      ))}
    </p>
  );
}

export function HomePage() {
  return (
    <>
      <SiteMotion />

      <div className="home-stack">
        <SiteNav />

        <section className="hero" id="home">
          <div className="hero__stage">
            <div className="hero__clip">
              <div className="hero-bg" aria-hidden="true" />
              <div className="hero-overlay" aria-hidden="true" />
              <div className="hero-bg-fg" aria-hidden="true" />

              <div className="hero-dock">
                <div className="hero-dock__intro">
                  <p className="hero-kicker">Ottawa–Toronto studio</p>
                  <h1 className="brand-headline">
                    Web design &amp; development
                    <br />
                    for small businesses
                  </h1>
                </div>

                <div className="hero-dock__support">
                  <p className="brand-tagline">
                    Custom sites, cared for end to end.
                  </p>
                  <div className="hero-actions">
                    <a className="hero-cta" href="#contact">
                      Start a project
                    </a>
                    <a className="hero-secondary" href="#services">
                      See services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-sheet">
          <section className="marquee-banner" aria-label="MiviaLab — let’s build your website">
            <div className="marquee-banner__inner">
              <div className="marquee-banner__sentences" aria-hidden="true">
                <div className="marquee-banner__sentence marquee-banner__sentence--1">
                  <MarqueeLine text="Fast, custom, cared for" />
                </div>
                <div className="marquee-banner__sentence marquee-banner__sentence--2">
                  <MarqueeLine text="Let’s build your website" />
                </div>
              </div>

              <div className="marquee-banner__meta">
                <span>Ottawa · Toronto</span>
                <span>Custom code</span>
                <span>EN · FR · 中文</span>
                <span>MiviaLab</span>
              </div>
            </div>
          </section>

          <main>
            <PitchSection />

            <ServicesSection />

            <ContactSection />

            <SiteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
