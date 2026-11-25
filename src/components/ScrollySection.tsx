"use client";

import { useState } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/**
 * Plain vh height (no min() cap) so production always gets a long sticky track.
 * ~7.5 screens of scrub → final portrait holds → then section unpins and page scrolls up.
 */
const SCROLLY_HEIGHT_VH = 750;

export default function ScrollySection() {
  // Callback ref so useScroll always receives a mounted element (avoids null-target bugs)
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      className="relative w-full"
      style={{ height: `${SCROLLY_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#0a0f1e]">
        {container && (
          <>
            <ScrollyCanvas container={container} />
            <Overlay container={container} />
          </>
        )}
      </div>
    </div>
  );
}
