"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = useState<{ x: number; y: number; r: number } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("irh:routeTransitionOrigin");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { x?: number; y?: number; r?: number };
      if (
        typeof parsed?.x === "number" &&
        typeof parsed?.y === "number" &&
        typeof parsed?.r === "number"
      ) {
        setOrigin({ x: parsed.x, y: parsed.y, r: parsed.r });
      }
      sessionStorage.removeItem("irh:routeTransitionOrigin");
    } catch {
      // ignore
    }
  }, []);

  const clip = useMemo(() => {
    const x = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const y = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 0);
    const r = origin?.r ?? 2000;
    return {
      initial: `circle(${Math.ceil(r)}px at ${Math.round(x)}px ${Math.round(y)}px)`,
      animate: `circle(0px at ${Math.round(x)}px ${Math.round(y)}px)`,
    };
  }, [origin]);

  return (
    <div className="relative min-h-screen bg-background">
      <motion.div
        initial={{ clipPath: clip.initial }}
        animate={{ clipPath: clip.animate }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05,
        }}
        className="fixed inset-0 z-[100] bg-white pointer-events-none"
      />
      {children}
    </div>
  );
}
