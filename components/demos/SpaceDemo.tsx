"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SpaceDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const radarRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const pingRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(true);
  const [targets, setTargets] = useState<{ x: number; y: number; id: number }[]>([]);
  const [log, setLog] = useState<string[]>([
    "Uplink established · 1420.4 MHz",
    "Telemetry sync · OK",
  ]);
  const [sat, setSat] = useState({ x: 52, y: 44 });
  const draggingRef = useRef(false);

  const telemetry = useMemo(() => {
    const base = 40 + (sat.y - 50) * 0.6;
    const a = Math.max(12, Math.min(92, base));
    const b = Math.max(12, Math.min(92, base + 10));
    const c = Math.max(12, Math.min(92, base - 8));
    const d = Math.max(12, Math.min(92, base + 14));
    const e = Math.max(12, Math.min(92, base + 4));
    return [a, b, c, d, e];
  }, [sat.y]);

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

    const interval = window.setInterval(() => {
      if (Math.random() > 0.78) {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        };
        setTargets((prev) => [...prev.slice(-5), newTarget]);
        setLog((prev) => [
          ...prev.slice(-6),
          `Target acquired · OBJ-${newTarget.id.toString().slice(-4)} · Δ${
            (Math.random() * 9).toFixed(2)
          } dB`,
        ]);
      }
    }, 1600);

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
    const newTarget = { id: Date.now(), x: clamp(x, 6, 94), y: clamp(y, 6, 94) };
    setTargets((prev) => [...prev.slice(-5), newTarget]);
    setLog((prev) => [
      ...prev.slice(-6),
      `Manual ping · OBJ-${newTarget.id.toString().slice(-4)} confirmed`,
    ]);

    if (!reducedMotion) {
      gsap.fromTo(
        el,
        { boxShadow: "0 0 0 rgba(168,85,247,0)" },
        {
          boxShadow: "0 0 64px rgba(168,85,247,0.22)",
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  }

  function ping() {
    setLog((prev) => [...prev.slice(-6), "Ping sent · waiting for echo…"]);
    if (reducedMotion || !pingRef.current) return;
    gsap.fromTo(
      pingRef.current,
      { opacity: 0.0, scale: 0.7 },
      { opacity: 0.65, scale: 1.45, duration: 0.8, ease: "power2.out" }
    );
    gsap.to(pingRef.current, { opacity: 0, duration: 0.45, delay: 0.55 });
  }

  useEffect(() => {
    const onUp = () => (draggingRef.current = false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  return (
    <div className="relative w-full max-w-[720px] h-[400px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex">
      {/* Sidebar Controls */}
      <div className="w-1/3 border-r border-white/10 p-6 flex flex-col justify-between bg-white/5">
        <div>
            <h3 className="text-lg font-serif text-white mb-1">Mission Control</h3>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-6">Orbital Telemetry</p>
            
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
