"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { QUALITY_ASSETS, INSTRUMENTS } from "./siteData";

export default function QualitySection() {
  const [cmm, faro, zoller, mahr, haimer] = QUALITY_ASSETS;

  return (
    <section id="quality" className="relative bg-white py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="05"
          eyebrow="Quality Infrastructure"
          title="Measured. Validated. Delivered."
          description="Quality and reliability is our profession. Every component is verified on calibrated coordinate measuring infrastructure inside a temperature-managed quality room — 100% documented before dispatch."
        />

        {/* Primary metrology: CMM + FARO */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[cmm, faro].map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-slate-200 bg-white rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(15,42,68,0.06)] hover:border-[#3f97dd]/70 hover:shadow-[0_18px_44px_rgba(11,78,134,0.14)] transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative aspect-[4/3] sm:aspect-auto bg-[#eef3f8] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.image}
                    alt={asset.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="mono-font text-[9px] uppercase tracking-[0.3em] text-[#1d6fb5] font-semibold">
                      {asset.role}
                    </span>
                    <h3 className="mt-1.5 text-lg md:text-xl font-bold tracking-tight text-slate-900 uppercase leading-tight">
                      {asset.name}
                    </h3>
                  </div>
                  <div>
                    {asset.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-200/80"
                      >
                        <span className="mono-font text-[8px] uppercase tracking-[0.2em] text-slate-500">
                          {spec.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool management trio */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[zoller, mahr, haimer].map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-slate-200 bg-white rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(15,42,68,0.06)] hover:border-[#3f97dd]/70 hover:shadow-[0_18px_44px_rgba(11,78,134,0.14)] transition-all duration-500"
            >
              <div className="relative aspect-[16/10] bg-[#eef3f8] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.image}
                  alt={asset.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5 space-y-1.5 border-t border-slate-100">
                <span className="mono-font text-[9px] uppercase tracking-[0.3em] text-[#1d6fb5] font-semibold">
                  {asset.role}
                </span>
                <h3 className="text-base font-bold tracking-tight text-slate-900 uppercase leading-tight">
                  {asset.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instruments ledger */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="mono-font text-[10px] uppercase tracking-[0.4em] text-slate-500">
              Calibrated Measuring Instruments
            </span>
            <span className="flex-1 h-[1px] bg-slate-200" />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-[0_6px_20px_rgba(15,42,68,0.05)]">
            <table className="w-full min-w-[560px] text-left bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-[#0b4e86] to-[#1d6fb5]">
                  <th className="mono-font text-[9px] uppercase tracking-[0.3em] text-white font-semibold px-5 py-3.5">
                    Description
                  </th>
                  <th className="mono-font text-[9px] uppercase tracking-[0.3em] text-white font-semibold px-5 py-3.5">
                    Range
                  </th>
                  <th className="mono-font text-[9px] uppercase tracking-[0.3em] text-white font-semibold px-5 py-3.5">
                    Make
                  </th>
                </tr>
              </thead>
              <tbody>
                {INSTRUMENTS.map((row, i) => (
                  <tr
                    key={`${row.description}-${row.range}`}
                    className={`border-b border-slate-100 last:border-b-0 hover:bg-[#3f97dd]/[0.06] transition-colors duration-300 ${
                      i % 2 === 1 ? "bg-[#f6f9fc]" : ""
                    }`}
                  >
                    <td className="px-5 py-3 text-xs md:text-sm font-semibold text-slate-800">
                      {row.description}
                    </td>
                    <td className="px-5 py-3 mono-font text-xs text-slate-600">{row.range}</td>
                    <td className="px-5 py-3 text-xs md:text-sm text-slate-600">{row.make}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
