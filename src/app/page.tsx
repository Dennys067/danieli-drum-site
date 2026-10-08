import SceneBackground from "@/components/three/SceneBackground";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/hero";
import { About, PracticeAreas, Differentials } from "@/components/sections-a";
import { Process, FinalCta, Footer } from "@/components/sections-b";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <SceneBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <PracticeAreas />
        <Differentials />
        <Process />
        <FinalCta />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingWhatsApp />
    </>
  );
}
