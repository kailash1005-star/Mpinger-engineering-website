"use client";

import { useEffect, useRef, useState } from "react";
import { type MotionValue } from "framer-motion";

/**
 * Canvas-rendered scroll sequence — the mobile replacement for scrubbed video.
 *
 * Scrub-video cannot be made reliable on phones. iOS will not buffer a video it
 * has never played, ignores `currentTime` until it has, refuses muted autoplay
 * outright in Low Power Mode, and caps how many elements may hold a decode
 * pipeline. Any one of those leaves a black rectangle, and none are detectable
 * up front.
 *
 * Drawing pre-decoded stills to a single canvas has none of those failure
 * modes, and unlike a stack of cross-faded <img> layers it:
 *   - blends two adjacent frames per paint, so 24 stills read as continuous
 *     motion rather than a slideshow;
 *   - keeps one compositor layer instead of 24, which matters on low-end
 *     Android where layer memory is the constraint;
 *   - reproduces `object-fit` exactly, so mobile framing matches the desktop
 *     video instead of hard-cropping a 16:9 shot into a portrait viewport.
 */
export default function ScrollImageSequence({
  progress,
  frames,
  alt,
  fit = "contain",
  smoothing = 0.12,
  onReady,
}: {
  progress: MotionValue<number>;
  /** Ordered stills, first to last. */
  frames: string[];
  alt: string;
  /** Must match the desktop video's object-fit so composition is identical. */
  fit?: "contain" | "cover";
  /** Exponential follow constant, seconds. Mirrors the video scrubber. */
  smoothing?: number;
  onReady?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = frames.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });

    let raf = 0;
    let current = progressRef.current.get();
    let lastKey = "";
    let lastTick = performance.now();
    let announced = false;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      // Cap DPR at 2: beyond that the extra fill rate costs more than it shows
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        lastKey = ""; // force a repaint at the new size
      }
    };

    /** Reproduces CSS object-fit, centred. */
    const paint = (img: HTMLImageElement, alpha: number) => {
      if (!img.complete || !img.naturalWidth) return false;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale =
        fit === "cover"
          ? Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
          : Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      ctx.globalAlpha = 1;
      return true;
    };

    /** Nearest decoded frame, so an undecoded index never paints nothing. */
    const nearestLoaded = (index: number) => {
      for (let d = 0; d < images.length; d++) {
        const before = images[index - d];
        if (before?.complete && before.naturalWidth) return before;
        const after = images[index + d];
        if (after?.complete && after.naturalWidth) return after;
      }
      return null;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      resize();

      const dt = Math.min(0.1, (now - lastTick) / 1000);
      lastTick = now;

      const target = progressRef.current.get();
      current = reduceMotion
        ? target
        : current + (target - current) * (1 - Math.exp(-dt / smoothing));
      if (Math.abs(target - current) < 1e-4) current = target;

      const clamped = Math.max(0, Math.min(1, current));
      const exact = clamped * (frames.length - 1);
      const base = Math.floor(exact);
      const next = Math.min(frames.length - 1, base + 1);
      const blend = exact - base;

      // Quantize the blend so tiny scroll jitter doesn't force a repaint
      const key = `${base}:${Math.round(blend * 12)}:${canvas.width}`;
      if (key === lastKey) return;
      lastKey = key;

      const primary = nearestLoaded(base);
      if (!primary) return;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      paint(primary, 1);
      // Blending the neighbour is what turns 24 stills into continuous motion
      if (blend > 0.01 && next !== base) {
        const upcoming = images[next];
        if (upcoming?.complete && upcoming.naturalWidth) paint(upcoming, blend);
      }

      if (!announced) {
        announced = true;
        setIsReady(true);
        readyRef.current?.();
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      images.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames, fit, smoothing]);

  return (
    <div className="absolute inset-0 bg-[#050505]">
      <canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        className="absolute inset-0 w-full h-full"
      />
      {/* Holds the frame until the first paint lands, so the section never
          flashes an empty canvas on a slow connection. */}
      {!isReady && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frames[0]}
          alt={alt}
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
      )}
    </div>
  );
}
