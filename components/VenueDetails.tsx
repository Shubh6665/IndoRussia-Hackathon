import React from "react";

export default function VenueDetails() {
  return (
    <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 relative overflow-hidden group hover:border-white/20 transition-all">
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-white/[0.08] to-purple-500/[0.06] blur-3xl group-hover:blur-2xl transition-all" />
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-white/[0.05] to-blue-500/[0.05] blur-3xl" />

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.22em] text-white/50">Address</p>
        <h3 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
          Rajiv Gandhi Institute of Petroleum Technology
        </h3>
        <div className="mt-5 text-white/70 leading-7 space-y-1">
          <p>Amethi, Uttar Pradesh 229416</p>
          <p>India</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Check-in</p>
            <p className="mt-2 text-white/85 text-sm font-medium">09:00 AM</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Event Start</p>
            <p className="mt-2 text-white/85 text-sm font-medium">10:00 AM</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            className="flex-1 px-6 py-3 border border-white/20 rounded-full text-white text-center text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            href="https://www.google.com/maps/place/Rajiv+Gandhi+Institute+of+Petroleum+Technology+(RGIPT)/@26.2649092,81.5071294,893m/data=!3m1!1e3!4m10!1m2!2m1!1srgipt!3m6!1s0x399ba1580bf13c33:0x32df0c8e914ab52e!8m2!3d26.2655958!4d81.5093391!15sCgVyZ2lwdJIBF2VkdWNhdGlvbmFsX2luc3RpdHV0aW9u4AEA!16s%2Fm%2F03d7rbq?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
          <button
            className="flex-1 px-6 py-3 border border-white/10 rounded-full text-white/80 text-center text-sm uppercase tracking-widest hover:text-white hover:border-white/20 transition"
          >
            Save Date
          </button>
        </div>

        <p className="mt-6 text-xs text-white/40 leading-relaxed">
          Free parking available · Public transport accessible · Refreshments provided
        </p>
      </div>
    </div>
  );
}
