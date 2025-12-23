"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EventDetails() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="details" className="py-24 px-6 md:px-20 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.28em] text-orange-500 mb-4 font-bold"
          >
            Event Structure
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            The Blueprint
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            A bilateral initiative designed to foster innovation across borders.
          </motion.p>
        </div>

        {/* General Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <TiltCard className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Overview</p>
              <h3 className="mt-3 text-2xl font-serif font-bold text-white">Nature of Event</h3>
              <p className="mt-4 text-white/60 leading-relaxed">
                ENERGY-O-THON is a bilateral Indo-Russian energy hackathon, fostering cross-border innovation in the energy sector.
              </p>
            </div>
          </TiltCard>

          <TiltCard className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Scale</p>
              <h3 className="mt-3 text-2xl font-serif font-bold text-white">Global Ambition</h3>
              <p className="mt-4 text-white/60 leading-relaxed">
                The world’s first BRICS nations hackathon, with plans to scale to a global magnitude of 50,000 participants.
              </p>
            </div>
          </TiltCard>

          <TiltCard className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">People</p>
              <h3 className="mt-3 text-2xl font-serif font-bold text-white">Leadership</h3>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Initiator & Organizer</p>
                  <p className="mt-2 text-white/80 font-medium leading-relaxed">GO-BRICS Business Forum</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Visionary Leadership</p>
                  <p className="mt-2 text-white/80 font-medium leading-relaxed">
                    Ms. Purnima Anand (President, BRICS International Forum)
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Phases - Immersive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <TiltCard className="group relative p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-9xl font-serif font-bold text-white">1</span>
            </div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs uppercase tracking-widest mb-6">
                Pilot Phase
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">The Initiation</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                A high-stakes collaborative session uniting the brightest minds from Indian and Russian universities to set the foundation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-lg">🇮🇳</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold uppercase tracking-wider">India</p>
                    <p className="text-white/50 text-sm">Dept of CSE, RGIPT</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10 ml-4" />
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-lg">🇷🇺</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold uppercase tracking-wider">Russia</p>
                    <p className="text-white/50 text-sm">Higher School of Petroleum (Almetyevsk), Moscow Polytechnic University, <br></br>Peter the Great St. Petersburg Polytechnic University, <br></br>and Gazprom-Polytech University.</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="group relative p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-9xl font-serif font-bold text-white">2</span>
            </div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs uppercase tracking-widest mb-6">
                March 2026
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Full Scale</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                The grand convergence. Scaling to a global magnitude with massive participation across nations.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-white mb-1">7,000+</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Participants</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-white mb-1">Global</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Reach</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/80 text-sm italic">
                  "Pathway to the Phase 2 Pan-India Round."
                </p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Participation Criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-widest mb-2 font-bold">Team Structure</p>
                <p className="text-white/80 leading-relaxed">
                  3–5 students per team. Interdisciplinary and mixed Indo-Russian teams are highly encouraged to foster cross-cultural innovation.
                </p>
              </div>
              <div>
                <p className="text-blue-500 text-xs uppercase tracking-widest mb-2 font-bold">Eligibility</p>
                <p className="text-white/80 leading-relaxed">
                  Undergraduate and postgraduate students from Engineering, Technology, Energy, AI, and Management backgrounds.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors flex flex-col justify-center text-center">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
              <svg className="h-7 w-7 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 22h6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 19h4" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Theme</p>
            <h3 className="mt-3 text-xl font-serif font-bold text-white">Digital Advancements</h3>
            <p className="mt-2 text-white/60 leading-relaxed">in the Energy Sector</p>
          </div>
        </div>

        {/* Requirements & Evaluation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Solution Requirements</h3>
            <div className="space-y-6">
              {[
                { title: "Feasibility", desc: "Only conceptual and realistic solutions will be accepted.", color: "bg-orange-500" },
                { title: "Technology", desc: "Solutions must utilize Low Code or No Code platforms.", color: "bg-blue-500" },
                { title: "Practicality", desc: "Proposals must be financially and practically viable.", color: "bg-white" },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`w-1 h-full min-h-[3rem] ${item.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Evaluation Criteria</h3>
            <div className="space-y-6">
              {[
                { label: "Problem Clarity", value: 30 },
                { label: "Solution Logic", value: 25 },
                { label: "Practical Relevance", value: 25 },
                { label: "Innovation", value: 20 },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                    <span className="text-white font-mono">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="h-full bg-gradient-to-r from-orange-500 to-blue-500" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission & Benefits - New Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <TiltCard className="p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Submission Format</h3>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-6">Deliverables</p>

            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 3v4a2 2 0 0 0 2 2h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 13h8M8 17h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Pitch Deck</h4>
                  <p className="mt-1 text-white/60 text-sm leading-relaxed">Maximum of 5 slides covering problem, solution, and impact.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14" />
                    <rect x="3" y="7" width="12" height="10" rx="2" strokeWidth={1.8} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Video Presentation</h4>
                  <p className="mt-1 text-white/60 text-sm leading-relaxed">5–10 minute recorded video uploaded to Dion/GO-BRICS platform.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11v1a7 7 0 0 1-14 0v-1" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19v4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 23h8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Live Pitch</h4>
                  <p className="mt-1 text-white/60 text-sm leading-relaxed">3 minutes for the pitch and 2 minutes for Q&A.</p>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-bl from-white/[0.05] to-transparent">
            <h3 className="text-3xl font-serif font-bold text-white">Benefits</h3>
            <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/45">What participants gain</p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Global academic & industry exposure",
                "Internships & placement prospects",
                "Student exchange opportunities",
                "Certificates & recognition",
                "Pathway to Phase 2 Pan-India Round",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="mt-0.5 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/85 font-medium leading-relaxed">{benefit}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* Footer Info */}
        <div className="border-t border-white/10 pt-16 pb-16 text-center">
          <p className="text-white/40 text-sm mb-4">Ready to innovate?</p>
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Contact</p>
              <p className="text-white font-serif">Dr. Akash Yadav</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Phone</p>
              <p className="text-white font-serif">+91 8630179867</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
