import type { Metadata } from "next";
import { ConsentProvider } from "@/components/ConsentProvider";
import { JsonLd } from "@/components/JsonLd";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  IS_SITE_INDEXABLE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { globalStructuredData } from "@/lib/structured-data";
import { themeInitScript } from "@/lib/theme-init-script";
import { ACTIVE_THEME_ID } from "@/lib/themes";
import "./globals.css";
import "./consent.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MiviaLab web design and development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: IS_SITE_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        noarchive: true,
      },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? {
          "msvalidate.01": process.env.BING_SITE_VERIFICATION,
        }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={ACTIVE_THEME_ID} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ConsentProvider analyticsEnabled={IS_SITE_INDEXABLE}>
          <JsonLd data={globalStructuredData} />
          {children}
          <SiteAnalytics enabled={IS_SITE_INDEXABLE} />
        </ConsentProvider>
      </body>
    </html>
  );
}
