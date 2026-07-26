import {
  ABOUT_DESCRIPTION,
  HOME_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/site-config";

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(
          "/assets/images/logo/design1_bw_upscaled_tr.png",
        ),
      },
      description: HOME_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
};

const ABOUT_PAGE_ID = absoluteUrl("/about#webpage");
const ABOUT_BREADCRUMB_ID = absoluteUrl("/about#breadcrumb");

export const aboutStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": ABOUT_PAGE_ID,
      url: absoluteUrl("/about"),
      name: "Our Story | MiviaLab",
      description: ABOUT_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
      breadcrumb: {
        "@id": ABOUT_BREADCRUMB_ID,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": ABOUT_BREADCRUMB_ID,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Our Story",
          item: absoluteUrl("/about"),
        },
      ],
    },
  ],
};
