"use client";

import { useRef, useEffect } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/** ~9 viewport-heights of scroll ≈ one frame every ~0.8vh — keeps transitions visible */
const SCROLLY_HEIGHT_VH = 900;

/** Scale wheel delta while the hero is pinned */
const WHEEL_DAMPING = 0.28;

/** Cap px moved per wheel tick so fast wheels / trackpads cannot skip frames */
const MAX_WHEEL_PX = 28;

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange <= 0) return;

      const inPinnedHero =
        rect.top <= 1 && rect.bottom > window.innerHeight + 1;
      if (!inPinnedHero) return;

      e.preventDefault();
      const damped =
        Math.sign(e.deltaY) *
        Math.min(Math.abs(e.deltaY) * WHEEL_DAMPING, MAX_WHEEL_PX);
      window.scrollBy({ top: damped, behavior: "auto" });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLLY_HEIGHT_VH}vh` }}
    >
      {/* Canvas layer — renders the image sequence */}
      <ScrollyCanvas containerRef={containerRef} />
      {/* Overlay layer — parallax text on top */}
      <Overlay containerRef={containerRef} />
    </div>
  );
}
