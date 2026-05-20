"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Multi-Tenant HRMS",
    category: "Full-Stack SaaS · HR Platform",
    description:
      "Enterprise HR management platform with secure tenant isolation, payroll automation, attendance & leave tracking, and real-time responsive dashboards for Admin, HR Manager, and Employee roles.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL", "JWT/RBAC", "Docker", "AWS EC2", "Jenkins"],
    highlight: "3-tier RBAC · Discriminator-based tenant isolation · Jenkins CI/CD",
    accent: "#22C55E",
    link: "https://github.com/Akshaythummala",
  },
  {
    id: "02",
    title: "AI Document Intelligence",
    category: "AI · RAG · Semantic Search",
    description:
      "Java-native RAG pipeline — no Python dependency. Spring AI handles chunking, embedding via OpenAI Embeddings API, and vector storage in pgvector. Semantic search retrieves top-k context before GPT response generation.",
    tech: ["Java", "Spring AI", "OpenAI API", "pgvector", "PostgreSQL", "Apache Kafka"],
    highlight: "Pure Java RAG · pgvector similarity search · Kafka event streaming",
    accent: "#38BDF8",
    link: "https://github.com/Akshaythummala",
  },
  {
    id: "03",
    title: "Cloud-Native E-Commerce",
    category: "Microservices · DevOps",
    description:
      "Distributed e-commerce platform with 6 independent Spring Boot microservices — Order, Inventory, Payment, User, Notification, Gateway — with Eureka discovery, Feign Client comms, and zero-downtime Kubernetes deployments.",
    tech: ["Spring Boot", "Kafka", "RabbitMQ", "Kubernetes", "Docker", "AWS ECR/ECS", "Jenkins"],
    highlight: "6 microservices · Eureka discovery · Auto-scaling ECS rolling deploy",
    accent: "#A78BFA",
    link: "https://github.com/Akshaythummala",
  },
  {
    id: "04",
    title: "WMS — Warehouse Mgmt",
    category: "Enterprise · Backend",
    description:
      "Warehouse management system with optimized SQL queries, JPA/Hibernate ORM, secure REST API endpoints, and role-based inventory module access. Delivered as part of Agile sprint cycles at Pragadas Technologies.",
    tech: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "MySQL", "React.js", "Docker"],
    highlight: "Optimized SQL queries · Spring Security RBAC · REST API",
    accent: "#FB923C",
    link: "https://github.com/Akshaythummala",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(380px circle at 50% 0%, ${project.accent}12, transparent 70%)`,
        }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}90, transparent)`,
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-semibold font-body"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>
        <span className="text-[11px] text-white/20 font-mono">{project.id}</span>
      </div>

      {/* Title */}
      <h3 className="text-[1.5rem] font-black tracking-tight text-text leading-tight mb-3 font-heading group-hover:text-white transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed mb-4 flex-1 font-body">
        {project.description}
      </p>

      {/* Highlight badge */}
      <p
        className="text-[10px] font-medium mb-5 font-body opacity-70 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: project.accent }}
      >
        {project.highlight}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-muted font-medium tracking-wide font-body"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <span className="text-[10px] text-white/20 font-mono">github.com/Akshaythummala</span>
        <div
          className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-body"
          style={{ color: project.accent }}
        >
          View on GitHub
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative bg-[#0F172A] py-28 px-6">
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
            Selected work
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight text-text leading-[0.95] font-heading">
              Projects
            </h2>
            <a
              href="https://github.com/Akshaythummala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase font-medium flex items-center gap-2 cursor-pointer font-body"
            >
              GitHub profile
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="mt-6 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
