"use client";

import React, { useState } from "react";
import { Ghost, Terminal, Mic, Circle, Settings2, PlaySquare, FileCode2, Power } from "lucide-react";
import { cn } from "@/lib/utils";

export function GhostComputerWorkspace() {
  const [isActive, setIsActive] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  
  const handleExecute = () => {
    if (!voiceInput.trim()) return;
    setIsListening(false);
    
    // Simulate OS takeover
    setLogs([
      "> Voice Command Received: '" + voiceInput + "'",
      "> INITIATING GHOST COMPUTER USE PROTOCOL...",
      "> Taking over OS controls (jarvis_voice.py active)",
    ]);

    const actions = [
      "sys.mouse.moveTo(x: 1450, y: 22)",
      "sys.mouse.click()",
      "sys.keyboard.type('powershell')",
      "sys.keyboard.press('Enter')",
      "> Spawning hidden terminal...",
      "sys.terminal.execute('npm run build')",
      "sys.terminal.execute('vercel deploy --prod')",
      "> Build & Deployment Successful.",
      "> Audio Out: 'Deploy เสร็จสิ้นแล้วครับเจ้านาย'"
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < actions.length) {
        setLogs(prev => [...prev, actions[step]]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="bg-black border border-red-900/50 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.2)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm relative">
      
      {/* Background Matrix/Hacker Effect */}
      <div className={cn(
        "absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none transition-opacity duration-1000",
        isActive ? "opacity-30 mix-blend-color-dodge" : "opacity-0"
      )}></div>

      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#050000] relative z-10">
        <div className="flex items-center gap-3">
          <Ghost className={cn("w-5 h-5", isActive ? "text-red-500 animate-pulse" : "text-slate-600")} />
          <h2 className={cn("font-bold tracking-widest text-sm", isActive ? "text-red-500" : "text-slate-500")}>
            F4.2: GHOST COMPUTER USE & VOICE ENGINE
          </h2>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "px-6 py-2 rounded-full font-bold tracking-widest flex items-center gap-2 transition-all shadow-lg border",
            isActive 
              ? "bg-red-950/50 text-red-500 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]" 
              : "bg-[#111] text-slate-500 border-[#333] hover:text-slate-300"
          )}
        >
          <Power className="w-4 h-4" />
          {isActive ? "GHOST MODE: ONLINE" : "ACTIVATE GHOST MODE"}
        </button>
      </div>

      <div className="flex-1 flex flex-col relative z-10 opacity-100 transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0.4, pointerEvents: isActive ? 'auto' : 'none' }}>
        
        {/* Voice Input Section */}
        <div className="p-8 border-b border-[#222] bg-gradient-to-b from-[#1a0505] to-black flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-2xl">
            <div className={cn(
              "absolute -inset-1 rounded-full blur opacity-25 transition-all duration-1000",
              isListening ? "bg-red-600 opacity-75 animate-pulse" : "bg-transparent"
            )}></div>
            <div className="relative flex items-center bg-[#0a0000] border border-red-900/50 rounded-full p-2 shadow-2xl">
              <button 
                onClick={() => setIsListening(!isListening)}
                className={cn(
                  "p-4 rounded-full transition-colors flex-shrink-0",
                  isListening ? "bg-red-600 text-white animate-pulse" : "bg-[#111] hover:bg-[#222] text-red-500"
                )}
              >
                <Mic className="w-6 h-6" />
              </button>
              <input
                type="text"
                value={voiceInput}
                onChange={(e) => setVoiceInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                placeholder="Speak or type command... (e.g. 'Deploy โปรเจกต์นี้ขึ้น Vercel')"
                className="w-full bg-transparent border-none outline-none text-red-100 px-6 py-4 text-lg font-mono placeholder:text-red-900/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-[10px] text-red-500/50 font-mono tracking-widest">
            {isListening ? (
              <><Circle className="w-2 h-2 fill-red-500 animate-ping" /> RECORDING VIA jarvis_voice.py</>
            ) : (
              <><Settings2 className="w-3 h-3" /> WAITING FOR AUDIO INPUT</>
            )}
          </div>
        </div>

        {/* OS Takeover Terminal */}
        <div className="flex-1 p-6 flex flex-col bg-[#050000]">
          <div className="flex items-center gap-2 text-red-900/70 mb-4 font-mono text-[10px] uppercase">
            <Terminal className="w-4 h-4" />
            <span className="tracking-widest">OS-Level Execution Terminal</span>
          </div>

          <div className="flex-1 bg-black border border-red-950/30 rounded-xl p-6 font-mono text-xs overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-red-900/30 italic flex items-center justify-center h-full">System awaiting Ghost override commands...</div>
            ) : (
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className={cn(
                    "animate-in slide-in-from-bottom-2 fade-in",
                    log.startsWith(">") ? "text-red-400 font-bold mt-4" : "text-slate-400 pl-4 border-l border-[#333]"
                  )}>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Inactive Overlay */}
      {!isActive && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <Ghost className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-slate-400 font-bold tracking-widest text-lg">SYSTEM OFFLINE</h3>
            <p className="text-slate-600 text-xs mt-2">Activate Ghost Mode to grant OS-level control.</p>
          </div>
        </div>
      )}

    </div>
  );
}
