"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, ShieldAlert, Activity, Search, Ban, Shield } from "lucide-react";

type Packet = {
  id: number;
  malicious: boolean;
  status: "pending" | "blocked" | "allowed";
};

export default function SecurityDemo() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [firewallActive, setFirewallActive] = useState(true);
  const [lockdown, setLockdown] = useState(false);
  const [selected, setSelected] = useState<Packet | null>(null);
  const [stats, setStats] = useState({ blocked: 124, allowed: 8432 });

  const visiblePackets = useMemo(() => {
    return packets;
  }, [packets]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isMalicious = Math.random() > 0.7;
      const newPacket: Packet = {
        id: Date.now(),
        malicious: isMalicious,
        status: "pending",
      };

      // Process packet immediately
      setTimeout(() => {
        setPackets((prev) =>
          prev.map((p) => {
            if (p.id !== newPacket.id) return p;
            
            let status: Packet["status"] = "allowed";
            if (lockdown) {
                status = "blocked";
                setStats(s => ({ ...s, blocked: s.blocked + 1 }));
            } else if (firewallActive && p.malicious) {
                status = "blocked";
                setStats(s => ({ ...s, blocked: s.blocked + 1 }));
            } else {
                setStats(s => ({ ...s, allowed: s.allowed + 1 }));
            }
            
            return { ...p, status };
          })
        );
      }, 1000); // Travel time

      setPackets((prev) => [...prev.slice(-6), newPacket]);
    }, 800);

    return () => clearInterval(interval);
  }, [firewallActive, lockdown]);

  return (
    <div className="relative w-full max-w-[780px] min-h-[540px] md:min-h-[600px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${firewallActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {firewallActive ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
            </div>
            <div>
                <h3 className="text-sm font-bold text-white tracking-wide">NETGUARD V2.0</h3>
                <p className="text-[10px] text-white/50 uppercase">Real-time Traffic Analysis</p>
            </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFirewallActive(!firewallActive)}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase border transition-all flex items-center gap-2 ${
              firewallActive
                ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                : "border-red-500/30 text-red-400 hover:bg-red-500/10"
            }`}
          >
            <Shield size={14} />
            {firewallActive ? "Firewall" : "Firewall"}
          </button>
          <button
            onClick={() => setLockdown(!lockdown)}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase border transition-all flex items-center gap-2 ${
              lockdown
                ? "border-orange-400/40 text-orange-200 bg-orange-500/10"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }`}
            title="Block all traffic"
          >
            <Ban size={14} />
            Lockdown
          </button>
        </div>
      </div>

      {/* Traffic Visualizer */}
      <div className="flex-1 relative p-6 grid grid-cols-[1.35fr_0.65fr] gap-4">
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
            <span>Incoming</span>
            <span>Filter</span>
            <span>Internal</span>
          </div>

          <div className="flex-1 relative border border-white/5 rounded-xl bg-black/40 overflow-hidden">
            {/* Soft scan */}
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04),transparent)] animate-[pulse_2.2s_ease-in-out_infinite]" />

            {/* Lanes */}
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/5 border-r border-dashed border-white/10"></div>
            <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/5 border-r border-dashed border-white/10"></div>

            {/* Packets */}
            {visiblePackets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg transition-all duration-[1800ms] ease-linear focus:outline-none ${
                  p.malicious
                    ? "bg-red-500 shadow-red-500/50"
                    : "bg-emerald-400 shadow-emerald-400/50"
                } ${selected?.id === p.id ? "ring-2 ring-white/40" : ""}`}
                style={{
                  left:
                    p.status === "pending"
                      ? "5%"
                      : p.status === "blocked"
                        ? "33%"
                        : "90%",
                  opacity: p.status === "blocked" ? 0 : 1,
                  transform:
                    p.status === "blocked"
                      ? "translate(-50%, -50%) scale(2)"
                      : "translate(-50%, -50%) scale(1)",
                }}
                aria-label="Inspect packet"
              />
            ))}

            {/* Firewall Barrier Visual */}
            <div
              className={`absolute top-0 bottom-0 left-1/3 w-1 transition-colors duration-300 ${
                lockdown
                  ? "bg-orange-400/60 shadow-[0_0_26px_rgba(251,146,60,0.35)]"
                  : firewallActive
                    ? "bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                    : "bg-red-500/10"
              }`}
            ></div>
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded p-3 border border-white/5">
              <p className="text-[10px] text-white/40 uppercase">Threats Blocked</p>
              <p className="text-xl font-mono text-red-400">{stats.blocked}</p>
            </div>
            <div className="bg-white/5 rounded p-3 border border-white/5">
              <p className="text-[10px] text-white/40 uppercase">Traffic Allowed</p>
              <p className="text-xl font-mono text-green-400">{stats.allowed}</p>
            </div>
            <div className="bg-white/5 rounded p-3 border border-white/5 flex items-center gap-3">
              <Activity className="text-blue-400 animate-pulse" />
              <div>
                <p className="text-[10px] text-white/40 uppercase">Network Load</p>
                <p className="text-sm font-mono text-white">45 Mb/s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Inspector</p>
            <Search className="text-white/35" size={16} />
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Selected</p>
              <p className="mt-1 font-mono text-sm text-white/80">
                {selected ? `PKT-${selected.id.toString().slice(-6)}` : "Click a packet"}
              </p>
              <p className="mt-2 text-xs text-white/45">
                {selected
                  ? selected.malicious
                    ? "Signature match: suspicious payload"
                    : "Payload: clean"
                  : "Inspect traffic in real time."}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Decision</p>
              <p className="mt-2 text-sm text-white/80">
                {selected ? selected.status.toUpperCase() : "—"}
              </p>
              <p className="mt-2 text-xs text-white/45">
                {lockdown
                  ? "Lockdown blocks all traffic."
                  : firewallActive
                    ? "Firewall blocks malicious packets."
                    : "Firewall is disabled."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFirewallActive(true)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-widest text-white/75 hover:bg-white/10"
              >
                Harden
              </button>
              <button
                type="button"
                onClick={() => {
                  setLockdown(false);
                  setFirewallActive(false);
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-widest text-white/75 hover:bg-white/10"
              >
                Observe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
