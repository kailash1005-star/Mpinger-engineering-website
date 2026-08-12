/**
 * Microsoft Clarity — thin typed wrapper.
 *
 * The tag is loaded by components/ClarityScript.tsx, and only after the
 * visitor has opted in. Everything here is a no-op when the tag is absent, so
 * call sites never need to guard: a declined visitor, a blocked request, or an
 * ad-blocker all degrade to silence rather than a TypeError in a click handler.
 */

import { deleteCookiesByPrefix } from "./cookies";

export const CLARITY_PROJECT_ID = "y0thowtok5";

/**
 * Localhost sessions would otherwise sit in the dashboard alongside real
 * enquiries and skew every heatmap. Set NEXT_PUBLIC_CLARITY_DEBUG=1 to load the
 * tag in `next dev` when you specifically want to verify the integration.
 */
export const CLARITY_ENABLED =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_CLARITY_DEBUG === "1";

type ClarityConsentOptions = {
  ad_Storage: "granted" | "denied";
  analytics_Storage: "granted" | "denied";
};

/**
 * The tag installs a variadic queue stub, so the global is typed loosely and
 * the exported helpers below carry the real signatures. Modelling the global
 * itself as an overload set is worse than useless here: `Parameters<T>` on an
 * overloaded type collapses to the last overload, which silently checks every
 * call against `identify`.
 */
declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function clarity(...args: unknown[]): void {
  if (typeof window === "undefined" || typeof window.clarity !== "function") return;
  try {
    window.clarity(...args);
  } catch {
    // Analytics must never break the page it is measuring.
  }
}

/**
 * A portfolio site has no advertising purpose, so ad storage stays denied even
 * when the visitor accepts. Consent has to be specific under Art. 4(11) GDPR —
 * asking for measurement and quietly enabling ad profiling would not be.
 */
export function grantClarityConsent(): void {
  const consent: ClarityConsentOptions = { ad_Storage: "denied", analytics_Storage: "granted" };
  clarity("consentv2", consent);
}

export function denyClarityConsent(): void {
  const consent: ClarityConsentOptions = { ad_Storage: "denied", analytics_Storage: "denied" };
  clarity("consentv2", consent);
}

/**
 * Clarity's first-party identifiers. Telling the tag to stop is not the same
 * as removing what it already wrote, and a withdrawal that leaves the
 * identifier sitting on the visitor's device is a withdrawal in name only.
 */
export function clearClarityCookies(): void {
  deleteCookiesByPrefix(["_clck", "_clsk"]);
}

/**
 * Custom events, named centrally so the dashboard does not accumulate three
 * spellings of the same conversion.
 */
export type ClarityEventName =
  | "enquiry_submitted"
  | "enquiry_failed"
  | "enquiry_started";

export function trackEvent(name: ClarityEventName): void {
  clarity("event", name);
}

export function trackTag(key: string, value: string | string[]): void {
  clarity("set", key, value);
}

/**
 * Forces Clarity to keep this recording.
 *
 * The free tier does not retain every session, and on a B2B site the handful
 * that end in an enquiry are the only ones genuinely worth watching — this is
 * what stops the interesting recording from being the one that got sampled
 * away.
 */
export function upgradeSession(reason: string): void {
  clarity("upgrade", reason);
}
