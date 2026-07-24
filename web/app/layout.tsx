import type { Metadata } from "next";
import { GOOGLE_FONTS_HREF } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-init-script";
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
    <html lang="en" data-theme="pine-fog" data-font="manrope" suppressHydrationWarning>
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
