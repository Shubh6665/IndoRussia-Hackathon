import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Manifesto from "@/components/Manifesto";
import Tracks from "@/components/Tracks";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white">
      <div className="noise-bg" />
      <Navbar />
      <Hero />
      <Manifesto />
      <Tracks />
      
      <section className="h-screen flex items-center justify-center border-t border-white/10">
        <h2 className="text-4xl font-serif">More Coming Soon...</h2>
      </section>
    </main>
  );
}

