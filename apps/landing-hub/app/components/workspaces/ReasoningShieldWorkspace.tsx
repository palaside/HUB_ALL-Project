"use client";

import React, { useState } from "react";
import { ShieldAlert, Fingerprint, Search, ToggleLeft, ToggleRight, Loader2, Target, CheckCircle2, XOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReasoningShieldWorkspace() {
  const [shieldActive, setShieldActive] = useState(false);
  const [logs, setLogs] = useState<{ id: number; msg: string; type: "think" | "warn" | "success" | "reject" }[]>([]);

  const runSimulation = () => {
    setLogs([]);
    const sequence = [
      { t: "think", m: "Decomposing task: Generate Authentication logic." },
      { t: "think", m: "Drafting code using legacy Passport.js..." },
      { t: "warn", m: "SELF-VERIFICATION: Wait, is Passport.js the best choice for Next.js App Router?" },
      { t: "reject", m: "DISCARDING THOUGHT: No, NextAuth / Auth.js is the required standard." },
      { t: "think", m: "Re-drafting code using NextAuth v5..." },
      { t: "warn", m: "SELF-VERIFICATION: Did I hallucinate any API endpoints?" },
      { t: "think", m: "Cross-referencing injected CONTEXT.md..." },
      { t: "success", m: "VERIFIED: API endpoints match exactly." },
      { t: "success", m: "LOGIC CLEAR. PROCEEDING TO OUTPUT GENERATION." }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, { id: i, msg: sequence[i].m, type: sequence[i].t as any }]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          {shieldActive ? <ShieldAlert className="w-5 h-5 text-emerald-400" /> : <ShieldAlert className="w-5 h-5 text-slate-500" />}
          <h2 className={cn("font-bold tracking-widest text-sm", shieldActive ? "text-emerald-400" : "text-slate-400")}>
            F5.3: ZERO-HALLUCINATION REASONING SHIELD
          </h2>
        </div>
        <button 
          onClick={() => { setShieldActive(!shieldActive); if(!shieldActive) runSimulation(); else setLogs([]); }}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full font-bold transition-all border",
            shieldActive 
              ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              : "bg-slate-800 border-slate-600 text-slate-400"
          )}
        >
          {shieldActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          {shieldActive ? "FABLE SHIELD : ACTIVE" : "FABLE SHIELD : OFF"}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Background visualizer */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Fingerprint className="w-[500px] h-[500px] text-emerald-500" />
        </div>

        {/* Console */}
        <div className="w-full max-w-3xl mx-auto p-8 flex flex-col z-10">
          
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-slate-400 font-bold tracking-widest text-xs flex items-center gap-2">
              <Search className="w-4 h-4" /> CHAIN OF THOUGHT (THE LIE DETECTOR)
            </h3>
            {shieldActive && logs.length > 0 && logs.length < 9 && (
              <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" /> VERIFYING LOGIC...
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 font-mono text-xs overflow-y-auto pb-8 pr-4">
            {!shieldActive ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                <Target className="w-12 h-12 opacity-50" />
                <p>Activate Shield to force AI into Deep Verification mode before replying.</p>
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className={cn(
                  "p-4 rounded-lg border animate-in slide-in-from-left-4 fade-in duration-300",
                  log.type === "think" && "bg-slate-900/50 border-slate-700 text-slate-300",
                  log.type === "warn" && "bg-amber-950/30 border-amber-500/50 text-amber-400 border-l-4 border-l-amber-500",
                  log.type === "reject" && "bg-red-950/30 border-red-500/50 text-red-400 border-l-4 border-l-red-500 font-bold",
                  log.type === "success" && "bg-emerald-950/30 border-emerald-500/50 text-emerald-400 border-l-4 border-l-emerald-500 font-bold"
                )}>
                  <div className="flex items-start gap-3">
                    {log.type === "warn" && <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />}
                    {log.type === "reject" && <XOctagon className="w-4 h-4 shrink-0 mt-0.5" />}
                    {log.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                    {log.type === "think" && <Loader2 className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />}
                    <span>{log.msg}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
