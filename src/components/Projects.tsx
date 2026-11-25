"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Pragva Business Suite",
    category: "MERN · SaaS Product Suite",
    description:
      "Suite of products under one Pragva account — HRMS, Payroll, CRM, Vocopal, WMS, Sales, NetSuite-Git, and Proposal Tool. Suite-wide SSO: purchase any product and sign in with the same Pragva credentials across every app you own.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "SSO", "JWT", "MinIO"],
    highlight: "Suite products · Shared SSO · One Pragva account across apps",
    accent: "#22C55E",
    link: "https://pragva.in/",
  },
  {
    id: "02",
    title: "Pragva HRMS",
    category: "Pragva Suite · Employee-Centric SaaS",
    description:
      "Multi-tenant HR platform anyone can stand up in under 10 minutes with a 45-day free trial and 4 roles. Standard HR: employees, leaves, WFH, timesheets, attendance, notices, holidays, reporting, org tree, expenses, assets, ticketing, and My Team. USP: games, leaderboards, wellness, and OpenAI-generated performance reports — built for high security.",
    tech: ["React.js", "Java", "Spring Boot", "PostgreSQL", "OpenAI", "JWT/RBAC"],
    highlight: "4 roles · <10 min setup · Games & wellness · AI performance reports",
    accent: "#38BDF8",
    link: "https://hrms.pragva.in/",
  },
  {
    id: "03",
    title: "Pragva Payroll",
    category: "Pragva Suite · Finance · FastAPI",
    description:
      "Payroll product under Pragva — available as an HRMS combo or standalone. Syncs with HRMS to pull employee data for faster importing, then generates payslips, HR letters, and other financial reports. Built with React.js, Python FastAPI, and PostgreSQL.",
    tech: ["React.js", "Python", "FastAPI", "PostgreSQL", "HRMS Sync"],
    highlight: "Standalone or HRMS combo · Emp sync import · Payslips & HR letters",
    accent: "#A78BFA",
    link: "https://payroll-management-frontend-production.up.railway.app/",
  },
  {
    id: "04",
    title: "Astro Greet",
    category: "Astrology · PHP · WhatsApp",
    description:
      "Astrology product for natal and KP chart generation with interactive Three.js chart visuals. Integrated WhatsApp API to send greetings, plus referral-based live consultations. Built with PHP, MariaDB, and Three.js.",
    tech: ["PHP", "MariaDB", "WhatsApp API", "Three.js"],
    highlight: "Natal & KP charts · Three.js visuals · WhatsApp greetings",
    accent: "#FB923C",
    link: "https://astrogreet.in/",
  },
  {
    id: "05",
    title: "Library Management System",
    category: "Client · MERN · EdTech Ops",
    description:
      "Client library platform on the MERN stack for end-to-end circulation. Manage books and categories, member registration, issue/return workflows, reservations, overdue fines, and search with filters. Role-based access for librarians and admins, plus dashboards for inventory, active loans, and member activity.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT/RBAC"],
    highlight: "Catalog · Issue/return · Fines · Reservations · Admin dashboards",
    accent: "#34D399",
    link: "https://github.com/Akshaythummala",
  },
  {
    id: "06",
    title: "Chess Club",
    category: "EdTech · CRM · CMS · Three.js",
    description:
      "Company webpage and platform with CRM for lead management and roles for admin, public visitor, coach, and student. Free demo classes, parental controls for minor students in the US, admin-driven CMS, and Three.js-powered interactive board visuals. Edutech for coaches: live classes, recorded sessions, and bulk emails with class meeting links.",
    tech: ["CRM", "CMS", "RBAC", "EdTech", "Three.js"],
    highlight: "4 roles · Three.js board · Parental controls · CMS",
    accent: "#F472B6",
    link: "https://www.minervaacme.com/",
  },
  {
    id: "07",
    title: "Skillsprint Platform",
    category: "EdTech · LMS · CRM · CMS",
    description:
      "Company website and platform for Skillsprint Technologies — software services, products, trainings, internships, and product building. Five roles: admin, public visitor, student, trainer, and business development. Includes LMS for learning, CRM for leads, and CMS so admins control landing and in-app content.",
    tech: ["LMS", "CRM", "CMS", "RBAC"],
    highlight: "5 roles · LMS · Trainings & internships · Services site",
    accent: "#FBBF24",
    link: "https://www.skillsprinttech.in/",
  },
  {
    id: "08",
    title: "Amrutha Varahi",
    category: "Client · WordPress · Business Site",
    description:
      "Business website for Amrutha Varahi — a client and partnered company. Built with PHP, WordPress, and MariaDB to present their brand and offerings online.",
    tech: ["PHP", "WordPress", "MariaDB"],
    highlight: "Client & partner site · WordPress CMS · Business presence",
    accent: "#FBBF24",
    link: "https://amruthavarahi.com/",
  },
  {
    id: "09",
    title: "Pragva Proposal Tool",
    category: "Pragva Suite · Sales · DocuSign",
    description:
      "Proposal workflow under Pragva with admin and customer roles. Admin manages products and company settings, builds customized proposals for inbound clients, and sends them out. Customers request revisions or approve, then sign with DocuSign and complete purchase or full payment to close legally.",
    tech: ["DocuSign", "RBAC", "Proposals", "Payments"],
    highlight: "Admin ↔ customer flow · Revisions · DocuSign · Purchase close",
    accent: "#2DD4BF",
    link: "https://github.com/Akshaythummala",
  },
  {
    id: "10",
    title: "JYSWMS",
    category: "Client · WMS · NetSuite · Shopify",
    description:
      "Client warehouse management system integrated with NetSuite — fetches and pushes data bidirectionally. Web app covers full WMS operations; mobile app for pickers on the floor. Shopify tied in for managing operations end to end. Stack: Python FastAPI, React.js, PostgreSQL.",
    tech: ["Python", "FastAPI", "React.js", "PostgreSQL", "NetSuite", "Shopify"],
    highlight: "NetSuite sync · Picker mobile app · Shopify ops · Full WMS",
    accent: "#818CF8",
    link: "https://jyswms.com/",
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
  const host = (() => {
    try {
      return new URL(project.link).hostname.replace(/^www\./, "");
    } catch {
      return project.link;
    }
  })();
  const isGithub = host.includes("github.com");

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
        <span className="text-[10px] text-white/20 font-mono truncate max-w-[60%]">{host}</span>
        <div
          className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-body"
          style={{ color: project.accent }}
        >
          {isGithub ? "View on GitHub" : "Visit live site"}
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
            SaaS · EdTech · Client platforms
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
