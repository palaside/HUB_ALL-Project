"use client";

import React, { useState } from "react";
import { TerminalSquare, Settings2, CheckSquare, AlignLeft, Send, Code2, Users, Target, Database, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_CONSTRAINTS = [
  "Mandatory Mermaid.js Architecture Diagram (graph TD)",
  "Strict TypeScript Typing (No `any`)",
  "Format as 5-point Executive Summary",
  "Exclude all CSS / Use Tailwind exclusively"
];

export function PromptStudioWorkspace() {
  const [role, setRole] = useState("Principal Architect");
  const [contextJson, setContextJson] = useState("");
  const [mode, setMode] = useState("PLAN");
  const [activeConstraints, setActiveConstraints] = useState<string[]>([ALL_CONSTRAINTS[0], ALL_CONSTRAINTS[1]]);
  const [generated, setGenerated] = useState(false);
  const [outputPrompt, setOutputPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleConstraint = (rule: string) => {
    setActiveConstraints(prev => 
      prev.includes(rule) ? prev.filter(r => r !== rule) : [...prev, rule]
    );
  };

  const handleGenerate = () => {
    let modeInstruction = "";
    if (mode === "PLAN") modeInstruction = "Analyze the requirements and generate a comprehensive step-by-step implementation plan. Do NOT write source code yet.";
    else if (mode === "IMPLEMENT") modeInstruction = "Write the complete source code based on the context. Ensure all edge cases are handled.";
    else if (mode === "REVIEW") modeInstruction = "Perform a strict code review on the provided context. Point out security flaws, performance bottlenecks, and architectural violations.";

    const promptText = `<ROLE>
Act as a ${role} with 15+ years of enterprise experience. You prioritize stability, strict typings, and maintainable architectural patterns over quick hacks.

<CONTEXT>
${contextJson.trim() || "No context provided. Rely on your general knowledge."}

<ACTION>
Your current execution mode is: ${mode}.
${modeInstruction}

<OUTPUT_CONSTRAINTS>
${activeConstraints.length > 0 ? activeConstraints.map(c => `- ${c}`).join("\n") : "- None"}
`;
    
    setOutputPrompt(promptText);
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <TerminalSquare className="w-5 h-5 text-fuchsia-400" />
          <h2 className="text-fuchsia-300 font-bold tracking-widest text-sm">F5.2: RCAO PROMPT GENERATOR STUDIO</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Form Builder */}
        <div className="w-1/2 border-r border-[#222] bg-[#050505] p-6 flex flex-col gap-6 overflow-y-auto">
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-fuchsia-400 tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4" /> [R] ROLE INJECTION
            </label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#111] border border-[#333] text-white rounded-lg p-3 outline-none focus:border-fuchsia-500"
            >
              <option>Principal Architect</option>
              <option>Senior Full Stack Engineer</option>
              <option>UI/UX Design Specialist</option>
              <option>Strict QA Automator</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-fuchsia-400 tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4" /> [C] CONTEXT INJECTION
            </label>
            <textarea
              value={contextJson}
              onChange={(e) => setContextJson(e.target.value)}
              className="w-full h-32 bg-[#0a101f] border border-[#333] text-indigo-100 rounded-lg p-3 outline-none focus:border-fuchsia-500 font-mono text-xs resize-none"
              placeholder="Paste the JSON Envelope from 6C Engine here..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-fuchsia-400 tracking-widest flex items-center gap-2">
              <Target className="w-4 h-4" /> [A] ACTION MODE
            </label>
            <div className="flex gap-2">
              {["PLAN", "IMPLEMENT", "REVIEW"].map(m => (
                <button 
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 py-2 rounded-lg font-bold text-xs tracking-wider border transition-all",
                    mode === m ? "bg-fuchsia-950/40 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]" : "bg-[#111] border-[#333] text-slate-500 hover:bg-[#222]"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-fuchsia-400 tracking-widest flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> [O] OUTPUT CONSTRAINTS
            </label>
            <div className="bg-[#111] border border-[#333] rounded-xl p-4 space-y-3">
              {ALL_CONSTRAINTS.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleConstraint(rule)}>
                  <div className={cn("w-4 h-4 mt-0.5 shrink-0 rounded flex items-center justify-center border transition-colors", activeConstraints.includes(rule) ? "bg-fuchsia-500 border-fuchsia-500" : "border-slate-600 bg-transparent")}>
                    {activeConstraints.includes(rule) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn("text-xs transition-colors", activeConstraints.includes(rule) ? "text-slate-200" : "text-slate-500")}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button 
              onClick={handleGenerate}
              className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]"
            >
              <Code2 className="w-5 h-5" />
              GENERATE RCAO PROMPT
            </button>
          </div>
        </div>

        {/* Right: Prompt Output */}
        <div className="w-1/2 bg-[#0a0a0a] p-6 flex flex-col relative group">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-4 flex justify-between items-center">
            <span>PRODUCTION-READY PROMPT</span>
            {generated && (
              <button 
                onClick={handleCopy}
                className={cn("flex items-center gap-1 transition-colors", copied ? "text-emerald-400" : "text-cyan-400 hover:text-cyan-300")}
              >
                {copied ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />} 
                {copied ? "COPIED!" : "COPY TO CLIPBOARD"}
              </button>
            )}
          </div>

          <div className="flex-1 bg-[#05080f] border border-[#222] rounded-xl p-6 font-mono text-[12px] overflow-y-auto relative">
            {generated ? (
              <pre className="text-indigo-200 whitespace-pre-wrap animate-in fade-in leading-relaxed">
                {outputPrompt}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                <AlignLeft className="w-12 h-12 opacity-50" />
                <p>Configure RCAO parameters to generate prompt.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PromptStudioWorkspace;
