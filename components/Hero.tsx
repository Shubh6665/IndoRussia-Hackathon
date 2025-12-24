"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

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

      {/* Mobile Logos (crisp + readable) */}
      <div className="relative z-30 mt-6 md:hidden mix-blend-normal">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-lg">
          <Link
            href="/"
            aria-label="Hackathon Home"
            className="relative w-12 h-12 shrink-0"
          >
            <Image
              src="/hackathon.png"
              alt="Hackathon"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </Link>

          <div className="h-8 w-px bg-white/25" />

          <Link
            href="https://www.bricsforum.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BRICS Forum"
            className="relative w-9 h-9"
          >
            <Image
              src="/brics.webp"
              alt="BRICS"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </Link>

          <Link
            href="https://go-brics.org/eng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go BRICS"
            className="relative w-9 h-9"
          >
            <Image
              src="/gobrics.png"
              alt="GoBRICS"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </Link>

          <Link
            href="https://www.rgipt.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RGIPT"
            className="relative w-9 h-9"
          >
            <Image
              src="/rgipt.png"
              alt="RGIPT"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </Link>
        </div>
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

      {/* Logos - Right Side Vertical Stack (Desktop) */}
      <div className="hidden md:flex absolute z-30 flex-col items-center gap-6 right-8 top-1/2 -translate-y-1/2">
        {/* Hackathon Logo (Main) */}
        <Link
          href="/"
          className="relative w-12 h-12 md:w-24 md:h-24 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <Image
            src="/hackathon.png"
            alt="Hackathon"
            fill
            className="object-contain"
          />
        </Link>

        {/* Divider */}
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent my-1" />

        {/* Partner Logos */}
        <Link
          href="https://www.bricsforum.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-8 h-8 md:w-14 md:h-14 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
        >
          <Image src="/brics.webp" alt="BRICS" fill className="object-contain" />
        </Link>

        <Link
          href="https://go-brics.org/eng"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-8 h-8 md:w-14 md:h-14 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
        >
          <Image
            src="/gobrics.png"
            alt="GoBRICS"
            fill
            className="object-contain"
          />
        </Link>

        <Link
          href="https://www.rgipt.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-8 h-8 md:w-14 md:h-14 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
        >
          <Image src="/rgipt.png" alt="RGIPT" fill className="object-contain" />
        </Link>
      </div>
      
      <div className="absolute bottom-12 right-8 md:right-12 z-20">
         <div className="animate-bounce text-white/50 text-xs uppercase tracking-widest">
            Scroll to Explore
         </div>
      </div>
    </section>
  );
}
