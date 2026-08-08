"use client";

import React, { useState } from "react";
import { Radar, Crosshair, Zap, CheckCircle2, ShieldPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillProvisionerWorkspace() {
  const [isScanning, setIsScanning] = useState(false);
  const [recommended, setRecommended] = useState<any[]>([]);

  const handleScan = () => {
    setIsScanning(true);
    setRecommended([]);
    setTimeout(() => {
      setIsScanning(false);
      setRecommended([
        { id: "fable", name: "FABLE 5 REASONING", desc: "For deep architectural planning and zero-hallucination code generation.", match: 98 },
        { id: "excel", name: "EXCEL BLUEPRINT ANALYST", desc: "For extracting legacy formulas from .xls uploads.", match: 85 }
      ]);
    }, 2000);
  };

  const handleInject = (id: string) => {
    setRecommended(prev => prev.map(s => s.id === id ? { ...s, injected: true } : s));
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Crosshair className="w-5 h-5 text-fuchsia-400" />
          <h2 className="text-fuchsia-300 font-bold tracking-widest text-sm">F7.1: DYNAMIC SKILL PROVISIONER</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Radar */}
        <div className="w-1/3 border-r border-[#222] bg-[#050505] p-8 flex flex-col items-center justify-center gap-6">
          <div className="text-center mb-4">
            <h3 className="text-white font-bold text-lg mb-2">Contextual Radar</h3>
            <p className="text-slate-400 text-xs">Scans current CEO directives to recommend optimal AI skills.</p>
          </div>

          <div className="relative w-48 h-48 rounded-full border border-fuchsia-900/50 flex items-center justify-center overflow-hidden">
             {isScanning && <div className="absolute inset-0 bg-fuchsia-500/20 rounded-full animate-ping" />}
             <Radar className={cn("w-16 h-16 text-fuchsia-500", isScanning && "animate-spin")} />
          </div>

          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-4 mt-8 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-[#222] text-white rounded-xl font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]"
          >
            {isScanning ? "SCANNING INTENT..." : "ANALYZE CURRENT TASK"}
          </button>
        </div>

        {/* Right: Recommendations */}
        <div className="flex-1 bg-[#0a0a0a] p-8 flex flex-col">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-6">RECOMMENDED SKILL CARTRIDGES</div>

          <div className="flex-1 space-y-4">
            {recommended.length === 0 && !isScanning && (
              <div className="text-slate-600 italic h-full flex items-center justify-center">Run radar to discover matching skills...</div>
            )}

            {recommended.map((skill, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-right-4 flex items-center justify-between p-6 bg-[#111] border border-[#222] rounded-xl hover:border-fuchsia-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-fuchsia-950/40 rounded-lg">
                    <ShieldPlus className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-widest">{skill.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{skill.desc}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-2">{skill.match}% CONTEXT MATCH</div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleInject(skill.id)}
                  disabled={skill.injected}
                  className={cn(
                    "px-6 py-3 rounded-lg font-bold tracking-widest text-xs transition-all flex items-center gap-2",
                    skill.injected 
                      ? "bg-emerald-950/40 border border-emerald-500/50 text-emerald-400"
                      : "bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                  )}
                >
                  {skill.injected ? <><CheckCircle2 className="w-4 h-4" /> INJECTED</> : <><Zap className="w-4 h-4 fill-current" /> INJECT SKILL</>}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
