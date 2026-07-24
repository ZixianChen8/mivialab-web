import { Fragment } from "react";
import { ContactSection } from "@/components/ContactSection";
import { PitchSection } from "@/components/PitchSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteNav } from "@/components/SiteNav";

/** Horizontal hero cards — mwg_effect001. Sample sites labeled as concepts. */
const HERO_CARDS = [
  {
    src: "/images/cover-2.png",
    kind: "Client",
    tag: "Arts studio",
    title: "Meng Wei Yue",
  },
  {
    src: "/images/cover-3.png",
    kind: "Sample",
    tag: "Wellness",
    title: "Harbour Wellness",
  },
  {
    src: "/images/cover-1.png",
    kind: "Sample",
    tag: "Music school",
    title: "Riverbend Music",
  },
  {
    src: "/images/gallery-2.png",
    kind: "Sample",
    tag: "Local retail",
    title: "Canal Street",
  },
  {
    src: "/images/gallery-1.png",
    kind: "Studio",
    tag: "Custom build",
    title: "Clean code",
  },
  {
    src: "/images/gallery-3.png",
    kind: "Studio",
    tag: "Full service",
    title: "Cared for",
  },
  {
    src: "/images/hero.png",
    kind: "Studio",
    tag: "Ottawa–Toronto",
    title: "MiviaLab",
  },
] as const;

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
      <SiteMotion enableHero />

      <div className="home-stack">
        <section className="hero artist-container mwg_effect001" id="home">
          <div className="hero__stage">
            <div className="hero__clip">
              <div className="hero-bg" aria-hidden="true" />

              <svg className="splash-svg" aria-hidden="true" preserveAspectRatio="none">
                <defs>
                  <mask id="splashMask">
                    <rect width="100%" height="100%" fill="black" />
                    <circle className="splash s1" cx="50%" cy="50%" r="40" fill="white" />
                    <circle className="splash s2" cx="55%" cy="48%" r="25" fill="white" />
                    <circle className="splash s3" cx="45%" cy="55%" r="30" fill="white" />
                    <circle className="splash s4" cx="60%" cy="52%" r="20" fill="white" />
                  </mask>
                </defs>
                <rect className="splash-fill" width="100%" height="100%" mask="url(#splashMask)" />
              </svg>

              <SiteNav />

              <div className="hero__rail">
                <div className="hero__cards" aria-hidden="true">
                  {HERO_CARDS.map((card, i) => (
                    <article className="hero__card" key={`${card.title}-${i}`}>
                      <img
                        src={card.src}
                        alt=""
                        width={800}
                        height={1067}
                        draggable={false}
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                      <div className="hero__card-content">
                        <p>
                          <span>{card.kind}</span>
                          <span>{card.tag}</span>
                        </p>
                        <div>
                          <span className="hero__card-from">From</span>
                          <p className="hero__card-title">{card.title}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hero-overlay" aria-hidden="true" />
              <div className="hero-bg-fg" aria-hidden="true" />

              <div className="hero-dock">
                <div className="hero-dock__brand">
                  <img
                    className="brand-name"
                    src="/assets/images/logo/design1_bw_upscaled_tr.png"
                    alt="MiviaLab"
                    width={2000}
                    height={2000}
                  />
                  <div className="hero-dock__copy">
                    <h1 className="brand-headline">Web design &amp; development for small businesses</h1>
                    <p className="brand-tagline">Ottawa–Toronto · custom sites, cared for end to end</p>
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

                <a className="hero-scroll" href="#pitch" aria-label="Scroll to continue">
                  <span className="hero-scroll__label">Scroll</span>
                  <span className="hero-scroll__bar" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll distance for horizontal cards while the sticky hero stays in view */}
        <div className="hero-scroll-track" aria-hidden="true" />

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
