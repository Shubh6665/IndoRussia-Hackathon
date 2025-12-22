"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Split text into words (simple version)
    const words = text.innerText.split(" ");
    text.innerHTML = words
      .map(
        (word) =>
          `<span class="word opacity-20 transition-opacity duration-300 inline-block mr-2">${word}</span>`
      )
      .join("");

    const wordElements = text.querySelectorAll(".word");

    gsap.to(wordElements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
      },
      opacity: 1,
      stagger: 0.1,
      color: "#ffffff",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center px-6 md:px-24 py-24"
    >
      <div className="max-w-6xl">
        <p
          ref={textRef}
          className="text-3xl md:text-6xl font-serif leading-[1.2] text-white/20"
        >
          We are building a bridge not of steel, but of silicon. The Indo-Russia
          Hackathon is a convergence of two great nations, uniting minds to solve
          global challenges through AI, Blockchain, and Space Technology. This is
          not just a competition; it is a declaration of the future.
        </p>
      </div>
    </section>
  );
}
