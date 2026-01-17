"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { TiltCard } from "@/components/ui/tilt-card";

type SponsorItem = {
  name: string;
  logoSrc: string;
  invert?: boolean;
  size?: "normal" | "featured";
};

type SponsorCell = SponsorItem | null;

const COLS = 7;
const ROWS = 4;

// Patterned layout (intentional gaps):
// Top row: BRICS — Hackathon — GoBRICS
// Second row: Dion + RGIPT
// Then Russian partner universities
const sponsors: SponsorCell[] = [
  // Row 1
  null,
  { name: "BRICS Forum", logoSrc: "/brics.webp", size: "featured" },
  null,
  { name: "Hackathon", logoSrc: "/hackathon.png", size: "featured" },
  null,
  { name: "GoBRICS", logoSrc: "/gobrics.png", size: "featured" },
  null,

  // Row 2
  null,
  null,
  { name: "Dion", logoSrc: "/dion.svg" },
  null,
  { name: "RGIPT", logoSrc: "/rgipt.png", size: "featured" },
  null,
  null,

  // Row 3
  null,
  { name: "Almetyevsk State Technological University", logoSrc: "/almetyevs.svg" },
  null,
  { name: "Moscow Polytechnic University", logoSrc: "/mospolytech.svg" },
  null,
  { name: "Peter the Great St. Petersburg Polytechnic University", logoSrc: "/peter-the-great.png" },
  null,

  // Row 4
  null,
  null,
  null,
  { name: "Gazprom", logoSrc: "/Gazprom.png" },
  null,
  null,
  null,
];

export default function SponsorsGrid() {
  const mobileSponsors: SponsorItem[] = [
    { name: "Hackathon", logoSrc: "/hackathon.png", size: "featured" },
    { name: "BRICS Forum", logoSrc: "/brics.webp", size: "featured" },
    { name: "GoBRICS", logoSrc: "/gobrics.png", size: "featured" },
    { name: "RGIPT", logoSrc: "/rgipt.png", size: "featured" },
    { name: "Dion", logoSrc: "/dion.svg" },
    { name: "Almetyevsk State Technological University", logoSrc: "/almetyevs.svg" },
    { name: "Moscow Polytechnic University", logoSrc: "/mospolytech.svg" },
    { name: "Peter the Great St. Petersburg Polytechnic University", logoSrc: "/peter-the-great.png" },
    { name: "Gazprom", logoSrc: "/Gazprom.png" },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      {/* Mobile/tablet: compact grid (no empty gaps) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
        {mobileSponsors.map((sponsor) => (
          <SponsorTileMobile key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      {/* Desktop: keep the original patterned grid with intentional gaps */}
      <div className="hidden lg:grid grid-cols-7">
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
              <div
                className={
                  "relative " +
                  (sponsor.size === "featured"
                    ? "h-14 w-[190px] sm:h-18 sm:w-[240px]"
                    : "h-12 w-[140px] sm:h-14 sm:w-[170px]")
                }
              >
                <Image
                  src={sponsor.logoSrc}
                  alt={sponsor.name}
                  fill
                  sizes="(min-width: 1024px) 240px, 190px"
                  className={
                    "select-none object-contain " +
                    (sponsor.invert ? " invert" : "")
                  }
                  priority={false}
                />
              </div>
            </motion.div>
          </TiltCard>
        </div>
      ) : (
        <div className="h-full w-full rounded-[inherit]" />
      )}
    </div>
  );
}

function SponsorTileMobile({ sponsor }: { sponsor: SponsorItem }) {
  return (
    <div className="relative h-24 sm:h-28 w-full rounded-xl border border-dotted border-white/25 bg-white/[0.02]">
      <div className="flex h-full w-full items-center justify-center p-4">
        <div
          className={
            "relative w-full " +
            (sponsor.size === "featured" ? "h-12" : "h-10")
          }
        >
          <Image
            src={sponsor.logoSrc}
            alt={sponsor.name}
            fill
            sizes="(min-width: 640px) 220px, 160px"
            className={
              "select-none object-contain " +
              (sponsor.invert ? " invert" : "")
            }
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
