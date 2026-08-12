/**
 * Analytics consent state.
 *
 * § 25 TDDDG requires opt-in *before* anything is stored on the visitor's
 * device, so the default is "unknown" and nothing loads until the visitor
 * chooses. Declining is persisted just as deliberately as accepting — a
 * visitor who says no must not be asked again on every page view.
 *
 * State lives in localStorage rather than a cookie on purpose: a cookie would
 * be sent on every request to a site that otherwise sets none, and storing the
 * record of a refusal in the very technology being refused reads badly in an
 * audit.
 */

export type ConsentStatus = "granted" | "denied";

/** Bump when the disclosure changes materially — old answers stop counting. */
const STORAGE_KEY = "mpinger.analytics-consent.v1";

const CHANGE_EVENT = "mpinger:consent-change";
const OPEN_EVENT = "mpinger:consent-open";

type StoredConsent = {
  status: ConsentStatus;
  /** ISO timestamp — GDPR Art. 7(1) requires being able to demonstrate consent. */
  decidedAt: string;
};

export function readConsent(): ConsentStatus | null {
  // Server render and pre-hydration both land here; callers must treat null as
  // "not yet known" rather than "refused".
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    return parsed.status === "granted" || parsed.status === "denied" ? parsed.status : null;
  } catch {
    // Private mode, disabled storage, or hand-edited junk. Treat as undecided.
    return null;
  }
}

export function writeConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;

  try {
    const record: StoredConsent = { status, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the choice still applies for this page view via the
    // event below, it just will not survive a reload.
  }

  window.dispatchEvent(new CustomEvent<ConsentStatus>(CHANGE_EVENT, { detail: status }));
}

/** Re-opens the banner so a visitor can withdraw as easily as they consented. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentChange(handler: (status: ConsentStatus) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<ConsentStatus>).detail);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

export function onConsentOpen(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
