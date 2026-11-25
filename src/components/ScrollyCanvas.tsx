"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const TOTAL_FRAMES = 110;
/** Last frame — My Stack portrait */
const END_FRAME = 78;
const PRELOAD_AHEAD = 24;
const PRELOAD_BEHIND = 4;
const PRELOAD_BATCH = 10;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.066s.webp`;
}

interface Props {
  container: HTMLDivElement;
}

export default function ScrollyCanvas({ container }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadingRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const target = useMemo(() => ({ current: container }), [container]);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  // Brief hold on final portrait, then unpin.
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.92, 1],
    [0, END_FRAME, END_FRAME]
  );

  const scheduleFrameRef = useRef<(index: number) => void>(() => {});

  const ensureFrameLoaded = useCallback((index: number) => {
    const i = Math.max(0, Math.min(END_FRAME, index));
    if (imagesRef.current[i]?.complete && (imagesRef.current[i]?.naturalWidth ?? 0) > 0) {
      return;
    }
    if (loadingRef.current.has(i)) return;

    loadingRef.current.add(i);
    const img = new Image();
    img.decoding = "async";
    img.src = getFrameUrl(i);
    img.onload = () => {
      loadingRef.current.delete(i);
      if (i === currentFrameRef.current) scheduleFrameRef.current(i);
    };
    img.onerror = () => {
      loadingRef.current.delete(i);
      imagesRef.current[i] = undefined;
    };
    imagesRef.current[i] = img;
  }, []);

  const preloadAround = useCallback(
    (center: number) => {
      const from = Math.max(0, center - PRELOAD_BEHIND);
      const to = Math.min(END_FRAME, center + PRELOAD_AHEAD);
      for (let i = from; i <= to; i++) ensureFrameLoaded(i);
    },
    [ensureFrameLoaded]
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(END_FRAME, index));

    let img = imagesRef.current[clamped];
    if (!img?.complete || img.naturalWidth === 0) {
      for (let i = clamped - 1; i >= 0; i--) {
        const prev = imagesRef.current[i];
        if (prev?.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
      }
    }
    if (!img?.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  }, []);

  const scheduleFrame = useCallback(
    (index: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(index));
    },
    [drawFrame]
  );

  scheduleFrameRef.current = scheduleFrame;

  const goToFrame = useCallback(
    (index: number) => {
      currentFrameRef.current = index;
      preloadAround(index);
      scheduleFrame(index);
    },
    [preloadAround, scheduleFrame]
  );

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(Math.max(0, Math.min(END_FRAME, latest)));
    if (idx === currentFrameRef.current) return;
    goToFrame(idx);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      drawFrame(currentFrameRef.current);
    };

    setSize();
    window.addEventListener("resize", setSize);

    imagesRef.current = new Array(TOTAL_FRAMES);

    // Priority: load the final portrait first (what prod was missing), then the start
    for (let i = Math.max(0, END_FRAME - 12); i <= END_FRAME; i++) {
      ensureFrameLoaded(i);
    }
    preloadAround(0);
    scheduleFrame(0);

    let next = 0;
    let cancelled = false;
    const loadBatch = () => {
      if (cancelled || next > END_FRAME) return;
      const end = Math.min(END_FRAME, next + PRELOAD_BATCH - 1);
      for (let i = next; i <= end; i++) ensureFrameLoaded(i);
      next = end + 1;
      if (next <= END_FRAME) {
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadBatch, { timeout: 300 });
        } else {
          setTimeout(loadBatch, 12);
        }
      }
    };
    loadBatch();

    const sync = () => {
      const idx = Math.round(
        Math.max(0, Math.min(END_FRAME, frameIndex.get()))
      );
      goToFrame(idx);
    };
    sync();
    const t1 = window.setTimeout(sync, 50);
    const t2 = window.setTimeout(sync, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", setSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    drawFrame,
    preloadAround,
    ensureFrameLoaded,
    scheduleFrame,
    frameIndex,
    goToFrame,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full"
      aria-hidden
    />
  );
}
