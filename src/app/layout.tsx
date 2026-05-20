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
  title: "Akshay Thummala — Java Full Stack Developer",
  description:
    "Java Full Stack Developer with 2+ years of experience building scalable enterprise web applications using Java, Spring Boot, React.js, and cloud-native architecture.",
  keywords: [
    "Java Developer",
    "Full Stack Developer",
    "Spring Boot",
    "React.js",
    "Microservices",
    "AWS",
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
