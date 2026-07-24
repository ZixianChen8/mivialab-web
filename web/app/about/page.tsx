import type { Metadata } from "next";
import Link from "next/link";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteNav } from "@/components/SiteNav";
import { SiteChoosers } from "@/components/SiteChoosers";

export const metadata: Metadata = {
  title: "About — MiviaLab",
  description:
    "MiviaLab is a Canadian web design and development studio in the Ottawa–Toronto corridor. Custom sites for small businesses, cared for end to end.",
};

export default function AboutPage() {
  const year = new Date().getFullYear();

  return (
    <div className="page-about">
      <SiteMotion />
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" />

      <main>
        <header className="page-about__hero">
          <h1>A Canadian studio in the Ottawa–Toronto corridor</h1>
          <p className="page-about__lede">
            MiviaLab builds modern, custom websites for small businesses — English-first, straightforward,
            and handled end to end so owners never have to touch the site.
          </p>
        </header>

        <section className="page-about__body" aria-labelledby="studio-heading">
          <div className="page-about__copy">
            <h2 id="studio-heading">Where we sit</h2>
            <p>
              We work between a freelance site builder and a big agency: the structure, SEO setup, and
              ongoing care of a studio, with accessible pricing, direct communication, and a scope that
              flexes to your business.
            </p>
            <p>
              When a project needs it, we deliver bilingual sites in English, French, and 中文 — a premium
              capability, not our brand identity. French is genuinely deliverable for Ottawa’s bilingual
              reality.
            </p>
            <ul className="page-about__points">
              <li>Accessible pricing built for small-business budgets</li>
              <li>Direct communication — you talk to the people building your site</li>
              <li>Flexible scope that grows with your business</li>
              <li>Full service, so you never have to touch the site</li>
            </ul>
          </div>
          <figure className="page-about__visual">
            <img src="/images/gallery-3.png" alt="" loading="lazy" width={640} height={800} />
          </figure>
        </section>

        <section className="page-about__cta" aria-labelledby="about-cta-heading">
          <h2 id="about-cta-heading">Ready to talk about your site?</h2>
          <p>Same short contact form as the main page — tell us what you need.</p>
          <Link className="page-about__cta-link" href="/#contact">
            Start a project
          </Link>
        </section>
      </main>

      <footer className="page-footer">
        <nav className="page-footer__nav" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <p className="page-footer__legal">
          &copy; {year} MiviaLab — Web design &amp; development studio, Ottawa–Toronto corridor
        </p>
      </footer>

      <SiteChoosers />
    </div>
  );
}
