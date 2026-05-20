import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#0F172A",
        surface: "#1E293B",
        surface2: "#334155",
        accent: "#22C55E",
        "accent-dim": "#16A34A",
        text: "#F8FAFC",
        muted: "#94A3B8",
        border: "rgba(248,250,252,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
