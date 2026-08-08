"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, Triangle } from "lucide-react";

export function RightHudPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="absolute right-4 top-16 bottom-16 w-80 flex flex-col gap-6 pointer-events-none"
    >
      <div className="flex-1 border border-cyan-500/10 bg-black/40 p-4 flex flex-col justify-between">
        {/* Top Section: Hexagons and Data */}
        <div className="flex gap-4 items-start justify-end">
          <div className="flex flex-col items-end gap-1">
            <span className="text-4xl font-mono text-white tracking-tighter">99.89</span>
            <span className="text-[10px] font-mono text-cyan-500/50">LM_6-T</span>
          </div>
          <div className="grid grid-cols-2 gap-1 opacity-80">
            <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
            <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
            <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
            <Hexagon className="w-6 h-6 text-violet-400 fill-violet-400/20" />
          </div>
        </div>

        {/* Triangle Graphic */}
        <div className="flex justify-end mt-4">
          <div className="relative w-32 h-32 flex items-center justify-center opacity-60">
            <Triangle className="absolute w-full h-full text-cyan-500/30" strokeWidth={1} />
            <Triangle className="absolute w-24 h-24 text-violet-500/40" strokeWidth={1.5} />
            <Triangle className="absolute w-16 h-16 text-cyan-400/60" strokeWidth={2} />
          </div>
        </div>

        {/* Status Matrices */}
        <div className="flex flex-col items-end gap-2 text-right mt-4">
          <div className="text-[10px] font-mono text-cyan-500/70 tracking-widest border-b border-cyan-500/20 pb-1 w-full flex justify-between">
            <span>STATUS: OK</span>
            <span>A1</span>
          </div>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-500/30"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border border-cyan-500/10 bg-black/40 p-4 flex flex-col gap-4">
        {/* Buttons Grid */}
        <div className="flex justify-end gap-2">
          <div className="grid grid-cols-2 gap-2 pointer-events-auto">
            {['A1','A2','B1','B2'].map(btn => (
              <button key={btn} className="w-8 h-8 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: Engine Dials */}
        <div className="flex flex-col gap-2 border-t border-cyan-500/20 pt-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-cyan-500/70 tracking-widest">
            <span>ENGINE ACCELERATION</span>
            <span className="text-white bg-white/10 px-1 py-0.5">100%</span>
          </div>
          <div className="flex justify-between items-center mt-2 border-b border-cyan-500/20 pb-2">
            <span className="text-[10px] font-mono text-violet-400">OVERLOAD</span>
            <span className="text-[10px] font-mono text-cyan-400">ENGINE-LM_6-T</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
               <div className="text-[8px] font-mono text-cyan-500/40">
                 DANGER<br/>CMD<br/>NUCLEAR<br/>POWER<br/>LOAD
               </div>
               <div className="flex flex-col gap-1 pointer-events-auto">
                  <button className="border border-cyan-500/40 px-2 py-1 text-[10px] text-cyan-400 hover:bg-cyan-500/20">ON</button>
                  <button className="border border-cyan-500/40 px-2 py-1 text-[10px] text-cyan-400 opacity-50">OFF</button>
               </div>
            </div>
            <div className="flex gap-4">
              <Dial label="OVERLOAD" />
              <Dial label="FUEL" color="violet" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Dial({ label, color = "cyan" }: { label: string; color?: "cyan" | "violet" }) {
  const colorClass = color === "cyan" ? "text-cyan-400" : "text-violet-400";
  const strokeClass = color === "cyan" ? "stroke-cyan-500" : "stroke-violet-500";
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/10"
            strokeDasharray="4 4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={strokeClass}
            strokeWidth="4"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: "200 283" }}
            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-2 h-2 rounded-full ${color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-violet-400 shadow-[0_0_10px_#a78bfa]'}`} />
        </div>
      </div>
      <span className={`text-[9px] font-mono tracking-widest ${colorClass}`}>
        {label}
      </span>
    </div>
  );
}
