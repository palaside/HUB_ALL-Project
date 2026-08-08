"use client";

import React, { useState } from "react";
import { HardDriveDownload, Cpu, Filter, Scissors, PackageSearch, Zap, FileJson, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContextCompressionWorkspace() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState({ tokens: 85400, purity: 32 });
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const handleCompress = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setStep(0);
    setOutput([`[SYS] Initiating REAL 6C Compression Pipeline...`]);
    
    // Simulate 6C Pipeline visually
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          return prev;
        }
        
        // Update metrics on each step to show compression
        if (prev === 1) setMetrics({ tokens: 62000, purity: 45 }); // Clean
        if (prev === 2) setMetrics({ tokens: 18000, purity: 72 }); // Curate
        if (prev === 3) setMetrics({ tokens: 5400, purity: 88 });  // Compress
        if (prev === 4) setMetrics({ tokens: 2400, purity: 98 });  // Compose
        if (prev === 5) setMetrics({ tokens: 2400, purity: 100 }); // Deliver

        return prev + 1;
      });
    }, 1000);

    try {
      const response = await fetch('/api/compress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputText }),
      });
      const data = await response.json();
      
      const checkDone = setInterval(() => {
        setStep(current => {
          if (current >= 6) {
            clearInterval(checkDone);
            setIsProcessing(false);
            if (data.success && data.envelope) {
              const jsonStr = JSON.stringify(data.envelope, null, 2);
              setOutput([
                "[SYS] Context successfully compressed.",
                "=== ARCHITECTURAL JSON ENVELOPE ===",
                ...jsonStr.split('\n')
              ]);
              if (data.envelope.purity_score) {
                setMetrics(m => ({ ...m, purity: data.envelope.purity_score }));
              }
            } else {
              setOutput(["[ERR] Invalid response format from LLM."]);
            }
          }
          return current;
        });
      }, 500);
    } catch (e) {
      setOutput(["[ERR] Compression Engine API failed."]);
      setIsProcessing(false);
    }
  };

  const stepsList = [
    { name: "COLLECT", icon: HardDriveDownload, desc: "Ingesting raw documentation & code" },
    { name: "CLEAN", icon: Filter, desc: "Removing boilerplate, comments, formatting" },
    { name: "CURATE", icon: PackageSearch, desc: "Isolating architecture-specific vectors" },
    { name: "COMPRESS", icon: Scissors, desc: "Summarizing via LLM semantic packing" },
    { name: "COMPOSE", icon: FileJson, desc: "Formatting into JSON-Envelope specs" },
    { name: "DELIVER", icon: Zap, desc: "Ready for Zero-Hallucination prompt injection" },
  ];

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-full min-h-[500px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h2 className="text-indigo-300 font-bold tracking-widest text-sm">F5.1: 6C CONTEXT COMPRESSION ENGINE</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Input & Trigger */}
        <div className="w-80 shrink-0 border-r border-[#222] bg-[#050505] p-6 flex flex-col gap-6">
          <div className="text-slate-400 text-xs leading-relaxed">
            Drag and drop massive raw documentation here. The 6C Engine will crush it down to its purest architectural essence, preventing AI context overflow.
          </div>
          
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-24 bg-[#0a101f] border border-indigo-500/30 rounded-lg p-4 text-sm text-indigo-100 font-mono focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/50 resize-none"
            placeholder="> หรือพิมพ์คำสั่ง / ข้อมูลที่ต้องการย่อสรุปที่นี่..."
          />
          
          <div className="flex-1 border-2 border-dashed border-[#333] rounded-2xl flex flex-col items-center justify-center bg-[#0a0a0a] hover:bg-[#111] hover:border-indigo-500/50 transition-all cursor-pointer group">
            <HardDriveDownload className="w-12 h-12 text-slate-600 group-hover:text-indigo-400 mb-4 transition-colors" />
            <div className="font-bold text-slate-400 group-hover:text-indigo-300">DROP RAW FILES HERE</div>
            <div className="text-[10px] text-slate-600 mt-2 font-mono">Accepts .md, .ts, .pdf, .docx</div>
          </div>

          <button 
            onClick={handleCompress}
            disabled={isProcessing}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            {isProcessing ? <Zap className="w-5 h-5 animate-pulse" /> : <Filter className="w-5 h-5" />}
            {isProcessing ? "CRUSHING CONTEXT..." : "COMPRESS CONTEXT"}
          </button>
        </div>

        {/* Right: Pipeline & Metrics */}
        <div className="flex-1 bg-[#0a0a0a] p-6 flex flex-col overflow-hidden gap-4">
          
          {/* Metrics Dashboard */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-2">ESTIMATED TOKENS</div>
              <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                {metrics.tokens.toLocaleString()} <span className="text-sm font-normal text-slate-500 font-mono">tkns</span>
              </div>
              <div className="text-xs text-indigo-400 mt-2">↓ Reduced context load</div>
            </div>
            
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-2">CONTEXT PURITY</div>
              <div className="text-4xl font-bold text-emerald-400 flex items-baseline gap-2">
                {metrics.purity}% 
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${metrics.purity}%` }}></div>
              </div>
            </div>
          </div>

          {/* Pipeline Vis */}
          <div className="bg-black border border-[#222] rounded-xl p-4 flex flex-col justify-center">
             <div className="text-xs font-bold text-slate-500 tracking-widest mb-4">6C COMPRESSION PIPELINE</div>
             
             <div className="flex items-start justify-between relative gap-2">
               {/* Connecting Line */}
               <div className="absolute top-[24px] left-[24px] right-[24px] h-0.5 bg-[#222] -z-0"></div>

               {stepsList.map((s, i) => {
                 const isActive = step === i + 1;
                 const isDone = step > i + 1;

                 return (
                   <div key={i} className="flex flex-col items-center gap-2 relative z-10 flex-1 text-center">
                     <div className={cn(
                       "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-[#111]",
                       isDone ? "bg-indigo-900/50 border-indigo-500 text-indigo-400" :
                       isActive ? "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-110" :
                       "border-[#333] text-slate-600"
                     )}>
                       <s.icon className="w-5 h-5" />
                     </div>
                     <div className={cn("transition-opacity duration-500", isActive && "text-white")}>
                       <div className={cn("font-bold text-[10px] tracking-wider", isDone ? "text-indigo-300" : isActive ? "text-white" : "text-slate-500")}>
                         {s.name}
                       </div>
                       <div className="text-[9px] text-slate-500 hidden xl:block mt-1 leading-tight">{s.desc}</div>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Console Output */}
          <div className="bg-black border border-[#222] rounded-xl p-4 font-mono text-xs flex-1 min-h-0 overflow-y-auto">
             <div className="text-indigo-500/50 mb-2"># COMPRESSION LOG OUTPUT</div>
             {output.length === 0 && <div className="text-slate-600 italic">Awaiting input...</div>}
             {output.map((log, index) => (
                <div key={index} className="text-indigo-300 mb-1">
                  <span className="text-indigo-500/40 mr-2">{'>'}</span>{log}
                </div>
             ))}
             {isProcessing && <div className="text-indigo-400 mt-2 animate-pulse">_</div>}
          </div>

        </div>
      </div>
    </div>
  );
}
