"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function canUseFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: fine)")?.matches ?? false;
}

export default function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const settersRef = useRef<{
    dotX: (value: number) => void;
    dotY: (value: number) => void;
    ringX: (value: number) => void;
    ringY: (value: number) => void;
  } | null>(null);

  useEffect(() => {
    const ok = canUseFinePointer();
    setEnabled(ok);
  }, []);

  useEffect(() => {
    if (reducedMotion || !enabled) return;

    // Refs exist only on the client; initialize GSAP setters lazily.
    if (dotRef.current && ringRef.current) {
      settersRef.current = {
        dotX: (value: number) => gsap.set(dotRef.current, { x: value }),
        dotY: (value: number) => gsap.set(dotRef.current, { y: value }),
        ringX: gsap.quickTo(ringRef.current, "x", {
          duration: 0.25,
          ease: "power3.out",
        }),
        ringY: gsap.quickTo(ringRef.current, "y", {
          duration: 0.25,
          ease: "power3.out",
        }),
      };
    }

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      settersRef.current?.dotX(x);
      settersRef.current?.dotY(y);
      settersRef.current?.ringX(x);
      settersRef.current?.ringY(y);
    };

    const onDown = () => {
      gsap.to(ringRef.current, { scale: 0.75, duration: 0.15, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 0.75, duration: 0.15, ease: "power2.out" });
    };

    const onUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("has-custom-cursor");
      settersRef.current = null;
    };
  }, [reducedMotion, enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 backdrop-blur-md pointer-events-none mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none mix-blend-difference"
      />
    </>
  );
}
