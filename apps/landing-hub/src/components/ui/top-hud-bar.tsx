"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react"; // Actually, user wanted watermark removed. "Crown" was part of watermark. I'll replace it with a generic tech icon.
import { Hexagon } from "lucide-react";

export function TopHudBar() {
  // Generate random heights for waveform
  const waveformBars = Array.from({ length: 120 }).map((_, i) => (
    <motion.div
      key={i}
      className="w-1 bg-cyan-500/50"
      initial={{ height: 4 }}
      animate={{ height: [4, Math.random() * 20 + 4, 4] }}
      transition={{
        duration: Math.random() * 0.5 + 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50 pointer-events-none"
    >
      {/* Left Section: Waveform & Labels */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-cyan-500">
            <Hexagon className="w-6 h-6" />
          </div>
          <div className="flex items-end gap-1 h-8">{waveformBars}</div>
        </div>
        <div className="flex gap-12 text-[10px] font-mono tracking-[0.2em] text-cyan-500/60 uppercase">
          <div>Left Engine</div>
          <div>LW_A-T</div>
          <div>42 04 64 7</div>
          <div>35 08 19 4</div>
        </div>
      </div>

      {/* Right Section: Tactical Buttons */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {["V1", "UE", "IX", "BA"].map((label, i) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center bg-black/40 backdrop-blur-md transition-colors hover:border-cyan-400"
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
