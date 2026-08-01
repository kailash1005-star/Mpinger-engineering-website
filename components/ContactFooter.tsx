"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PARTNERS = ["Procito", "Rabwin", "Frigate", "GDIZ"];

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative bg-[#f3f6fa]">
      {/* CTA band */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <span className="mono-font text-[11px] tracking-[0.4em] text-[#1d6fb5] uppercase font-bold">
            06 // Start Your Project
          </span>
          <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-slate-900 uppercase leading-none max-w-4xl">
            Your Partner For High-Precision Manufacturing
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed text-balance">
            Send us your drawings — receive a qualified quotation, a clear delivery date, and
            components that hold tolerance. From prototype to series.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="mailto:info@mpinger.de"
              className="mono-font text-[11px] uppercase tracking-[0.25em] font-bold text-white bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] hover:from-[#0d5996] hover:to-[#56a8e6] transition-all duration-300 rounded-md px-7 py-3.5 shadow-[0_10px_28px_rgba(11,78,134,0.28)]"
            >
              info@mpinger.de
            </a>
            <a
              href="mailto:sales@mpinger-engineering.com"
              className="mono-font text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0b4e86] border border-[#1d6fb5]/40 bg-white hover:border-[#1d6fb5] hover:text-[#1d6fb5] transition-colors duration-300 rounded-md px-7 py-3.5"
            >
              sales@mpinger-engineering.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer grid — deep navy anchor */}
      <div className="bg-[#06263f]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <span className="inline-block bg-white rounded-lg px-4 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="mpinger Engineering" className="h-9 w-auto" />
            </span>
            <p className="text-xs text-white/55 leading-relaxed max-w-sm">
              Mpinger Engineering India Private Limited — an ISO 9001:2015 certified manufacturer
              of high-precision CNC-milled and turned components, coordinated by mpinger GmbH,
              Hannover.
            </p>
            <p className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/35">
              GSTIN 33AANCM8803H1ZB · www.mpinger.de · www.mpinger.in
            </p>
          </div>

          {/* Germany */}
          <div className="space-y-3">
            <span className="mono-font text-[10px] uppercase tracking-[0.35em] text-[#7cbcf0] font-bold">
              Germany — HQ
            </span>
            <p className="text-xs text-white/60 leading-relaxed">
              mpinger GmbH
              <br />
              Gustav-Schenk-Weg 53
              <br />
              30455 Hannover
            </p>
            <p className="mono-font text-[10px] text-[#a8d1f2] leading-relaxed">
              <a href="tel:+4951179090096" className="hover:text-white transition-colors">
                +49 511 790 900 96
              </a>
              <br />
              <a href="mailto:info@mpinger.de" className="hover:text-white transition-colors">
                info@mpinger.de
              </a>
            </p>
          </div>

          {/* India */}
          <div className="space-y-3">
            <span className="mono-font text-[10px] uppercase tracking-[0.35em] text-[#7cbcf0] font-bold">
              India — Plant
            </span>
            <p className="text-xs text-white/60 leading-relaxed">
              SF. No. 89, Chinnavedampatti
              <br />
              Coimbatore 641049
              <br />
              Tamil Nadu, India
            </p>
            <p className="mono-font text-[10px] text-[#a8d1f2] leading-relaxed">
              <a href="tel:+917550015799" className="hover:text-white transition-colors">
                +91 755 001 5799
              </a>
              <br />
              <a href="mailto:sales@mpinger-engineering.com" className="hover:text-white transition-colors">
                sales@mpinger-engineering.com
              </a>
              {" · "}
              <a href="mailto:sk@mpinger.in" className="hover:text-white transition-colors">
                sk@mpinger.in
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2">
              <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/40">
                © {new Date().getFullYear()} Mpinger Engineering.
              </span>
              {/* Statutory links — § 5 DDG requires the Impressum to be
                  reachable from every page, hence their place in the footer. */}
              <Link
                href="/impressum"
                className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/55 hover:text-white transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/55 hover:text-white transition-colors"
              >
                Datenschutz
              </Link>
              <a
                href="https://www.linkedin.com/company/mpinger/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/55 hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="flex items-center gap-6">
              <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/40">
                Partners:
              </span>
              {PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/55"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
