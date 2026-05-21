"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 110;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.066s.webp`;
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spread frames across most of the scroll range; hold last frame near the end
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.92, 1],
    [0, TOTAL_FRAMES - 1, TOTAL_FRAMES - 1]
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    // object-fit: cover logic
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

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.floor(
      Math.max(0, Math.min(TOTAL_FRAMES - 1, latest))
    );
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      scheduleFrame(idx);
    }
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

    // Eagerly preload all frames
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) drawFrame(0);
        if (loadedCount === TOTAL_FRAMES) {
          drawFrame(currentFrameRef.current);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      window.removeEventListener("resize", setSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
}
