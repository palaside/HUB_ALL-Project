"use client";

import React, { useState } from "react";
import { Crown, Zap, Flame, Activity, ShieldAlert, CheckCircle2, ChevronRight, Server, Database, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrumpCardsWorkspace() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const handleTrigger = (card: string) => {
    setActiveCard(card);
    setLogs([]);
    
    if (card === "ceo") {
      simulate([
        "INITIATING 01_CEO_ORCHESTRATOR.md...",
        "Parsing Master Requirement: 'Build E-Commerce Platform'",
        "Decomposing into 3 Parallel Sub-Tasks...",
        "[ROUTING] Task 1 -> Agent 15 (Frontend React)",
        "[ROUTING] Task 2 -> Agent 04 (Anti-AI Design)",
        "[ROUTING] Task 3 -> DB Agent (PostgreSQL Schema)",
        "SWARM DEPLOYED. Monitoring parallel execution..."
      ]);
    } else if (card === "legacy") {
      simulate([
        "INITIATING 02_LEGACY_TO_WEB.md...",
        "Analyzing uploaded 'inventory_2004.xls'...",
        "Extracting 15 legacy formulas via excel_blueprint.py...",
        "Generating Prisma Schema from table structure...",
        "Building Next.js CRUD Web App...",
        "Transformation Complete. Legacy system modernized."
      ]);
    } else if (card === "heal") {
      simulate([
        "INITIATING 03_SELF_HEALING_QA.md...",
        "Scanning Runtime Errors...",
        "Detected: Next.js Build Error (Hydration Mismatch in Nav.tsx)",
        "Spawning QA Agent...",
        "Applying fix: Changing useEffect dependency array...",
        "Re-compiling...",
        "ALL TESTS PASSED. Auto-Heal Successful."
      ]);
    }
  };

  const simulate = (messages: string[]) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < messages.length) {
        setLogs(prev => [...prev, messages[step]]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  const lastLog = logs.length > 0 ? logs[logs.length - 1] : "";
  const isRunning = activeCard !== null && logs.length > 0 && typeof lastLog === "string" && !lastLog.includes("Complete") && !lastLog.includes("Successful") && !lastLog.includes("Monitoring");

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm relative">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#111] to-[#111] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a] relative z-10">
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-amber-500" />
          <h2 className="text-amber-400 font-bold tracking-widest text-sm">F4.1: THE TRUMP CARDS DOCK</h2>
        </div>
        <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-[10px] font-bold tracking-widest">
          RESTRICTED: EXECUTIVE OVERRIDE ONLY
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Left Control Panel */}
        <div className="w-1/2 border-r border-[#222] bg-[#050505] p-8 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Heavy Artillery Control</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Activate powerful system-wide protocols to automate weeks of work into a single click. Use with caution.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            
            <button 
              onClick={() => handleTrigger("ceo")}
              disabled={isRunning}
              className={cn(
                "p-5 rounded-xl border-2 flex flex-col items-start gap-3 transition-all group",
                activeCard === "ceo" ? "bg-amber-950/30 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "bg-[#111] border-[#333] hover:border-amber-500/50 disabled:opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-amber-400 tracking-wider">CEO ORCHESTRATOR</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">01_CEO_ORCHESTRATOR.md</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-left">Automatically break down a massive requirement and dispatch to multiple swarm agents in parallel.</p>
            </button>

            <button 
              onClick={() => handleTrigger("legacy")}
              disabled={isRunning}
              className={cn(
                "p-5 rounded-xl border-2 flex flex-col items-start gap-3 transition-all group",
                activeCard === "legacy" ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]" : "bg-[#111] border-[#333] hover:border-cyan-500/50 disabled:opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Database className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-cyan-400 tracking-wider">LEGACY TRANSFORM</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">02_LEGACY_TO_WEB.md</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-left">Upload an old Excel file and instantly transform it into a modern full-stack web application.</p>
            </button>

            <button 
              onClick={() => handleTrigger("heal")}
              disabled={isRunning}
              className={cn(
                "p-5 rounded-xl border-2 flex flex-col items-start gap-3 transition-all group",
                activeCard === "heal" ? "bg-emerald-950/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-[#111] border-[#333] hover:border-emerald-500/50 disabled:opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <ShieldAlert className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-emerald-400 tracking-wider">AUTO-HEAL ENGINE</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">03_SELF_HEALING_QA.md</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-left">Encountered a red error? Press this to spawn a QA ghost to debug, fix, and verify until tests pass.</p>
            </button>

          </div>
        </div>

        {/* Right Output Terminal */}
        <div className="w-1/2 bg-[#0a0a0a] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-slate-500 tracking-widest text-[10px] flex items-center gap-2">
              <Activity className="w-3 h-3" />
              EXECUTIVE EXECUTION LOG
            </h3>
            {isRunning && <Zap className="w-4 h-4 text-amber-400 animate-pulse" />}
          </div>

          <div className="flex-1 bg-black border border-[#222] rounded-xl p-6 font-mono text-[11px] overflow-y-auto space-y-4">
            {!activeCard && (
              <div className="text-slate-600 italic h-full flex items-center justify-center">Awaiting Trump Card selection...</div>
            )}
            
            {logs.filter((log) => typeof log === "string").map((log, i) => (
              <div key={i} className={cn(
                "animate-in fade-in slide-in-from-left-2",
                log.includes("INITIATING") && "text-white font-bold border-b border-[#333] pb-2 mb-2",
                log.includes("ROUTING") && "text-indigo-400",
                log.includes("Detected") && "text-red-400",
                (log.includes("Complete") || log.includes("Successful") || log.includes("PASSED")) && "text-emerald-400 font-bold flex items-center gap-2",
                (!log.includes("INITIATING") && !log.includes("ROUTING") && !log.includes("Detected") && !log.includes("Complete") && !log.includes("Successful") && !log.includes("PASSED")) && "text-slate-400"
              )}>
                {(log.includes("Complete") || log.includes("Successful") || log.includes("PASSED")) && <CheckCircle2 className="w-4 h-4" />}
                {log.includes("ROUTING") ? <span className="mr-2 text-slate-600">↳</span> : null}
                {log}
              </div>
            ))}

            {isRunning && (
              <div className="text-amber-500 animate-pulse mt-4 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Processing...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
