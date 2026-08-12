"use client";

import Script from "next/script";
import { CLARITY_PROJECT_ID } from "@/lib/clarity";

/**
 * Loads the Clarity tag. Rendered only once the visitor has opted in — see
 * components/CookieConsent.tsx, which owns that decision.
 *
 * The consent call is baked into the snippet rather than fired from a React
 * effect so it is queued in the same tick the stub is created, before the tag
 * itself has finished downloading. An effect would race the network and could
 * let the first cookie be written under Clarity's default assumption instead of
 * ours.
 *
 * `afterInteractive` keeps analytics off the critical path — the hero video
 * matters more to a visitor than a measurement script does to us.
 */
export default function ClarityScript() {
  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", ${JSON.stringify(CLARITY_PROJECT_ID)});
          window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
        `,
      }}
    />
  );
}
