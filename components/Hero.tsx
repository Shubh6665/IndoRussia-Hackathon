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

  const primaryPartners = [
    {
      name: "BRICS Forum",
      src: "/brics.webp",
      href: "https://www.bricsforum.in/",
    },
    {
      name: "Go BRICS",
      src: "/gobrics.png",
      href: "https://go-brics.org/eng",
    },
    {
      name: "RGIPT",
      src: "/rgipt.png",
      href: "https://www.rgipt.ac.in/",
    },
  ] as const;

  const russianUniversities = [
    { name: "Almetyevsk State Technological University", src: "/almetyevs.svg" },
    { name: "Moscow Polytechnic University", src: "/mospolytech.svg" },
    { name: "Peter the Great St. Petersburg Polytechnic University", src: "/peter-the-great.png" },
    { name: "Gazprom", src: "/Gazprom.png" },
  ] as const;

  const platformPartner = { name: "Dion", src: "/dion.svg" } as const;

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
      <div className="relative z-20 flex flex-col items-center mix-blend-overlay opacity-500">
        <h1 className="text-[17vw] md:text-[12vw] leading-[0.85] font-serif font-bold text-white tracking-tighter text-center uppercase">
          <div className="overflow-hidden">
            <span className="relative inline-block">
              <span aria-hidden className="HeroTitleOutline block">
                Energy
              </span>
              <span
                ref={textRef1}
                className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent"
              >
                Energy
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="relative inline-block">
              <span aria-hidden className="HeroTitleOutline block">
                O-Thon
              </span>
              <span
                ref={textRef2}
                className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              >
                O-Thon
              </span>
            </span>
          </div>
        </h1>
      </div>

      {/* Desktop: Russian Partner Universities - Horizontal Bar below title */}
      <div className="hidden md:block relative z-40 mt-8 w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-8 lg:px-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {russianUniversities.map((u) => (
              <div key={u.name} className="flex items-center justify-center shrink-0" aria-label={u.name}>
                <span className="relative h-6 w-20 md:h-7 md:w-24 lg:h-8 lg:w-28 xl:h-10 xl:w-32">
                  <Image src={u.src} alt={u.name} fill sizes="(min-width: 1280px) 128px, (min-width: 1024px) 112px, (min-width: 768px) 96px, 80px" className="object-contain" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Logos (keep previous style) */}
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

        {/* Mobile: Russia universities + platform (vertical, compact) */}
        <div className="mt-3 w-full max-w-[280px] mx-auto">
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-md px-4 py-3">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/50 text-center">Russia Partners</p>
            <div className="mt-2 flex flex-col gap-1.5">
              {russianUniversities.map((u) => (
                <div key={u.name} className="flex items-center justify-center rounded-lg bg-black/20 border border-white/8 py-2 px-3">
                  <span className="relative h-5 w-full max-w-[140px]">
                    <Image src={u.src} alt={u.name} fill sizes="140px" className="object-contain" />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-white/8 flex items-center justify-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">Platform</span>
              <div className="rounded-full bg-black/20 border border-white/8 px-3 py-1.5">
                <span className="relative block h-4 w-14">
                  <Image src={platformPartner.src} alt={platformPartner.name} fill sizes="56px" className="object-contain" />
                </span>
              </div>
            </div>
          </div>
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
        {primaryPartners.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-8 h-8 md:w-14 md:h-14 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label={p.name}
          >
            <Image src={p.src} alt={p.name} fill className="object-contain" />
          </Link>
        ))}
      </div>


      
      {/* Desktop: platform logo in bottom-right (replace scroll prompt) */}
      <div className="hidden md:flex absolute bottom-12 right-8 md:right-12 z-20 items-center gap-3">
        <p className="text-[10px] uppercase tracking-[0.26em] text-white/55">Platform</p>
        <div className="LogoPill !px-4 !py-2" aria-label={platformPartner.name}>
          <span className="relative h-7 w-24">
            <Image src={platformPartner.src} alt={platformPartner.name} fill sizes="96px" className="object-contain" />
          </span>
        </div>
      </div>

      <style jsx>{`
        .HeroTitleOutline {
          position: absolute;
          inset: 0;
          color: transparent;
          -webkit-text-stroke: 0.7px rgba(255, 255, 255, 0.26);
          text-shadow: 0 0 18px rgba(255, 255, 255, 0.08);
          pointer-events: none;
          transform: translateZ(0);
        }
        .LogoPill {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          border-radius: 9999px;
          padding: 10px 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .LogoPill:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .LogoTile {
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(0, 0, 0, 0.18);
          border-radius: 14px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
