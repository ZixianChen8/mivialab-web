import { isAnalyticsRuntimeAllowed } from "@/lib/consent";

type AnalyticsParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __mivialabGaConfiguredFor?: string;
  }
}

let currentPageReferrer = "";

function getDocumentReferrerOrigin() {
  if (!document.referrer) return "";

  try {
    return new URL(document.referrer).origin;
  } catch {
    return "";
  }
}

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function initializeGoogleAnalytics(measurementId: string) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsRuntimeAllowed()
  ) {
    return false;
  }

  ensureGtagQueue();

  if (window.__mivialabGaConfiguredFor === measurementId) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    return true;
  }

  window.gtag?.("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("js", new Date());
  const pagePath = window.location.pathname;
  const pageReferrer = getDocumentReferrerOrigin();
  window.gtag?.("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    anonymize_ip: true,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_referrer: pageReferrer,
    send_page_view: false,
  });

  window.__mivialabGaConfiguredFor = measurementId;
  return true;
}

export function trackPageView(pagePath: string, pageReferrer: string) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsRuntimeAllowed() ||
    !window.gtag
  ) {
    return false;
  }

  currentPageReferrer = pageReferrer;
  window.gtag("set", {
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_referrer: pageReferrer,
  });
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_referrer: pageReferrer,
  });
  return true;
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsRuntimeAllowed() ||
    !window.gtag
  ) {
    return;
  }

  const pagePath = window.location.pathname;
  const pageReferrer =
    currentPageReferrer || getDocumentReferrerOrigin();

  window.gtag("event", eventName, {
    ...parameters,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_referrer: pageReferrer,
  });
}
