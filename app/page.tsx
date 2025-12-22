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
                  href="https://maps.google.com"
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2127798272896!2d77.20902931508053!3d28.613939382422902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e0f23%3A0x3eb5e8efae07ab68!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
                  Innovation Hub
                </h3>
                <div className="mt-5 text-white/70 leading-7 space-y-1">
                  <p>Technology Park, Sector 15</p>
                  <p>New Delhi, Delhi 110001</p>
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
                    href="https://maps.google.com"
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
