"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white"
    >
      <div className="text-2xl font-serif font-bold tracking-tighter">
        IRH '25
      </div>
      <div className="hidden md:flex gap-8 font-sans text-sm uppercase tracking-widest">
        {["Manifesto", "Tracks", "Timeline", "Sponsors"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group overflow-hidden"
          >
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
              {item}
            </span>
            <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-gray-400">
              {item}
            </span>
          </a>
        ))}
      </div>
      <button className="border border-white/20 px-6 py-2 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
        Register
      </button>
    </nav>
  );
}
