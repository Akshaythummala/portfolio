"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/** Scroll distance for the full frame sequence (~5.5 screens) */
const SCROLLY_HEIGHT_VH = 800;

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLLY_HEIGHT_VH}vh` }}
    >
      <ScrollyCanvas containerRef={containerRef} />
      <Overlay containerRef={containerRef} />
    </div>
  );
}
