"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const opacity = useTransform(
    scrollYProgress,
    exitAt >= 1
      ? [enterAt - 0.06, enterAt, 1]
      : [enterAt - 0.06, enterAt, exitAt, Math.min(1, exitAt + 0.05)],
    exitAt >= 1 ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [enterAt - 0.08, Math.min(1, exitAt + 0.08)],
    [parallaxStrength, -parallaxStrength]
  );

  const alignClass = {
    center: "justify-center items-center text-center",
    left: "justify-start items-center text-left pl-[6vw] md:pl-[8vw]",
    right: "justify-end items-center text-right pr-[6vw] md:pr-[8vw]",
  }[align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex ${alignClass} pointer-events-none`}
    >
      <div className="max-w-2xl px-4">{children}</div>
    </motion.div>
  );
}

export default function Overlay({ container }: { container: HTMLDivElement }) {
  const target = useMemo(() => ({ current: container }), [container]);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <TextBlock
        align="center"
        scrollYProgress={scrollYProgress}
        enterAt={0.0}
        exitAt={0.16}
        parallaxStrength={36}
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

      <TextBlock
        align="left"
        scrollYProgress={scrollYProgress}
        enterAt={0.22}
        exitAt={0.42}
        parallaxStrength={44}
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

      {/* Lands with final portrait; shorter hold before page scrolls up */}
      <TextBlock
        align="right"
        scrollYProgress={scrollYProgress}
        enterAt={0.82}
        exitAt={1}
        parallaxStrength={28}
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
