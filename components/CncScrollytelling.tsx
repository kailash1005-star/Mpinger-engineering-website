"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  useVideoScrubber,
  useAdaptiveVideoSource,
  useTouchRenderer,
} from "./videoScroll";
import ScrollImageSequence from "./ScrollImageSequence";

const SOURCES = { desktop: "/video.mp4", mobile: "/video-mobile.mp4" };
const FRAMES = Array.from({ length: 24 }, (_, i) => `/frames-portrait/hero-${i + 1}.webp`);

interface Beat {
  title: string;
  subtitle: string;
  start: number;
  end: number;
}

const QUICK_LINKS = [
  { label: "Machines", sub: "The 5-Axis Park", href: "#machines", image: "/machines/dmu-210p.webp" },
  { label: "Parts", sub: "What We Manufacture", href: "#parts", image: "/parts/impeller-hub.webp" },
  { label: "Quality", sub: "Metrology & Validation", href: "#quality", image: "/quality/hexagon-cmm.webp" },
  { label: "Global", sub: "German-Indian Bridge", href: "#global", image: "/backdrops/global-network.webp" },
];

/**
 * Hero beats follow the footage — simulation, strategy, cutting, inspection —
 * but each one states a capability a buyer can actually evaluate. The audience
 * here is a procurement or design engineer qualifying a supplier, so every beat
 * carries one checkable claim and the benefit it buys them. Abstract praise
 * ("mastery", "perfection") is deliberately avoided: the footage already
 * carries the premium impression, and unverifiable superlatives read as noise
 * to an industrial buyer.
 */
const BEATS: Beat[] = [
  {
    title: "PROVEN BEFORE WE CUT",
    subtitle:
      "Every setup is simulated and collision-checked before a tool touches metal — so the first part and the thousandth come off identical.",
    start: 0.0,
    end: 0.2,
  },
  {
    title: "COMPLETE IN ONE SETUP",
    subtitle:
      "5-axis milling and mill-turn finish complex geometry in a single clamping — fewer setups, truer position, shorter lead times.",
    start: 0.25,
    end: 0.45,
  },
  {
    title: "HELD TO 0.001 MM",
    subtitle:
      "Aerospace alloys, hardened steels and exotics — machined to tolerance across the full production run, not just the sample.",
    start: 0.5,
    end: 0.7,
  },
  {
    title: "MEASURED, THEN RELEASED",
    subtitle:
      "100% verified on calibrated CMMs, with documentation your quality team can audit. ISO 9001:2015 certified.",
    start: 0.75,
    end: 0.95,
  },
];

