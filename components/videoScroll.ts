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

type SourcePair = {
  /** Full-size encode, 1280x720. */
  desktop: string;
  /** 640x360 encode — a quarter of the decode cost and ~3.5x smaller. */
  mobile: string;
};

/**
 * Chooses a video encode for the device and withholds it until the section is
 * close enough to matter.
 *
 * Scrub-driven video has to be *fully buffered* to work, so every one of these
 * elements wants `preload="auto"` — which, applied to all four tours at once,
 * means a first-time visitor pays ~36 MB before the hero is interactive. The
 * fix is to leave `src` unset (an element with no source fetches nothing) and
 * only assign it as the section approaches the viewport.
 *
 * Returns `undefined` until loading should begin; assign it straight to `src`.
 */
export function useAdaptiveVideoSource(
  containerRef: RefObject<HTMLElement>,
  sources: SourcePair,
  /** Skip the viewport gate — for above-the-fold video that is needed at once. */
  { eager = false }: { eager?: boolean } = {}
): string | undefined {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Small viewport, an explicit data-saver request, or a slow radio all get
    // the light encode. `connection` is Chromium-only, hence the loose typing.
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const constrained =
      window.matchMedia("(max-width: 767px)").matches ||
      connection?.saveData === true ||
      /^(slow-)?2g$|^3g$/.test(connection?.effectiveType ?? "");

    const chosen = constrained ? sources.mobile : sources.desktop;

    if (eager) {
      setSrc(chosen);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers) — just load it.
    if (typeof IntersectionObserver === "undefined") {
      setSrc(chosen);
      return;
    }

    // Two viewport-heights of runway: enough for a full buffer at typical
    // scroll speeds, without competing with the hero for bandwidth on load.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(chosen);
          observer.disconnect();
        }
      },
      { rootMargin: "200% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eager, sources.desktop, sources.mobile]);

  return src;
}

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

    const markReady = () => setIsReady(true);
    const handleSeeked = () => {
      seeking = false;
    };

    /**
     * iOS Safari will not buffer a video it has never played — it treats
     * `preload="auto"` as roughly `metadata` to protect cellular data. Two
     * consequences, both of which used to break the site outright on iPhone:
     *
     *   1. `canplaythrough` never fires and `readyState` plateaus at 1-2, so
     *      any readiness gate waiting on those hangs forever.
     *   2. Assigning `currentTime` is silently ignored until the element has
     *      played at least once, so scrubbing does nothing.
     *
     * A muted inline play() is permitted without a user gesture; pausing on
     * the next tick leaves the element unlocked for seeking and is invisible
     * behind the loading veil.
     */
    const primeForSeeking = () => {
      try {
        const attempt = video.play();
        if (attempt && typeof attempt.then === "function") {
          attempt
            .then(() => {
              video.pause();
              markReady();
            })
            .catch(() => {
              // Autoplay refused (low-power mode, strict settings). The poster
              // still shows, so reveal rather than trap the visitor.
              markReady();
            });
        } else {
          video.pause();
          markReady();
        }
      } catch {
        markReady();
      }
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

    const handleLoadedData = () => {
      // readyState 2 (HAVE_CURRENT_DATA): the first frame is decoded and the
      // element is seekable. That is the real bar for scrubbing — waiting for
      // canplaythrough buys nothing and never resolves on iOS.
      primeForSeeking();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("seeked", handleSeeked);

    // The element may already be loaded (fast cache, remount) — the events
    // above would never fire again in that case
    if (video.readyState >= 1) handleLoadedMetadata();
    if (video.readyState >= 2) handleLoadedData();

    // Last-resort backstop. Whatever the browser does or fails to do, the
    // loading veil must never be able to trap a visitor: the poster frame is
    // already painted, so revealing early degrades gracefully.
    const watchdog = window.setTimeout(markReady, 8000);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(watchdog);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("seeked", handleSeeked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, smoothing]);

  return isReady;
}
