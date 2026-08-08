"use client";

import React, { useState } from "react";
import { BrainCircuit, Sliders, Activity, Workflow, GitMerge } from "lucide-react";
import { cn } from "@/lib/utils";

export function FableInjectorWorkspace() {
  const [depth, setDepth] = useState(3);

  const labels = ["Superficial", "Standard", "Deep Logic", "Task Decomposition", "FABLE OMNISCIENT"];

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
          <h2 className="text-indigo-300 font-bold tracking-widest text-sm">F7.2: FABLE REASONING INJECTOR</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Depth Control */}
        <div className="w-1/3 border-r border-[#222] bg-[#050505] p-8 flex flex-col gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2"><Sliders className="w-5 h-5 text-indigo-400" /> Reasoning Depth</h3>
            <p className="text-slate-400 text-xs">Inject FABLE_SKILL.md parameters directly into the AI's cognitive loop.</p>
          </div>

          <div className="flex-1 flex items-center">
            <input 
              type="range" 
              min="0" max="4" 
              value={depth}
              onChange={(e) => setDepth(parseInt(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-[#111] border border-[#222] p-4 rounded-xl">
             <div className="text-[10px] font-bold text-slate-500 tracking-widest mb-1">CURRENT OVERRIDE LEVEL</div>
             <div className={cn("text-xl font-bold tracking-wider", depth > 2 ? "text-indigo-400" : "text-white")}>
               LEVEL {depth + 1}: {labels[depth].toUpperCase()}
             </div>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="flex-1 bg-[#0a0a0a] p-8 flex flex-col">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4" /> THOUGHT PROCESS TOPOLOGY
          </div>

          <div className="flex-1 bg-black border border-[#222] rounded-xl flex items-center justify-center p-8 relative overflow-hidden">
             
             {/* Dynamic Brain Graph */}
             <div className={cn("flex flex-col items-center gap-4 transition-all duration-700", depth > 2 ? "scale-100 opacity-100" : "scale-75 opacity-30")}>
                <div className="w-16 h-16 rounded-full bg-indigo-900/50 border border-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                   <Workflow className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="w-1 h-12 bg-indigo-500/50" />
                
                <div className="flex gap-16">
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-slate-400"><GitMerge className="w-5 h-5" /></div>
                     <div className="text-[10px] text-slate-500 font-mono">STEP 1: BREAKDOWN</div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-slate-400"><GitMerge className="w-5 h-5" /></div>
                     <div className="text-[10px] text-slate-500 font-mono">STEP 2: VERIFY</div>
                  </div>
                  {depth === 4 && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95">
                       <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"><BrainCircuit className="w-5 h-5" /></div>
                       <div className="text-[10px] text-emerald-400 font-mono font-bold">STEP 3: ANTI-HALLUCINATE</div>
                    </div>
                  )}
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
