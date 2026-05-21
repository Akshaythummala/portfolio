"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const TOTAL_FRAMES = 110;
const PRELOAD_AHEAD = 12;
const PRELOAD_BEHIND = 4;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.066s.webp`;
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadingRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  const scheduleFrameRef = useRef<(index: number) => void>(() => {});

  const ensureFrameLoaded = useCallback((index: number) => {
    const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    if (imagesRef.current[i] || loadingRef.current.has(i)) return;

    loadingRef.current.add(i);
    const img = new Image();
    img.decoding = "async";
    img.src = getFrameUrl(i);
    img.onload = () => {
      loadingRef.current.delete(i);
      if (i === currentFrameRef.current) scheduleFrameRef.current(i);
    };
    img.onerror = () => loadingRef.current.delete(i);
    imagesRef.current[i] = img;
  }, []);

  const preloadAround = useCallback(
    (center: number) => {
      const from = Math.max(0, center - PRELOAD_BEHIND);
      const to = Math.min(TOTAL_FRAMES - 1, center + PRELOAD_AHEAD);
      for (let i = from; i <= to; i++) ensureFrameLoaded(i);
    },
    [ensureFrameLoaded]
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));

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
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(index);
      });
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
    const idx = Math.round(
      Math.max(0, Math.min(TOTAL_FRAMES - 1, latest))
    );
    if (idx === currentFrameRef.current) return;
    goToFrame(idx);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    setSize();
    window.addEventListener("resize", setSize);

    imagesRef.current = new Array(TOTAL_FRAMES);
    preloadAround(0);
    scheduleFrame(0);

    // Load remaining frames when the browser is idle (avoids main-thread freeze)
    let next = PRELOAD_AHEAD + 1;
    const loadNextIdle = () => {
      if (next >= TOTAL_FRAMES) return;
      ensureFrameLoaded(next);
      next += 1;
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(loadNextIdle, { timeout: 2000 });
      } else {
        setTimeout(loadNextIdle, 50);
      }
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(loadNextIdle, { timeout: 2000 });
    } else {
      setTimeout(loadNextIdle, 200);
    }

    return () => {
      window.removeEventListener("resize", setSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, preloadAround, ensureFrameLoaded, scheduleFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
}
