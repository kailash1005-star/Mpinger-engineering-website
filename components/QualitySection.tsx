"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useVideoScrubber,
  useAdaptiveVideoSource,
  useTouchRenderer,
} from "./videoScroll";
import SectionTitleCard from "./SectionTitleCard";
import ScrollImageSequence from "./ScrollImageSequence";

const SOURCES = {
  desktop: "/parts/quality-equipment.mp4",
  mobile: "/parts/quality-equipment-mobile.mp4",
};
const FRAMES = Array.from(
  { length: 8 },
  (_, i) => `/frames/quality-${i + 1}.webp`
);

/**
 * Scroll-driven quality-lab tour. Scroll maps linearly and monotonically onto
 * video time, so scrolling down only ever moves the footage forward. Smoothing
 * lives entirely in the scrubber's rAF loop.
 *
 * 500vh gives the 240-frame tour 400vh of real scroll — deliberately MORE room
 * per frame than the Parts chapters get. Matching Parts' ratio exactly was tried
 * and felt jumpy: this footage pans faster than the slow parts orbits, so the
 * same frames-per-wheel-notch reads as a series of jump cuts rather than motion.
 * Pace is a function of how fast the camera moves, not just of frame count.
 */

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

  const isTouch = useTouchRenderer();
  const src = useAdaptiveVideoSource(containerRef, SOURCES);

  // Tighter follow than the 0.14 default: this tour must track the cursor
  // rather than trail it. The extra scroll room above (500vh) is what buys the
  // headroom to tighten — at a shorter section this would read as steppy.
  const isReady = useVideoScrubber(videoRef, scrollYProgress, { smoothing: 0.06 });

  // Scroll hint fades out as soon as the tour starts
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Closing caption over the final frames
  const outroOpacity = useTransform(scrollYProgress, [0.93, 0.98], [0, 1]);

  return (
    // Shorter tour on phones — see the note in PartsSection
    <section id="quality" ref={containerRef} className="relative w-full h-[350vh] md:h-[500vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050505]">
        {/* The Parts tours get their own compositing layer for free, via the
            animated opacity on their motion.video. This one has no animated
            style, so promote it explicitly — otherwise each seek can repaint on
            the main thread along with the gradients stacked over it. */}
        {isTouch ? (
          <ScrollImageSequence
            progress={scrollYProgress}
            frames={FRAMES}
            alt="Metrology lab — calibrated CMM inspection of machined components"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster="/posters/quality.webp"
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            aria-hidden="true"
            style={{ transform: "translateZ(0)", willChange: "transform" }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Cinematic vignette + top hairline, matching the hero language */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505]/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3f97dd]/10 to-transparent pointer-events-none" />

        {/* Section title — centered, clears as the tour begins */}
        <SectionTitleCard
          index="04"
          eyebrow="Metrology & Validation"
          title="Quality"
          scrollYProgress={scrollYProgress}
          align="center"
        />

        {/* Loading veil until the tour is scrub-ready */}
        <motion.div
          initial={false}
          // Image sequences need no buffering, so the veil never applies there
          animate={{ opacity: isTouch || isReady ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-none"
        >
          <span className="mono-font text-[10px] uppercase tracking-[0.5em] text-neutral-600 animate-pulse">
            Loading Quality Lab
          </span>
        </motion.div>

        {/* Minimal text beats, timed to the steadiest equipment showcases */}
        {BEATS.map((beat) => (
          <Beat key={beat.title} beat={beat} scrollYProgress={scrollYProgress} />
        ))}

        {/* Progress rail — desktop */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-4 pointer-events-none">
          <div className="flex flex-col items-end">
            <span className="mono-font text-[9px] uppercase tracking-[0.35em] text-[#7cbcf0]">
              04
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
              Metrology
            </span>
          </div>
          <div className="relative w-[2px] h-16 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 bg-gradient-to-b from-[#3f97dd] to-[#7cbcf0] origin-top rounded-full"
            />
          </div>
        </div>

        {/* Progress rail — mobile equivalent of the desktop vertical rail */}
        <div className="absolute top-0 inset-x-0 flex md:hidden px-4 pt-3 pointer-events-none">
          <div className="relative h-[2px] flex-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-gradient-to-r from-[#3f97dd] to-[#7cbcf0] origin-left rounded-full"
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
