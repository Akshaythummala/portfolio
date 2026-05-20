"use client";

import { motion } from "framer-motion";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/akshay-thummala",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Akshaythummala",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:akshaythummala1@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0F172A] border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 md:p-14 mb-16 overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.07)_0%,_transparent_70%)] pointer-events-none" />

          <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-4 font-medium font-body">
            Open to opportunities
          </p>
          <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight text-text mb-3 leading-tight font-heading">
            Let&apos;s build something
            <br />
            <span className="text-accent">great together.</span>
          </h3>
          <p className="text-sm text-muted mb-8 max-w-md mx-auto leading-relaxed font-body">
            Java Full Stack Developer based in Hyderabad, available for full-time roles
            and freelance engagements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:akshaythummala1@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent text-black text-sm font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 cursor-pointer font-body"
            >
              Send me an email
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="tel:+919391945338"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 text-muted text-sm font-medium tracking-wide rounded-full hover:border-accent/40 hover:text-accent transition-all duration-300 cursor-pointer font-body"
            >
              +91 93919 45338
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-[10px] font-black text-black font-heading">AT</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text font-heading leading-tight">Akshay Thummala</p>
              <p className="text-[11px] text-muted font-body">Java Full Stack Developer · Hyderabad, India</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="text-[11px] text-white/20 font-body">
            © 2024 Akshay Thummala
          </p>
        </div>
      </div>
    </footer>
  );
}
