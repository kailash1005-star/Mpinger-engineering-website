"use client";

import { FormEvent, useState } from "react";

// Web3Forms access keys are public client-side identifiers. Replace this value
// with the production key before launch.
export const WEB3FORMS_ACCESS_KEY = "ead061de-346f-4cd4-a55a-aa878ae22cfd";

type FormState = "idle" | "sending" | "success" | "error";

export default function EngineeringContactForm() {
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

      form.reset();
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "The message could not be sent. Please email us directly."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="engineering-field">
          <span>Name <b>*</b></span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label className="engineering-field">
          <span>Work email <b>*</b></span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="engineering-field">
          <span>Company</span>
          <input type="text" name="company" autoComplete="organization" />
        </label>
        <label className="engineering-field">
          <span>Project type</span>
          <select name="project_type" defaultValue="">
            <option value="" disabled>Select a requirement</option>
            <option value="5-axis milling">5-axis milling</option>
            <option value="Turning / mill-turn">Turning / mill-turn</option>
            <option value="Prototype or series">Prototype or series</option>
            <option value="Quality inspection">Quality inspection</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <label className="engineering-field">
        <span>Tell us about the part <b>*</b></span>
        <textarea name="message" required rows={6} placeholder="Material, quantity, tolerances, target date — whatever is useful at this stage." />
      </label>

      <input type="hidden" name="subject" value="New enquiry from Mpinger Engineering" />
      <input type="hidden" name="from_name" value="Mpinger Engineering website" />

      <div className="flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-slate-500">We use your details only to respond to this enquiry. See our <a className="text-[#1d6fb5] underline" href="/datenschutz">privacy notice</a>.</p>
        <button type="submit" disabled={state === "sending"} className="mono-font inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] px-7 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_10px_28px_rgba(11,78,134,0.28)] transition-all duration-300 hover:from-[#0d5996] hover:to-[#56a8e6] disabled:cursor-wait disabled:opacity-65">
          {state === "sending" ? "Sending..." : "Send enquiry"}
          {state !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
      </div>

      <div aria-live="polite" role="status">
        {state === "success" && <p className="text-sm font-semibold text-[#0b4e86]">Message received. We&apos;ll be in touch soon.</p>}
        {state === "error" && <p className="text-sm font-semibold text-red-700">{errorMessage}</p>}
      </div>
    </form>
  );
}
