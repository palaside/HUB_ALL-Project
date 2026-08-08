"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md border-b border-cyan-900/20 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-cyan-900/40 rounded-md leading-5 bg-[#0a101f]/50 text-cyan-100 placeholder-cyan-500/30 focus:outline-none focus:bg-[#0a101f] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-sm transition-all font-mono"
          placeholder="Search global indexes..."
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <button className="relative text-cyan-500/60 hover:text-cyan-300 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#050505]" />
        </button>
        
        <div className="flex items-center gap-3 border-l border-cyan-900/30 pl-6">
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-bold text-slate-200">EVE-CEO</span>
            <span className="text-[10px] font-mono text-cyan-500/70 tracking-widest">ADMINISTRATOR</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
            <User className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
