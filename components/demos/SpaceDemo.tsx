"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Particle system for background stars
function StarField({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => {
    // Use a seeded random function for consistent SSR
    const seed = 12345; // Fixed seed for consistency
    let currentSeed = seed;
    
    const seededRandom = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
    
    return Array.from({ length: count }, (_, i) => {
      // Use index + seed for deterministic but varied results
      const seedIndex = i + seed;
      const x = ((seedIndex * 9301 + 49297) % 233280) / 233280 * 100;
      const y = ((seedIndex * 49297 + 9301) % 233280) / 233280 * 100;
      const size = ((seedIndex * 233280 + 9301) % 2000) / 1000 + 1; // 1-3px
      const delay = ((seedIndex * 12345 + 67890) % 3000) / 1000; // 0-3s
      const opacity = ((seedIndex * 54321 + 98765) % 400) / 1000 + 0.3; // 0.3-0.7
      
      return {
        id: i,
        x,
        y,
        size,
        delay,
        opacity,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function SpaceDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const radarRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const pingRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const [scanning, setScanning] = useState(true);
  const [targets, setTargets] = useState<{ x: number; y: number; id: number; type: string }[]>([
    { x: 35, y: 28, id: 1001, type: "SAT" },
    { x: 72, y: 45, id: 1002, type: "DEB" },
  ]);
  const [log, setLog] = useState<string[]>([
    "Uplink established · 1420.4 MHz",
    "Telemetry sync · OK",
    "Tracking 2 objects",
  ]);
  const [sat, setSat] = useState({ x: 52, y: 44 });
  const [selected, setSelected] = useState<number | null>(null);
  const draggingRef = useRef(false);
  const [signalStrength, setSignalStrength] = useState(75);

  const telemetry = useMemo(() => {
    const base = 40 + (sat.y - 50) * 0.6;
    const a = Math.max(12, Math.min(92, base));
    const b = Math.max(12, Math.min(92, base + 10));
    const c = Math.max(12, Math.min(92, base - 8));
    const d = Math.max(12, Math.min(92, base + 14));
    const e = Math.max(12, Math.min(92, base + 4));
    const f = Math.max(12, Math.min(92, base - 6));
    return [a, b, c, d, e, f];
  }, [sat.y]);

  // Orbital animation
  useEffect(() => {
    if (reducedMotion || !orbitRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(orbitRef.current, {
      rotation: 360,
      duration: 12,
      ease: "linear",
    });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Sweep animation
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

  // Auto-update signal strength
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength((prev) => {
        const change = (Math.random() - 0.5) * 8;
        return Math.max(60, Math.min(95, prev + change));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Auto-discover targets
  useEffect(() => {
    if (!scanning) return;

    const interval = window.setInterval(() => {
      const newTarget = {
        id: 1000 + Math.floor(Math.random() * 9000),
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        type: Math.random() > 0.7 ? "DEB" : "SAT",
      };
      setTargets((prev) => [...prev.slice(-7), newTarget]);
      setLog((prev) => [
        ...prev.slice(-5),
        `Acquired · ${newTarget.type}-${newTarget.id.toString().slice(-4)}`,
      ]);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [scanning]);

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  function addTargetAt(clientX: number, clientY: number) {
    const el = radarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const newTarget = {
      id: 2000 + Date.now() % 1000,
      x: clamp(x, 6, 94),
      y: clamp(y, 6, 94),
      type: "MAN",
    };
    setTargets((prev) => [...prev.slice(-7), newTarget]);
    setLog((prev) => [
      ...prev.slice(-5),
      `Manual ping · MAN-${newTarget.id.toString().slice(-4)} confirmed`,
    ]);

    if (!reducedMotion && el) {
      gsap.fromTo(
        el,
        { boxShadow: "0 0 0 rgba(168,85,247,0)" },
        {
          boxShadow: "0 0 96px rgba(168,85,247,0.35)",
          duration: 0.45,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  }

  function ping() {
    setLog((prev) => [...prev.slice(-5), "Ping sent · waiting for echo…"]);
    if (reducedMotion || !pingRef.current) return;
    gsap.fromTo(
      pingRef.current,
      { opacity: 0.0, scale: 0.7 },
      { opacity: 0.7, scale: 1.6, duration: 0.9, ease: "power2.out" }
    );
    gsap.to(pingRef.current, { opacity: 0, duration: 0.5, delay: 0.6 });
  }

  useEffect(() => {
    const onUp = () => (draggingRef.current = false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  return (
    <div className="relative w-full max-w-full md:max-w-[780px] min-h-[540px] md:min-h-[600px] rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row">
      {/* Ambient effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-pink-500/20 blur-[120px]" />

      <StarField count={100} />

      {/* Sidebar Controls */}
      <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between bg-white/[0.03] relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <h3 className="text-lg md:text-xl font-serif text-white">Mission Control</h3>
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-[0.26em] mb-6">
            Orbital Telemetry System
          </p>
            
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
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] uppercase text-white/50 mb-2">Telemetry</p>
                    <svg viewBox="0 0 120 32" className="h-6 w-full">
                      <polyline
                        fill="none"
                        stroke="rgba(168,85,247,0.9)"
                        strokeWidth="2"
                        points={telemetry
                          .map((v, i) => `${i * 30},${32 - (v / 100) * 32}`)
                          .join(" ")}
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="2"
                        points={telemetry
                          .map((v, i) => `${i * 30},${32 - ((v + 12) / 100) * 32}`)
                          .join(" ")}
                      />
                    </svg>
                </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Mission Log</p>
              <div className="mt-3 max-h-[90px] overflow-y-auto custom-scrollbar space-y-2">
                {log.slice(-7).map((l, idx) => (
                  <div key={idx} className="text-[11px] font-mono text-white/65">
                    {l}
                  </div>
                ))}
              </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setScanning(!scanning)}
            className={`w-full py-3 rounded-lg text-xs uppercase tracking-widest border transition-all ${scanning ? "bg-red-500/10 border-red-500/50 text-red-200" : "bg-green-500/10 border-green-500/50 text-green-200"}`}
          >
            {scanning ? "Stop" : "Scan"}
          </button>
          <button
            onClick={ping}
            className="w-full py-3 rounded-lg text-xs uppercase tracking-widest border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
          >
            Ping
          </button>
        </div>
      </div>

      {/* Radar View */}
      <div className="flex-1 relative flex items-center justify-center bg-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent"></div>
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08)_0,transparent_38%),radial-gradient(circle_at_70%_40%,rgba(168,85,247,0.10)_0,transparent_42%),radial-gradient(circle_at_50%_75%,rgba(59,130,246,0.08)_0,transparent_40%)]" />
        <div
          ref={radarRef}
          onClick={(e) => addTargetAt(e.clientX, e.clientY)}
          className="w-[310px] h-[310px] rounded-full border border-white/10 relative flex items-center justify-center"
        >
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/5"></div>
            <div className="absolute w-[100px] h-[100px] rounded-full border border-white/5"></div>
            <div className="absolute w-full h-[1px] bg-white/10"></div>
            <div className="absolute h-full w-[1px] bg-white/10"></div>

            {/* Ping pulse */}
            <div
              ref={pingRef}
              className="absolute rounded-full border border-purple-400/40"
              style={{ width: 90, height: 90, left: `${sat.x}%`, top: `${sat.y}%`, transform: "translate(-50%, -50%)", opacity: 0 }}
            />

            {/* Sweep Line */}
            <div 
                ref={sweepRef}
                className="absolute w-full h-full rounded-full overflow-hidden origin-center"
                style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.2) 360deg)' }}
            ></div>

            {/* Satellite marker (draggable) */}
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                draggingRef.current = true;
              }}
              onPointerMove={(e) => {
                if (!draggingRef.current) return;
                addTargetAt(e.clientX, e.clientY);
                const el = radarRef.current;
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setSat({ x: clamp(x, 6, 94), y: clamp(y, 6, 94) });
              }}
              className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)] cursor-pointer"
              style={{ left: `${sat.x}%`, top: `${sat.y}%`, transform: "translate(-50%, -50%)" }}
              title="Drag satellite"
            />

            {/* Targets */}
            {targets.map(t => (
                <div 
                    key={t.id}
                className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_14px_rgba(255,255,255,0.65)] animate-ping"
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
