import type { MetadataRoute } from "next";
import {
  IS_SITE_INDEXABLE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!IS_SITE_INDEXABLE) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL.origin,
  };
}
