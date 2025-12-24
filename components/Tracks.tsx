"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
import AIDemo from "@/components/demos/AIDemo";
import BlockchainDemo from "@/components/demos/BlockchainDemo";
import SpaceDemo from "@/components/demos/SpaceDemo";
import SecurityDemo from "@/components/demos/SecurityDemo";

const tracks = [
  {
    id: "01",
    title: "Artificial Intelligence",
    desc: "Generative models & Neural Networks",
    badge: "AI / ML",
    color: "from-orange-500 to-red-500",
    component: <AIDemo />,
  },
  {
    id: "02",
    title: "Blockchain & FinTech",
    desc: "Decentralized systems for the new economy",
    badge: "WEB3",
    color: "from-blue-500 to-cyan-500",
    component: <BlockchainDemo />,
  },
  {
    id: "03",
    title: "Space Technology",
    desc: "Satellite data & Interstellar comms",
    badge: "ORBIT",
    color: "from-purple-500 to-pink-500",
    component: <SpaceDemo />,
  },
  {
    id: "04",
    title: "Cyber Security",
    desc: "Defense in the digital age",
    badge: "SEC",
    color: "from-green-500 to-emerald-500",
    component: <SecurityDemo />,
  },
];
*/

export default function Tracks() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  /*
  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tween = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Re-measure right after mount so the pin start can't be based on a pre-font/pre-layout state.
      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);
  */

  return (
    <section id="tracks" ref={triggerRef} className="bg-[#050505] relative">
      {/* Problem Statement Coming Soon Section */}
      <div className="py-32 px-6 flex flex-col items-center justify-center min-h-[100vh] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Hackathon Tracks</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-8">
            Problem Statements
          </h2>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-lg md:text-xl font-sans text-white/60">
              Will be released soon
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stacked tracks - Commented Out
      <div className="md:hidden px-6 pt-28 pb-24">
        <div className="space-y-10">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                    Track {track.id}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60">
                    {track.badge}
                  </span>
                </div>

                <h3
                  className={`mt-4 text-4xl font-serif font-bold bg-gradient-to-r ${track.color} bg-clip-text text-transparent leading-[1.05]`}
                >
                  {track.title}
                </h3>

                <p className="mt-3 text-base font-sans text-white/60 leading-7">
                  {track.desc}
                </p>
              </div>

              <div className="p-5">
                {track.component ? (
                  <div className="w-full">
                    {track.component}
                  </div>
                ) : (
                  <div className="w-full h-64 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5">
                    <p className="text-white/30 uppercase tracking-widest">
                      Interactive Demo Coming Soon
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* Desktop: pinned horizontal scroll - Commented Out
      <div className="hidden md:block overflow-hidden">
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="w-screen h-full flex flex-col md:flex-row justify-center items-center relative border-r border-white/10 px-4 md:px-20 gap-12"
            >
              <div className="absolute top-24 left-12 text-9xl font-serif text-white/5 font-bold z-0">
                {track.id}
              </div>

              <div className="relative z-10 max-w-xl flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                    Track {track.id}
                  </span>
                  <span className="h-px w-10 bg-white/15" />
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60">
                    {track.badge}
                  </span>
                </div>

                <div className="relative mt-4">
                  <div className="pointer-events-none absolute -left-2 -top-8 text-[80px] md:text-[96px] font-serif font-bold text-white/[0.03] select-none">
                    {track.title.split(" ")[0]}
                  </div>
                  <h3
                    className={`relative text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r ${track.color} bg-clip-text text-transparent leading-[0.95]`}
                  >
                    {track.title}
                  </h3>
                </div>

                <p className="mt-6 text-lg md:text-xl font-sans text-white/55 leading-8">
                  {track.desc}
                </p>

                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/35">
                  Scroll to reveal · interact on the right
                </p>

                <button className="mt-12 px-8 py-4 border border-white/20 rounded-full text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                  Explore Track
                </button>
              </div>

              <div className="relative z-10 w-full max-w-2xl flex items-center justify-center">
                {track.component ? track.component : (
                  <div className="w-full h-64 md:h-96 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
                    <p className="text-white/30 uppercase tracking-widest">
                      Interactive Demo Coming Soon
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      */}
    </section>
  );
}
