"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import Image from "next/image";

export default function Navbar() {
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);
  const [isHomeScrolled, setIsHomeScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1 }
    );
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);

    if (pathname !== "/") {
      setIsHomeScrolled(false);
      return;
    }

    const onScroll = () => {
      setIsHomeScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // No-op if we are already on the register page
    if (pathname === "/register") return;

    if (isTransitioning) return;

    setIsTransitioning(true);
    setIsMenuOpen(false);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const maxRadius = Math.max(
      Math.hypot(originX - 0, originY - 0),
      Math.hypot(originX - w, originY - 0),
      Math.hypot(originX - 0, originY - h),
      Math.hypot(originX - w, originY - h)
    );

    try {
      sessionStorage.setItem(
        "irh:routeTransitionOrigin",
        JSON.stringify({ x: originX, y: originY, r: maxRadius })
      );
    } catch {
      // ignore storage failures
    }

    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/register");
      },
    });

    // Fill button with white first
    tl.to(e.currentTarget, {
      backgroundColor: "white",
      color: "black",
      duration: 0.25,
      ease: "power2.inOut",
    });

    // Expand white circle from center
    tl.set(transitionRef.current, {
      clipPath: `circle(0px at ${originX}px ${originY}px)`,
    });
    tl.to(transitionRef.current, {
      clipPath: `circle(${Math.ceil(maxRadius)}px at ${originX}px ${originY}px)`,
      duration: 0.75,
      ease: "power3.inOut",
    }, "+=0.02");
  };

  return (
    <>
      <div
        ref={transitionRef}
        className="fixed inset-0 z-[999999] bg-white pointer-events-none"
        style={{ clipPath: "circle(0px at 50% 50%)" }}
      />
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-[10001] mix-blend-difference text-white"
      >
        {/* Left: Hamburger Menu (Mobile) / Navigation Links (Desktop) */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-start"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "w-5"
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"
              }`}
            />
          </button>

          {/* Desktop Navigation Links */}
          <div
            className={
              "hidden md:flex items-center gap-8 font-sans text-sm uppercase tracking-widest transition-all duration-300 " +
              (isHomeScrolled
                ? "px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
                : "px-0 py-0 bg-transparent border-transparent")
            }
          >
            {["Manifesto", "Details", "Tracks", "Sponsors"].map((item) => {
              const href = item === "Sponsors" ? "/sponsors" : `/#${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className="relative group overflow-hidden"
                >
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    {item}
                  </span>
                  <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-gray-400">
                    {item}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center: Logos */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-6 ${isMenuOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="relative w-10 h-10 md:w-12 md:h-12 opacity-90 hover:opacity-100 transition-opacity">
            <Image src="/brics.webp" alt="BRICS" fill className="object-contain" />
          </div>
          <div className="relative w-14 h-14 md:w-20 md:h-20 hover:scale-105 transition-transform">
            <Image src="/hackathon.png" alt="Hackathon" fill className="object-contain" />
          </div>
          <div className="relative w-10 h-10 md:w-12 md:h-12 opacity-90 hover:opacity-100 transition-opacity">
            <Image src="/rgipt.png" alt="RGIPT" fill className="object-contain" />
          </div>
        </div>

        {/* Right: Register Button (Desktop) */}
        <Link
          href="/register"
          onClick={handleRegisterClick}
          className="hidden md:inline-block shrink-0 border border-white/20 px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap"
        >
          Register
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] md:hidden flex flex-col pt-24 px-8"
          style={{
            animation: "fadeInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Menu Items */}
          <div className="flex flex-col gap-6 mb-12">
            {["Manifesto", "Details", "Tracks", "Sponsors"].map((item, idx) => {
              const href = item === "Sponsors" ? "/sponsors" : `/#${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg uppercase tracking-widest font-sans hover:text-white/60 transition-colors"
                  style={{
                    animation: `fadeInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s both`,
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Register Button in Menu */}
          <Link
            href="/register"
            onClick={handleRegisterClick}
            className="w-full border border-white/20 px-6 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 text-center"
            style={{
              animation: `fadeInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both`,
            }}
          >
            Register
          </Link>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
