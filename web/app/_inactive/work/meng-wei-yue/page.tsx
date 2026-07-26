import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./work-detail.css";

// Preserved for future reuse. The private parent folder keeps this page out of routing.
export const metadata: Metadata = {
  title: "Meng Wei Yue Opera Studio — MiviaLab",
  description:
    "Real client work: bilingual website for Meng Wei Yue Opera Studio, an Ottawa-area music and arts studio.",
};

export default function InactiveMengWeiYuePage() {
  return (
    <>
      <div className="wd">
        <nav className="wd__nav" aria-label="Work detail">
          <Link href="/">← MiviaLab</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <header className="wd__hero">
          <span className="wd__badge">Real client</span>
          <h1>Meng Wei Yue Opera Studio</h1>
          <p>
            A bilingual website for an Ottawa-area music and arts studio — brand presence, clearer
            scheduling, and a polished online home.
          </p>
        </header>

        <section className="wd__section" aria-labelledby="story-heading">
          <h2 id="story-heading">What we built</h2>
          <p>
            Meng Wei Yue needed a site that matched the dignity of the studio and made it easy for
            families to understand classes and get in touch. We designed and built a custom bilingual
            experience focused on clarity and trust — not a template skin.
          </p>
        </section>

        <section className="wd__section" aria-labelledby="visuals-heading">
          <h2 id="visuals-heading">Visuals</h2>
          <figure className="wd__visual">
            <Image
              src="/images/cover-2.png"
              alt="Meng Wei Yue Opera Studio website preview"
              width={1200}
              height={800}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </figure>
        </section>

        <section className="wd__section" aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading">Outcomes</h2>
          <p>
            A clear public presence for the studio, bilingual content where it matters, and a site the
            owner does not have to manage day to day. (Additional metrics and testimonials will be added
            when approved — we do not invent them.)
          </p>
        </section>

        <div className="wd__cta">
          <h2>Ready for your own site?</h2>
          <p>Same primary contact path as the landing page — a short project note.</p>
          <Link href="/#contact">Start a project</Link>
        </div>
      </div>
    </>
  );
}
