"use client";

import React, { useState } from "react";
import { Search, Server, Shield, Cpu, Activity, Zap, CheckCircle2, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

export function OmniRouterWorkspace() {
  const [command, setCommand] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<{ id: string; name: string; status: "idle" | "waking" | "ready" }[]>([]);

  const handleExecute = () => {
    if (!command.trim()) return;
    setIsScanning(true);
    setResults([]);

    // Simulate scanning and routing
    setTimeout(() => {
      setResults([
        { id: "agent-15", name: "Agent 15: SPA STUDIO", status: "waking" },
        { id: "agent-04", name: "Agent 04: ANTI-AI DESIGN", status: "waking" }
      ]);
      
      setTimeout(() => {
        setResults(prev => prev.map(r => ({ ...r, status: "ready" })));
        setIsScanning(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-cyan-400" />
          <h2 className="text-cyan-300 font-bold tracking-widest text-sm">F1.1: OMNI-ROUTER DASHBOARD</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isScanning ? "bg-cyan-400" : "bg-slate-500")}></span>
            <span className={cn("relative inline-flex rounded-full h-3 w-3", isScanning ? "bg-cyan-500" : "bg-slate-500")}></span>
          </span>
          <span className="text-xs text-slate-400 font-mono">{isScanning ? "DAEMON ROUTING..." : "DAEMON IDLE"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#111] to-[#111]">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="w-full max-w-3xl relative z-10 flex flex-col items-center gap-12">
          
          {/* Logo / Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-2">
              <Zap className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-widest">OMNI-ROUTER</h1>
            <p className="text-cyan-500/70 font-mono">Invisible Daemon Routing & Pre-Warm Context</p>
          </div>

          {/* Search Bar */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#050505] rounded-xl border border-cyan-500/30 shadow-2xl p-2">
              <Search className="w-6 h-6 text-cyan-500/50 ml-4" />
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                placeholder="ป้อนคำสั่งดิบ... (เช่น ทำหน้า Login ให้หน่อย)"
                className="w-full bg-transparent border-none outline-none text-white px-4 py-4 text-lg font-mono placeholder:text-slate-600"
                disabled={isScanning}
              />
              <button 
                onClick={handleExecute}
                disabled={isScanning || !command.trim()}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg font-bold tracking-wider transition-colors"
              >
                EXECUTE
              </button>
            </div>
          </div>

          {/* Routing Results & Agent Nodes */}
          <div className="w-full h-48 flex items-center justify-center">
            {isScanning && results.length === 0 && (
              <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in">
                <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono text-sm">SCANNING ARCHITECTURAL TREE 360...</span>
              </div>
            )}

            {results.length > 0 && (
              <div className="flex gap-8 items-center animate-in slide-in-from-bottom-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 rounded-xl bg-[#0a0a0a] border-2 border-slate-700 text-slate-400 shadow-lg">
                    <Search className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">USER INTENT</span>
                </div>

                <div className="w-16 h-0.5 bg-gradient-to-r from-slate-700 to-cyan-500 relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-50 animate-pulse"></div>
                </div>

                <div className="flex flex-col gap-4">
                  {results.map((agent, idx) => (
                    <div key={idx} className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 shadow-lg",
                      agent.status === "waking" ? "bg-amber-950/30 border-amber-500/50 text-amber-400" : "bg-emerald-950/30 border-emerald-500/50 text-emerald-400"
                    )}>
                      {agent.status === "waking" ? <CircleDashed className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
                      <div>
                        <div className="font-bold tracking-wider">{agent.name}</div>
                        <div className="text-xs opacity-70 font-mono">
                          {agent.status === "waking" ? "LOADING TO RAM..." : "PRE-WARMED & READY"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
