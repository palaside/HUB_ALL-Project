"use client";

import React, { useState } from "react";
import { Plug, FolderPlus, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExpansionPortWorkspace() {
  const [moduleName, setModuleName] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleCreate = () => {
    if (!moduleName.trim()) return;
    setIsBuilding(true);
    setLogs([]);

    const steps = [
      `[SYS] Initializing Expansion Port for "${moduleName}"...`,
      `[MKDIR] Created directory /28_${moduleName.toUpperCase().replace(/\s+/g, "_")}`,
      `[INJECT] Generating Tri-Core Memory structure...`,
      `[WRITE] /PROJECT_STATUS.md -> OK`,
      `[WRITE] /CONTEXT.md -> OK`,
      `[WRITE] /MEMORY.md -> OK`,
      `[UPDATE] Modifying 00_TOTAL_SYSTEM_INDEX.md...`,
      `[SUCCESS] Module "${moduleName}" is online and mapped to Swarm Hierarchy.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
      }
    }, 400);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Plug className="w-5 h-5 text-indigo-400" />
          <h2 className="text-indigo-300 font-bold tracking-widest text-sm">F1.3: UNIVERSAL EXPANSION PORT</h2>
        </div>
      </div>

      <div className="flex-1 flex">
        
        {/* Left Form Panel */}
        <div className="w-1/3 border-r border-[#222] bg-[#0a0a0a] p-8 flex flex-col gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Module Setup Wizard</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Create a new system module seamlessly. The engine will automatically provision Tri-Core Memory and update the central index.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <div>
              <label className="block text-xs font-bold text-indigo-400 mb-2">MODULE NAME</label>
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                disabled={isBuilding}
                placeholder="e.g. ระบบเชื่อมต่อ Blockchain"
                className="w-full bg-[#111] border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleCreate}
              disabled={isBuilding || !moduleName.trim()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              {isBuilding ? <FolderPlus className="w-5 h-5 animate-bounce" /> : <FolderPlus className="w-5 h-5" />}
              {isBuilding ? "BUILDING MODULE..." : "+ ADD NEW SYSTEM MODULE"}
            </button>
          </div>
        </div>

        {/* Right Terminal Panel */}
        <div className="flex-1 bg-[#050505] p-6 flex flex-col relative">
          <div className="flex items-center gap-2 text-slate-500 border-b border-[#222] pb-4 mb-4">
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-xs">EXPANSION_ENGINE_TERMINAL</span>
          </div>
          
          <div className="flex-1 font-mono text-xs overflow-y-auto space-y-2 text-slate-300">
            {!isBuilding && logs.length === 0 && (
              <div className="text-slate-600 italic">Waiting for input...</div>
            )}
            
            {logs.map((log, i) => (
              <div key={i} className={cn(
                "animate-in slide-in-from-left-2 fade-in",
                log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" : "",
                log.includes("[INJECT]") || log.includes("[UPDATE]") ? "text-indigo-300" : ""
              )}>
                <span className="opacity-50 select-none mr-4">{new Date().toISOString().split('T')[1].slice(0,8)}</span>
                {log}
              </div>
            ))}
            
            {isBuilding && (
              <div className="flex items-center gap-2 mt-4 text-indigo-400">
                <Code2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
