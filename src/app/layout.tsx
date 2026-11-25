import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshay Thummala — Full Stack Developer",
  description:
    "Full Stack Developer shipping SaaS product suites, HRMS, Payroll, WMS, and EdTech with Java Spring Boot, Python FastAPI, React, MERN, PostgreSQL, and cloud integrations.",
  keywords: [
    "Full Stack Developer",
    "Java",
    "Python",
    "Spring Boot",
    "FastAPI",
    "React.js",
    "Three.js",
    "MERN",
    "PostgreSQL",
    "SaaS",
    "Hyderabad",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#0F172A] text-[#F8FAFC] antialiased font-body">
        {children}
      </body>
    </html>
  );
}
