"use client";

import { useState, useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

interface RGIPTViewerProps {
  src: string;
}

export default function RGIPTViewer({ src }: RGIPTViewerProps) {
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
    <section ref={containerRef} className="py-12 md:py-24 px-4 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-blue-500 font-bold">Host Institution</p>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6">
            Official Acceptance
          </h2>
          
          <p className="text-white/60 text-base md:text-lg lg:text-xl max-w-4xl leading-7 md:leading-8 mb-6 md:mb-8">
            India-Russia Digital Innovations Hackathon 2025-26 - Host Confirmation from Rajiv Gandhi Institute of Petroleum Technology
          </p>

          {/* Key Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 md:p-4">
              <p className="text-[9px] md:text-[10px] uppercase text-blue-400 mb-1 tracking-wider">Expected Participants</p>
              <p className="text-white text-xl md:text-2xl font-bold">500+</p>
              <p className="text-white/50 text-xs md:text-sm">Pan-India</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 md:p-4">
              <p className="text-[9px] md:text-[10px] uppercase text-green-400 mb-1 tracking-wider">Host Department</p>
              <p className="text-white text-sm font-semibold">CSE</p>
              <p className="text-white/50 text-xs">Computer Science & Eng.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 md:p-4">
              <p className="text-[9px] md:text-[10px] uppercase text-purple-400 mb-1 tracking-wider">Institution</p>
              <p className="text-white text-sm font-semibold">RGIPT</p>
              <p className="text-white/50 text-xs">Jais, Amethi, UP</p>
            </div>
          </div>
        </div>

        {/* PDF Container */}
        <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* PDF Header */}
          <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black/20 gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">Official Acceptance Letter</p>
              <p className="mt-1 text-white/80 text-xs md:text-sm font-medium line-clamp-2 sm:line-clamp-1">From: M. S Balathanigaimani, Dean (R&D), RGIPT</p>
            </div>
            
            <button
              onClick={handleExpandToggle}
              className="flex-shrink-0 text-xs uppercase tracking-[0.22em] text-blue-500 hover:text-blue-400 transition flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20"
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
            isExpanded ? 'h-[70vh] md:h-[800px] lg:h-[1000px]' : 'h-[50vh] md:h-[400px] lg:h-[500px]'
          }`}>
            <iframe
              src={`/${src}#view=FitH&toolbar=0&navpanes=0&scrollbar=1&page=1&zoom=page-fit`}
              title="RGIPT Acceptance Letter - India-Russia Digital Innovations Hackathon 2025-26"
              className="w-full h-full border-0"
              loading="lazy"
              allow="fullscreen"
              style={{
                backgroundColor: '#f8f9fa'
              }}
            />
          </div>

          {/* PDF Footer */}
          <div className="p-3 md:p-4 border-t border-white/10 bg-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-green-500" />
              <span className="text-white/50">Document loaded successfully</span>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <a
                href={`/${src}`}
                download="RGIPT_Acceptance_India_Russia_Hackathon.pdf"
                className="text-white/70 hover:text-white transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </a>
              
              <a
                href={`/${src}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="hidden sm:inline">Open in New Tab</span>
                <span className="sm:hidden">Open</span>
              </a>
            </div>
          </div>
        </TiltCard>

        {/* Additional Context */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
            <h3 className="text-white/90 font-semibold mb-3 text-sm md:text-base">Focus Areas</h3>
            <ul className="text-white/60 text-xs md:text-sm space-y-1.5 md:space-y-2">
              <li>• Digital Innovation</li>
              <li>• Energy Technology</li>
              <li>• Youth Skill Development</li>
              <li>• Student Exchanges</li>
              <li>• Industry-linked Internships</li>
            </ul>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
            <h3 className="text-white/90 font-semibold mb-3 text-sm md:text-base">Institution Leadership</h3>
            <div className="text-white/60 text-xs md:text-sm">
              <p className="mb-2"><strong className="text-white/80">Dean (R&D):</strong> M. S Balathanigaimani</p>
              <p className="leading-relaxed"><strong className="text-white/80">Institution:</strong> Rajiv Gandhi Institute of Petroleum Technology</p>
              <p className="mt-1 text-white/50">Jais, Amethi, Uttar Pradesh, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}