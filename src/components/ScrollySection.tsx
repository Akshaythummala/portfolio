"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/**
 * Scrub length only. Progress 1 === last frame + My Stack === sticky unpin,
 * so the next scroll moves text + images up with the page.
 */
const SCROLLY_HEIGHT_VH = 450;

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLLY_HEIGHT_VH}vh` }}
    >
      {/* One sticky viewport: canvas + text. Unpinning scrolls the images up too. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrollyCanvas containerRef={containerRef} />
        <Overlay containerRef={containerRef} />
      </div>
    </div>
  );
}
