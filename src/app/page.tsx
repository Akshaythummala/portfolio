import Nav from "@/components/Nav";
import ScrollySection from "@/components/ScrollySection";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0F172A]">
      <Nav />
      <ScrollySection />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
