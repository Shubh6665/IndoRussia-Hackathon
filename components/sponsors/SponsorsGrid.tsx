"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { TiltCard } from "@/components/ui/tilt-card";

type Sponsor = {
  name: string;
  logoSrc: string;
  invert?: boolean;
} | null;

// NOTE: These are safe placeholder logos.
// Replace the files in /public/sponsors/ with your real sponsor logos (PNG/SVG),
// or update the `logoSrc` paths here.
const sponsors: Sponsor[] = [
  // Row 1
  { name: "Allianz", logoSrc: "/sponsors/logo-01.svg" },
  { name: "MSC", logoSrc: "/sponsors/logo-02.svg" },
  { name: "B", logoSrc: "/sponsors/logo-03.svg" },
  { name: "Doreca", logoSrc: "/sponsors/logo-04.svg" },
  { name: "Accademia", logoSrc: "/sponsors/logo-05.svg" },
  null, // Gap
  { name: "Aosta", logoSrc: "/sponsors/logo-09.svg" },
  { name: "Valle", logoSrc: "/sponsors/logo-10.svg" },
  { name: "Brondi", logoSrc: "/sponsors/logo-11.svg" },
  { name: "Valdier", logoSrc: "/sponsors/logo-12.svg" },
  { name: "Forever", logoSrc: "/sponsors/logo-01.svg" },

  // Row 2
  null, // Gap
  { name: "Manfrotto", logoSrc: "/sponsors/logo-06.svg" },
  null, // Gap
  { name: "Kemon", logoSrc: "/sponsors/logo-07.svg" },
  { name: "Marchesi", logoSrc: "/sponsors/logo-08.svg" },
  { name: "Corte", logoSrc: "/sponsors/logo-01.svg" }, // Logo in middle
  { name: "TISG", logoSrc: "/sponsors/logo-02.svg" },
  null, // Gap
  { name: "Forged", logoSrc: "/sponsors/logo-03.svg" },
  { name: "AVBN", logoSrc: "/sponsors/logo-04.svg" },
  { name: "JBL", logoSrc: "/sponsors/logo-05.svg" },

  // Row 3
  { name: "Intel", logoSrc: "/sponsors/logo-09.svg" },
  { name: "Charles Philip", logoSrc: "/sponsors/logo-10.svg" },
  { name: "Scarpa Mondo", logoSrc: "/sponsors/logo-11.svg" },
  { name: "BKFC", logoSrc: "/sponsors/logo-12.svg" },
  { name: "Shinto", logoSrc: "/sponsors/logo-01.svg" },
  null, // Gap
  { name: "Nespresso", logoSrc: "/sponsors/logo-06.svg" },
  { name: "Logitech", logoSrc: "/sponsors/logo-07.svg" },
  { name: "Philips", logoSrc: "/sponsors/logo-08.svg" },
  null, // Gap
  { name: "Mont Blanc", logoSrc: "/sponsors/logo-01.svg" },

  // Row 4
  { name: "GoPro", logoSrc: "/sponsors/logo-02.svg" },
  { name: "Pro", logoSrc: "/sponsors/logo-03.svg" },
  null, // Gap
  { name: "Yamamoto", logoSrc: "/sponsors/logo-04.svg" },
  { name: "Lexar", logoSrc: "/sponsors/logo-05.svg" },
  { name: "Pablo", logoSrc: "/sponsors/logo-09.svg" },
  { name: "Nabla", logoSrc: "/sponsors/logo-10.svg" },
  { name: "Asus", logoSrc: "/sponsors/logo-11.svg" },
  { name: "Profoto", logoSrc: "/sponsors/logo-12.svg" },
  { name: "Lavazza", logoSrc: "/sponsors/logo-01.svg" },
  { name: "C", logoSrc: "/sponsors/logo-02.svg" },

  // Row 5
  { name: "Pandora", logoSrc: "/sponsors/logo-06.svg" },
  null, // Gap
  { name: "Enerfin", logoSrc: "/sponsors/logo-07.svg" },
  { name: "Leiiia", logoSrc: "/sponsors/logo-08.svg" },
  null, // Gap
  { name: "Palazzo", logoSrc: "/sponsors/logo-02.svg" },
  null, // Gap
  { name: "Miele", logoSrc: "/sponsors/logo-03.svg" },
  { name: "Wacom", logoSrc: "/sponsors/logo-04.svg" },
  { name: "Punta", logoSrc: "/sponsors/logo-05.svg" },
  null, // Gap
];

export default function SponsorsGrid() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-11 border-t border-l border-white/20">
        {sponsors.map((sponsor, i) => (
          <SponsorTile key={i} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="relative border-b border-r border-white/20 border-dashed h-24 sm:h-32 w-full">
      {sponsor ? (
        <div style={{ perspective: 1000 }} className="h-full w-full">
          <TiltCard
            className="group relative h-full w-full bg-transparent transition-colors duration-300 hover:bg-white/5 hover:z-10"
          >
            <motion.div
              className="flex h-full w-full items-center justify-center p-4"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.name}
                width={140}
                height={64}
                className={
                  "h-8 sm:h-12 w-auto select-none object-contain " +
                  (sponsor.invert ? " invert" : "")
                }
                priority={false}
              />
            </motion.div>
          </TiltCard>
        </div>
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
