"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MACHINES, Machine } from "./siteData";

function MachineSlide({ machine, index }: { machine: Machine; index: number }) {
  return (
    <div className="relative w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-16">
      {/* Oversized background index */}
      <span className="absolute right-8 md:right-20 bottom-6 md:bottom-10 mono-font font-bold text-[16vw] md:text-[11vw] leading-none text-[#0b4e86]/[0.05] select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 w-full max-w-6xl items-center">
        {/* Machine visual */}
        <div className="lg:col-span-7 relative">
          <div className="relative border border-slate-200 bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(11,78,134,0.12)]">
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#3f97dd] rounded-tl-xl z-10" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#3f97dd] rounded-tr-xl z-10" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#3f97dd] rounded-bl-xl z-10" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#3f97dd] rounded-br-xl z-10" />

            <div className="relative aspect-[16/10] flex items-center justify-center bg-gradient-to-b from-white to-[#eef3f8] p-4 md:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={machine.image}
                alt={`${machine.make} ${machine.model}`}
                loading="lazy"
                className="max-w-full max-h-full object-contain drop-shadow-[0_18px_30px_rgba(15,42,68,0.18)]"
              />
            </div>
          </div>
        </div>

        {/* Spec panel */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          <div className="flex items-center space-x-3">
            <span className="mono-font text-[9px] uppercase tracking-[0.3em] text-white font-bold bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] px-3 py-1.5 rounded-md">
              {machine.category}
            </span>
            {machine.units && (
              <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-slate-600 border border-slate-300 bg-white px-2.5 py-1.5 rounded-md">
                {machine.units}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase leading-none">
              {machine.model}
            </h3>
            <p className="mono-font text-[10px] uppercase tracking-[0.35em] text-slate-500">
              {machine.make}
            </p>
          </div>

          <div className="border-t border-slate-200">
            {machine.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-6 py-2.5 border-b border-slate-200/80"
              >
                <span className="mono-font text-[9px] uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">
                  {spec.label}
                </span>
                <span className="text-xs md:text-sm font-semibold text-slate-800 text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MachinesSection() {
  const t = useTranslations("machines");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const machineCount = MACHINES.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0vw", `-${(machineCount - 1) * 100}vw`]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["2%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(machineCount - 1, Math.max(0, Math.round(latest * (machineCount - 1))));
    setActiveIndex(next);
  });

  return (
    <section id="machines" className="relative bg-white">
      {/* Section intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4"
        >
          <div className="flex items-center space-x-4">
            <span className="mono-font text-[11px] tracking-[0.4em] text-[#1d6fb5] uppercase font-bold">
              03
            </span>
            <span className="w-10 h-[2px] bg-[#3f97dd]/60" />
            <span className="mono-font text-[11px] tracking-[0.4em] text-slate-500 uppercase">
               {t("eyebrow")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase leading-none">
             {t("title")}
          </h2>
          <p className="text-sm md:text-base font-normal text-slate-600 max-w-2xl leading-relaxed text-balance">
             {t("description")}
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrollytelling track */}
      <div ref={containerRef} className="relative" style={{ height: `${machineCount * 55}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-white">
          {/* Track */}
          <motion.div style={{ x }} className="flex h-full items-stretch">
            {MACHINES.map((machine, index) => (
              <MachineSlide key={machine.id} machine={machine} index={index} />
            ))}
          </motion.div>

          {/* HUD: counter + progress */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-6 pointer-events-none">
            <div className="max-w-6xl mx-auto flex items-center justify-between space-x-6">
              <span className="mono-font text-[10px] tracking-[0.35em] text-slate-500 uppercase whitespace-nowrap">
                 {t("unit", { current: String(activeIndex + 1).padStart(2, "0"), total: String(machineCount).padStart(2, "0") })}
              </span>
              <div className="relative flex-1 h-[3px] bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0b4e86] to-[#3f97dd] rounded-full"
                  style={{ width: progressWidth }}
                />
              </div>
              <span className="mono-font text-[10px] tracking-[0.35em] text-slate-500 uppercase whitespace-nowrap hidden md:inline">
                 {t("scroll")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
