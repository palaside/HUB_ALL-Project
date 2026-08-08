"use client";

import React, { useState, useEffect } from "react";
import { Radar, ListTodo, CheckCircle2, Clock, AlertTriangle, ArrowRight, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  assignee: "Human" | "Agent 15" | "Agent 04";
}

export function RoadmapWorkspace() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "FEAT-101", title: "Setup Next.js Dashboard Layout", status: "done", assignee: "Human" },
    { id: "FEAT-102", title: "Implement OMNI-ROUTER UI", status: "done", assignee: "Agent 04" },
    { id: "FEAT-103", title: "Design Login Page Components", status: "in-progress", assignee: "Agent 15" },
    { id: "FEAT-104", title: "Connect API to Vector DB", status: "todo", assignee: "Agent 15" },
  ]);

  // Simulate AI Auto-Update
  useEffect(() => {
    const timer = setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === "FEAT-103") {
          return { ...t, status: "done" }; // Agent finishes task
        }
        if (t.id === "FEAT-104") {
          return { ...t, status: "in-progress" }; // Agent moves to next task
        }
        return t;
      }));
    }, 4000); // 4 seconds after mount, simulate agent completing a task
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { id: "todo", title: "TO DO", icon: ListTodo, color: "text-slate-400" },
    { id: "in-progress", title: "IN PROGRESS", icon: Clock, color: "text-amber-400" },
    { id: "done", title: "DONE", icon: CheckCircle2, color: "text-emerald-400" },
  ] as const;

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Radar className="w-5 h-5 text-indigo-400" />
          <h2 className="text-indigo-300 font-bold tracking-widest text-sm">F2.2: AUTONOMOUS ROADMAP & RISK RADAR</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-bold">
          <Bot className="w-3 h-3" />
          AI AUTO-UPDATE ACTIVE
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Kanban Board */}
        <div className="flex-1 p-6 overflow-x-auto flex gap-6 bg-[#050505]">
          {columns.map(col => (
            <div key={col.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#222]">
                <div className={cn("flex items-center gap-2 font-bold tracking-wider text-xs", col.color)}>
                  <col.icon className="w-4 h-4" />
                  {col.title}
                </div>
                <div className="bg-[#111] text-slate-500 text-xs px-2 py-0.5 rounded-full border border-[#222]">
                  {tickets.filter(t => t.status === col.id).length}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {tickets.filter(t => t.status === col.id).map(ticket => (
                  <div key={ticket.id} className="bg-[#0a0a0a] border border-[#222] p-4 rounded-xl hover:border-indigo-500/50 transition-colors shadow-lg group">
                    <div className="text-[10px] font-mono text-slate-500 mb-2">{ticket.id}</div>
                    <div className="font-bold text-slate-200 mb-4">{ticket.title}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111] border border-[#222]">
                        {ticket.assignee !== "Human" ? <Bot className="w-3 h-3 text-indigo-400" /> : <div className="w-3 h-3 rounded-full bg-slate-600" />}
                        <span className="text-[10px] font-bold text-slate-400">{ticket.assignee}</span>
                      </div>
                      
                      {/* Animated transition indicator for 'done' */}
                      {col.id === "done" && ticket.id === "FEAT-103" && (
                         <span className="text-[10px] text-emerald-400 font-bold animate-pulse">Updated by AI just now</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Risk Radar Sidebar */}
        <div className="w-80 bg-[#0a0a0a] border-l border-[#222] p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            TECHNICAL DEBT RADAR
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-amber-950/10 border border-amber-500/20 rounded-xl">
              <div className="text-xs font-bold text-amber-500 mb-1">Hardcoded API Keys</div>
              <div className="text-[10px] text-slate-400 mb-2">Found in `src/services/api.ts` line 42. Needs migration to .env</div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">High Risk</span>
                <button className="text-[10px] text-cyan-400 hover:underline">Create Ticket</button>
              </div>
            </div>

            <div className="p-4 bg-[#111] border border-[#333] rounded-xl">
              <div className="text-xs font-bold text-slate-300 mb-1">Missing Test Coverage</div>
              <div className="text-[10px] text-slate-500 mb-2">Component `VisualSpecWorkspace.tsx` coverage is below 80%</div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Medium Risk</span>
                <button className="text-[10px] text-cyan-400 hover:underline">Create Ticket</button>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-[#222]">
             <div className="text-xs text-slate-500 font-mono text-center">
               Data synced from <br/> `FEATURE_STATUS.md`
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
