"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface Beat {
  title: string;
  subtitle: string;
  start: number;
  end: number;
}

const BEATS: Beat[] = [
  {
    title: "DIGITAL TWIN",
    subtitle: "Engineering perfection begins in the virtual void. 0.001mm precision, simulated.",
    start: 0.0,
    end: 0.2,
  },
  {
    title: "KINEMATIC OPTIMIZATION",
    subtitle: "Mapping toolpaths and continuous stress-testing before the first cut is ever made.",
    start: 0.25,
    end: 0.45,
  },
  {
    title: "SUBTRACTIVE MASTERY",
    subtitle: "Materializing code into physical reality. Forging aerospace-grade alloy block by block.",
    start: 0.5,
    end: 0.7,
  },
  {
    title: "THE FINAL COMPONENT",
    subtitle: "Uncompromising tolerance. Validated, inspected, and ready for deployment.",
    start: 0.75,
    end: 0.95,
  },
];

export default function CncScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const videoDurationRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);

  // Set up useScroll tracking over the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress to prevent seeking stutter/jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Fade out Scroll to Manufacture indicator by 10% scroll depth
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  // Throttled seeking mechanism to ensure maximum smoothness
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !videoDurationRef.current) return;

    // Calculate targeted currentTime based on scroll position
    targetTimeRef.current = latest * videoDurationRef.current;

    // If the browser is not currently seeking, apply the new target time
    if (!isSeekingRef.current) {
      video.currentTime = targetTimeRef.current;
      isSeekingRef.current = true;
    }
  });

  // Setup seek event listeners and video preload handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Simple loading progress simulator based on video readystate
    const progressInterval = setInterval(() => {
      if (video.readyState >= 1) {
        setLoadPercentage((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }
    }, 100);

    const handleLoadedMetadata = () => {
      videoDurationRef.current = video.duration;
      // Seek to beginning
      video.currentTime = 0;
    };

    const handleCanPlayThrough = () => {
      setLoadPercentage(100);
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsReady(true);
      }, 300);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // If the target time has moved significantly while seeking was active, seek to the new target
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        video.currentTime = targetTimeRef.current;
        isSeekingRef.current = true;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("seeked", handleSeeked);

    // Trigger explicit preload load
    video.load();

    return () => {
      clearInterval(progressInterval);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Loading overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="relative flex flex-col items-center space-y-6">
            {/* Spinning industrial loader */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-transparent border-b-neutral-700 border-l-neutral-700 animate-spin [animation-duration:1.5s]" />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-widest text-amber-500/80">
                {loadPercentage}%
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="mono-font text-xs uppercase tracking-[0.3em] text-neutral-500">
                System Initializing
              </span>
              <h2 className="text-sm font-semibold tracking-widest text-white/90 uppercase">
                Apex CNC Simulation Twin
              </h2>
            </div>

            {/* Horizontal progress bar */}
            <div className="w-64 h-[2px] bg-neutral-900 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                style={{ width: `${loadPercentage}%` }}
                layoutId="progress"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main sticky video showcase container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        <video
          ref={videoRef}
          src="/video.mp4"
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-contain pointer-events-none block max-w-full max-h-full"
          style={{ background: "#050505" }}
        />

        {/* Text Overlays - absolute scrollytelling beats */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-none">
          {BEATS.map((beat, index) => {
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
                key={index}
                style={{ opacity, y }}
                className="absolute max-w-2xl text-center flex flex-col items-center space-y-4"
              >
                <div className="mono-font text-[10px] tracking-[0.4em] text-amber-500 uppercase font-semibold">
                  Beat 0{index + 1} // Phase {["virtual", "kinematic", "subtractive", "resolved"][index]}
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white/90 uppercase leading-none">
                  {beat.title}
                </h3>
                <p className="text-sm md:text-base font-normal text-white/60 max-w-lg leading-relaxed text-balance">
                  {beat.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity, y: indicatorY }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-2 text-center pointer-events-none"
        >
          <span className="mono-font text-[9px] uppercase tracking-[0.5em] text-neutral-500">
            Scroll to Manufacture
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/50 to-transparent animate-pulse" />
        </motion.div>

        {/* Industrial overlay grid decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />
        
        {/* Holographic scanning horizontal line details */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
