"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const subTextRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Reveal
    tl.fromTo(
      [textRef1.current, textRef2.current],
      { y: 100, opacity: 0, skewY: 10 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      }
    )
      .fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=1"
      )
      .fromTo(
        videoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 2, ease: "power2.out" },
        "-=1.5"
      );

    // Scroll Parallax
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 200,
      scale: 1.1,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505]"
    >
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          ref={videoRef}
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Abstract Flag Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center mix-blend-overlay">
        <h1 className="text-[12vw] leading-[0.85] font-serif font-bold text-white tracking-tighter text-center uppercase">
          <div className="overflow-hidden">
            <span ref={textRef1} className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
              Energy
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={textRef2} className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              O-Thon
            </span>
          </div>
        </h1>
      </div>

      <div
        ref={subTextRef}
        className="absolute bottom-12 left-8 md:left-12 z-20 max-w-md"
      >
        <p className="text-white/80 font-sans text-sm md:text-base uppercase tracking-widest leading-relaxed border-l border-white/30 pl-4">
          Indo-Russian Bilateral Energy Hackathon <br />
          <span className="text-white font-bold">Hackathon 2025</span>
        </p>
      </div>
      
      <div className="absolute bottom-12 right-8 md:right-12 z-20">
         <div className="animate-bounce text-white/50 text-xs uppercase tracking-widest">
            Scroll to Explore
         </div>
      </div>
    </section>
  );
}
