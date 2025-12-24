"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TiltCard } from "@/components/ui/tilt-card";

gsap.registerPlugin(ScrollTrigger);

const bioText = "As President of the BRICS International Forum, I lead initiatives that bridge policy, academia, and grassroots development across emerging economies. With 35+ years in international diplomacy, public policy, and social innovation, I have worked to advance South-South cooperation, promote multilateral dialogue, and develop sustainable solutions to global challenges. My professional journey began with the Indo-Russian Youth Club in 1989, and has since spanned collaborations with the World Bank, Goldman Sachs Women Entrepreneur Initiative, and numerous government and UN-backed programs. Recognized by President Vladimir Putin for my contributions to youth and moral development, I continue to focus on building educational, environmental, and economic partnerships among BRICS and Global South nations.";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = textContainerRef.current?.querySelectorAll(".word");
    
    if (words && words.length > 0) {
      gsap.to(words, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
        opacity: 1,
        stagger: 0.02,
        color: "#ffffff",
      });
    }

    // Mouse hover effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="group relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center px-6 md:px-20 py-24 overflow-hidden"
    >
      {/* Spotlight effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="order-2 lg:order-1">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-orange-500 mb-4 font-bold">Visionary Leadership</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3">
              Ms. Purnima Anand
            </h2>
            <p className="text-white/80 text-base md:text-lg font-light italic border-l-2 border-orange-500/50 pl-4 py-1">
              President, BRICS International Forum | Global Strategic Policy Advocate <br/>
              Former World Bank Consultant | Champion of South-South Cooperation
            </p>
          </div>

          <div ref={textContainerRef} className="text-base md:text-lg leading-relaxed text-white/20 font-serif">
            {bioText.split(" ").map((word, i) => (
              <span 
                key={i} 
                className="word inline-block mr-1.5 transition-colors duration-300"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Image & Flags */}
        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
          <div className="relative group">
            {/* Animated Border Flow */}
            <div className="absolute -inset-1 rounded-full md:rounded-[2rem] bg-gradient-to-r from-orange-500 via-white to-blue-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
            
            <TiltCard className="relative p-1 rounded-full md:rounded-[2rem] bg-black overflow-hidden">
              <div className="relative w-[200px] h-[200px] md:w-[380px] md:h-[480px] rounded-full md:rounded-[1.8rem] overflow-hidden bg-black/50 transition-all duration-700 ease-in-out">
                <Image
                  src="/Purnima.png"
                  alt="Ms. Purnima Anand"
                  fill
                  className="object-cover object-top"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                
                {/* Name on Image (Desktop only) */}
                <div className="hidden md:block absolute bottom-6 left-6 right-6">
                  <div className="h-px w-12 bg-orange-500 mb-4" />
                  <p className="text-white/90 text-xs uppercase tracking-widest font-bold">BRICS International Forum</p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* BRICS Flags */}
          <div className="mt-8 flex items-center gap-4 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs uppercase tracking-widest text-white/40 mr-2 font-bold">Member Nations</span>
            <div className="flex gap-3 text-2xl cursor-default">
              <span title="Brazil">🇧🇷</span>
              <span title="Russia">🇷🇺</span>
              <span title="India">🇮🇳</span>
              <span title="China">🇨🇳</span>
              <span title="South Africa">🇿🇦</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