function BeatOverlay({
  beat,
  scrollYProgress,
}: {
  beat: Beat;
  scrollYProgress: MotionValue<number>;
}) {
  // Calculate 10% boundaries of range
  const range = beat.end - beat.start;
  const fadeInEnd = beat.start + range * 0.1;
  const fadeOutStart = beat.end - range * 0.1;

  // Map opacity and translation Y based on current scroll position
  const opacity = useTransform(
    scrollYProgress,
    [beat.start, fadeInEnd, fadeOutStart, beat.end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [beat.start, fadeInEnd, fadeOutStart, beat.end],
    [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 flex justify-center px-6"
    >
      {/* The copy sits over the brightest part of the footage. On desktop the
          vignette is enough; on a phone the frame fills far more of the screen,
          so the text needs its own scrim to stay legible. */}
      <div className="relative max-w-2xl text-center flex flex-col items-center space-y-3 md:space-y-4 py-5 md:py-8 px-5 md:px-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 -mx-2 rounded-2xl bg-[#050505]/45 md:bg-transparent"
        />
        <h3 className="relative text-[26px] md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05] md:leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
          {beat.title}
        </h3>
        <p className="relative text-[13px] md:text-base font-normal text-white/75 md:text-white/60 max-w-[19rem] md:max-w-lg leading-relaxed text-balance drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
          {beat.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function CncScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);

  // Set up useScroll tracking over the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Frame-quantized scrubbing, shared with the parts and quality tours. This
  // footage runs at 30fps where those run at 24. Smoothing and seek throttling
  // both live inside the hook — no spring here, since filtering the same signal
  // twice only compounds into lag.
  const isScrubReady = useVideoScrubber(videoRef, scrollYProgress, { fps: 30 });

  // Touch devices get the image sequence; video never loads there at all
  const isTouch = useTouchRenderer();

  // Eager — this is the first thing on screen — but still device-aware, so a
  // narrow window pulls 2.9 MB instead of 11 MB before the page becomes usable
  const src = useAdaptiveVideoSource(containerRef, SOURCES, { eager: true });

  // Fade out Scroll to Manufacture indicator by 10% scroll depth
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  // Quick-link cards fade in over the final beat of the sequence
  const quickLinksOpacity = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);
  const quickLinksY = useTransform(scrollYProgress, [0.8, 0.92], [40, 0]);
  const [quickLinksActive, setQuickLinksActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setQuickLinksActive(latest > 0.82);
  });

  // Loading readout: creep to 90% off readyState, then hand the last step to
  // the scrubber's own readiness so the veil never lifts before the video can
  // actually be scrubbed.
  useEffect(() => {
    // Still deciding which renderer to use — hold the veil for this tick only
    if (isTouch === undefined) return;

    // Image sequence: the opening still is a normal high-priority image, so
    // there is nothing to buffer and no reason to hold a loading screen.
    if (isTouch) {
      setLoadPercentage(100);
      const settle = setTimeout(() => setIsReady(true), 150);
      return () => clearTimeout(settle);
    }

    const video = videoRef.current;
    if (!video) return;

    if (isScrubReady) {
      setLoadPercentage(100);
      const settle = setTimeout(() => setIsReady(true), 300);
      return () => clearTimeout(settle);
    }

    const progressInterval = setInterval(() => {
      if (video.readyState >= 1) {
        setLoadPercentage((prev) => (prev >= 90 ? prev : prev + 10));
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isScrubReady, isTouch]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Loading overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="relative flex flex-col items-center space-y-6">
            {/* Spinning industrial loader */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-[#3f97dd] border-r-[#3f97dd] animate-spin" />
              <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-transparent border-b-neutral-700 border-l-neutral-700 animate-spin [animation-duration:1.5s]" />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-widest text-[#7cbcf0]/90">
                {loadPercentage}%
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="mono-font text-xs uppercase tracking-[0.3em] text-neutral-500">
                Mpinger Engineering
              </span>
              <h2 className="text-sm font-semibold tracking-widest text-white/90 uppercase">
                Precision CNC Manufacturing
              </h2>
            </div>

            {/* Horizontal progress bar */}
            <div className="w-64 h-[2px] bg-neutral-900 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0b4e86] to-[#3f97dd]"
                style={{ width: `${loadPercentage}%` }}
                layoutId="progress"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main sticky video showcase container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        {isTouch ? (
          <ScrollImageSequence
            progress={scrollYProgress}
            frames={FRAMES}
            alt="5-axis CNC machining sequence — simulation through finished component"
            // Frames are pre-cropped to 3:4, so cover fills a portrait screen
            // without letterboxing and without the extreme zoom a 16:9 source
            // would suffer here
            fit="cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={isTouch === false ? src : undefined}
            poster="/posters/hero.webp"
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            aria-hidden="true"
            className="w-full h-full object-contain pointer-events-none block max-w-full max-h-full"
            style={{ background: "#050505" }}
          />
        )}

        {/* Text Overlays - absolute scrollytelling beats */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-none">
          {BEATS.map((beat, index) => (
            <BeatOverlay
              key={index}
              beat={beat}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity, y: indicatorY }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-2 text-center pointer-events-none"
        >
          <span className="mono-font text-[9px] uppercase tracking-[0.5em] text-neutral-500">
            Scroll to Manufacture
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#3f97dd]/60 to-transparent animate-pulse" />
        </motion.div>

        {/* Quick-link cards — revealed on the final beat */}
        <motion.div
          style={{ opacity: quickLinksOpacity, y: quickLinksY }}
          className={`absolute inset-x-0 bottom-[8%] px-6 md:px-12 ${
            quickLinksActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {QUICK_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative h-24 md:h-28 rounded-lg overflow-hidden border border-white/15 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-[#3f97dd]/70 hover:bg-black/35"
              >
                {/* Dulled image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.image}
                  alt={link.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 transition-opacity duration-300 group-hover:opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Label */}
                <div className="relative h-full flex flex-col justify-end p-3.5 md:p-4">
                  <span className="mono-font text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#7cbcf0]">
                    {`0${index + 1} // ${link.sub}`}
                  </span>
                  <span className="mt-1 flex items-center justify-between text-white font-bold uppercase tracking-wide text-sm md:text-base">
                    {link.label}
                    <span className="text-[#7cbcf0] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Industrial overlay grid decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />
        
        {/* Holographic scanning horizontal line details */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3f97dd]/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
