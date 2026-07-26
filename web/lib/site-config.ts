export const SITE_NAME = "MiviaLab";
export const SITE_LOCALE = "en_CA";
export const SITE_LANGUAGE = "en-CA";

export const HOME_TITLE =
  "MiviaLab | Web design & development studio in Ottawa";
export const HOME_DESCRIPTION =
  "MiviaLab builds modern, fast, custom websites for small businesses in the Ottawa to Toronto corridor.";

export const ABOUT_TITLE = "Our Story";
export const ABOUT_DESCRIPTION =
  "Learn how MiviaLab began and meet the people behind our web design and development studio for small businesses.";

const LOCAL_SITE_URL = new URL("http://localhost:3000");

function parseSiteUrl(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    return new URL(parsed.origin);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL must be a valid absolute URL.",
    );
  }
}

const explicitSiteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const platformSiteUrl = parseSiteUrl(
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
const configuredSiteUrl = explicitSiteUrl ?? platformSiteUrl;

export const SITE_URL = configuredSiteUrl ?? LOCAL_SITE_URL;

const isLocalHost =
  SITE_URL.hostname === "localhost" || SITE_URL.hostname === "127.0.0.1";
const isProductionEnvironment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const IS_SITE_INDEXABLE =
  explicitSiteUrl !== null && !isLocalHost && isProductionEnvironment;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
