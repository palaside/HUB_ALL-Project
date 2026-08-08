"use client";

import React, { useState } from "react";
import { BrainCircuit, Fingerprint, Activity, Code2, MessagesSquare, Lightbulb, UserCog, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Persona {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  params: {
    temperature: number;
    reasoningDepth: "High" | "Medium" | "Low";
    enforces: string;
  };
}

export function PersonaSwitcherWorkspace() {
  const [activePersona, setActivePersona] = useState<string>("fable5");
  const [isLoading, setIsLoading] = useState(false);

  const personas: Persona[] = [
    {
      id: "fable5",
      name: "Fable 5 Reasoning",
      role: "Deep Logic & Verification",
      icon: BrainCircuit,
      color: "text-purple-400",
      bgColor: "bg-purple-500",
      description: "Forces AI to break down problems, think deeply, and verify itself against hallucination.",
      params: { temperature: 0.2, reasoningDepth: "High", enforces: "FABLE_SKILL.md" }
    },
    {
      id: "architect",
      name: "Principal Architect",
      role: "System Structure & Blueprints",
      icon: UserCog,
      color: "text-blue-400",
      bgColor: "bg-blue-500",
      description: "Generates comprehensive 40-point architectural blueprints before writing any code.",
      params: { temperature: 0.4, reasoningDepth: "High", enforces: "AI_ARCHITECT rules" }
    },
    {
      id: "ba",
      name: "Requirement Engineer",
      role: "Business Analysis & Grilling",
      icon: MessagesSquare,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500",
      description: "Plays the role of a strict BA. Grills you with questions until requirements are crystal clear.",
      params: { temperature: 0.7, reasoningDepth: "Medium", enforces: "requirement_engineer" }
    }
  ];

  const handleSelect = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActivePersona(id);
      setIsLoading(false);
    }, 1200);
  };

  const selected = personas.find(p => p.id === activePersona)!;

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Fingerprint className="w-5 h-5 text-indigo-400" />
          <h2 className="text-indigo-300 font-bold tracking-widest text-sm">F4.3: COGNITIVE PERSONA SWITCHER</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Selection Cards */}
        <div className="w-1/3 border-r border-[#222] bg-[#050505] p-6 flex flex-col gap-4 overflow-y-auto">
          <h3 className="text-slate-400 text-xs font-bold tracking-widest mb-2">SELECT NEURAL PROFILE</h3>
          
          {personas.map(persona => (
            <button
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              disabled={isLoading}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group",
                activePersona === persona.id 
                  ? `bg-[#111] ${persona.color.replace('text-', 'border-')}` 
                  : "bg-[#0a0a0a] border-[#222] hover:border-[#444]"
              )}
            >
              {activePersona === persona.id && (
                <div className={cn("absolute inset-0 opacity-10", persona.bgColor)} />
              )}
              
              <div className="flex items-start gap-4 relative z-10">
                <div className={cn("p-2 rounded-lg", activePersona === persona.id ? `${persona.bgColor}/20` : "bg-[#111]")}>
                  <persona.icon className={cn("w-6 h-6", activePersona === persona.id ? persona.color : "text-slate-500")} />
                </div>
                <div>
                  <div className={cn("font-bold tracking-wide", activePersona === persona.id ? "text-white" : "text-slate-300")}>{persona.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase">{persona.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Active Persona Dash */}
        <div className="flex-1 bg-[#0a0a0a] p-8 flex flex-col relative">
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-indigo-500">
              <Bot className="w-16 h-16 animate-bounce mb-4" />
              <div className="font-mono text-sm tracking-widest animate-pulse">LOADING COGNITIVE PROFILE...</div>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full max-w-2xl mx-auto w-full">
              
              <div className="flex items-center gap-6 mb-12">
                <div className={cn("p-6 rounded-2xl border bg-opacity-10", selected.bgColor.replace('bg-', 'bg-'), selected.color.replace('text-', 'border-'))}>
                  <selected.icon className={cn("w-16 h-16", selected.color)} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selected.name}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">{selected.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <div className="text-slate-500 text-xs font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> COGNITIVE PARAMS
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">Temperature</span>
                        <span className="text-indigo-400 font-mono">{selected.params.temperature}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={cn("h-full", selected.bgColor)} style={{ width: `${selected.params.temperature * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">Reasoning Depth</span>
                        <span className="text-indigo-400 font-mono">{selected.params.reasoningDepth}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={cn("h-full", selected.bgColor)} style={{ width: selected.params.reasoningDepth === "High" ? "100%" : selected.params.reasoningDepth === "Medium" ? "60%" : "30%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-xl p-6 flex flex-col justify-center">
                  <div className="text-slate-500 text-xs font-bold mb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> ENFORCED PROTOCOL
                  </div>
                  <div className={cn("text-lg font-mono font-bold", selected.color)}>
                    {selected.params.enforces}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Zero-hallucination constraint active.</p>
                </div>
              </div>

              <div className="mt-auto p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl text-center">
                <span className="text-indigo-300 text-xs font-bold">READY FOR INPUT:</span>
                <span className="text-slate-400 text-xs ml-2">All subsequent prompts will be processed through this persona.</span>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
