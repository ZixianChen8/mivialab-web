import type { Metadata } from "next";
import { AboutCta } from "@/components/AboutCta";
import { AboutSnowZone } from "@/components/AboutSnowZone";
import { BrandStoryEssay } from "@/components/BrandStoryEssay";
import { BrandStoryScroll } from "@/components/BrandStoryScroll";
import { ClosingArc } from "@/components/ClosingArc";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { JsonLd } from "@/components/JsonLd";
import { MindsetFlip } from "@/components/MindsetFlip";
import { StanceQuote } from "@/components/StanceQuote";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteNav } from "@/components/SiteNav";
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/site-config";
import { aboutStructuredData } from "@/lib/structured-data";
import "./about.css";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/about",
    siteName: SITE_NAME,
    title: `${ABOUT_TITLE} | ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
    images: [
      {
        url: "/about/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The story behind MiviaLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ABOUT_TITLE} | ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
    images: ["/about/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <div className="page-about">
      <JsonLd data={aboutStructuredData} />
      <SiteMotion />
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" />

      <main>
        <AboutSnowZone>
          <BrandStoryScroll />
          <StanceQuote />
          <MindsetFlip />
          <BrandStoryEssay />
          <ClosingArc />
        </AboutSnowZone>
        <FounderSpotlight />
        <AboutCta />
      </main>

      <SiteFooter />
    </div>
  );
}
