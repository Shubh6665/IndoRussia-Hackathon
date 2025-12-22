"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import AIDemo from "@/components/demos/AIDemo";
import BlockchainDemo from "@/components/demos/BlockchainDemo";
import SpaceDemo from "@/components/demos/SpaceDemo";
import SecurityDemo from "@/components/demos/SecurityDemo";

const tracks = [
  {
    id: "01",
    title: "Artificial Intelligence",
    desc: "Generative models & Neural Networks",
    color: "from-orange-500 to-red-500",
    component: <AIDemo />,
  },
  {
    id: "02",
    title: "Blockchain & FinTech",
    desc: "Decentralized systems for the new economy",
    color: "from-blue-500 to-cyan-500",
    component: <BlockchainDemo />,
  },
  {
    id: "03",
    title: "Space Technology",
    desc: "Satellite data & Interstellar comms",
    color: "from-purple-500 to-pink-500",
    component: <SpaceDemo />,
  },
  {
    id: "04",
    title: "Cyber Security",
    desc: "Defense in the digital age",
    color: "from-green-500 to-emerald-500",
    component: <SecurityDemo />,
  },
];

export default function Tracks() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-[#050505]">
      <div
        ref={sectionRef}
        className="h-screen w-[400vw] flex flex-row relative"
      >
        {tracks.map((track, index) => (
          <div
            key={index}
            className="w-screen h-full flex flex-col md:flex-row justify-center items-center relative border-r border-white/10 px-4 md:px-20 gap-12"
          >
            <div className="absolute top-24 left-12 text-9xl font-serif text-white/5 font-bold z-0">
              {track.id}
            </div>
            
            <div className="relative z-10 max-w-xl flex-shrink-0">
              <h3 className={`text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r ${track.color} bg-clip-text text-transparent`}>
                {track.title}
              </h3>
              <p className="text-xl md:text-2xl font-sans text-white/60">
                {track.desc}
              </p>
              <button className="mt-12 px-8 py-4 border border-white/20 rounded-full text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                Explore Track
              </button>
            </div>

            {/* Interactive Demo Column */}
            <div className="relative z-10 w-full max-w-2xl flex items-center justify-center">
               {track.component ? track.component : (
                 <div className="w-full h-64 md:h-96 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
                    <p className="text-white/30 uppercase tracking-widest">Interactive Demo Coming Soon</p>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
