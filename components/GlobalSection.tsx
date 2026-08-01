"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const VALUE_PROPS = [
  { title: "German Coordination", text: "One central contact in Hannover." },
  { title: "Indian Manufacturing", text: "Production costs up to 70% lower." },
  { title: "Virtual Factory", text: "Casting, sheet metal & surface-treatment partners." },
  { title: "On-Time Delivery", text: "Professional logistics and export packaging." },
  { title: "Transparent Dealings", text: "Full documentation, open communication." },
  { title: "Dedicated Workforce", text: "Trained team, Lean Six Sigma practice." },
];

const LOCATIONS = [
  {
    country: "Germany",
    role: "Coordination & Sales HQ",
    name: "mpinger GmbH",
    lines: ["Gustav-Schenk-Weg 53", "30455 Hannover, Deutschland"],
    contact: ["+49 511 790 900 96", "info@mpinger.de"],
  },
  {
    country: "India",
    role: "Manufacturing Plant",
    name: "Mpinger Engineering India Pvt. Ltd.",
    lines: ["SF. No. 89, Chinnavedampatti", "Coimbatore 641049, Tamil Nadu, India"],
    contact: ["+91 755 001 5799", "sales@mpinger-engineering.com"],
  },
];

export default function GlobalSection() {
  return (
    <section id="global" className="relative bg-[#06263f] py-24 md:py-32 overflow-hidden">
      {/* Global network backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
        style={{ backgroundImage: "url(/backdrops/global-network.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06263f] via-[#06263f]/55 to-[#06263f] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="05"
          eyebrow="German–Indian Manufacturing Bridge"
          title="The Best Of Two Worlds"
          description="German reliability combined with Indian precision manufacturing — one connected production network, coordinated from Hannover, machined in Coimbatore."
          tone="dark"
        />

        {/* Location cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {LOCATIONS.map((location, i) => (
            <motion.div
              key={location.country}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-8 hover:border-[#3f97dd]/70 hover:bg-white/[0.09] transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="mono-font text-[10px] uppercase tracking-[0.35em] text-[#7cbcf0] font-bold">
                  {location.country}
                </span>
                <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/50">
                  {location.role}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                {location.name}
              </h3>
              <div className="mt-3 space-y-1">
                {location.lines.map((line) => (
                  <p key={line} className="text-sm text-white/60 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-2">
                {location.contact.map((item) => (
                  <span key={item} className="mono-font text-[11px] tracking-[0.1em] text-[#a8d1f2]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact value props — one line each */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VALUE_PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center space-x-4 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-[#3f97dd]/60 transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#3f97dd] to-[#7cbcf0] flex-shrink-0" />
              <p className="text-sm leading-snug">
                <span className="font-bold text-white">{prop.title}</span>
                <span className="text-white/55"> — {prop.text}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
