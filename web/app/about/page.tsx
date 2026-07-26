import type { Metadata } from "next";
import { AboutCta } from "@/components/AboutCta";
import { AboutSnowZone } from "@/components/AboutSnowZone";
import { BrandStoryEssay } from "@/components/BrandStoryEssay";
import { BrandStoryScroll } from "@/components/BrandStoryScroll";
import { ClosingArc } from "@/components/ClosingArc";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { MindsetFlip } from "@/components/MindsetFlip";
import { StanceQuote } from "@/components/StanceQuote";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteNav } from "@/components/SiteNav";
import "./about.css";

export const metadata: Metadata = {
  title: "Our Story — MiviaLab",
  description:
    "How MiviaLab started, why we use AI thoughtfully instead of mindlessly, and the two University of Ottawa students behind the studio.",
};

export default function AboutPage() {
  return (
    <div className="page-about">
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
