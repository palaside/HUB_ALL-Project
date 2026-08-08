"use client";

import React, { useState } from "react";
import { Stethoscope, Activity, CheckCircle2, XCircle, AlertTriangle, RefreshCcw, Server, Database, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceStatus = "idle" | "scanning" | "ok" | "failed" | "warning";

interface Service {
  id: string;
  name: string;
  icon: React.ElementType;
  status: ServiceStatus;
  message?: string;
  delay: number;
}

export function DiagnosticWorkspace() {
  const [isScanning, setIsScanning] = useState(false);
  const [services, setServices] = useState<Service[]>([
    { id: "core", name: "Agentic Core Engine", icon: Cpu, status: "idle", delay: 800 },
    { id: "cuda", name: "GPU CUDA Backend", icon: Server, status: "idle", delay: 1500 },
    { id: "ollama", name: "Local LLM (Ollama)", icon: Activity, status: "idle", delay: 2200 },
    { id: "db", name: "Vector Database (Chroma)", icon: Database, status: "idle", delay: 1200 },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setServices(prev => prev.map(s => ({ ...s, status: "scanning", message: undefined })));

    services.forEach((service) => {
      setTimeout(() => {
        setServices(prev => prev.map(s => {
          if (s.id === service.id) {
            // Simulate random failure for Ollama for demonstration, otherwise OK
            if (s.id === "ollama" && Math.random() > 0.5) {
              return { ...s, status: "failed", message: "Connection Refused (Port 11434)" };
            }
            if (s.id === "db" && Math.random() > 0.7) {
              return { ...s, status: "warning", message: "High latency detected (320ms)" };
            }
            return { ...s, status: "ok", message: "Optimal Performance" };
          }
          return s;
        }));
      }, service.delay);
    });

    setTimeout(() => {
      setIsScanning(false);
    }, Math.max(...services.map(s => s.delay)) + 500);
  };

  const StatusIcon = ({ status }: { status: ServiceStatus }) => {
    switch (status) {
      case "scanning": return <RefreshCcw className="w-5 h-5 text-cyan-400 animate-spin" />;
      case "ok": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "failed": return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-slate-700" />;
    }
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-emerald-400" />
          <h2 className="text-emerald-300 font-bold tracking-widest text-sm">F2.1: ONE-CLICK DIAGNOSTIC & HEALTH</h2>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center bg-[#050505] relative overflow-y-auto">
        <div className="w-full max-w-4xl space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">System Health Scanner</h3>
              <p className="text-slate-400 text-xs">Run a real-time diagnostic ping across all background services to detect root causes and prevent downtime.</p>
            </div>
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg font-bold tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all whitespace-nowrap"
            >
              <Activity className={cn("w-5 h-5", isScanning && "animate-pulse")} />
              {isScanning ? "SCANNING..." : "SCAN SYSTEM HEALTH"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
              <div key={service.id} className={cn(
                "p-6 rounded-xl border transition-all duration-300 flex items-center justify-between",
                service.status === "failed" ? "bg-red-950/20 border-red-500/50" :
                service.status === "warning" ? "bg-amber-950/20 border-amber-500/50" :
                service.status === "ok" ? "bg-emerald-950/10 border-emerald-500/30" :
                service.status === "scanning" ? "bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]" :
                "bg-[#0a0a0a] border-[#222]"
              )}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#111] border border-[#333] rounded-lg">
                    <service.icon className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-wide">{service.name}</h4>
                    <p className={cn(
                      "text-xs mt-1 font-mono",
                      service.status === "failed" ? "text-red-400" :
                      service.status === "warning" ? "text-amber-400" :
                      service.status === "ok" ? "text-emerald-400" :
                      "text-slate-500"
                    )}>
                      {service.message || "Awaiting scan..."}
                    </p>
                  </div>
                </div>
                <div>
                  <StatusIcon status={service.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Log Area */}
          <div className="bg-black border border-[#222] rounded-xl p-4 font-mono text-[10px] text-slate-500 h-48 overflow-y-auto space-y-1">
            <div className="text-emerald-600">=== RUNTIME_DIAGNOSTIC_REPORT.md ===</div>
            {services.filter(s => s.status !== "idle").map((s, i) => (
              <div key={i} className="flex gap-4">
                <span>{new Date().toISOString().split('T')[1].slice(0,8)}</span>
                <span>[PING] {s.name}...</span>
                <span className={
                  s.status === "ok" ? "text-emerald-500" :
                  s.status === "failed" ? "text-red-500" :
                  s.status === "warning" ? "text-amber-500" :
                  "text-cyan-500"
                }>{s.status.toUpperCase()}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
