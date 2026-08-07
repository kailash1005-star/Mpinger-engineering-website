import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ContactFooter from "@/components/ContactFooter";
import EngineeringContactForm from "@/components/EngineeringContactForm";
import { COMPANY } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Mpinger Engineering your drawings, specifications or manufacturing enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1d6fb5] selection:text-white">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <span className="mono-font text-[11px] font-bold uppercase tracking-[0.4em] text-[#1d6fb5]">06 // Start Your Project</span>
            <h1 className="mt-7 max-w-xl text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-slate-900 md:text-7xl">Tell us what you need made.</h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">Send us your drawings, specifications or a first outline. We will come back with the right manufacturing route, a qualified quotation and a clear next step.</p>

            <div className="mt-14 grid gap-8 border-t border-slate-200 pt-7 sm:grid-cols-2">
              <div>
                <span className="mono-font text-[10px] font-bold uppercase tracking-[0.3em] text-[#1d6fb5]">Germany — HQ</span>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{COMPANY.legalName}<br />{COMPANY.address.street}<br />{COMPANY.address.postalCode} {COMPANY.address.city}</p>
                <a className="mono-font mt-3 block text-[10px] text-[#0b4e86] hover:text-[#1d6fb5]" href={`mailto:${COMPANY.emailDE}`}>{COMPANY.emailDE}</a>
              </div>
              <div>
                <span className="mono-font text-[10px] font-bold uppercase tracking-[0.3em] text-[#1d6fb5]">India — Plant</span>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">SF. No. 89, Chinnavedampatti<br />Coimbatore 641049<br />Tamil Nadu, India</p>
                <a className="mono-font mt-3 block text-[10px] text-[#0b4e86] hover:text-[#1d6fb5]" href={`mailto:${COMPANY.emailIN}`}>{COMPANY.emailIN}</a>
              </div>
            </div>
          </div>

          <div className="self-start rounded-lg border border-slate-200 bg-[#f3f6fa] p-6 shadow-[0_18px_50px_rgba(11,78,134,0.08)] md:p-9">
            <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-slate-200 pb-5">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 md:text-3xl">Project brief</h2>
              <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-slate-400">Required fields *</span>
            </div>
            <EngineeringContactForm />
          </div>
        </div>
      </section>

      <ContactFooter showCta={false} />
    </main>
  );
}
