"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  {
    company: "Pragadas Technologies",
    role: "Software Developer",
    period: "March 2025 – Present",
    location: "Hyderabad, India",
    type: "Full-time",
    accent: "#22C55E",
    stack: ["Java", "Spring Boot", "React.js", "MySQL", "Docker", "AWS"],
    bullets: [
      "Developed and maintained enterprise-grade HRMS and WMS applications in Agile sprint cycles.",
      "Designed and consumed RESTful APIs with JPA/Hibernate for employee, payroll, attendance, and inventory management modules with optimized SQL queries and RBAC.",
      "Reduced feature delivery turnaround by ~40% through structured code reviews, API payload debugging, and JUnit-tested module handoffs.",
      "Cut bug resolution time by ~50% via systematic root-cause analysis across REST endpoints.",
    ],
  },
  {
    company: "AI Variant",
    role: "Java Developer Intern",
    period: "April 2023 – January 2025",
    location: "Remote",
    type: "Internship",
    accent: "#38BDF8",
    stack: ["Java", "Spring Boot", "React.js", "Docker", "Kubernetes", "Jenkins", "Kafka"],
    bullets: [
      "Built and deployed a cloud-native distributed E-Commerce platform with 6 independent Spring Boot microservices (Order, Inventory, Payment, User, Notification, Gateway).",
      "Implemented Eureka service discovery, Feign Client inter-service communication, Kafka for order event streaming, and RabbitMQ for notifications.",
      "Engineered a full Jenkins CI/CD pipeline: build → test → Docker push to AWS ECR → Kubernetes rolling deployment on ECS with zero-downtime and auto-scaling.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" className="relative bg-[#0a0f1e] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-3 font-medium font-body">
            Professional history
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight text-text leading-[0.95] font-heading">
              Experience
            </h2>
            <span className="text-sm text-muted font-body">2+ years</span>
          </div>
          <div className="mt-6 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative md:pl-10"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-5 w-[23px] h-[23px] rounded-full border-2 items-center justify-center hidden md:flex"
                  style={{
                    borderColor: job.accent,
                    background: "#0a0f1e",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: job.accent }}
                  />
                </div>

                {/* Card */}
                <div className="group p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.035] transition-colors duration-300 overflow-hidden relative">
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${job.accent}90, transparent)`,
                    }}
                  />

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-black text-text font-heading">{job.company}</h3>
                        <span
                          className="text-[9px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase font-body"
                          style={{ background: `${job.accent}18`, color: job.accent }}
                        >
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold font-body" style={{ color: job.accent }}>
                        {job.role}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] text-muted font-mono">{job.period}</p>
                      <p className="text-[11px] text-muted/60 font-body mt-0.5">{job.location}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-muted leading-relaxed font-body">
                        <span
                          className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: job.accent }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.08] text-muted font-medium font-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold mb-0.5 font-body">
                Education
              </p>
              <p className="text-sm font-black text-text font-heading">
                B.Tech — Computer Science & Engineering
              </p>
              <p className="text-[12px] text-muted font-body">
                Jawaharlal Nehru Technological University, Hyderabad
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-muted font-mono">Aug 2019 – Jul 2023</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
