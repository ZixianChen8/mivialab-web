import type { Metadata } from "next";
import { GOOGLE_FONTS_HREF, DEFAULT_FONT_ID } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-init-script";
import { ACTIVE_THEME_ID } from "@/lib/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MiviaLab — Web design & development studio in Ottawa",
    template: "%s — MiviaLab",
  },
  description:
    "MiviaLab builds modern, fast, custom websites for small businesses in the Ottawa–Toronto corridor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={ACTIVE_THEME_ID}
      data-font={DEFAULT_FONT_ID}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_HREF} rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
