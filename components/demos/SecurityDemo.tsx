"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, Activity } from "lucide-react";

type Packet = {
  id: number;
  malicious: boolean;
  status: "pending" | "blocked" | "allowed";
};

export default function SecurityDemo() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [firewallActive, setFirewallActive] = useState(true);
  const [stats, setStats] = useState({ blocked: 124, allowed: 8432 });

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
            if (firewallActive && p.malicious) {
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
  }, [firewallActive]);

  return (
    <div className="relative w-full max-w-[720px] h-[400px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col">
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
        
        <button
            onClick={() => setFirewallActive(!firewallActive)}
            className={`px-4 py-1.5 rounded text-xs font-mono uppercase border transition-all ${
                firewallActive 
                ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' 
                : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
            }`}
        >
            {firewallActive ? "Firewall Active" : "Firewall Disabled"}
        </button>
      </div>

      {/* Traffic Visualizer */}
      <div className="flex-1 relative p-6 flex flex-col gap-4">
        <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest mb-2">
            <span>Incoming Source</span>
            <span>Firewall Filter</span>
            <span>Internal Network</span>
        </div>

        <div className="flex-1 relative border border-white/5 rounded-xl bg-black/40 overflow-hidden">
            {/* Lanes */}
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/5 border-r border-dashed border-white/10"></div>
            <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/5 border-r border-dashed border-white/10"></div>

            {/* Packets */}
            {packets.map((p) => (
                <div
                    key={p.id}
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg transition-all duration-[2000ms] ease-linear ${
                        p.malicious ? 'bg-red-500 shadow-red-500/50' : 'bg-emerald-400 shadow-emerald-400/50'
                    }`}
                    style={{
                        left: p.status === 'pending' ? '5%' : p.status === 'blocked' ? '33%' : '90%',
                        opacity: p.status === 'blocked' ? 0 : 1,
                        transform: p.status === 'blocked' ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%) scale(1)'
                    }}
                />
            ))}
            
            {/* Firewall Barrier Visual */}
            <div className={`absolute top-0 bottom-0 left-1/3 w-1 transition-colors duration-300 ${firewallActive ? 'bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-red-500/10'}`}></div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 mt-2">
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
    </div>
  );
}
