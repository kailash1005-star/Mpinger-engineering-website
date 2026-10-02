"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";

export default function CapabilitiesSection() {
  const t = useTranslations("capabilities");
  const capabilities = t.raw("items") as string[];

  return (
    <section id="capabilities" className="relative bg-white border-t border-slate-200 py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="01.1"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {capabilities.map((capability, i) => (
              <motion.li
                key={capability}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* The float and sheen are CSS animations on an inner element so
                    they never fight framer-motion's transform on the <li>. */}
                <div
                  className="cap-card relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-5 flex items-center space-x-4"
                  style={{ "--cap-i": i } as CSSProperties}
                >
                  <span className="mono-font text-sm font-bold text-white bg-gradient-to-br from-[#0b4e86] to-[#3f97dd] rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                    {capability}
                  </h3>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* The machined part anchors the section: static, full strength,
              framed with the same corner brackets as the machine park. */}
          <motion.figure
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[360px] rounded-xl shadow-[0_24px_60px_rgba(11,78,134,0.18)]"
          >
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#3f97dd] rounded-tl-xl z-10" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#3f97dd] rounded-tr-xl z-10" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#3f97dd] rounded-bl-xl z-10" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#3f97dd] rounded-br-xl z-10" />
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/backdrops/capabilities-part.webp"
                alt={t("imgAlt")}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-white/85">
                  {t("caption")}
                </span>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
