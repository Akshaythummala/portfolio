"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/**
 * Tall enough for a smooth scrub to the final portrait, then sticky unpins
 * and the rest of the page scrolls up normally.
 * Uses dvh where supported so mobile browser chrome doesn't break the pin.
 */
const SCROLLY_HEIGHT = "min(580vh, 5200px)";

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: SCROLLY_HEIGHT }}
    >
      <div className="sticky top-0 z-0 h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#0a0f1e]">
        <ScrollyCanvas containerRef={containerRef} />
        <Overlay containerRef={containerRef} />
      </div>
    </div>
  );
}
