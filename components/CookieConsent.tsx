"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ClarityScript from "./ClarityScript";
import GoogleAnalytics from "./GoogleAnalytics";
import { CLARITY_ENABLED, clearClarityCookies, denyClarityConsent } from "@/lib/clarity";
import { GA_ENABLED, clearGaCookies, denyGaConsent } from "@/lib/gtag";
import {
  ConsentStatus,
  onConsentChange,
  onConsentOpen,
  readConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * Owns the analytics consent decision and, downstream of it, whether the
 * Clarity tag exists at all.
 *
 * Deliberate choices, each of which a Datenschutzbehörde would look for:
 *   - Nothing loads before an explicit opt-in (§ 25 Abs. 1 TDDDG).
 *   - Refusing takes exactly one click, the same as accepting, and the two
 *     buttons carry the same visual weight. A styled-down reject button is the
 *     dark pattern regulators fine most often.
 *   - Closing without choosing is not consent, so there is no dismiss "×"
 *     that could be mistaken for one.
 *   - The banner never covers the page content or the statutory footer links.
 */
export default function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read after mount: localStorage does not exist during the server render,
    // and branching on it in render would desync hydration.
    const stored = readConsent();
    setStatus(stored);
    if (stored === null) setVisible(true);

    const unsubscribeOpen = onConsentOpen(() => setVisible(true));
    const unsubscribeChange = onConsentChange(setStatus);
    return () => {
      unsubscribeOpen();
      unsubscribeChange();
    };
  }, []);

  const decide = useCallback(
    (next: ConsentStatus) => {
      const wasGranted = status === "granted";
      writeConsent(next);
      setStatus(next);
      setVisible(false);

      if (next === "denied") {
        denyClarityConsent();
        denyGaConsent();
        clearClarityCookies();
        clearGaCookies();
        // Unmounting the <Script> does not unload a tag the browser has already
        // executed, so an actual withdrawal needs a fresh document to be
        // truthful rather than merely well-intentioned.
        if (wasGranted) window.location.reload();
      }
    },
    [status]
  );

  return (
    <>
      {status === "granted" && (
        <>
          {CLARITY_ENABLED && <ClarityScript />}
          {GA_ENABLED && <GoogleAnalytics />}
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-heading"
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          {/* Near-full-bleed: a centred max-w-4xl card stranded ~500px of dead
              space on either side at desktop width. The cap only engages on
              very wide monitors, where an edge-to-edge bar would look stretched
              rather than deliberate. */}
          <div className="mx-auto max-w-[1800px] rounded-xl border border-slate-200 bg-white/95 p-5 shadow-[0_18px_50px_rgba(6,38,63,0.22)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              {/* The card is wide; the prose is not. Consent text people
                  actually read has to keep a sane measure. */}
              <div className="max-w-3xl space-y-2">
                <h2
                  id="consent-heading"
                  className="mono-font text-[10px] font-bold uppercase tracking-[0.35em] text-[#1d6fb5]"
                >
                  Cookies &amp; Analyse
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  Wir möchten mit Microsoft Clarity und Google Analytics messen, wie diese Website
                  genutzt wird, um sie zu verbessern. Dabei werden Cookies gesetzt und Ihre
                  Sitzung pseudonymisiert aufgezeichnet. Werbe-Tracking findet nicht statt. Das
                  geschieht nur mit Ihrer Einwilligung — die Website funktioniert ohne
                  Einschränkung, wenn Sie ablehnen.
                </p>
                <p className="text-xs leading-relaxed text-slate-500">
                  We would like to measure how this site is used, via Microsoft Clarity and Google
                  Analytics. This sets cookies and records a pseudonymised session replay. No
                  advertising tracking. Only with your consent — you can withdraw it at any time.
                  Details in our{" "}
                  <Link href="/datenschutz" className="text-[#1d6fb5] underline">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <button
                  type="button"
                  onClick={() => decide("granted")}
                  className="mono-font inline-flex min-h-11 items-center justify-center rounded-md bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] px-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_10px_28px_rgba(11,78,134,0.28)] transition-all duration-300 hover:from-[#0d5996] hover:to-[#56a8e6]"
                >
                  Akzeptieren
                </button>
                <button
                  type="button"
                  onClick={() => decide("denied")}
                  className="mono-font inline-flex min-h-11 items-center justify-center rounded-md border border-[#1d6fb5]/40 bg-white px-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b4e86] transition-colors duration-300 hover:border-[#1d6fb5] hover:text-[#1d6fb5]"
                >
                  Ablehnen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
