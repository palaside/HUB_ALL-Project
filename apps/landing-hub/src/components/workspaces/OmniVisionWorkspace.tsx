"use client";

import React, { useState } from "react";
import { ScanSearch, Image as ImageIcon, Zap, UploadCloud, CheckCircle2, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";

export function OmniVisionWorkspace() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setResult(null);
    
    // Simulate CUDA OCR processing
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        extracted_data: {
          document_type: "Bank Transfer Slip",
          sender: "MR. JOHN DOE",
          receiver: "ABC CORPORATION LTD",
          amount: "45,000.00 THB",
          timestamp: "2026-07-18T10:15:32",
          ref_code: "TRX-993821004"
        },
        confidence: 0.998,
        engine: "Qwen-VL-Max (CUDA Accel.)",
        proc_time: "42ms"
      });
    }, 2500);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <ScanSearch className="w-5 h-5 text-emerald-400" />
          <h2 className="text-emerald-300 font-bold tracking-widest text-sm">F6.1: OMNI-VISION & CUDA OCR SCANNER</h2>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 text-[10px] font-bold flex items-center gap-2">
          <Zap className="w-3 h-3" />
          CUDA CORES ALLOCATED: 4096
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Dropzone */}
        <div className="w-1/2 border-r border-[#222] bg-[#050505] p-8 flex flex-col gap-6 relative">
          
          <div className="text-slate-400 text-xs leading-relaxed">
            Drag and drop Bank Slips, Identity Cards, or PDF Manuals. The local NVIDIA CUDA cores will extract structured JSON data at lightning speed with zero cloud dependency.
          </div>

          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleScan(); }}
            className={cn(
              "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden",
              dragActive ? "border-emerald-500 bg-emerald-950/20" : "border-[#333] bg-[#0a0a0a] hover:bg-[#111] hover:border-emerald-500/50",
              isScanning ? "pointer-events-none" : ""
            )}
            onClick={isScanning ? undefined : handleScan}
          >
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-900/20 z-10 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <div className="w-full h-1 bg-emerald-500/20 absolute top-0 animate-[scan_1.5s_ease-in-out_infinite] shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>
                <Zap className="w-16 h-16 text-emerald-500 animate-pulse mb-4" />
                <div className="text-emerald-400 font-mono tracking-widest font-bold">CUDA OCR PROCESSING...</div>
              </div>
            )}
            
            <UploadCloud className="w-16 h-16 text-slate-700 mb-4" />
            <div className="font-bold text-slate-500 tracking-wider">DROP SLIP OR PDF TO SCAN</div>
            <div className="text-[10px] text-slate-600 mt-2 font-mono">ON-PREMISE INFERENCE ENABLED</div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-1/2 bg-[#0a0a0a] p-8 flex flex-col">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-4 flex items-center gap-2">
            <FileJson className="w-4 h-4" /> OCR EXTRACTED JSON
          </div>

          <div className="flex-1 bg-black border border-[#222] rounded-xl p-6 font-mono text-[11px] overflow-y-auto relative">
            {!result && !isScanning && (
              <div className="text-slate-600 italic h-full flex items-center justify-center">Awaiting document scan...</div>
            )}
            
            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#333]">
                  <div className="bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    CONFIDENCE: {result.confidence * 100}%
                  </div>
                  <div className="text-slate-500">
                    Engine: <span className="text-slate-300">{result.engine}</span>
                  </div>
                  <div className="text-slate-500">
                    Time: <span className="text-slate-300">{result.proc_time}</span>
                  </div>
                </div>

                <pre className="text-emerald-400/90 leading-loose">
                  {JSON.stringify(result.extracted_data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
