"use client";

import { useRef, useEffect } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/** Tall enough that wheel ticks advance frames gradually, not skip the sequence */
const SCROLLY_HEIGHT_VH = 700;

/** Scale wheel delta while the hero is pinned so frames keep pace with scroll */
const WHEEL_DAMPING = 0.42;

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
      window.scrollBy({ top: e.deltaY * WHEEL_DAMPING, behavior: "auto" });
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
