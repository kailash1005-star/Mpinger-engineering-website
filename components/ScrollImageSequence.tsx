"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-driven image sequence — the mobile replacement for scrubbed video.
 *
 * Scrub-video cannot be made reliable on phones. iOS refuses to buffer a video
 * that has never played, ignores `currentTime` until it has, blocks muted
 * autoplay outright in Low Power Mode, and caps how many elements may hold a
 * decode pipeline at once. Any one of those leaves a black rectangle where the
 * footage should be, and none of them are detectable up front.
 *
 * Stacked stills cross-faded by scroll have none of those failure modes: they
 * are just images. The whole sequence is ~250 KB against 2.3 MB for the video,
 * every frame is cached by the CDN, and the only per-frame work is compositing
 * opacity — which runs off the main thread.
 */

function Frame({
  src,
  index,
  count,
  progress,
  alt,
  eager,
}: {
  src: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  alt: string;
  eager: boolean;
}) {
  const step = 1 / (count - 1);
  const center = index * step;

  // Each still owns a window either side of its centre and cross-fades with
  // its neighbours. First and last hold to the section edges so the sequence
  // never fades out to black at either end.
  const opacity = useTransform(
    progress,
    [
      index === 0 ? -1 : center - step,
      center,
      index === count - 1 ? 2 : center + step,
    ],
    [0, 1, 0]
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      // eslint-disable-next-line @next/next/no-img-element
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default function ScrollImageSequence({
  progress,
  frames,
  alt,
  eager = false,
}: {
  progress: MotionValue<number>;
  /** Ordered stills, first to last. */
  frames: string[];
  alt: string;
  /** Load the opening frame at high priority — for above-the-fold use. */
  eager?: boolean;
}) {
  // Slow push-in across the section. A single compositor transform, so it
  // costs nothing and keeps the sequence from reading as a slideshow.
  const scale = useTransform(progress, [0, 1], [1.08, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="absolute inset-0 overflow-hidden will-change-transform"
    >
      {frames.map((src, index) => (
        <Frame
          key={src}
          src={src}
          index={index}
          count={frames.length}
          progress={progress}
          // One descriptive alt for the sequence; the rest are decorative
          alt={index === 0 ? alt : ""}
          eager={eager && index === 0}
        />
      ))}
    </motion.div>
  );
}
