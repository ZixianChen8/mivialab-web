"use client";

import { useCookieConsent } from "@/components/ConsentProvider";

export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      className="site-footer__text-link site-footer__text-link--underline"
      type="button"
      aria-haspopup="dialog"
      onClick={openSettings}
      style={{
        padding: 0,
        textAlign: "left",
        touchAction: "manipulation",
      }}
    >
      Cookie settings
    </button>
  );
}
