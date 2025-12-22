"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { TiltCard } from "@/components/ui/tilt-card";

type SponsorItem = {
  name: string;
  logoSrc: string;
  invert?: boolean;
};

type SponsorCell = SponsorItem | null;

const COLS = 7;
const ROWS = 4;

// NOTE: These are safe placeholder logos.
// Replace the files in /public/sponsors/ with your real sponsor logos (PNG/SVG),
// or update the `logoSrc` paths here.
const sponsors: SponsorCell[] = [
  // 7 columns x 4 rows (28 cells). Only 12 sponsors; rest are intentional gaps.
  // Row 1
  { name: "Sponsor 01", logoSrc: "/sponsors/logo-01.svg" },
  { name: "Sponsor 02", logoSrc: "/sponsors/logo-02.svg" },
  { name: "Sponsor 03", logoSrc: "/sponsors/logo-03.svg" },
  { name: "Sponsor 04", logoSrc: "/sponsors/logo-04.svg" },
  { name: "Sponsor 05", logoSrc: "/sponsors/logo-05.svg" },
  null,
  { name: "Sponsor 06", logoSrc: "/sponsors/logo-06.svg" },

  // Row 2
  null,
  { name: "Sponsor 07", logoSrc: "/sponsors/logo-07.svg" },
  null,
  { name: "Sponsor 08", logoSrc: "/sponsors/logo-08.svg" },
  { name: "Sponsor 09", logoSrc: "/sponsors/logo-09.svg" },
  null,
  null,

  // Row 3
  { name: "Sponsor 10", logoSrc: "/sponsors/logo-10.svg" },
  null,
  null,
  { name: "Sponsor 11", logoSrc: "/sponsors/logo-11.svg" },
  null,
  null,
  null,

  // Row 4
  null,
  { name: "Sponsor 12", logoSrc: "/sponsors/logo-12.svg" },
  null,
  null,
  null,
  null,
  null,
];

export default function SponsorsGrid() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {sponsors.map((sponsor, i) => (
          <SponsorTile key={i} sponsor={sponsor} index={i} />
        ))}
      </div>
    </div>
  );
}

function SponsorTile({
  sponsor,
  index,
}: {
  sponsor: SponsorCell;
  index: number;
}) {
  const row = Math.floor(index / COLS);
  const col = index % COLS;

  const tileBorderClasses =
    "border border-dotted border-white/25 rounded-lg" +
    (row === 0 ? " lg:border-t-0" : "") +
    (row === ROWS - 1 ? " lg:border-b-0" : "") +
    (col === 0 ? " lg:border-l-0" : "") +
    (col === COLS - 1 ? " lg:border-r-0" : "");

  return (
    <div className={"relative h-24 sm:h-32 w-full " + tileBorderClasses}>
      {sponsor ? (
        <div style={{ perspective: 1000 }} className="h-full w-full">
          <TiltCard
            className="group relative h-full w-full bg-transparent transition-colors duration-300 hover:bg-white/5 hover:z-10 rounded-[inherit]"
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
        <div className="h-full w-full rounded-[inherit]" />
      )}
    </div>
  );
}
