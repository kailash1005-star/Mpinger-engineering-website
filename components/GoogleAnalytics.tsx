"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

/**
 * Loads Google Analytics 4. Rendered only once the visitor has opted in — see
 * components/CookieConsent.tsx, which owns that decision.
 *
 * Google's instructions say to paste this immediately after <head>. We
 * deliberately do not:
 *   - Pasting it in <head> runs it on every page load, before any consent
 *     exists. That is the exact thing § 25 Abs. 1 TDDDG prohibits.
 *   - `afterInteractive` keeps a measurement script off the critical path of a
 *     page whose hero is a video.
 * Nothing is lost by loading later; GA4 timestamps the session itself.
 *
 * Consent Mode is initialised to denied and then updated in the same tick, so
 * the tag can never write storage under its own default assumption — the
 * ordering guarantee an effect-based update would not give us.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            gtag('consent', 'update', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'granted'
            });
            gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
          `,
        }}
      />
    </>
  );
}
