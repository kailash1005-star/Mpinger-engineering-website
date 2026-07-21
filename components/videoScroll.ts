"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { type MotionValue } from "framer-motion";

/**
 * Shared machinery for scroll-scrubbed video tours (parts + quality sections).
 *
 * The source videos are all-intra (verified: no `stss` box, 240 samples over
 * 10s at 24fps), so every frame is an independent seek target and scrubbing is
 * cheap. All smoothing therefore lives here, in one rAF loop — never stack a
 * `useSpring` on top of this or the two filters compound into visible lag.
 */

type ScrubOptions = {
  /** Source frame rate. Used to quantize seeks onto exact frame centers. */
  fps?: number;
  /**
   * Exponential follow time-constant, seconds. Lower = tighter tracking.
   * ~0.14 keeps the picture glued to the cursor while still absorbing the
   * coarse ~100px jumps a mouse wheel emits.
   */
  smoothing?: number;
};

/**
 * Frame-quantized video scrubber. Maps a normalized 0..1 MotionValue onto
 * video.currentTime from a single requestAnimationFrame loop.
 *
 * Three things make this smooth where a naive scrubber stutters:
 *   1. Seeks are quantized to frame centers, so a scroll delta that doesn't
 *      cross a frame boundary issues no seek at all — the decoder isn't asked
 *      to re-render a frame it's already showing.
 *   2. Smoothing is frame-rate independent (exp decay on real dt), so it feels
 *      identical on 60Hz and 144Hz displays.
 *   3. An in-flight seek is abandoned after a deadline. Browsers coalesce and
 *      occasionally drop `seeked`; without this the scrub freezes permanently.
 *
 * Returns readiness (video buffered enough to scrub).
 */
export function useVideoScrubber(
  videoRef: RefObject<HTMLVideoElement>,
  time: MotionValue<number>,
  { fps = 24, smoothing = 0.14 }: ScrubOptions = {}
) {
  const [isReady, setIsReady] = useState(false);
  // Keep the latest MotionValue reachable without re-running the rAF effect
  const timeRef = useRef(time);
  timeRef.current = time;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let frameCount = 0;
    let current = timeRef.current.get();
    let lastFrame = -1;
    let seeking = false;
    let seekIssuedAt = 0;
    let lastTick = performance.now();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleLoadedMetadata = () => {
      frameCount = Math.max(1, Math.round((video.duration || 0) * fps));
      current = timeRef.current.get();
      lastFrame = -1;
    };

    const handleReady = () => setIsReady(true);
    const handleSeeked = () => {
      seeking = false;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!frameCount) return;

      const dt = Math.min(0.1, (now - lastTick) / 1000);
      lastTick = now;

      const target = timeRef.current.get();
      current = reduceMotion
        ? target
        : current + (target - current) * (1 - Math.exp(-dt / smoothing));
      // Settle exactly, so a resting scroll can't leave a permanent epsilon
      if (Math.abs(target - current) < 1e-4) current = target;

      const frame = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(current * (frameCount - 1)))
      );
      if (frame === lastFrame) return;

      // Let one seek finish before issuing the next, but never wait forever
      if (seeking && now - seekIssuedAt < 200) return;

      lastFrame = frame;
      seeking = true;
      seekIssuedAt = now;
      // Aim at the middle of the frame's interval — landing on the boundary
      // is ambiguous and some decoders round the wrong way
      video.currentTime = (frame + 0.5) / fps;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", handleReady);
    video.addEventListener("seeked", handleSeeked);

    // The element may already be loaded (fast cache, remount) — the events
    // above would never fire again in that case
    if (video.readyState >= 1) handleLoadedMetadata();
    if (video.readyState >= 4) setIsReady(true);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleReady);
      video.removeEventListener("seeked", handleSeeked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, smoothing]);

  return isReady;
}
