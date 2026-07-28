"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Title card for the full-bleed sticky video sections.
 *
 * The scrolling tours have no room for a normal <SectionHeading> block, so the
 * section title is composited over the opening frames and clears itself as the
 * tour begins — the visitor always learns what they're looking at, but the
 * footage is never permanently obscured.
 *
 * Renders a real <h2> so the page keeps a correct document outline for
 * screen readers and search crawlers, which a purely decorative overlay
 * would not.
 */
export default function SectionTitleCard({
  index,
  eyebrow,
  title,
  scrollYProgress,
  align = "left",
  /** Progress at which the card is fully clear of the screen. */
  fadeOutBy = 0.06,
}: {
  index: string;
  eyebrow: string;
  title: string;
  scrollYProgress: MotionValue<number>;
  align?: "left" | "center";
  fadeOutBy?: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeOutBy * 0.55, fadeOutBy],
    [1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, fadeOutBy], [0, -28]);

  const centered = align === "center";

  return (
    <motion.div
      style={{ opacity, y }}
      className={
        centered
          ? "absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
          : "absolute top-[18%] left-6 md:left-16 flex flex-col items-start text-left pointer-events-none z-10"
      }
    >
      <div
        className={`flex items-center space-x-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="mono-font text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-bold text-[#7cbcf0]">
          {index}
        </span>
        <span className="w-10 h-[2px] bg-[#3f97dd]/50" />
        <span className="mono-font text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/50">
          {eyebrow}
        </span>
      </div>

      <h2 className="mt-4 text-4xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.9] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
        {title}
      </h2>

      <span
        className={`mt-5 block h-[2px] w-16 bg-gradient-to-r from-[#3f97dd] to-transparent ${
          centered ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
