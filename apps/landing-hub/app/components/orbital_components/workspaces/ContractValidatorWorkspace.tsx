"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, ShieldCheck, FileKey, XOctagon, CheckCircle2, Activity, PlaySquare, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContractValidatorWorkspace() {
  const [enforced, setEnforced] = useState(false);
  const [logs, setLogs] = useState<{ id: number; text: string; type: "info" | "warn" | "error" | "success" }[]>([]);
  
  useEffect(() => {
    if (!enforced) {
      setLogs([{ id: Date.now(), text: "Contract Enforcement is OFFLINE. AI operating without bounds.", type: "warn" }]);
      return;
    }

    setLogs([{ id: Date.now(), text: "ENTERPRISE_PRINCIPLES.md loaded. Enforcing strict boundaries...", type: "info" }]);
    
    // Simulation sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLogs(prev => {
        const newLogs = [...prev];
        if (step === 1) {
          newLogs.push({ id: Date.now(), text: "[AI Agent 15] Generated function fetchUserDirectDB()...", type: "info" });
        } else if (step === 2) {
          newLogs.push({ id: Date.now(), text: "SCANNING PAYLOAD against SYSTEM_CONTRACTS.md...", type: "info" });
        } else if (step === 3) {
          newLogs.push({ id: Date.now(), text: "REJECTED: Code Violated Enterprise Principle #3: Strict Boundary Enforcement.", type: "error" });
          newLogs.push({ id: Date.now()+1, text: "ACTION: Rejecting payload back to AI with correction mandate.", type: "warn" });
        } else if (step === 5) {
          newLogs.push({ id: Date.now(), text: "[AI Agent 15] Resubmitting: Generated function fetchUserViaAPI(token)...", type: "info" });
        } else if (step === 6) {
          newLogs.push({ id: Date.now(), text: "SCANNING PAYLOAD against SYSTEM_CONTRACTS.md...", type: "info" });
        } else if (step === 7) {
          newLogs.push({ id: Date.now(), text: "APPROVED: Architecture compliance verified 100%.", type: "success" });
          clearInterval(interval);
        }
        return newLogs;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [enforced]);

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          {enforced ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <ShieldAlert className="w-5 h-5 text-amber-500" />}
          <h2 className={cn("font-bold tracking-widest text-sm", enforced ? "text-emerald-300" : "text-amber-400")}>
            F3.2: ENTERPRISE CONTRACT VALIDATOR
          </h2>
        </div>
        <button 
          onClick={() => setEnforced(!enforced)}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full font-bold transition-all border",
            enforced 
              ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              : "bg-slate-800 border-slate-600 text-slate-400"
          )}
        >
          {enforced ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          {enforced ? "ENFORCE CONTRACTS : ON" : "ENFORCE CONTRACTS : OFF"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Rules List */}
        <div className="w-1/3 border-r border-[#222] bg-[#050505] p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-white font-bold mb-4">
            <FileKey className="w-5 h-5 text-cyan-500" />
            Active Enterprise Principles
          </div>
          
          {[
            { id: 1, title: "1. No Direct DB Access from Frontend", desc: "Must route through BFF API layers." },
            { id: 2, title: "2. JSON Envelope Standard", desc: "All APIs must return { data, error, meta }." },
            { id: 3, title: "3. Strict Boundary Enforcement", desc: "Components cannot mutate global state directly." },
            { id: 4, title: "4. No Inline CSS", desc: "Must use Tailwind utility classes exclusively." },
          ].map(rule => (
            <div key={rule.id} className="p-4 bg-[#111] border border-[#222] rounded-xl group hover:border-cyan-500/30 transition-colors">
              <div className="font-bold text-slate-300 mb-1">{rule.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{rule.desc}</div>
            </div>
          ))}
        </div>

        {/* Console / Radar */}
        <div className="flex-1 bg-[#0a0a0a] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-400 tracking-widest text-xs flex items-center gap-2">
              <Activity className="w-4 h-4" />
              LIVE AI INVOCATION MONITOR
            </h3>
            {enforced && <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>}
          </div>

          <div className="flex-1 bg-black border border-[#222] rounded-xl p-4 font-mono text-[11px] overflow-y-auto space-y-3">
            {logs.map((log) => (
              <div key={log.id} className={cn(
                "animate-in fade-in slide-in-from-left-2 p-2 rounded",
                log.type === "info" && "text-slate-400",
                log.type === "warn" && "text-amber-400 bg-amber-950/20",
                log.type === "error" && "text-red-400 bg-red-950/20 border border-red-900/50 flex items-start gap-2 font-bold",
                log.type === "success" && "text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 flex items-start gap-2 font-bold"
              )}>
                {log.type === "error" && <XOctagon className="w-4 h-4 shrink-0" />}
                {log.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                {log.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
