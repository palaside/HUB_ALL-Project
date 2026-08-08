"use client";

import React, { useState } from "react";
import { Database, Search, ToggleLeft, ToggleRight, Server } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillOrchestrationWorkspace() {
  const [skills, setSkills] = useState([
    { id: 1, name: "FABLE_SKILL.md", desc: "Omniscient Reasoning Engine", status: true, agent: "CEO Orchestrator" },
    { id: 2, name: "API_CRAWLER.md", desc: "REST/GraphQL Automation", status: false, agent: "None" },
    { id: 3, name: "REQUIREMENT_ENGINEER.md", desc: "Strict BA Grilling Mode", status: true, agent: "Context Agent" },
    { id: 4, name: "CSS_MASTER.md", desc: "Tailwind UI Expert", status: false, agent: "None" },
  ]);

  const toggleStatus = (id: number) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, status: !s.status, agent: !s.status ? "Auto-Assigned" : "None" } : s));
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-emerald-400" />
          <h2 className="text-emerald-300 font-bold tracking-widest text-sm">F7.3: THE SKILL MATRIX DATABASE</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 bg-[#050505]">
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
             <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
             <input type="text" placeholder="Search CUSTOM_SYSTEM_AGENTS.md..." className="w-full bg-[#111] border border-[#333] rounded-lg pl-9 pr-4 py-2 text-white outline-none focus:border-emerald-500 text-xs" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
            <Server className="w-3 h-3" /> DATABASE: CONNECTED
          </div>
        </div>

        <div className="flex-1 bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#111] border-b border-[#222] text-[10px] font-bold text-slate-500 tracking-widest">
              <tr>
                <th className="p-4">SKILL CARTRIDGE (FILE)</th>
                <th className="p-4">DESCRIPTION</th>
                <th className="p-4">ASSIGNED AGENT</th>
                <th className="p-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111]">
              {skills.map(s => (
                <tr key={s.id} className="hover:bg-[#111] transition-colors">
                  <td className="p-4 font-mono text-xs text-white">{s.name}</td>
                  <td className="p-4 text-xs text-slate-400">{s.desc}</td>
                  <td className="p-4 text-xs text-slate-300">{s.agent}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleStatus(s.id)}
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all",
                        s.status ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500 border border-[#333]"
                      )}
                    >
                      {s.status ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      {s.status ? "ONLINE" : "OFFLINE"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
