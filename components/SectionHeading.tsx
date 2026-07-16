"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const onDark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col space-y-4 ${alignment}`}
    >
      <div className="flex items-center space-x-4">
        <span
          className={`mono-font text-[11px] tracking-[0.4em] uppercase font-bold ${
            onDark ? "text-[#7cbcf0]" : "text-[#1d6fb5]"
          }`}
        >
          {index}
        </span>
        <span className={`w-10 h-[2px] ${onDark ? "bg-[#3f97dd]/50" : "bg-[#3f97dd]/60"}`} />
        <span
          className={`mono-font text-[11px] tracking-[0.4em] uppercase ${
            onDark ? "text-white/50" : "text-slate-500"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-none ${
          onDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm md:text-base font-normal max-w-2xl leading-relaxed text-balance ${
            onDark ? "text-white/65" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
