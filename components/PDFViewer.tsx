"use client";

import { useState, useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

export default function PDFViewer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded) {
      // Scroll to PDF viewer when expanding
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-20 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-orange-500 font-bold">Official Document</p>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Expression of Interest
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl max-w-4xl leading-8 mb-8">
            Go-BRICS University Hackathons - Participation from Almetyevsk State Technological University "Higher School of Oil"
          </p>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-[10px] uppercase text-orange-400 mb-1 tracking-wider">Participants</p>
              <p className="text-white text-2xl font-bold">100</p>
              <p className="text-white/50 text-sm">Students</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-[10px] uppercase text-blue-400 mb-1 tracking-wider">Faculty</p>
              <p className="text-white text-2xl font-bold">20</p>
              <p className="text-white/50 text-sm">Scientific Supervisors</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-[10px] uppercase text-purple-400 mb-1 tracking-wider">Institution</p>
              <p className="text-white text-sm font-semibold">AGTU</p>
              <p className="text-white/50 text-xs">Higher School of Oil</p>
            </div>
          </div>
        </div>

        {/* PDF Container */}
        <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* PDF Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">Official Letter</p>
              <p className="mt-1 text-white/80 text-sm font-medium">To: Mr. Viktor Sergeevich Kokushkin, Vice President Go-BRICS Business Forum</p>
            </div>
            
            <button
              onClick={handleExpandToggle}
              className="text-xs uppercase tracking-[0.22em] text-orange-500 hover:text-orange-400 transition flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20"
            >
              <span>{isExpanded ? 'Minimize' : 'Expand'}</span>
              <svg 
                className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* PDF Embed */}
          <div className={`bg-white/5 transition-all duration-500 ease-in-out ${
            isExpanded ? 'h-[800px] md:h-[1000px]' : 'h-[400px] md:h-[500px]'
          }`}>
            <iframe
              src="/russia.pdf#view=FitH"
              title="Expression of Interest - Go-BRICS University Hackathons"
              className="w-full h-full border-0"
              loading="lazy"
              style={{
                backgroundColor: '#f8f9fa'
              }}
            />
          </div>

          {/* PDF Footer */}
          <div className="p-4 border-t border-white/10 bg-black/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-green-500" />
              <span className="text-white/50">Document loaded successfully</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/russia.pdf"
                download="Expression_of_Interest_Go_BRICS_Hackathon.pdf"
                className="text-white/70 hover:text-white transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </a>
              
              <a
                href="/russia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </TiltCard>

        {/* Additional Context */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h3 className="text-white/90 font-semibold mb-3">Specialization Areas</h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• Oil and Gas Engineering</li>
              <li>• Software Engineering</li>
              <li>• Mechatronics and Robotics</li>
              <li>• Energy Systems</li>
              <li>• Economics</li>
            </ul>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h3 className="text-white/90 font-semibold mb-3">University Leadership</h3>
            <div className="text-white/60 text-sm">
              <p className="mb-2"><strong className="text-white/80">Rector:</strong> A.A. Dyakonov</p>
              <p><strong className="text-white/80">Institution:</strong> Almetyevsk State Technological University "Higher School of Oil"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}