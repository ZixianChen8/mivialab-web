import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import LenisProvider from "@/app/components/LenisProvider";
import CustomCursor from "@/app/components/CustomCursor";
import "./globals.css";

// Editorial display face.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Grotesque body face.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  // REVIEW: set to the real production origin (e.g. https://mivialab.ca) at launch.
  metadataBase: new URL("https://mivialab.ca"),
  title: "MiviaLab — web design & development studio in Ottawa",
  description:
    "MiviaLab is an Ottawa–Toronto web design and development studio building fast, secure, fully custom websites for small businesses.",
  openGraph: {
    title: "MiviaLab — web design & development studio in Ottawa",
    description:
      "Fast, secure, fully custom websites for small businesses across the Ottawa–Toronto corridor.",
    type: "website",
    images: ["/og-placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
