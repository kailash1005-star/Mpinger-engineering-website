import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

/**
 * Shared shell for the statutory pages (Impressum, Datenschutz).
 *
 * These are read by regulators, auditors and the occasional competitor looking
 * for a reason to send an Abmahnung — so they are plain, high-contrast and
 * static. No scroll animation, no video, nothing that could delay or obscure
 * the text.
 */
export default function LegalPage({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          href="/"
          className="mono-font text-[10px] uppercase tracking-[0.35em] text-[#1d6fb5] hover:text-[#0b4e86] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d6fb5]"
        >
          ← Mpinger Engineering
        </Link>

        <h1 className="mt-8 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase leading-none">
          {title}
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
          {subtitle}
        </p>
        <p className="mt-2 mono-font text-[10px] uppercase tracking-[0.25em] text-slate-400">
          Stand / Last updated: {updated}
        </p>

        <div className="mt-12 space-y-10 text-sm md:text-[15px] leading-relaxed [&_h2]:text-lg [&_h2]:md:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:tracking-tight [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-[#1d6fb5] [&_a]:underline [&_a:hover]:text-[#0b4e86]">
          {children}
        </div>
      </div>
    </main>
  );
}
