import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { SiteChoosers } from "@/components/SiteChoosers";

export const metadata: Metadata = {
  title: "MiviaLab — Web design & development studio in Ottawa",
  description:
    "MiviaLab builds modern, fast, custom websites for small businesses in the Ottawa–Toronto corridor.",
};

export default function Page() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <HomePage />
      <SiteChoosers />
    </>
  );
}
