"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/ConsentProvider";
import {
  initializeGoogleAnalytics,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";
import { ANALYTICS_MEASUREMENT_ID } from "@/lib/consent";

function getInitialReferrer() {
  if (!document.referrer) return "";

  try {
    return new URL(document.referrer).origin;
  } catch {
    return "";
  }
}

function RouteAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!initializeGoogleAnalytics(measurementId)) return;
    if (lastTrackedPath.current === pathname) return;

    const previousPath = lastTrackedPath.current;
    const frame = window.requestAnimationFrame(() => {
      const pageReferrer = previousPath
        ? `${window.location.origin}${previousPath}`
        : getInitialReferrer();

      if (trackPageView(pathname, pageReferrer)) {
        lastTrackedPath.current = pathname;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [measurementId, pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest<HTMLElement>(
        "[data-analytics-event]",
      );
      if (!trackedElement) return;

      const eventName = trackedElement.dataset.analyticsEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        placement: trackedElement.dataset.analyticsPlacement,
        method: trackedElement.dataset.analyticsMethod,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export function SiteAnalytics({ enabled }: { enabled: boolean }) {
  const { analyticsAllowed } = useCookieConsent();
  const measurementId = ANALYTICS_MEASUREMENT_ID;
  const active = enabled && analyticsAllowed && measurementId !== null;

  if (!active) return null;

  return (
    <>
      <RouteAnalytics measurementId={measurementId} />
      <Script
        id="mivialab-google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
