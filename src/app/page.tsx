import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Toolkit from "@/components/sections/Toolkit";
import Projects from "@/components/sections/Projects";
import SoftAura from "@/components/sections/SoftAura";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects } from "@/lib/data";

// Revalidate this page's data every 60s (ISR) so dashboard edits show up
export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Toolkit />
        <Projects projects={projects} />
        <SoftAura />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}