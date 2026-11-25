"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface TextBlockProps {
  children: React.ReactNode;
  align: "center" | "left" | "right";
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  enterAt: number;
  exitAt: number;
  parallaxStrength?: number;
}

function TextBlock({
  children,
  align,
  scrollYProgress,
  enterAt,
  exitAt,
  parallaxStrength = 60,
}: TextBlockProps) {
  // Final beat (exitAt >= 1): stay fully visible until sticky unpins — no fade-out.
  const opacity = useTransform(
    scrollYProgress,
    exitAt >= 1
      ? [enterAt - 0.07, enterAt, 1]
      : [enterAt - 0.07, enterAt, exitAt, Math.min(1, exitAt + 0.06)],
    exitAt >= 1 ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [enterAt - 0.1, exitAt + 0.1],
    [parallaxStrength, -parallaxStrength]
  );
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  const alignClass = {
    center: "justify-center items-center text-center",
    left: "justify-start items-center text-left pl-[6vw] md:pl-[8vw]",
    right: "justify-end items-center text-right pr-[6vw] md:pr-[8vw]",
  }[align];

  return (
    <motion.div
      style={{ opacity, y: smoothY }}
      className={`absolute inset-0 flex ${alignClass} pointer-events-none`}
    >
      <div className="max-w-2xl px-4">{children}</div>
    </motion.div>
  );
}

export default function Overlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Section 1 — Intro hero @ 0% */}
      <TextBlock
        align="center"
        scrollYProgress={scrollYProgress}
        enterAt={0.0}
        exitAt={0.17}
        parallaxStrength={40}
      >
        <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-3 font-medium font-body">
          Full Stack Developer
        </p>
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.92] tracking-tight text-text font-heading">
          Akshay
          <br />
          Thummala
        </h1>
        <div className="mt-5 h-px w-12 bg-accent mx-auto" />
        <p className="mt-4 text-[clamp(0.8rem,1.3vw,1rem)] text-muted max-w-sm mx-auto leading-relaxed font-body">
          Hyderabad, India
        </p>
      </TextBlock>

      {/* Section 2 — What I do */}
      <TextBlock
        align="left"
        scrollYProgress={scrollYProgress}
        enterAt={0.28}
        exitAt={0.52}
        parallaxStrength={50}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3 font-medium font-body">
          What I do
        </p>
        <h2 className="text-[clamp(2rem,5.5vw,4.8rem)] font-black leading-[1.0] tracking-tight text-text font-heading">
          I ship SaaS
          <br />
          <span className="text-accent">product suites.</span>
        </h2>
        <p className="mt-5 text-[clamp(0.85rem,1.4vw,1.05rem)] text-muted max-w-md leading-relaxed font-body">
          Multi-tenant HRMS, Payroll, WMS, CRM, and EdTech —
          from SSO and DocuSign to NetSuite and Shopify sync.
        </p>
      </TextBlock>

      {/* Final beat — freezes with last image; sticky then unpins and scrolls up */}
      <TextBlock
        align="right"
        scrollYProgress={scrollYProgress}
        enterAt={0.62}
        exitAt={1}
        parallaxStrength={40}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3 font-medium font-body">
          My stack
        </p>
        <h2 className="text-[clamp(2rem,5.5vw,4.8rem)] font-black leading-[1.0] tracking-tight text-text font-heading">
          Java · Python ·
          <br />
          <span className="text-accent">React · MERN.</span>
        </h2>
        <p className="mt-5 text-[clamp(0.85rem,1.4vw,1.05rem)] text-muted max-w-md leading-relaxed ml-auto font-body">
          Spring Boot, FastAPI, Node.js, Three.js, PostgreSQL, PHP & WordPress —
          plus cloud, Docker, and AI-powered reporting.
        </p>
      </TextBlock>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-body">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </div>
  );
}
