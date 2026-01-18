"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SummitHighlight() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 md:px-20">
      {/* Background elements (Code 2 style, but matches Code 1 mostly) */}
      <div className="pointer-events-none absolute -top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 left-[-140px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header Content - Strictly from Code 1 */}
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-500"
            >
              Global Context
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-3xl font-serif font-bold text-white md:text-5xl"
            >
              BRICS Summit Spotlight
            </motion.h2>
          </div>
        </div>

        {/* Image Section - Logic from Code 2 (Border) applied to Content from Code 1 */}
        <div className="group relative">
          {/* 1. The Animated Gradient Border (From Code 2) */}
          <motion.div
            className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-orange-500/50 via-white/20 to-blue-500/50 blur-[1px]"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 2. The Inner Card Container */}
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/50">
            <div className="relative aspect-[16/10] md:aspect-[2.35/1]">
              <Image
                src="/brics-banner.jpg"
                alt="BRICS Summit group photo"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-[center_22%] transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                priority={false}
              />
              {/* Overlay Gradient (Code 1) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Text Overlay Content (Strictly Code 1) */}
              <div className="absolute bottom-3 left-7 right-7 md:bottom-10 md:left-10 md:right-auto md:max-w-2xl">
                <h3 className="text-2xl font-serif text-white md:text-4xl">
                  XVI BRICS Summit
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}