"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <motion.div
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        className="fixed inset-0 z-[100] bg-white pointer-events-none"
      />
      {children}
    </div>
  );
}
