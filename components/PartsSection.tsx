"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useVideoScrubber } from "./videoScroll";

/**
 * Two-chapter scroll-driven parts showcase.
 *
 * The section is 600vh — 500vh of actual scroll split evenly between two 240-
 * frame tours, giving ~10px of scroll per frame so a single wheel notch advances
 * a readable handful of frames rather than a jump cut.
 *
 * Scroll maps onto video time strictly monotonically: chapter A owns [0, 0.5],
 * chapter B owns [0.5, 1], back to back with no gap. Scrolling down only ever
 * moves footage forward. (An earlier magnetic-snap pass animated the page to the
 * *nearest* showcase frame, which sat behind the visitor about half the time and
 * played the video backwards to get there — hence no snapping here.)
 */

const CHAPTERS = [
  {
    id: "industrial",
    src: "/parts/industrial-components.mp4",
    eyebrow: "What We Manufacture — 01",
    title: "Industrial Components",
    description:
      "Impeller hubs, gear cases, turbocharger housings and heavy-engine components — 5-axis milled and turned in a single setup, held to 0.001 mm discipline.",
    // scroll range this chapter's video scrubs across
    scrub: [0.0, 0.5] as [number, number],
    // beat sits on the opening showcase
    beat: [0.01, 0.045, 0.085, 0.13] as [number, number, number, number],
  },
  {
    id: "aerospace",
    src: "/parts/aerospace-parts.mp4",
    eyebrow: "What We Manufacture — 02",
    title: "Aerospace-Grade Precision",
    description:
      "Flight-critical geometries in demanding alloys — machined, measured on calibrated CMMs and validated before a single part leaves the floor.",
    scrub: [0.5, 1.0] as [number, number],
    // beat sits on the first showcase, after the opening pan has settled
    beat: [0.625, 0.66, 0.75, 0.79] as [number, number, number, number],
  },
];

// Cross-dissolve at the chapter seam. Deliberately tight (~1.5% of the section,
// roughly 100px): while it runs, one video is clamped to its last frame and the
// other to its first, so exactly one of them is seeking and neither the picture
// nor the scroll ever parks on a frozen frame.
const CUT = { aOut: [0.49, 0.505], bIn: [0.495, 0.51] };

function ChapterBeat({
  chapter,
  scrollYProgress,
}: {
  chapter: (typeof CHAPTERS)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const [start, fadedIn, fadeOut, end] = chapter.beat;

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
        {chapter.eyebrow}
      </span>
      <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white/95 uppercase leading-[0.95]">
        {chapter.title}
      </h3>
      <p className="text-sm md:text-base text-white/60 leading-relaxed text-balance">
        {chapter.description}
      </p>
    </motion.div>
  );
}

export default function PartsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Per-chapter video time — a pure linear map of raw scroll position.
  // No spring here: the scrubber's rAF loop does the smoothing, and filtering
  // twice just compounds into lag you can see.
  const timeA = useTransform(scrollYProgress, CHAPTERS[0].scrub, [0, 1], { clamp: true });
  const timeB = useTransform(scrollYProgress, CHAPTERS[1].scrub, [0, 1], { clamp: true });

  const readyA = useVideoScrubber(videoARef, timeA);
  useVideoScrubber(videoBRef, timeB);

  // Cross-dissolve at the seam — driven by raw scroll so the cut lands exactly
  // where the footage hands over
  const opacityA = useTransform(scrollYProgress, CUT.aOut, [1, 0], { clamp: true });
  const opacityB = useTransform(scrollYProgress, CUT.bIn, [0, 1], { clamp: true });
  const visibilityA = useTransform(opacityA, (v) => (v > 0.001 ? "visible" : "hidden"));
  const visibilityB = useTransform(opacityB, (v) => (v > 0.001 ? "visible" : "hidden"));

  // Scroll hint fades out as soon as the tour starts
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Closing caption over the final frames
  const outroOpacity = useTransform(scrollYProgress, [0.93, 0.98], [0, 1]);

  // Active chapter for the rail labels
  const [activeChapter, setActiveChapter] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveChapter(latest < 0.5 ? 0 : 1);
  });

  return (
    <section id="parts" ref={containerRef} className="relative w-full h-[600vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050505]">
        {/* Chapter 01 — industrial components tour */}
        <motion.video
          ref={videoARef}
          src={CHAPTERS[0].src}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          style={{ opacity: opacityA, visibility: visibilityA }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Chapter 02 — aerospace tour */}
        <motion.video
          ref={videoBRef}
          src={CHAPTERS[1].src}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          style={{ opacity: opacityB, visibility: visibilityB }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic vignette + top hairline, matching the hero language */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505]/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3f97dd]/10 to-transparent pointer-events-none" />

        {/* Loading veil until the first tour is scrub-ready */}
        <motion.div
          initial={false}
          animate={{ opacity: readyA ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-none"
        >
          <span className="mono-font text-[10px] uppercase tracking-[0.5em] text-neutral-600 animate-pulse">
            Loading Parts Tour
          </span>
        </motion.div>

        {/* Minimal text beats — one per chapter, timed to its steadiest pan */}
        {CHAPTERS.map((chapter) => (
          <ChapterBeat
            key={chapter.id}
            chapter={chapter}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Chapter rail — desktop */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-8 pointer-events-none">
          {[
            { label: "Industrial", progress: timeA },
            { label: "Aerospace", progress: timeB },
          ].map((item, index) => (
            <div key={item.label} className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span
                  className={`mono-font text-[9px] uppercase tracking-[0.35em] transition-colors duration-500 ${
                    activeChapter === index ? "text-[#7cbcf0]" : "text-neutral-600"
                  }`}
                >
                  {`0${index + 1}`}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    activeChapter === index ? "text-white/90" : "text-neutral-600"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <div className="relative w-[2px] h-16 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleY: item.progress }}
                  className="absolute inset-0 bg-gradient-to-b from-[#3f97dd] to-[#7cbcf0] origin-top rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 inset-x-0 flex flex-col items-center space-y-2 pointer-events-none"
        >
          <span className="mono-font text-[9px] uppercase tracking-[0.5em] text-neutral-500">
            Scroll to Tour the Parts
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#3f97dd]/60 to-transparent animate-pulse" />
        </motion.div>

        {/* Closing caption */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="absolute bottom-[7%] inset-x-0 flex justify-center pointer-events-none"
        >
          <span className="mono-font text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 text-center px-6">
            8 Component Families · ISO 9001:2015 · Validated Before Dispatch
          </span>
        </motion.div>
      </div>
    </section>
  );
}
