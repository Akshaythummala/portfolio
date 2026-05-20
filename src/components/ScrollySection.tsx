"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Canvas layer — renders the image sequence */}
      <ScrollyCanvas containerRef={containerRef} />
      {/* Overlay layer — parallax text on top */}
      <Overlay containerRef={containerRef} />
    </div>
  );
}
