"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);
  const [isHomeScrolled, setIsHomeScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1 }
    );
  }, []);

  useEffect(() => {
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
        className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white"
      >
        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
          IRH '25
        </Link>
        <div
          className={
            "hidden md:flex items-center gap-8 font-sans text-sm uppercase tracking-widest transition-all duration-300 " +
            (isHomeScrolled
              ? "px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
              : "px-0 py-0 bg-transparent border-transparent")
          }
        >
          {["Manifesto", "Tracks", "Timeline", "Sponsors"].map((item) => {
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
        <Link
          href="/register"
          onClick={handleRegisterClick}
          className="border border-white/20 px-6 py-2 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
        >
          Register
        </Link>
      </nav>
    </>
  );
}
