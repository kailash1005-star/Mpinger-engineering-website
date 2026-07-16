"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const GALLERY = [
  {
    src: "/shopfloor/shopfloor-1.webp",
    caption: "11,000 ft² dust-controlled shopfloor — Coimbatore, India",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/shopfloor/shopfloor-4.webp",
    caption: "DMG DMU 210 P — 5-axis milling center",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    src: "/shopfloor/shopfloor-6.webp",
    caption: "DMC 125 FD duoBLOCK — 5-axis mill turn",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/shopfloor/shopfloor-7.webp",
    caption: "DMC 60 T — 5-axis machining cell",
    span: "md:col-span-1 md:row-span-1",
  },
];

export default function ShopfloorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative bg-[#f3f6fa] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          index="04"
          eyebrow="Inside The Plant"
          title="Glimpse Of Our Shopfloor"
          description="Epoxy-lined, dust-controlled and organised for flow — from material inward to assembly and dispatch. This is where German machine technology runs around the clock in Coimbatore, Tamil Nadu."
        />

        <motion.div style={{ y: parallaxY }} className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[640px]">
            {GALLERY.map((item, index) => (
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-xl border border-slate-200 shadow-[0_10px_30px_rgba(15,42,68,0.10)] min-h-[240px] ${item.span}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06263f]/85 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mono-font text-[9px] uppercase tracking-[0.25em] text-white/90 leading-relaxed">
                    {item.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
