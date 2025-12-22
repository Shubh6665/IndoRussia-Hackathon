"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1], // Custom ease for "immersive" feel
      }}
      className="min-h-screen bg-black"
    >
      {children}
    </motion.div>
  );
}
