"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SpaceDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const radarRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(true);
  const [targets, setTargets] = useState<{x: number, y: number, id: number}[]>([]);

  useEffect(() => {
    if (reducedMotion || !sweepRef.current) return;

    const anim = gsap.to(sweepRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "linear",
      paused: !scanning
    });

    return () => {
      anim.kill();
    };
  }, [scanning, reducedMotion]);

  useEffect(() => {
    if (!scanning) return;
    
    const interval = setInterval(() => {
        if (Math.random() > 0.7) {
            const newTarget = {
                id: Date.now(),
                x: Math.random() * 80 + 10, // 10-90%
                y: Math.random() * 80 + 10
            };
            setTargets(prev => [...prev.slice(-4), newTarget]);
        }
    }, 2000);

    return () => clearInterval(interval);
  }, [scanning]);

  return (
    <div className="relative w-full max-w-[720px] h-[400px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex">
      {/* Sidebar Controls */}
      <div className="w-1/3 border-r border-white/10 p-6 flex flex-col justify-between bg-white/5">
        <div>
            <h3 className="text-lg font-serif text-white mb-1">Deep Space</h3>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-6">Telemetry Uplink</p>
            
            <div className="space-y-4">
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] uppercase text-purple-400 mb-1">Signal Strength</p>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[75%] animate-pulse"></div>
                    </div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] uppercase text-blue-400 mb-1">Frequency</p>
                    <p className="font-mono text-sm text-white/80">1420.4 MHz</p>
                </div>
            </div>
        </div>

        <button 
            onClick={() => setScanning(!scanning)}
            className={`w-full py-3 rounded-lg text-xs uppercase tracking-widest border transition-all ${scanning ? 'bg-red-500/10 border-red-500/50 text-red-200' : 'bg-green-500/10 border-green-500/50 text-green-200'}`}
        >
            {scanning ? "Stop Scan" : "Start Scan"}
        </button>
      </div>

      {/* Radar View */}
      <div className="flex-1 relative flex items-center justify-center bg-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="w-[300px] h-[300px] rounded-full border border-white/10 relative flex items-center justify-center">
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/5"></div>
            <div className="absolute w-[100px] h-[100px] rounded-full border border-white/5"></div>
            <div className="absolute w-full h-[1px] bg-white/10"></div>
            <div className="absolute h-full w-[1px] bg-white/10"></div>

            {/* Sweep Line */}
            <div 
                ref={sweepRef}
                className="absolute w-full h-full rounded-full overflow-hidden origin-center"
                style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.2) 360deg)' }}
            ></div>

            {/* Targets */}
            {targets.map(t => (
                <div 
                    key={t.id}
                    className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping"
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                    <div className="absolute top-3 left-3 text-[8px] font-mono text-purple-300 whitespace-nowrap">
                        OBJ-{t.id.toString().slice(-4)}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
