"use client";

import React, { useState } from "react";
import { Shield, Lock, Unlock, FileCheck, CheckCircle2, ArrowRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhaseLockWorkspace() {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleApprove = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setPhase(2);
      setIsUnlocking(false);
    }, 1500);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-500" />
          <h2 className="text-amber-400 font-bold tracking-widest text-sm">F1.2: AGENTIC PHASE-LOCK ENGINE</h2>
        </div>
        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-500 text-xs font-bold tracking-wider">
          WORKFLOW GATEKEEPER ACTIVE
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Stepper Sidebar */}
        <div className="w-64 border-r border-[#222] bg-[#080808] p-6 flex flex-col gap-6">
          <h3 className="text-slate-400 text-xs font-bold tracking-widest mb-4">EXECUTION PIPELINE</h3>
          
          <div className="flex flex-col relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-slate-800" />
            
            <div className="relative flex items-center gap-4 mb-10 opacity-100">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div className="font-bold text-emerald-400">0. /ASK (Gather Intent)</div>
            </div>

            <div className="relative flex items-center gap-4 mb-10 opacity-100">
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors", phase === 1 ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]")}>
                {phase === 1 ? <div className="w-2 h-2 rounded-full bg-white" /> : <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <div className={cn("font-bold transition-colors", phase === 1 ? "text-amber-400" : "text-emerald-400")}>1. /PLAN (Architecture)</div>
            </div>

            <div className="relative flex items-center gap-4 mb-10 opacity-100">
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors", phase === 1 ? "bg-slate-800" : "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]")}>
                {phase === 2 && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div className={cn("font-bold transition-colors", phase === 1 ? "text-slate-500" : "text-cyan-400")}>2. /IMPLEMENT (Coding)</div>
            </div>

            <div className="relative flex items-center gap-4 opacity-50">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center z-10">
              </div>
              <div className="font-bold text-slate-500">3. /REVIEW (QA)</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex flex-col bg-[#111] relative">
          
          {phase === 1 ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
              <div className="w-full max-w-2xl bg-[#0a0a0a] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="bg-amber-500/10 border-b border-amber-500/20 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <FileCheck className="w-5 h-5" />
                    MOCKUP PLAN : LOGIN PAGE SYSTEM
                  </div>
                  <Lock className="w-4 h-4 text-amber-500/50" />
                </div>
                <div className="p-6 font-mono text-xs text-slate-300 leading-relaxed space-y-4">
                  <p className="text-amber-200">## Proposed Architecture</p>
                  <p>- Framework: Next.js 14 + Tailwind CSS</p>
                  <p>- Authentication: NextAuth.js / JWT</p>
                  <p>- Components needed:</p>
                  <p className="pl-4">1. `src/components/auth/LoginForm.tsx`</p>
                  <p className="pl-4">2. `src/app/login/page.tsx`</p>
                  <p className="text-amber-200 mt-4">## AI Guardrails</p>
                  <p>- Strictly follow Anti-AI Design tokens in `globals.css`</p>
                  <p>- Do not use `any` in TypeScript</p>
                </div>
                
                <div className="bg-[#050505] p-6 flex flex-col items-center border-t border-[#222]">
                  <p className="text-slate-400 mb-4 text-center">สถาปนิก AI เสนอแปลนเสร็จสิ้น <br/> รอผู้บริหาร (คุณ) อนุมัติก่อนลงมือเขียนโค้ด (IMPLEMENT)</p>
                  
                  {isUnlocking ? (
                    <div className="px-12 py-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-xl font-bold flex items-center gap-3">
                      <Unlock className="w-5 h-5 animate-bounce" />
                      UNLOCKING PIPELINE...
                    </div>
                  ) : (
                    <button 
                      onClick={handleApprove}
                      className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      APPROVE PLAN
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center animate-in slide-in-from-bottom-8 fade-in">
              <div className="text-center space-y-6">
                <div className="inline-flex p-6 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <Cpu className="w-16 h-16 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">PHASE 2: IMPLEMENTATION</h2>
                  <p className="text-cyan-400 font-mono">Agent is now writing code based on approved plan.</p>
                </div>
                <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-cyan-500 w-1/3 animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
