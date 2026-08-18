"use client";

import { FormEvent, useState } from "react";
import { trackEvent, trackTag, upgradeSession } from "@/lib/clarity";
import { trackLead, trackLeadFailed } from "@/lib/gtag";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Web3Forms access keys are public client-side identifiers, so this is safe to
// ship in the bundle.
//
// The `: string` annotation is load-bearing, not decoration. Without it the
// const narrows to its own literal type, the placeholder guard below compares
// two literals that can never be equal, and TypeScript rejects the build with
// TS2367 — which is exactly how setting this key broke the last deployment.
export const WEB3FORMS_ACCESS_KEY: string = "ead061de-346f-4cd4-a55a-aa878ae22cfd";

type FormState = "idle" | "sending" | "success" | "error";

export default function EngineeringContactForm() {
  const t = useTranslations("form");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setState("error");
      setErrorMessage("Add the Web3Forms access key in EngineeringContactForm.tsx before sending.");
      return;
    }

    setState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message could not be sent.");
      }

      // Analytics: the enquiry is this site's only conversion, so it is worth
      // being able to replay the visit that produced one. `upgrade` pins the
      // recording so sampling cannot discard the handful of sessions that
      // actually matter. Only the project-type dropdown is tagged — it is an
      // enum, not personal data.
      const projectType = String(formData.get("project_type") || "unspecified");
      trackTag("project_type", projectType);
      trackEvent("enquiry_submitted");
      upgradeSession("enquiry submitted");
      trackLead(projectType);

      form.reset();
      setState("success");
    } catch (error) {
      trackEvent("enquiry_failed");
      trackLeadFailed();
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "The message could not be sent. Please email us directly."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

      {/* data-clarity-mask keeps these values out of session replay even if the
          project's masking level is later relaxed in the Clarity dashboard.
          Enquiries carry names, work emails and part specifications, and a
          recording is not the place for a customer's confidential geometry. */}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="engineering-field">
           <span>{t("name")} <b>*</b></span>
          <input type="text" name="name" autoComplete="name" required data-clarity-mask="true" />
        </label>
        <label className="engineering-field">
           <span>{t("email")} <b>*</b></span>
          <input type="email" name="email" autoComplete="email" required data-clarity-mask="true" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="engineering-field">
           <span>{t("company")}</span>
          <input type="text" name="company" autoComplete="organization" data-clarity-mask="true" />
        </label>
        <label className="engineering-field">
           <span>{t("projectType")}</span>
          <select name="project_type" defaultValue="">
             <option value="" disabled>{t("selectRequirement")}</option>
             <option value="5-axis milling">{t("milling")}</option>
             <option value="Turning / mill-turn">{t("turning")}</option>
             <option value="Prototype or series">{t("prototype")}</option>
             <option value="Quality inspection">{t("quality")}</option>
             <option value="Other">{t("other")}</option>
          </select>
        </label>
      </div>

      <label className="engineering-field">
         <span>{t("message")} <b>*</b></span>
         <textarea name="message" required rows={6} data-clarity-mask="true" placeholder={t("message")} />
      </label>

      <input type="hidden" name="subject" value="New enquiry from Mpinger Engineering" />
      <input type="hidden" name="from_name" value="Mpinger Engineering website" />

      <div className="flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
         <p className="max-w-md text-xs leading-relaxed text-slate-500">{t("privacy")} <Link className="text-[#1d6fb5] underline" href="/datenschutz">{t("privacyLink")}</Link>.</p>
        <button type="submit" disabled={state === "sending"} className="mono-font inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] px-7 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_10px_28px_rgba(11,78,134,0.28)] transition-all duration-300 hover:from-[#0d5996] hover:to-[#56a8e6] disabled:cursor-wait disabled:opacity-65">
           {state === "sending" ? t("sending") : t("send")}
          {state !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
      </div>

      <div aria-live="polite" role="status">
         {state === "success" && <p className="text-sm font-semibold text-[#0b4e86]">{t("success")}</p>}
        {state === "error" && <p className="text-sm font-semibold text-red-700">{errorMessage}</p>}
      </div>
    </form>
  );
}
