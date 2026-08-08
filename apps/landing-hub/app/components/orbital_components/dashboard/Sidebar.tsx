"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Aperture, 
  Compass, 
  Shield, 
  PencilRuler, 
  Hexagon, 
  Globe, 
  Cpu,
  LogOut,
  Settings,
  Terminal,
  Monitor,
  FolderSearch,
  FileText,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInterface } from "@/components/workspaces/ChatInterface";

const navItems = [
  { id: 1, name: "COMMANDER", icon: Aperture },
  { id: 2, name: "ROUTER", icon: Compass },
  { id: 3, name: "HEALTH & LAW", icon: Shield },
  { id: 4, name: "BLUEPRINTS", icon: PencilRuler },
  { id: 5, name: "PROMPT ENGINE", icon: Hexagon },
  { id: 6, name: "INTEGRATION", icon: Globe },
  { id: 7, name: "SKILLS", icon: Cpu },
  { id: 8, name: "AI ENGINEERING STACK", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);

  return (
    <>
      <aside className="w-64 bg-[#0a101f] border-r border-cyan-900/30 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        {/* Brand / Logo */}
        <div className="h-20 flex items-center px-6 border-b border-cyan-900/30">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all">
              <Aperture className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-cyan-300 tracking-wider text-sm">PALASIDE</span>
              <span className="font-mono text-[9px] text-cyan-500/70 tracking-[0.2em]">OS GOVERNOR</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 mb-2">
            <span className="text-[10px] font-mono text-cyan-500/50 tracking-widest uppercase">Agent Groups</span>
          </div>
          
          {navItems.map((item) => {
            const href = `/dashboard/${item.id}`;
            const isActive = pathname === href;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono tracking-wide transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(14,165,233,0.1)]" 
                    : "text-slate-400 hover:text-cyan-200 hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                )}
                <Icon className={cn("w-4 h-4", isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-300")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-cyan-900/30 flex flex-col gap-2 relative">
          
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono tracking-wide bg-cyan-950/40 border border-cyan-500/50 hover:bg-cyan-900/60 text-cyan-400 transition-all group shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Terminal className="w-4 h-4 group-hover:text-cyan-300" />
            PCCOS TERMINAL
          </button>

          <button 
            onClick={() => setIsProgramMenuOpen(!isProgramMenuOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono tracking-wide bg-[#0a101f] border border-emerald-500/50 hover:bg-emerald-950/40 text-emerald-400 transition-all group shadow-[0_0_15px_rgba(52,211,153,0.3)]"
          >
            <Monitor className="w-4 h-4 group-hover:text-emerald-300" />
            PROGRAMS
          </button>

          {/* Flyout Menu for Programs */}
          {isProgramMenuOpen && (
            <div className="absolute left-full bottom-20 ml-2 w-64 bg-[#050505] border border-emerald-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md z-50 animate-in fade-in slide-in-from-left-2">
              <div className="p-3 border-b border-emerald-500/20 bg-emerald-950/20 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <h3 className="text-emerald-300 text-xs font-bold tracking-widest">PROGRAM LAUNCHER</h3>
              </div>
              
              <div className="p-2 flex flex-col gap-1">
                <button 
                  onClick={() => {
                    setIsProgramMenuOpen(false);
                    window.location.href = "/dashboard/3"; // Group 2
                  }}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-emerald-900/30 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
                    <FolderSearch className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">1. Digital Evidence</div>
                    <div className="text-[10px] text-slate-400">รันหลักฐานดิจิทัล DIGITAL EVIDENCE</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setIsProgramMenuOpen(false);
                    window.location.href = "/dashboard/1"; // Group 4
                  }}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-emerald-900/30 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">2. Arty</div>
                    <div className="text-[10px] text-slate-400">รันรายงานรอง (e-Slip)</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="h-px bg-cyan-900/30 my-1" />

          <button
            onClick={() => window.open('https://landing-hub-delta.vercel.app/', '_blank')}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono tracking-wide text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/30 transition-all"
          >
            <Cpu className="w-4 h-4" /> AI ENGINEERING STACK
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono tracking-wide text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4 text-slate-500" />
            SETTINGS
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono tracking-wide text-red-400/80 hover:text-red-400 hover:bg-red-950/30 transition-all">
            <LogOut className="w-4 h-4 text-red-500/70" />
            EXIT TO HUD
          </Link>
        </div>
      </aside>

      {/* Floating Chat Interface Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl h-[70vh] shadow-[0_0_80px_rgba(6,182,212,0.4)] rounded-xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="absolute -top-4 -right-4 bg-slate-800 border border-cyan-500/50 rounded-full p-2 text-cyan-400 shadow-lg hover:bg-cyan-900 hover:text-cyan-300 z-50 transition-colors"
            >
              <Power className="w-5 h-5" />
            </button>
            <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden border border-cyan-500/30">
               <ChatInterface />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
