"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Shared machinery for scroll-scrubbed video tours (parts + quality
 * sections). Videos must be encoded all-intra (every frame a keyframe) for
 * frame-accurate seeking — see the re-encode notes in the repo history.
 */

/**
 * Throttled video scrubber — maps a normalized 0..1 time MotionValue onto
 * video.currentTime, never issuing a new seek while one is in flight.
 * Returns readiness (video fully buffered for scrubbing).
 */
export function useVideoScrubber(
  videoRef: RefObject<HTMLVideoElement>,
  time: MotionValue<number>
) {
  const durationRef = useRef(0);
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useMotionValueEvent(time, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;

    // Hold a hair before the last frame so the element never hits "ended"
    targetTimeRef.current = Math.min(latest, 0.999) * durationRef.current;

    if (!isSeekingRef.current) {
      video.currentTime = targetTimeRef.current;
      isSeekingRef.current = true;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      durationRef.current = video.duration;
      video.currentTime = 0;
    };

    const handleCanPlayThrough = () => setIsReady(true);

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // Scroll moved on while we were seeking — chase the new target
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        video.currentTime = targetTimeRef.current;
        isSeekingRef.current = true;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("seeked", handleSeeked);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("seeked", handleSeeked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isReady;
}

/**
 * Magnetic snap: once the visitor stops scrolling inside the section, glide
 * the page to the nearest anchor (global 0..1 progress positions of sharp
 * showcase frames) so the resting frame is never a motion-blurred pan.
 * Any real user input interrupts the glide; reduced-motion users are exempt.
 */
export function useMagneticSnap(
  containerRef: RefObject<HTMLElement>,
  anchors: number[]
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let snapControls: ReturnType<typeof animate> | null = null;
    let isSnapping = false;

    const cancelSnap = () => {
      if (snapControls) {
        snapControls.stop();
        snapControls = null;
      }
      isSnapping = false;
    };

    const snapToNearestAnchor = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -el.getBoundingClientRect().top;
      const p = scrolled / total;
      // Let visitors enter and leave the section freely at its edges
      if (p <= 0.01 || p >= 0.96) return;

      let nearest = anchors[0];
      for (const anchor of anchors) {
        if (Math.abs(anchor - p) < Math.abs(nearest - p)) nearest = anchor;
      }

      const delta = (nearest - p) * total;
      if (Math.abs(delta) < 4) return;

      const startY = window.scrollY;
      isSnapping = true;
      snapControls = animate(startY, startY + delta, {
        duration: Math.min(1.1, 0.45 + Math.abs(delta) / 2500),
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          isSnapping = false;
          snapControls = null;
        },
      });
    };

    const handleScroll = () => {
      if (isSnapping) return;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(snapToNearestAnchor, 220);
    };

    // Real user input interrupts an in-flight snap immediately
    const handleUserInput = () => cancelSnap();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInput, { passive: true });
    window.addEventListener("touchstart", handleUserInput, { passive: true });
    window.addEventListener("pointerdown", handleUserInput, { passive: true });
    window.addEventListener("keydown", handleUserInput);

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      cancelSnap();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInput);
      window.removeEventListener("touchstart", handleUserInput);
      window.removeEventListener("pointerdown", handleUserInput);
      window.removeEventListener("keydown", handleUserInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
