/**
 * Google Analytics 4 — thin typed wrapper.
 *
 * Loaded by components/GoogleAnalytics.tsx, and only after the visitor opts
 * in. Every helper is a no-op when the tag is absent, so call sites stay free
 * of guards.
 */

import { deleteCookiesByPrefix } from "./cookies";

export const GA_MEASUREMENT_ID = "G-2LJPKEJSVH";

/**
 * Localhost traffic would otherwise land in the same property as real visits
 * and quietly corrupt every acquisition report. Set NEXT_PUBLIC_GA_DEBUG=1 to
 * load the tag in `next dev` when verifying the integration.
 */
export const GA_ENABLED =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag(...args);
  } catch {
    // Analytics must never break the page it is measuring.
  }
}

/**
 * Google Consent Mode v2.
 *
 * The tag is not loaded at all until the visitor accepts, so this is belt and
 * braces rather than the primary control — but it is what tells Google the
 * storage is permitted, and it keeps ad storage denied. A portfolio site has
 * no advertising purpose, and consent has to be specific under Art. 4(11)
 * GDPR: asking to measure traffic does not license ad personalisation.
 */
export function grantGaConsent(): void {
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
}

export function denyGaConsent(): void {
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

/**
 * `_ga` (registrable domain) plus `_ga_<container>`, and the legacy `_gid` /
 * `_gat` pair that appears when Google Signals or older tags are in play.
 */
export function clearGaCookies(): void {
  deleteCookiesByPrefix(["_ga", "_gid", "_gat"]);
}

/**
 * GA4's recommended event for a B2B enquiry. Using Google's own name rather
 * than a bespoke one means it can be marked a key event — and later imported
 * into Google Ads — without re-instrumenting anything.
 */
export function trackLead(projectType: string): void {
  gtag("event", "generate_lead", { project_type: projectType });
}

export function trackLeadFailed(): void {
  gtag("event", "generate_lead_failed");
}
