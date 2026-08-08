"use client";

import React, { useState } from "react";
import { Download, Settings2, FileText, FileSpreadsheet, FileJson, CheckSquare, Settings, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExportStudioWorkspace() {
  const [format, setFormat] = useState<"pdf" | "excel" | "json">("pdf");
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 2000);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-fuchsia-400" />
          <h2 className="text-fuchsia-300 font-bold tracking-widest text-sm">F3.3: OMNI-EXPORT PIPELINE STUDIO</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Config Panel */}
        <div className="w-1/2 border-r border-[#222] bg-[#050505] p-8 flex flex-col gap-8 overflow-y-auto">
          
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Export Configuration</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Define the visual rules and data mapping for your export pipelines. This ensures zero page-break issues and production-ready outputs.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-fuchsia-400">OUTPUT FORMAT</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "pdf", name: "PDF Report", icon: FileText },
                { id: "excel", name: "Excel Data", icon: FileSpreadsheet },
                { id: "json", name: "JSON Blob", icon: FileJson },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id as any)}
                  className={cn(
                    "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
                    format === f.id 
                      ? "bg-fuchsia-600/20 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)] text-white" 
                      : "bg-[#111] border-[#333] text-slate-500 hover:border-[#444]"
                  )}
                >
                  <f.icon className="w-6 h-6" />
                  <span className="text-xs font-bold">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-fuchsia-400 flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              VISUAL RULES & PAGINATION
            </label>
            <div className="bg-[#111] border border-[#333] rounded-xl p-4 space-y-3">
              {[
                "Strict A4 Page Boundaries (210x297mm)",
                "Prevent widow/orphan rows in tables",
                "Inject Corporate Logo on Top-Right Header",
                "Grand Totals must stick to bottom of last page"
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckSquare className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-300 text-xs">{rule}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Preview/Deploy Panel */}
        <div className="flex-1 bg-[#0a0a0a] p-8 flex flex-col relative">
          
          <div className="flex-1 bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner group">
             {/* Mock Preview Content */}
             <div className="absolute inset-4 border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center p-8 text-center gap-4 group-hover:border-fuchsia-500/30 transition-colors">
               <Settings className="w-12 h-12 text-slate-600" />
               <div>
                 <div className="text-slate-300 font-bold mb-1">PIPELINE READY</div>
                 <div className="text-slate-500 text-xs font-mono">Bound to `EXPORT_SPEC_TH.md`</div>
               </div>
               
               <div className="w-full max-w-xs space-y-2 mt-4 text-left">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full" />
                  <div className="h-1.5 w-3/4 bg-slate-800 rounded-full" />
                  <div className="h-1.5 w-5/6 bg-slate-800 rounded-full" />
               </div>
             </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]"
            >
              <Play className={cn("w-5 h-5", isDeploying && "animate-pulse")} />
              {isDeploying ? "DEPLOYING PIPELINE..." : "DEPLOY EXPORT PIPELINE"}
            </button>
            <p className="text-center text-slate-500 text-[10px] mt-4 font-mono">
              Generates API endpoints & Service Workers for {format.toUpperCase()} generation.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
