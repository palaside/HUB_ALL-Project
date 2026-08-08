"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Link as LinkIcon, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TargetingUI } from "./animated-hud-targeting-ui";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple auto-rotation
  useEffect(() => {
    if (activeItem) return; // Pause rotation when an item is selected
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [activeItem]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Reactor Core Rings */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[700px] h-[700px] pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Outer dashed ring - slow clockwise */}
          <motion.circle
            cx="50" cy="50" r="48"
            fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.2"
            strokeDasharray="1 2"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Middle segmented ring - counter clockwise */}
          <motion.circle
            cx="50" cy="50" r="35"
            fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5"
            strokeDasharray="4 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Inner complex ring */}
          <motion.circle
            cx="50" cy="50" r="22"
            fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1"
            strokeDasharray="10 5 2 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Core solid ring */}
          <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Center UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute z-20 pointer-events-none flex items-center justify-center"
      >
        <TargetingUI pathColors={{ light: "#0ea5e9", dark: "#0ea5e9" }} className="w-64 h-64 opacity-80" />
      </motion.div>
      <div className="absolute z-30 pointer-events-none scale-200 flex items-center justify-center">
        {/* Pulsing soundwave ring */}
        <motion.div 
          className="absolute w-24 h-24 rounded-full border border-cyan-400"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-24 h-24 rounded-full border border-cyan-400"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
        />
        <div className="w-24 h-24 rounded-full bg-cyan-950/90 backdrop-blur-md border border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] relative z-10">
          <Mic className="w-7 h-7 text-cyan-400 mb-1" />
          <span className="text-[7px] font-mono font-bold text-cyan-300 tracking-[0.2em] shadow-cyan-500/50">JARVIS</span>
          <span className="text-[4px] font-mono text-cyan-400/80 tracking-widest mt-0.5">TH-VOICE ONLY</span>
        </div>
      </div>

      {/* Orbiting Nodes */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 2, rotate: rotationAngle }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 1, delay: 1 },
          rotate: { duration: 0 } // handled by style/state
        }}
      >
        {timelineData.map((item, index) => {
          const total = timelineData.length;
          const angle = (index / total) * 360;
          const radius = 300; // Match w-[600px] half
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          const isActive = activeItem?.id === item.id;
          const statusColor = 
            item.status === 'completed' ? 'border-emerald-500 shadow-emerald-500/50' :
            item.status === 'in-progress' ? 'border-cyan-500 shadow-cyan-500/50' :
            'border-violet-500 shadow-violet-500/50';

          return (
            <motion.div
              key={item.id}
              className="absolute top-1/2 left-1/2"
              style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
                // Counter-rotate the child so it stays upright
                rotate: -rotationAngle, 
              }}
            >
              <button
                onClick={() => router.push(`/dashboard/${item.id}`)}
                className={cn(
                  "relative group flex items-center justify-center w-12 h-12 rounded-full border bg-black/80 backdrop-blur-sm transition-all duration-300 hover:scale-125 z-40",
                  statusColor,
                  isActive ? "scale-125 shadow-[0_0_20px_var(--tw-shadow-color)]" : "hover:shadow-[0_0_15px_var(--tw-shadow-color)]"
                )}
              >
                <item.icon className={cn("w-5 h-5", 
                  item.status === 'completed' ? 'text-emerald-400' :
                  item.status === 'in-progress' ? 'text-cyan-400' :
                  'text-violet-400'
                )} />
                
                {/* Tooltip */}
                <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 border border-white/10 px-3 py-1.5 rounded-md text-xs text-white pointer-events-none">
                  {item.title}
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Left Schematic Overlay with 3D Holographic Base */}
      <div className="absolute bottom-12 left-12 z-40 pointer-events-none flex flex-col items-center justify-end w-[400px] h-[400px]">
        
        {/* The 3D Rotating Base */}
        <div className="absolute bottom-0 w-64 h-64 [perspective:1000px]">
          <motion.div 
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d", transform: "rotateX(70deg)" }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Base Circles */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-4 rounded-full border-2 border-cyan-400/30 border-dashed" />
            <div className="absolute inset-8 rounded-full border border-violet-500/30" />
            
            {/* Base Hexagon */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="1" />
              <polygon points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* Crosshairs */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="0.5" />
            </svg>
            
            {/* Center Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400/20 blur-md rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-sm shadow-[0_0_10px_#fff]" />
          </motion.div>
        </div>

        {/* Vertical Scanline / Axis (Shoots up from the center of the base) */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-px h-[250px] bg-gradient-to-t from-cyan-400/80 to-transparent"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 250, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* The Blueprint Image (Standing on the base) */}
        <motion.div
          className="relative z-10 -mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          {/* Label Floating above the gun */}
          <div className="absolute -top-10 left-10 bg-[#0a101f]/80 backdrop-blur-md px-3 py-1 border-l-2 border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <div className="text-[10px] font-mono font-bold text-cyan-300 tracking-widest">TACTICAL DEPLOYMENT</div>
            <div className="text-[8px] font-mono text-cyan-500/70 tracking-wider mt-0.5">M101A1 105mm // ACTIVE</div>
          </div>
          
          <img 
            src="/blueprint.jpg" 
            alt="M101A1 Blueprint" 
            className="w-[450px] object-contain mix-blend-screen contrast-125 filter drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]"
          />
        </motion.div>
      </div>
    </div>
  );
}
