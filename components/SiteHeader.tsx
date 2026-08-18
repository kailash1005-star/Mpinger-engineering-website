"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "about", href: "#about" },
  { key: "parts", href: "#parts" },
  { key: "machines", href: "#machines" },
  { key: "quality", href: "#quality" },
  { key: "global", href: "#global" },
  { key: "contact", href: "#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  useEffect(() => {
    // Header turns light once the visitor leaves the dark hero (400vh tall)
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 3.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lightHeader = pathname !== `/${locale}` || scrolled;
  const linkColor = lightHeader
    ? "text-slate-600 hover:text-[#1d6fb5]"
    : "text-white/85 hover:text-[#7cbcf0]";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 ${
        lightHeader
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_16px_rgba(11,78,134,0.06)]"
          : "bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-3.5">
        {/* Brand — logo only */}
          <Link href="/" className="flex items-center group">
          <span
            className={`rounded-lg px-3.5 py-2 transition-all duration-300 group-hover:scale-[1.03] ${
              lightHeader ? "bg-white" : "bg-white shadow-[0_0_24px_rgba(255,255,255,0.10)]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="mpinger Engineering" className="h-9 md:h-10 w-auto" />
          </span>
          </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) =>
            link.key === "contact" ? (
              <Link
                key={link.href}
                href="/contact"
                className={`text-[13px] lg:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
              >
                {t(link.key)}
              </Link>
            ) : (
              <a
                key={link.href}
                href={pathname === `/${locale}` ? link.href : `/${locale}${link.href}`}
                className={`text-[13px] lg:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
              >
                {t(link.key)}
              </a>
            )
          )}
        </nav>

        {/* Status */}
        <div className="flex items-center space-x-4">
          <span
            className={`hidden lg:inline text-[11px] font-medium tracking-[0.18em] uppercase ${
              lightHeader ? "text-slate-500" : "text-white/60"
            }`}
          >
            DE · Hannover / IN · Coimbatore
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

          {/* Mobile menu toggle — only below md, where the inline <nav> is
              hidden. Restores the section shortcuts on phones. */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border ${
              lightHeader ? "border-slate-300 text-slate-700" : "border-white/40 text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown — mirrors NAV_LINKS. Closes on selection. */}
      {menuOpen && (
        <nav
          className={`md:hidden border-t px-6 py-3 flex flex-col gap-1 ${
            lightHeader ? "bg-white/95 border-slate-200" : "bg-black/70 border-white/10"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.key === "contact" ? `/${locale}/contact` : pathname === `/${locale}` ? link.href : `/${locale}${link.href}`}
              onClick={() => setMenuOpen(false)}
              className={`text-[13px] font-semibold uppercase tracking-[0.14em] py-2.5 ${
                link.key === "contact" ? "text-[#1d6fb5]" : linkColor
              }`}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
