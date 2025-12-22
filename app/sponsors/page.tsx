import SponsorsGrid from "@/components/sponsors/SponsorsGrid";
import Navbar from "@/components/Navbar";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4">
            Our Partners
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Sponsors
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Powering the next generation of innovation. We are proud to be supported by these industry leaders.
          </p>
        </div>

        <SponsorsGrid />
        
        <div className="mt-20 text-center">
            <p className="text-sm text-white/30 mb-6">Interested in sponsoring?</p>
            <a 
                href="mailto:sponsor@hackathon.com"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
            >
                Become a Sponsor
            </a>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>
    </main>
  );
}
