"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ANALYTICS_MEASUREMENT_ID,
  CONSENT_STORAGE_KEY,
  type CookieConsentStatus,
  readConsentPreference,
  setAnalyticsRuntimeAllowed,
  withdrawAnalyticsRuntime,
  writeConsentPreference,
} from "@/lib/consent";

type CookieConsentContextValue = {
  status: CookieConsentStatus;
  analyticsAllowed: boolean;
  openSettings: () => void;
};

type ConsentViewState = {
  status: CookieConsentStatus;
  showBanner: boolean;
  settingsOpen: boolean;
  storageError: boolean;
};

type ConsentProviderProps = {
  analyticsEnabled: boolean;
  children: ReactNode;
};

const INITIAL_STATE: ConsentViewState = {
  status: "loading",
  showBanner: false,
  settingsOpen: false,
  storageError: false,
};

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);

  if (!value) {
    throw new Error(
      "useCookieConsent must be used within a ConsentProvider.",
    );
  }

  return value;
}

export function ConsentProvider({
  analyticsEnabled,
  children,
}: ConsentProviderProps) {
  const [viewState, setViewState] =
    useState<ConsentViewState>(INITIAL_STATE);
  const [draftAnalyticsAllowed, setDraftAnalyticsAllowed] =
    useState(false);
  const settingsDialogRef = useRef<HTMLDialogElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reloadRequestedRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  const analyticsAvailable =
    analyticsEnabled && ANALYTICS_MEASUREMENT_ID !== null;
  const analyticsAllowed =
    analyticsAvailable && viewState.status === "accepted";

  const reloadToUnloadAnalytics = useCallback((runtimeWasLoaded: boolean) => {
    if (!runtimeWasLoaded || reloadRequestedRef.current) return;
    reloadRequestedRef.current = true;
    window.location.reload();
  }, []);

  const failClosed = useCallback(
    (showBanner: boolean) => {
      const runtimeWasLoaded = withdrawAnalyticsRuntime();
      setViewState((current) => ({
        ...current,
        status: "declined",
        showBanner,
        storageError: true,
      }));
      reloadToUnloadAnalytics(runtimeWasLoaded);
    },
    [reloadToUnloadAnalytics],
  );

  useEffect(() => {
    if (!analyticsAvailable) {
      setAnalyticsRuntimeAllowed(false);
      const initializationTimer = window.setTimeout(() => {
        setViewState({
          status: "declined",
          showBanner: false,
          settingsOpen: false,
          storageError: false,
        });
      }, 0);
      return () => window.clearTimeout(initializationTimer);
    }

    let storageEventReceived = false;
    const initializationTimer = window.setTimeout(() => {
      if (storageEventReceived) return;

      const storedConsent = readConsentPreference();

      if (!storedConsent.available) {
        setAnalyticsRuntimeAllowed(false);
        setViewState({
          status: "declined",
          showBanner: true,
          settingsOpen: false,
          storageError: true,
        });
      } else if (storedConsent.preference === "declined") {
        setAnalyticsRuntimeAllowed(false);
        setViewState({
          status: "declined",
          showBanner: false,
          settingsOpen: false,
          storageError: false,
        });
      } else {
        setAnalyticsRuntimeAllowed(true);
        setViewState({
          status: "accepted",
          showBanner: storedConsent.preference === null,
          settingsOpen: false,
          storageError: false,
        });
      }
    }, 0);

    const syncConsentFromStorage = (event: StorageEvent) => {
      if (
        event.key !== CONSENT_STORAGE_KEY &&
        event.key !== null
      ) {
        return;
      }

      storageEventReceived = true;
      const nextConsent = readConsentPreference();
      if (!nextConsent.available) {
        failClosed(true);
        return;
      }

      if (nextConsent.preference === "declined") {
        const runtimeWasLoaded = withdrawAnalyticsRuntime();
        setViewState((current) => ({
          ...current,
          status: "declined",
          showBanner: false,
          settingsOpen: false,
          storageError: false,
        }));
        reloadToUnloadAnalytics(runtimeWasLoaded);
        return;
      }

      setAnalyticsRuntimeAllowed(true);
      setViewState((current) => ({
        ...current,
        status: "accepted",
        showBanner: nextConsent.preference === null,
        storageError: false,
      }));
    };

    window.addEventListener("storage", syncConsentFromStorage);
    return () => {
      window.clearTimeout(initializationTimer);
      window.removeEventListener("storage", syncConsentFromStorage);
      setAnalyticsRuntimeAllowed(false);
    };
  }, [
    analyticsAvailable,
    failClosed,
    reloadToUnloadAnalytics,
  ]);

  const openSettings = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      restoreFocusRef.current = document.activeElement;
    }

    setDraftAnalyticsAllowed(analyticsAllowed);
    setViewState((current) => ({
      ...current,
      settingsOpen: true,
    }));
  }, [analyticsAllowed]);

  const restoreSettingsFocus = useCallback(() => {
    const elementToFocus = restoreFocusRef.current;
    restoreFocusRef.current = null;

    if (!elementToFocus?.isConnected) return;
    window.requestAnimationFrame(() => elementToFocus.focus());
  }, []);

  const closeSettings = useCallback(() => {
    setViewState((current) => ({
      ...current,
      settingsOpen: false,
    }));
  }, []);

  useEffect(() => {
    const dialog = settingsDialogRef.current;
    if (!dialog) return;

    if (viewState.settingsOpen && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!viewState.settingsOpen && dialog.open) {
      dialog.close();
    }
  }, [viewState.settingsOpen]);

  useEffect(() => {
    if (!viewState.settingsOpen) return;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [viewState.settingsOpen]);

  const acceptAnalytics = useCallback(() => {
    if (!analyticsAvailable) return;

    if (!writeConsentPreference("accepted")) {
      failClosed(true);
      return;
    }

    setAnalyticsRuntimeAllowed(true);
    setViewState({
      status: "accepted",
      showBanner: false,
      settingsOpen: false,
      storageError: false,
    });
  }, [analyticsAvailable, failClosed]);

  const declineAnalytics = useCallback(() => {
    if (!analyticsAvailable) return;

    const preferenceWasSaved = writeConsentPreference("declined");
    const runtimeWasLoaded = withdrawAnalyticsRuntime();

    setViewState({
      status: "declined",
      showBanner: !preferenceWasSaved,
      settingsOpen: false,
      storageError: !preferenceWasSaved,
    });
    reloadToUnloadAnalytics(runtimeWasLoaded);
  }, [analyticsAvailable, reloadToUnloadAnalytics]);

  const savePreferences = useCallback(() => {
    if (draftAnalyticsAllowed) {
      acceptAnalytics();
      return;
    }

    declineAnalytics();
  }, [
    acceptAnalytics,
    declineAnalytics,
    draftAnalyticsAllowed,
  ]);

  const contextValue = useMemo<CookieConsentContextValue>(
    () => ({
      status: viewState.status,
      analyticsAllowed,
      openSettings,
    }),
    [analyticsAllowed, openSettings, viewState.status],
  );

  const draftConsentStatusLabel = !analyticsAvailable
    ? "Not available"
    : draftAnalyticsAllowed
      ? "Selected: on"
      : "Selected: off";

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {analyticsAvailable && viewState.showBanner ? (
        <section
          className="cookie-consent-banner"
          role="region"
          aria-labelledby={`${titleId}-banner`}
          aria-live="polite"
          data-lenis-prevent
        >
          <div className="cookie-consent-banner__copy">
            <h2
              className="cookie-consent-banner__title"
              id={`${titleId}-banner`}
            >
              We use cookies
            </h2>
            <p>
              We use Google Analytics cookies to understand how our website
              is used and improve your experience. Analytics is currently on.
              Select Accept to keep it on or Decline to turn it off.{" "}
              <Link href="/privacy">Read our Privacy Policy.</Link>
            </p>
            {viewState.storageError ? (
              <p className="cookie-consent__notice" role="status">
                Browser storage is unavailable, so analytics is off and your
                choice cannot be saved.
              </p>
            ) : null}
          </div>

          <div
            className="cookie-consent-banner__actions"
            aria-label="Analytics cookie choices"
          >
            <button
              className="cookie-consent-button cookie-consent-button--accept"
              type="button"
              onClick={acceptAnalytics}
            >
              Accept
            </button>
            <button
              className="cookie-consent-button cookie-consent-button--decline"
              type="button"
              onClick={declineAnalytics}
            >
              Decline
            </button>
            <button
              className="cookie-consent-button cookie-consent-button--settings"
              type="button"
              onClick={openSettings}
            >
              Cookie settings
            </button>
          </div>
        </section>
      ) : null}

      {children}

      <dialog
        className="cookie-settings-dialog"
        ref={settingsDialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={() => {
          setViewState((current) => ({
            ...current,
            settingsOpen: false,
          }));
        }}
        onClose={() => {
          setViewState((current) => ({
            ...current,
            settingsOpen: false,
          }));
          restoreSettingsFocus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeSettings();
          }
        }}
        data-lenis-prevent
      >
        <div className="cookie-settings-dialog__panel">
          <header className="cookie-settings-dialog__header">
            <div>
              <h2 id={titleId}>Cookie settings</h2>
              <p id={descriptionId}>
                Choose whether MiviaLab may use Google Analytics on this
                browser.
              </p>
            </div>
            <button
              className="cookie-settings-dialog__close"
              type="button"
              onClick={closeSettings}
              autoFocus
            >
              Close
            </button>
          </header>

          <div className="cookie-settings-dialog__option">
            <label className="cookie-settings-dialog__choice">
              <input type="checkbox" checked disabled />
              <span>
                <strong>Essential storage</strong>
                <small>
                  Remembers your cookie preference on this browser.
                </small>
              </span>
            </label>
            <span className="cookie-settings-dialog__status">
              Always active
            </span>
          </div>

          <div className="cookie-settings-dialog__option">
            <label className="cookie-settings-dialog__choice">
              <input
                type="checkbox"
                checked={draftAnalyticsAllowed}
                disabled={!analyticsAvailable}
                onChange={(event) => {
                  setDraftAnalyticsAllowed(event.target.checked);
                }}
              />
              <span>
                <strong>Google Analytics</strong>
                <small>
                  Measures visits and interactions. Advertising storage and
                  personalization stay off.
                </small>
              </span>
            </label>
            <span
              className="cookie-settings-dialog__status"
              aria-live="polite"
            >
              {draftConsentStatusLabel}
            </span>
          </div>

          {viewState.storageError ? (
            <p className="cookie-consent__notice" role="status">
              Browser storage is unavailable, so analytics remains off and
              your choice cannot be saved.
            </p>
          ) : null}

          <div className="cookie-settings-dialog__actions">
            <button
              className="cookie-consent-button cookie-consent-button--accept"
              type="button"
              onClick={savePreferences}
              disabled={!analyticsAvailable}
            >
              Save preferences
            </button>
            <button
              className="cookie-consent-button cookie-consent-button--decline"
              type="button"
              onClick={closeSettings}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </CookieConsentContext.Provider>
  );
}
