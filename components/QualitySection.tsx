"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useVideoScrubber, useMagneticSnap } from "./videoScroll";

/**
 * Scroll-driven quality-lab tour. Scroll maps LINEARLY onto video time —
 * the same 1:1 pacing as the hero and parts sections (10s of footage over
 * 400vh). When the visitor stops scrolling, the page settles onto the
 * nearest sharp equipment showcase (motion-analyzed holds) so the resting
 * frame is always a crisp, presented instrument.
 */

// Sharp showcase ranges in normalized video time, from per-frame motion
// analysis: holds at 0–1.5s / 2.5–3.5s / 4–5s / 5.5–6.5s / 7.5–8.5s
const HOLDS: [number, number][] = [
  [0, 0.15],
  [0.25, 0.35],
  [0.4, 0.5],
  [0.55, 0.65],
  [0.75, 0.85],
];

const SNAP_ANCHORS = HOLDS.map(([s, e]) => (s + e) / 2);

const BEATS = [
  {
    eyebrow: "Quality Infrastructure",
    title: "Measured. Validated. Delivered.",
    description:
      "Every component is verified on calibrated coordinate-measuring infrastructure inside a temperature-managed quality room — 100% documented before dispatch.",
    // sits on the opening showcase
    range: [0.01, 0.045, 0.1, 0.145] as [number, number, number, number],
  },
  {
    eyebrow: "Metrology Park",
    title: "Calibrated to 2.2 µm",
    description:
      "Hexagon Global CMM, FARO Arm Prime and Zoller presetting — backed by a full ledger of calibrated Mitutoyo instruments.",
    // sits on the quietest mid-tour hold
    range: [0.55, 0.585, 0.63, 0.67] as [number, number, number, number],
  },
];

function Beat({
  beat,
  scrollYProgress,
}: {
  beat: (typeof BEATS)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const [start, fadedIn, fadeOut, end] = beat.range;

  const opacity = useTransform(
    scrollYProgress,
    [start, fadedIn, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadedIn, fadeOut, end],
    [28, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-[14%] left-6 md:left-16 max-w-md md:max-w-lg flex flex-col space-y-3 pointer-events-none"
    >
      <span className="mono-font text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#7cbcf0] font-semibold">
        {beat.eyebrow}
      </span>
      <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white/95 uppercase leading-[0.95]">
        {beat.title}
      </h3>
      <p className="text-sm md:text-base text-white/60 leading-relaxed text-balance">
        {beat.description}
      </p>
    </motion.div>
  );
}

export default function QualitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll so seeks glide instead of stuttering — same
  // spring as the hero scrollytelling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const isReady = useVideoScrubber(videoRef, smoothProgress);
  useMagneticSnap(containerRef, SNAP_ANCHORS);

  // Scroll hint fades out as soon as the tour starts
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Closing caption over the final frames
  const outroOpacity = useTransform(scrollYProgress, [0.93, 0.98], [0, 1]);

  return (
    <section id="quality" ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050505]">
        <video
          ref={videoRef}
          src="/parts/quality-equipment.mp4"
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic vignette + top hairline, matching the hero language */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505]/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3f97dd]/10 to-transparent pointer-events-none" />

        {/* Loading veil until the tour is scrub-ready */}
        <motion.div
          initial={false}
          animate={{ opacity: isReady ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-none"
        >
          <span className="mono-font text-[10px] uppercase tracking-[0.5em] text-neutral-600 animate-pulse">
            Loading Quality Lab
          </span>
        </motion.div>

        {/* Minimal text beats aligned to sharp holds */}
        {BEATS.map((beat) => (
          <Beat key={beat.title} beat={beat} scrollYProgress={scrollYProgress} />
        ))}

        {/* Progress rail — desktop */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-4 pointer-events-none">
          <div className="flex flex-col items-end">
            <span className="mono-font text-[9px] uppercase tracking-[0.35em] text-[#7cbcf0]">
              05
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
              Metrology
            </span>
          </div>
          <div className="relative w-[2px] h-16 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: smoothProgress }}
              className="absolute inset-0 bg-gradient-to-b from-[#3f97dd] to-[#7cbcf0] origin-top rounded-full"
            />
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 inset-x-0 flex flex-col items-center space-y-2 pointer-events-none"
        >
          <span className="mono-font text-[9px] uppercase tracking-[0.5em] text-neutral-500">
            Scroll to Tour the Lab
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#3f97dd]/60 to-transparent animate-pulse" />
        </motion.div>

        {/* Closing caption */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="absolute bottom-[7%] inset-x-0 flex justify-center pointer-events-none"
        >
          <span className="mono-font text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 text-center px-6">
            Hexagon · FARO · Zoller · Mahr · Haimer — 100% Documented
          </span>
        </motion.div>
      </div>
    </section>
  );
}
