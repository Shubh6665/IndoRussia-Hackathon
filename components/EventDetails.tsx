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
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 text-2xl">
              💡
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">Theme</h3>
            <p className="text-white/60">Digital Advancements in the Energy Sector</p>
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

        {/* Footer Info */}
        <div className="border-t border-white/10 pt-16 text-center">
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
