"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Parts", href: "#parts" },
  { label: "Machines", href: "#machines" },
  { label: "Quality", href: "#quality" },
  { label: "Global", href: "#global" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Header turns light once the visitor leaves the dark hero (400vh tall)
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 3.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled
    ? "text-slate-600 hover:text-[#1d6fb5]"
    : "text-white/85 hover:text-[#7cbcf0]";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_16px_rgba(11,78,134,0.06)]"
          : "bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-3.5">
        {/* Brand — logo only */}
        <a href="#top" className="flex items-center group">
          <span
            className={`rounded-lg px-3.5 py-2 transition-all duration-300 group-hover:scale-[1.03] ${
              scrolled ? "bg-white" : "bg-white shadow-[0_0_24px_rgba(255,255,255,0.10)]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="mpinger Engineering" className="h-9 md:h-10 w-auto" />
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] lg:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center space-x-4">
          <span
            className={`hidden lg:inline text-[11px] font-medium tracking-[0.18em] uppercase ${
              scrolled ? "text-slate-500" : "text-white/60"
            }`}
          >
            DE · Hannover / IN · Coimbatore
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
