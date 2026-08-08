"use client";

import React, { useState } from "react";
import { Monitor, FileText, FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgramLauncherWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed right-6 top-1/3 z-[100] flex items-start flex-row-reverse gap-4">
      
      {/* Floating Logo Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl border-2 relative group overflow-hidden",
          isOpen ? "bg-emerald-950/80 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]" : "bg-[#0a101f] border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]"
        )}
      >
        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Monitor className={cn("w-7 h-7 transition-colors", isOpen ? "text-emerald-400" : "text-emerald-500")} />
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        )}
      </button>

      {/* Flyout Menu */}
      <div 
        className={cn(
          "bg-[#050505] border border-emerald-500/30 rounded-xl overflow-hidden transition-all duration-300 origin-right shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md w-64",
          isOpen ? "scale-x-100 opacity-100 translate-x-0" : "scale-x-0 opacity-0 translate-x-10 pointer-events-none"
        )}
      >
        <div className="p-3 border-b border-emerald-500/20 bg-emerald-950/20 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-emerald-400" />
          <h3 className="text-emerald-300 text-xs font-bold tracking-widest">PROGRAM LAUNCHER</h3>
        </div>
        
        <div className="p-2 flex flex-col gap-1">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-emerald-900/30 text-left transition-colors group">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
              <FolderSearch className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">1. EVIDENCE</div>
              <div className="text-[10px] text-slate-400">ระบบรวบรวมหลักฐานและตรวจสอบ</div>
            </div>
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-emerald-900/30 text-left transition-colors group">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">2. แบบรายงานรอง</div>
              <div className="text-[10px] text-slate-400">Secondary Report Form System</div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
