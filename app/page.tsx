import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Manifesto from "@/components/Manifesto";
import Tracks from "@/components/Tracks";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white">
      <div className="noise-bg" />
      <Navbar />
      <Hero />
      <Manifesto />
      <Tracks />
      
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">Location</p>
              <h2 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">Venue & Access</h2>
              <p className="mt-4 text-white/60 text-lg md:text-xl max-w-2xl leading-8">
                Join us at the intersection of innovation. Here's where the magic happens.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Map */}
            <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden relative group hover:border-white/20 transition-all">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Navigate</p>
                  <p className="mt-1 text-white/80 text-sm font-medium">Hackathon Venue</p>
                </div>
                <a
                  className="text-xs uppercase tracking-[0.22em] text-white/70 hover:text-white transition flex items-center gap-2"
                  href="https://www.google.com/maps/place/Rajiv+Gandhi+Institute+of+Petroleum+Technology+(RGIPT)/@26.2649092,81.5071294,893m/data=!3m1!1e3!4m10!1m2!2m1!1srgipt!3m6!1s0x399ba1580bf13c33:0x32df0c8e914ab52e!8m2!3d26.2655958!4d81.5093391!15sCgVyZ2lwdJIBF2VkdWNhdGlvbmFsX2luc3RpdHV0aW9u4AEA!16s%2Fm%2F03d7rbq?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Open in Maps</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="relative aspect-[16/10] md:aspect-[16/9] bg-black/40">
                <iframe
                  title="Hackathon venue map"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2127798272896!2d81.5071294!3d26.2649092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ba1580bf13c33:0x32df0c8e914ab52e!2sRajiv+Gandhi+Institute+of+Petroleum+Technology+(RGIPT)!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                />
              </div>
            </div>

            {/* Address & Details */}
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
          </div>

          <p className="mt-8 text-xs text-white/35 leading-6 text-center">
            Update the map embed URL and address with your actual venue details before launch.
          </p>
        </div>
      </section>
    </main>
  );
}
