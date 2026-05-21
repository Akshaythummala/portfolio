"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  useScroll,
  useAnimationFrame,
} from "framer-motion";

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
  const lastDrawnRef = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    let img = imagesRef.current[clamped];
    // If this frame isn't ready yet, show the nearest earlier loaded frame
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
    lastDrawnRef.current = clamped;
  }, []);

  // Paint every animation frame from live scroll progress (no skipped indices)
  useAnimationFrame(() => {
    const progress = scrollYProgress.get();
    const idx = Math.round(progress * (TOTAL_FRAMES - 1));
    if (idx === lastDrawnRef.current) return;
    currentFrameRef.current = idx;
    drawFrame(idx);
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

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      if (i < 20) img.fetchPriority = "high";
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (i === 0 || i === currentFrameRef.current) {
          lastDrawnRef.current = -1;
          drawFrame(currentFrameRef.current);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => window.removeEventListener("resize", setSize);
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
