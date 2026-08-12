"use client";

import { openConsentSettings } from "@/lib/consent";

/**
 * Withdrawal has to be as easy as consent was (Art. 7 Abs. 3 DSGVO), so the
 * privacy policy carries a control that reopens the banner rather than a
 * paragraph explaining how to clear browser storage by hand.
 */
export default function ConsentSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="mono-font mt-2 inline-flex min-h-11 items-center justify-center rounded-md border border-[#1d6fb5]/40 bg-white px-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b4e86] transition-colors duration-300 hover:border-[#1d6fb5] hover:text-[#1d6fb5]"
    >
      Einwilligung ändern / Change consent
    </button>
  );
}
