"use client";

import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";

const STATS = [
  { value: 11000, suffix: " ft²", labelKey: "stat1" },
  { value: 20, suffix: "+", labelKey: "stat2" },
  { value: 5, suffix: "-Axis", labelKey: "stat3" },
  { value: 8, suffix: "+", labelKey: "stat4" },
];

const PILLARS = [
  {
    titleKey: "pillar1Title",
    textKey: "pillar1Text",
  },
  {
    titleKey: "pillar2Title",
    textKey: "pillar2Text",
  },
  {
    titleKey: "pillar3Title",
    textKey: "pillar3Text",
  },
];

const INDUSTRIES = [
  "Aerospace",
  "Defence",
  "Railway",
  "Automotive",
  "Medical Devices",
  "Textile Machinery",
  "Oil & Gas",
  "Valves & Pumps",
  "Turbines",
  "OEMs",
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest).toLocaleString("en-US"));
  });

  return (
    // Kept on one line on small screens: at text-4xl a value like "11,000 ft²"
    // wrapped its unit onto a second row and doubled the card's height.
    <span
      ref={ref}
      className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap"
    >
      {display}
      <span className="text-[#1d6fb5]">{suffix}</span>
    </span>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");
  return (
    <section id="about" className="relative bg-white py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="01"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual */}
          <motion.figure
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl overflow-hidden shadow-[0_24px_60px_rgba(11,78,134,0.18)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/backdrops/digital-thread.webp"
              alt={t("imgAlt")}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-white/85">
                From drawing to dispatch — one digital thread
              </span>
            </figcaption>
          </motion.figure>

          {/* Three pillars, one line each */}
          <div className="flex flex-col space-y-2">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.titleKey}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start space-x-5 rounded-xl border border-slate-200 bg-white p-6 hover:border-[#3f97dd]/60 hover:shadow-[0_12px_32px_rgba(11,78,134,0.10)] transition-all duration-300"
              >
                <span className="mono-font text-sm font-bold text-white bg-gradient-to-br from-[#0b4e86] to-[#3f97dd] rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {`0${i + 1}`}
                </span>
                <div>
                   <h3 className="text-base font-bold text-slate-900 tracking-tight">
                     {t(pillar.titleKey)}
                   </h3>
                   <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t(pillar.textKey)}</p>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 pt-3"
            >
              <span className="mono-font text-[11px] uppercase tracking-[0.2em] font-bold text-white bg-gradient-to-r from-[#0b4e86] to-[#1d6fb5] rounded-md px-4 py-2.5">
                 {t("certified")}
              </span>
              <span className="mono-font text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0b4e86] border border-[#3f97dd]/50 bg-[#3f97dd]/10 rounded-md px-4 py-2.5">
                 {t("stage")}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-[#f3f6fa] p-4 md:p-7 flex flex-col space-y-1.5 md:space-y-2 hover:border-[#3f97dd]/60 transition-colors duration-300"
            >
              <StatCounter value={stat.value} suffix={stat.suffix} />
              {/* Wide tracking pushed short labels onto three lines on a phone */}
              <span className="mono-font text-[9px] uppercase tracking-[0.12em] md:tracking-[0.25em] text-slate-500 leading-snug md:leading-relaxed">
                 {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          <span className="mono-font text-[10px] uppercase tracking-[0.35em] text-slate-500 mr-3">
             {t("industries")}
          </span>
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 border border-slate-200 bg-white rounded-full px-3.5 py-1.5 hover:border-[#3f97dd] hover:text-[#1d6fb5] transition-colors duration-300"
            >
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
