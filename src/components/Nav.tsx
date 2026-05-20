"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  // Close menu on route change / scroll
  useEffect(() => {
    const unsub = scrollY.on("change", () => setMenuOpen(false));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50">
      {/* Blurred bg — fades in on scroll */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/[0.05]"
      />

      <nav className="relative flex items-center justify-between px-6 md:px-10 h-16 max-w-7xl mx-auto">
        {/* Logo mark */}
        <a
          href="/"
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Akshay Thummala — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <span className="text-[11px] font-black text-black tracking-tight font-heading">
              AT
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-text font-heading hidden sm:block">
            Akshay Thummala
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors duration-200 font-medium cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:akshaythummala1@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent hover:border-accent/60 hover:bg-accent/5 transition-all duration-200 font-medium cursor-pointer"
        >
          Hire me
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`}
          />
          <span
            className={`w-3 h-px bg-white/70 transition-all duration-200 ${menuOpen ? "opacity-0 w-0" : ""}`}
          />
          <span
            className={`w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-[#1E293B]/95 backdrop-blur-xl border-t border-white/[0.05] px-6 pb-6 pt-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-200 font-medium cursor-pointer border-b border-white/[0.04] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:akshaythummala1@gmail.com"
            className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-[11px] tracking-widest uppercase text-accent font-medium cursor-pointer"
          >
            Hire me
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
