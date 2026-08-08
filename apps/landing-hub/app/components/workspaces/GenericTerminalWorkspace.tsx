"use client";

import React, { useState } from "react";
import { Terminal, Send, Loader2, Save, BookOpen, Target, CheckCircle2, PlayCircle } from "lucide-react";
import { featureManuals, defaultManual } from "@/lib/manuals";
import { ChatInterface } from "./ChatInterface";

interface GenericTerminalWorkspaceProps {
  featureId: string;
  title: string;
  type: string;
}

export function GenericTerminalWorkspace({ featureId, title, type }: GenericTerminalWorkspaceProps) {
  // Get manual for this feature or fallback to default
  const manual = featureManuals[featureId] || defaultManual;

  return (
    <div className="bg-[#080c16] border border-cyan-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(14,165,233,0.15)] flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-300 min-h-[600px]">
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
        <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 
          ACTIVE WORKSPACE: {title}
        </h2>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded">
          SUB-AGENT READY
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Left Side: HOW TO MANUAL */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="text-sm font-bold text-cyan-400 border-b border-cyan-500/30 pb-2 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> HOW TO MANUAL
          </div>
          
          <div className="space-y-6 text-sm text-slate-300">
            {/* Usage */}
            <div>
              <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> วิธีการใช้งาน
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                {manual.usage.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Expectation */}
            <div>
              <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> สิ่งที่คาดหวัง
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                {manual.expectation.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> สิ่งที่ได้รับจากการใช้งาน
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                {manual.result.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Example */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs whitespace-pre-wrap">
              <span className="text-cyan-500 font-bold mb-1 block"># ตัวอย่าง (EXAMPLE SCENARIO)</span>
              {manual.example}
            </div>
          </div>
        </div>

        {/* Right Side: CONTEXTUAL CHATBOT */}
        <div className="flex flex-col h-[500px]">
           <div className="text-sm font-bold text-cyan-400 border-b border-cyan-500/30 pb-2 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> SUB-AGENT TERMINAL
          </div>
          <ChatInterface featureId={featureId} featureTitle={title} />
        </div>
      </div>
    </div>
  );
}
