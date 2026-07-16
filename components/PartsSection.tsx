"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { PARTS, Part } from "./siteData";

function PartCard({ part, index }: { part: Part; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 25,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative border border-slate-200 bg-white rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(15,42,68,0.06)] hover:border-[#3f97dd]/70 hover:shadow-[0_18px_44px_rgba(11,78,134,0.16)] transition-all duration-500"
      >
        {/* Part image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#f6f8fb] to-[#e9eef4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={part.image}
            alt={part.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        </div>

        {/* Meta */}
        <div
          className="relative p-5 flex items-end justify-between border-t border-slate-100"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="flex flex-col space-y-1">
            <span className="mono-font text-[9px] uppercase tracking-[0.3em] text-[#1d6fb5] font-semibold">
              {part.sector}
            </span>
            <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 uppercase leading-tight">
              {part.name}
            </h3>
          </div>
          <span className="mono-font text-[10px] text-slate-400 tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PartsSection() {
  return (
    <section id="parts" className="relative bg-[#f3f6fa] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="02"
          eyebrow="What We Do"
          title="Components We Manufacture"
          description="High-precision CNC-milled and turned components across demanding sectors — machined on our 5-axis park and validated on calibrated measuring infrastructure before dispatch."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PARTS.map((part, index) => (
            <PartCard key={part.id} part={part} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
