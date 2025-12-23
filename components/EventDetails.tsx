"use client";

import { TiltCard } from "@/components/ui/tilt-card";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 px-6 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">About The Event</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70 leading-relaxed">
            <div>
              <p className="mb-4">
                <strong className="text-white">Nature of Event:</strong> ENERGY-O-THON is a bilateral Indo-Russian energy hackathon.
              </p>
              <p className="mb-4">
                <strong className="text-white">Initiator & Organizer:</strong> The event is organized by the GO-BRICS Business Forum, which unites universities across BRICS nations.
              </p>
              <p className="mb-4">
                <strong className="text-white">Visionary Leadership:</strong> Initiated by Ms. Purnima Anand, President of the BRICS International Forum and GO-BRICS Business Forum.
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong className="text-white">Global Ambition:</strong> This is the world’s first BRICS nations hackathon, with plans to scale to a global magnitude of 50,000 participants.
              </p>
              <p className="mb-4">
                <strong className="text-white">Indian Coordinator:</strong> The Rajiv Gandhi Institute of Petroleum Technology (RGIPT) serves as the key coordinator from the Indian side.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <TiltCard className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Phase 1: Pilot</h3>
            <p className="text-white/60 mb-4">A collaborative session between Indian and Russian Universities.</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li><strong className="text-white/80">Indian:</strong> Dept of CSE, RGIPT</li>
              <li><strong className="text-white/80">Russian:</strong> Higher School of Petroleum (Almetyevsk), Moscow Polytechnic University, Peter the Great St. Petersburg Polytechnic University, Gazprom-Polytech University</li>
            </ul>
          </TiltCard>

          <TiltCard className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Phase 2: Full-Scale</h3>
            <p className="text-white/60 mb-4">March 2026</p>
            <p className="text-white/50 text-sm">
              A major event between Russia and India involving approximately 7,000 participants.
              Pathway to the Phase 2 Pan-India Round.
            </p>
          </TiltCard>

          <TiltCard className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Participation</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li><strong className="text-white/80">Team:</strong> 3–5 students. Interdisciplinary & mixed Indo-Russian teams encouraged.</li>
              <li><strong className="text-white/80">Eligibility:</strong> UG/PG students from Engineering, Technology, Energy, AI, and Management.</li>
              <li><strong className="text-white/80">Theme:</strong> Digital Advancements in the Energy Sector.</li>
            </ul>
          </TiltCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Solution Requirements</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                <p className="text-white/70"><strong className="text-white">Feasibility:</strong> Only conceptual and realistic solutions will be accepted.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <p className="text-white/70"><strong className="text-white">Technology:</strong> Solutions must utilize Low Code or No Code platforms.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <p className="text-white/70"><strong className="text-white">Practicality:</strong> Proposals must be financially and practically viable within the scope of the assigned task.</p>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/40 uppercase tracking-wider">* Overly vague or impractical ideas will be penalized.</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Evaluation Criteria</h3>
            <div className="space-y-4">
              {[
                { label: "Problem Clarity", value: "30%" },
                { label: "Solution Logic", value: "25%" },
                { label: "Practical Relevance", value: "25%" },
                { label: "Innovation", value: "20%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{item.label}</span>
                    <span className="text-white font-mono">{item.value}</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/80" 
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Submission Format</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>• <strong className="text-white">Pitch Deck:</strong> Maximum of 5 slides.</li>
                <li>• <strong className="text-white">Video Presentation:</strong> 5–10 minute recorded video uploaded to Dion/GO-BRICS platform.</li>
                <li>• <strong className="text-white">Live/Recorded Pitch:</strong> 3 minutes for pitch, 2 minutes for Q&A.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Global academic & industry exposure",
                  "Internships & placement prospects",
                  "Student exchange opportunities",
                  "Certificates & recognition"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
            <p className="text-white/60 mb-2">Contact Person</p>
            <p className="text-xl text-white font-serif">Dr. Akash Yadav | +91 8630179867</p>
            <p className="text-sm text-white/40 mt-2">Visit bricsforum for registration</p>
        </div>
      </div>
    </section>
  );
}
