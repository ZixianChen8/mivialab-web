export type CookieConsentStatus = "loading" | "accepted" | "declined";
export type StoredConsentChoice = Exclude<CookieConsentStatus, "loading">;

type StoredConsentPreference = {
  version: 1;
  analytics: StoredConsentChoice;
  savedAt: number;
  expiresAt: number;
};

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export type ConsentStorageResult = {
  available: boolean;
  preference: StoredConsentChoice | null;
};

export const CONSENT_STORAGE_KEY = "mivialab-analytics-consent-v1";
export const CONSENT_STORAGE_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const configuredMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export const ANALYTICS_MEASUREMENT_ID =
  configuredMeasurementId &&
  /^G-[A-Z0-9]+$/i.test(configuredMeasurementId)
    ? configuredMeasurementId
    : null;

let analyticsRuntimeAllowed = false;

function isStoredConsentPreference(
  value: unknown,
): value is StoredConsentPreference {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<StoredConsentPreference>;

  return (
    candidate.version === CONSENT_STORAGE_VERSION &&
    (candidate.analytics === "accepted" ||
      candidate.analytics === "declined") &&
    typeof candidate.savedAt === "number" &&
    Number.isFinite(candidate.savedAt) &&
    typeof candidate.expiresAt === "number" &&
    Number.isFinite(candidate.expiresAt)
  );
}

function parseStoredPreference(rawValue: string): StoredConsentPreference | null {
  try {
    const parsed: unknown = JSON.parse(rawValue);
    return isStoredConsentPreference(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function verifyStorage(storage: Storage) {
  const probeKey = `${CONSENT_STORAGE_KEY}:probe`;
  storage.setItem(probeKey, "1");
  storage.removeItem(probeKey);
}

export function readConsentPreference(): ConsentStorageResult {
  if (typeof window === "undefined") {
    return { available: false, preference: null };
  }

  try {
    const storage = window.localStorage;
    verifyStorage(storage);

    const rawValue = storage.getItem(CONSENT_STORAGE_KEY);
    if (rawValue === null) {
      return { available: true, preference: null };
    }

    const storedPreference = parseStoredPreference(rawValue);
    if (
      storedPreference === null ||
      storedPreference.expiresAt <= Date.now()
    ) {
      storage.removeItem(CONSENT_STORAGE_KEY);
      return { available: true, preference: null };
    }

    return {
      available: true,
      preference: storedPreference.analytics,
    };
  } catch {
    return { available: false, preference: null };
  }
}

export function writeConsentPreference(
  preference: StoredConsentChoice,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const storage = window.localStorage;
    verifyStorage(storage);

    const savedAt = Date.now();
    const storedPreference: StoredConsentPreference = {
      version: CONSENT_STORAGE_VERSION,
      analytics: preference,
      savedAt,
      expiresAt: savedAt + CONSENT_MAX_AGE_MS,
    };

    storage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(storedPreference),
    );
    return true;
  } catch {
    return false;
  }
}

export function setAnalyticsRuntimeAllowed(allowed: boolean) {
  analyticsRuntimeAllowed = allowed;
}

export function isAnalyticsRuntimeAllowed() {
  return analyticsRuntimeAllowed;
}

function expireCookie(name: string, domain?: string) {
  const domainAttribute = domain ? `; Domain=${domain}` : "";
  document.cookie =
    `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ` +
    `Path=/; SameSite=Lax${domainAttribute}`;
}

export function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => /^_ga(?:_|$)/.test(name));

  if (cookieNames.length === 0) return;

  const hostname = window.location.hostname;
  const domainCandidates = new Set<string>();
  const hostnameParts = hostname.split(".");

  if (hostname !== "localhost" && hostnameParts.length > 1) {
    for (let index = 0; index < hostnameParts.length - 1; index += 1) {
      const domain = hostnameParts.slice(index).join(".");
      domainCandidates.add(domain);
      domainCandidates.add(`.${domain}`);
    }
  }

  for (const cookieName of cookieNames) {
    expireCookie(cookieName);
    for (const domain of domainCandidates) {
      expireCookie(cookieName, domain);
    }
  }
}

export function withdrawAnalyticsRuntime(): boolean {
  if (typeof window === "undefined") return false;

  const analyticsWindow = window as AnalyticsWindow;
  const runtimeWasLoaded =
    typeof analyticsWindow.gtag === "function" ||
    Boolean(
      document.querySelector(
        'script[src^="https://www.googletagmanager.com/gtag/js"]',
      ),
    );

  setAnalyticsRuntimeAllowed(false);

  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  clearGoogleAnalyticsCookies();
  return runtimeWasLoaded;
}
