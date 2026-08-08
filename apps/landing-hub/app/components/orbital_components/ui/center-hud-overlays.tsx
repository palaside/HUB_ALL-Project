"use client";

import React from "react";
import { motion } from "framer-motion";

export function CenterHudOverlays() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Center UI */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 flex items-start gap-12"
      >
        {/* Left monitors */}
        <div className="flex flex-col gap-2 w-48">
          <div className="flex justify-between text-[10px] font-mono text-cyan-500/70 border-b border-cyan-500/30 pb-1 uppercase tracking-widest">
            <span>Left</span>
            <span>MR</span>
          </div>
          <div className="h-8 border border-cyan-500/20 bg-black/40 flex items-end p-1 gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-cyan-500/50"
                animate={{ height: [2, Math.random() * 20 + 2, 2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Sine Waves */}
        <div className="flex flex-col justify-center gap-2 mt-4 opacity-50">
           <svg width="100" height="20" viewBox="0 0 100 20">
             <path d="M 0 10 Q 25 0 50 10 T 100 10" fill="none" stroke="#22d3ee" strokeWidth="1" />
           </svg>
           <svg width="100" height="20" viewBox="0 0 100 20">
             <path d="M 0 10 Q 25 20 50 10 T 100 10" fill="none" stroke="#a78bfa" strokeWidth="1" />
           </svg>
        </div>

        {/* Right Monitors */}
        <div className="flex flex-col gap-2 w-48">
          <div className="flex justify-between text-[10px] font-mono text-cyan-500/70 border-b border-cyan-500/30 pb-1 uppercase tracking-widest">
            <span>AR</span>
            <span>Right</span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
             <div className="w-full h-1 bg-cyan-500/20"><div className="w-[80%] h-full bg-cyan-500/60" /></div>
             <div className="w-full h-1 bg-cyan-500/20"><div className="w-[40%] h-full bg-cyan-500/60" /></div>
             <div className="w-full h-1 bg-cyan-500/20"><div className="w-[90%] h-full bg-cyan-500/60" /></div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Center UI */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-16"
      >
        {/* DATA IMPORT Block */}
        <div className="flex flex-col border border-cyan-500/20 bg-black/60 p-3">
          <div className="text-[10px] font-mono text-cyan-500 tracking-widest">
            <div className="flex justify-between w-48 border-b border-cyan-500/20 pb-1 mb-1">
              <span>DATA IMPORT</span><span>OK</span>
            </div>
            <div className="flex justify-between w-48 border-b border-cyan-500/20 pb-1 mb-1">
              <span>STATUS CHECK</span><span>OK</span>
            </div>
            <div className="flex justify-between w-48 text-violet-400">
              <span>ERROR MODE</span><span>OK</span>
            </div>
          </div>
        </div>

        {/* REACTOR label & sliders */}
        <div className="flex flex-col items-center gap-4">
           <div className="px-8 py-1 border border-cyan-500/40 text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm bg-cyan-500/5">
             REACTOR
           </div>
           
           <div className="flex gap-2">
             {Array.from({ length: 6 }).map((_, i) => (
               <div key={i} className="flex flex-col items-center gap-1">
                 <div className="w-8 h-2 border border-cyan-500/30 flex p-[1px]">
                   <div className="w-1/2 h-full bg-cyan-500/50" />
                 </div>
                 <span className="text-[6px] font-mono text-cyan-500/50">T{i+1}</span>
               </div>
             ))}
           </div>
        </div>

        {/* SUPPORT / SUPPLY stats */}
        <div className="flex flex-col text-[10px] font-mono tracking-widest">
           <div className="flex justify-between w-40 border-b border-cyan-500/20 pb-1 mb-1">
             <span className="text-cyan-500/70">SUPPORT</span>
             <span className="text-white">83.697</span>
           </div>
           <div className="flex justify-between w-40">
             <span className="text-cyan-500/70">SUPPLY</span>
             <span className="text-white">98.083 E</span>
           </div>
        </div>
      </motion.div>
      
      {/* Bottom Screen Edge Tiny Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-0 w-full px-8 flex justify-between items-center text-cyan-500/30 text-[8px] font-mono pointer-events-auto"
      >
        <div className="flex gap-4 items-center">
          <div className="w-2 h-2 rounded-full border border-cyan-500/50" />
          <span>0:06 / 0:30</span>
          <div className="w-16 h-1 bg-cyan-500/10"><div className="w-[20%] h-full bg-cyan-500/50" /></div>
        </div>
        
        <div className="flex gap-4">
          <div className="px-2 py-1 border border-cyan-500/20">COMPRESS:POT</div>
          <div className="px-2 py-1 border border-cyan-500/20">CORES LOAD</div>
          <div className="px-2 py-1 border border-cyan-500/20">STATS:TRB</div>
        </div>
      </motion.div>
    </div>
  );
}
