"use client";

import React from "react";
import { Activity, ShieldAlert, CheckCircle2 } from "lucide-react";

export function LineChartWidget() {
  return (
    <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-200">System Activity Metrics</h3>
          <p className="text-xs text-slate-500 font-mono mt-1">Real-time throughput (last 24h)</p>
        </div>
        <div className="px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-md text-[10px] font-mono text-cyan-400">
          LIVE
        </div>
      </div>
      
      {/* Custom SVG Line Chart */}
      <div className="w-full h-48 relative border-b border-l border-cyan-900/40">
        <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible preserve-3d">
          {/* Grid lines */}
          <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="currentColor" strokeOpacity="0.05" />
          
          {/* The Line */}
          <path 
            d="M 0 100 L 50 60 L 100 110 L 150 40 L 200 80 L 250 20 L 300 90 L 350 30 L 400 50" 
            fill="none" 
            stroke="#0ea5e9" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
          />
          
          {/* Data Points */}
          <circle cx="50" cy="60" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="100" cy="110" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="150" cy="40" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="200" cy="80" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="250" cy="20" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="300" cy="90" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="350" cy="30" r="4" fill="#050505" stroke="#0ea5e9" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

export function DonutChartWidget() {
  return (
    <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-200">Resource Allocation</h3>
        <p className="text-xs text-slate-500 font-mono mt-1">Memory vs Compute</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center my-4 relative">
        <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90 drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#0a101f" strokeWidth="15" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="15" />
          
          {/* Segment 1 */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" strokeWidth="15" strokeDasharray="180 251.2" />
          {/* Segment 2 */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="15" strokeDasharray="50 251.2" strokeDashoffset="-185" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-slate-200">72%</span>
          <span className="text-[8px] font-mono text-cyan-500/70">OPT</span>
        </div>
      </div>

      <div className="flex justify-around text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
          <span className="text-slate-400">Compute</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          <span className="text-slate-400">Memory</span>
        </div>
      </div>
    </div>
  );
}

export function LogListWidget() {
  const logs = [
    { id: 1, message: "Tri-Core Memory initialized", type: "success", time: "2m ago" },
    { id: 2, message: "Watchdog Daemon active", type: "success", time: "5m ago" },
    { id: 3, message: "Token compression ratio at 89%", type: "info", time: "12m ago" },
    { id: 4, message: "Minor latency in Agent 5", type: "warning", time: "24m ago" },
  ];

  return (
    <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-200">System Logs</h3>
        <Activity className="w-4 h-4 text-cyan-500/50" />
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="mt-0.5">
              {log.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {log.type === "info" && <div className="w-4 h-4 rounded-full border-2 border-cyan-400" />}
              {log.type === "warning" && <ShieldAlert className="w-4 h-4 text-amber-400" />}
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-sm text-slate-300">{log.message}</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
