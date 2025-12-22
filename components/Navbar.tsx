"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const navRef = useRef(null);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1 }
    );
  }, []);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/register");
      },
    });

    // Fill button with white first
    tl.to(e.currentTarget, {
      backgroundColor: "white",
      color: "black",
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Expand white circle from center
    tl.to(transitionRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.2,
      ease: "power4.inOut",
    });
  };

  return (
    <>
      <div
        ref={transitionRef}
        className="fixed inset-0 z-[999999] bg-white pointer-events-none"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white"
      >
        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
          IRH '25
        </Link>
        <div className="hidden md:flex gap-8 font-sans text-sm uppercase tracking-widest">
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
