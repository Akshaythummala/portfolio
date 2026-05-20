"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Languages",
    accent: "#22C55E",
    skills: ["Java 17+", "JavaScript ES6+", "SQL", "TypeScript"],
  },
  {
    category: "Backend",
    accent: "#38BDF8",
    skills: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "JPA / Hibernate",
      "RESTful APIs",
      "Microservices",
    ],
  },
  {
    category: "Frontend",
    accent: "#A78BFA",
    skills: ["React.js", "Redux", "HTML5", "CSS3", "Material UI", "Angular (Basics)"],
  },
  {
    category: "Databases",
    accent: "#FB923C",
    skills: ["MySQL", "PostgreSQL", "Oracle SQL", "Redis", "pgvector"],
  },
  {
    category: "DevOps & Cloud",
    accent: "#F472B6",
    skills: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "AWS EC2",
      "AWS ECS",
      "AWS ECR",
      "AWS RDS",
    ],
  },
  {
    category: "Messaging & Tools",
    accent: "#FBBF24",
    skills: [
      "Apache Kafka",
      "RabbitMQ",
      "Git",
      "Maven",
      "Postman",
      "JUnit",
      "Mockito",
      "IntelliJ IDEA",
      "JIRA",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="relative bg-[#0F172A] py-28 px-6">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,250,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-3 font-medium font-body">
            Technical expertise
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight text-text leading-[0.95] font-heading">
            Skills
          </h2>
          <div className="mt-6 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Skill groups grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: group.accent }}
              />

              <p
                className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-4 font-body pl-3"
                style={{ color: group.accent }}
              >
                {group.category}
              </p>

              <div className="flex flex-wrap gap-2 pl-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-muted font-medium hover:text-text hover:border-white/20 transition-colors duration-150 cursor-default font-body"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications / Achievements row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {[
            {
              label: "Employee of the Quarter",
              value: "×2 Award",
              sub: "Pragadas Technologies — outstanding ownership & full-stack delivery",
              accent: "#22C55E",
            },
            {
              label: "IBM SQL Certification",
              value: "Certified",
              sub: "Complex queries, joins, indexing, and normalization",
              accent: "#38BDF8",
            },
          ].map((a) => (
            <div
              key={a.label}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-black font-heading"
                style={{ background: `${a.accent}18`, color: a.accent }}
              >
                ★
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-semibold font-body mb-0.5"
                  style={{ color: a.accent }}
                >
                  {a.value}
                </p>
                <p className="text-sm font-semibold text-text font-heading">{a.label}</p>
                <p className="text-[11px] text-muted mt-1 leading-relaxed font-body">{a.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
