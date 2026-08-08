"use client";

import React, { useState } from "react";
import { MonitorPlay, Play, Film, Type, Image as ImageIcon, Music, LayoutTemplate, Aperture } from "lucide-react";
import { cn } from "@/lib/utils";

export function CinematicHudWorkspace() {
  const [hudActive, setHudActive] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(0);

  const handleGenerate = () => {
    if (!prompt) return;
    setGenerating(true);
    setStage(0);

    const interval = setInterval(() => {
      setStage(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setGenerating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const pipeline = [
    { icon: Type, name: "SCRIPT INFERENCE" },
    { icon: ImageIcon, name: "SCENE GENERATION" },
    { icon: Film, name: "VIDEO INTERPOLATION" },
    { icon: Music, name: "TTS & SFX MASTERING" },
  ];

  return (
    <div className={cn(
      "border rounded-xl flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm transition-all duration-1000 relative",
      hudActive ? "bg-transparent border-cyan-500/50 shadow-[inset_0_0_100px_rgba(6,182,212,0.15)]" : "bg-[#111] border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
    )}>
      
      {/* 3D Hologram Overlay Effects */}
      {hudActive && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Scanning line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-[scan_3s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "flex justify-between items-center border-b p-4 relative z-10 transition-colors",
        hudActive ? "border-cyan-500/30 bg-black/40 backdrop-blur-md" : "border-[#222] bg-[#0a0a0a]"
      )}>
        <div className="flex items-center gap-3">
          <MonitorPlay className={cn("w-5 h-5", hudActive ? "text-cyan-400 animate-pulse" : "text-fuchsia-400")} />
          <h2 className={cn("font-bold tracking-widest text-sm", hudActive ? "text-cyan-300" : "text-fuchsia-300")}>
            F6.3: CINEMATIC HUD & MEDIA FACTORY
          </h2>
        </div>
        <button 
          onClick={() => setHudActive(!hudActive)}
          className={cn(
            "flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all border tracking-widest",
            hudActive 
              ? "bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]" 
              : "bg-slate-800 border-slate-600 text-slate-400"
          )}
        >
          <Aperture className={cn("w-4 h-4", hudActive && "animate-spin-slow")} />
          {hudActive ? "HUD MODE : ENGAGED" : "ACTIVATE HUD MODE"}
        </button>
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        
        {/* Workspace Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          
          <div className={cn(
            "w-full max-w-4xl p-8 rounded-2xl flex flex-col gap-8 transition-all duration-700",
            hudActive ? "bg-black/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.1)]" : "bg-[#050505] border border-[#222]"
          )}>
            
            {/* Prompt Input */}
            <div>
              <div className={cn("text-xs font-bold tracking-widest mb-3 flex items-center gap-2", hudActive ? "text-cyan-400" : "text-slate-400")}>
                <LayoutTemplate className="w-4 h-4" /> OPENMONTAGE PROMPT
              </div>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. สร้างวิดีโอพรีเซนต์โปรเจกต์นี้แบบ Cinematic 15 วินาที"
                  className={cn(
                    "flex-1 px-6 py-4 rounded-xl outline-none font-mono text-sm transition-all",
                    hudActive 
                      ? "bg-cyan-950/20 border border-cyan-500/40 text-cyan-100 placeholder:text-cyan-700 focus:border-cyan-400" 
                      : "bg-[#111] border border-[#333] text-white"
                  )}
                />
                <button 
                  onClick={handleGenerate}
                  disabled={generating || !prompt}
                  className={cn(
                    "px-8 rounded-xl font-bold tracking-widest transition-all flex items-center gap-2",
                    hudActive
                      ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] disabled:bg-cyan-900/50 disabled:text-cyan-500"
                      : "bg-fuchsia-600 hover:bg-fuchsia-500 text-white disabled:bg-[#222]"
                  )}
                >
                  <Play className="w-5 h-5 fill-current" /> RENDER
                </button>
              </div>
            </div>

            {/* Pipeline Visualization */}
            <div className="grid grid-cols-4 gap-4">
              {pipeline.map((p, i) => {
                const isActive = stage === i;
                const isDone = stage > i;
                return (
                  <div key={i} className={cn(
                    "p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition-all duration-500 relative overflow-hidden",
                    isDone ? (hudActive ? "border-cyan-500/50 bg-cyan-950/20 text-cyan-400" : "border-emerald-500/50 bg-emerald-950/20 text-emerald-400") :
                    isActive ? (hudActive ? "border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "border-fuchsia-400 bg-fuchsia-500/20 text-white") :
                    "border-[#222] bg-[#0a0a0a] text-slate-600"
                  )}>
                    {isActive && <div className={cn("absolute inset-0 opacity-20 animate-pulse", hudActive ? "bg-cyan-400" : "bg-fuchsia-400")} />}
                    <p.icon className="w-8 h-8 relative z-10" />
                    <div className="text-[10px] font-bold tracking-wider relative z-10">{p.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Mock Video Player */}
            <div className={cn(
              "h-64 rounded-xl border flex flex-col items-center justify-center transition-all duration-1000",
              stage >= 4 
                ? (hudActive ? "border-cyan-400 bg-cyan-950/30" : "border-[#333] bg-black") 
                : "border-[#222] bg-[#050505] opacity-50"
            )}>
              {stage >= 4 ? (
                <div className="text-center animate-in zoom-in-95 duration-500">
                  <MonitorPlay className={cn("w-16 h-16 mx-auto mb-4", hudActive ? "text-cyan-400" : "text-white")} />
                  <div className={cn("font-mono text-sm tracking-widest", hudActive ? "text-cyan-300" : "text-slate-400")}>
                    OUTPUT_RENDER_FINAL.mp4
                  </div>
                </div>
              ) : (
                <div className="text-slate-600 italic text-xs tracking-widest">AWAITING RENDER INSTRUCTIONS</div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
