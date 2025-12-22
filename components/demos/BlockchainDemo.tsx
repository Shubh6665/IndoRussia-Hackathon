"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Block = {
  id: number;
  hash: string;
  prevHash: string;
  transactions: number;
};

export default function BlockchainDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, hash: "0x8F...2A", prevHash: "0x00...00", transactions: 12 },
    { id: 2, hash: "0x3C...9B", prevHash: "0x8F...2A", transactions: 8 },
  ]);
  const [mining, setMining] = useState(false);
  const [pendingTx, setPendingTx] = useState(3);

  const generateHash = () => {
    const chars = "0123456789ABCDEF";
    let hash = "0x";
    for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * 16)];
    hash += "...";
    for (let i = 0; i < 2; i++) hash += chars[Math.floor(Math.random() * 16)];
    return hash;
  };

  const mineBlock = async () => {
    if (mining) return;
    setMining(true);

    // Simulate hashing work
    const duration = reducedMotion ? 500 : 2000;
    
    if (!reducedMotion && chainRef.current) {
        gsap.to(chainRef.current, {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut"
        });
    }

    await new Promise(r => setTimeout(r, duration));

    const newBlock: Block = {
      id: blocks.length + 1,
      hash: generateHash(),
      prevHash: blocks[blocks.length - 1].hash,
      transactions: pendingTx + Math.floor(Math.random() * 5),
    };

    setBlocks(prev => [...prev, newBlock]);
    setPendingTx(Math.floor(Math.random() * 5));
    setMining(false);

    // Animate new block entry
    if (!reducedMotion && chainRef.current) {
        const lastChild = chainRef.current.lastElementChild;
        if (lastChild) {
            gsap.fromTo(lastChild, 
                { x: 50, opacity: 0, scale: 0.8 },
                { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[720px] h-[400px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-lg font-serif text-white">Live Ledger</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest">Blockchain Explorer</p>
        </div>
        <div className="flex gap-4 items-center">
            <div className="text-right">
                <p className="text-[10px] uppercase text-white/40">Pending Tx</p>
                <p className="text-sm font-mono text-blue-400">{pendingTx}</p>
            </div>
            <button
            onClick={mineBlock}
            disabled={mining}
            className={cn(
                "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border",
                mining 
                ? "bg-blue-500/20 border-blue-500/50 text-blue-200 cursor-wait" 
                : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
            )}
            >
            {mining ? "Mining..." : "Mine Block"}
            </button>
        </div>
      </div>

      {/* Chain Visualization */}
      <div className="flex-1 relative overflow-hidden p-8 flex items-center">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

        <div ref={chainRef} className="flex gap-8 items-center z-10 overflow-x-auto w-full px-4 no-scrollbar scroll-smooth">
            {blocks.map((block, i) => (
                <div 
                    key={block.id}
                    className="flex-shrink-0 w-48 h-48 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-4 flex flex-col justify-between group hover:border-blue-500/50 transition-colors duration-300 relative"
                >
                    {/* Connector */}
                    {i > 0 && (
                        <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-blue-500/30">
                            <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        </div>
                    )}

                    <div className="flex justify-between items-start">
                        <span className="text-4xl font-bold text-white/10 group-hover:text-blue-500/20 transition-colors">#{block.id}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-2 font-mono text-[10px] text-white/60">
                        <div className="flex justify-between">
                            <span>Hash:</span>
                            <span className="text-white/90">{block.hash}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Prev:</span>
                            <span className="text-white/40">{block.prevHash}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex justify-between text-blue-300">
                            <span>Tx Count:</span>
                            <span>{block.transactions}</span>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Ghost Block (Placeholder for next) */}
            <div className="flex-shrink-0 w-48 h-48 rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center">
                <span className="text-white/20 text-xs uppercase tracking-widest">Next Block</span>
            </div>
        </div>
      </div>
    </div>
  );
}
