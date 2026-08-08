"use client";

import React from "react";
import { motion } from "framer-motion";

export function LeftHudPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute left-4 top-16 bottom-16 w-96 flex flex-col pointer-events-none"
    >
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Far left dot markers */}
      <div className="absolute -left-4 top-0 bottom-0 w-4 flex flex-col justify-between py-10 opacity-40">
        {['3','N','9','S','','J','7','8','1','','X','2','O','0'].map((l, i) => (
          <div key={i} className="flex items-center gap-1 text-[8px] font-mono text-cyan-500">
            <div className="w-1 h-1 bg-cyan-500" />
            {l}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col gap-8 border-l border-cyan-500/20 pl-4 h-full relative z-10">
        {/* Left Engine */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 bg-white/5 border border-white/10 px-2 py-1">
            <span className="text-[10px] font-mono text-white/80 tracking-widest uppercase">Left Engine</span>
          </div>
          <div className="absolute top-0 right-0 px-2 py-1">
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">LM_6-T</span>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center">
            {/* 3D Engine Assembly */}
            <EngineAssembly rotation={{ x: 60, y: 0, z: -30 }} color="cyan" />
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 px-2 py-1">
            <span className="text-[9px] font-mono text-white/70 tracking-widest">
              MODE: ACCELERATION
            </span>
          </div>
        </div>

        {/* Right Engine */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 bg-white/5 border border-white/10 px-2 py-1">
            <span className="text-[10px] font-mono text-white/80 tracking-widest uppercase">Right Engine</span>
          </div>
          <div className="absolute top-0 right-0 px-2 py-1">
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">RM_6-T</span>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center">
            {/* 3D Engine Assembly */}
            <EngineAssembly rotation={{ x: 65, y: -10, z: 25 }} color="white" />
          </div>

          <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 px-2 py-1">
            <span className="text-[9px] font-mono text-white/70 tracking-widest">
              MODE: NORMAL
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EngineAssembly({ rotation, color }: { rotation: { x: number, y: number, z: number }, color: "cyan" | "white" }) {
  const baseColor = color === "cyan" ? "rgba(6, 182, 212, " : "rgba(255, 255, 255, ";
  
  return (
    <div className="relative w-64 h-64" style={{ perspective: "1000px" }}>
      <motion.div 
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateX: rotation.x, rotateY: rotation.y, rotateZ: rotation.z }}
        animate={{ rotateZ: rotation.z + 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Core Axis Line */}
        <div 
          className="absolute left-1/2 top-1/2 w-[2px] h-48 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${baseColor}0.8), ${baseColor}0.8), transparent)`,
            transform: "rotateX(90deg) translateZ(-40px)" 
          }}
        />

        {/* Layer 0: Deepest dashed ring */}
        <Ring z={-40} scale={0.7} border="dashed" opacity={0.3} color={baseColor} width={2} />
        
        {/* Layer 1: Solid thin ring */}
        <Ring z={-20} scale={0.9} border="solid" opacity={0.4} color={baseColor} width={1} />
        
        {/* Layer 2: Main complex segmented ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent"
             style={{ 
               transform: "translateZ(0px)", 
               borderTopColor: `${baseColor}0.8)`,
               borderBottomColor: `${baseColor}0.8)`,
             }} 
        />
        <Ring z={0} scale={1} border="dotted" opacity={0.6} color={baseColor} width={4} reverse />
        
        {/* Layer 3: Inner solid ring */}
        <Ring z={20} scale={0.6} border="solid" opacity={0.8} color={baseColor} width={2} />
        
        {/* Layer 4: Hexagon cluster */}
        <motion.div 
          className="absolute inset-0" 
          style={{ transform: "translateZ(40px) scale(0.5)", transformStyle: "preserve-3d" }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
           <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" fill="none" stroke={`${baseColor}0.5)`} strokeWidth="2" />
              <polygon points="50,15 80,32 80,67 50,85 20,67 20,32" fill="none" stroke={`${baseColor}0.8)`} strokeWidth="1" strokeDasharray="4 4" />
           </svg>
        </motion.div>

        {/* Layer 5: Topmost dashed thin ring */}
        <Ring z={60} scale={0.8} border="dashed" opacity={0.5} color={baseColor} width={1} />
        
        {/* Layer 6: Outer containment brackets */}
        <motion.div 
          className="absolute inset-[-10%]"
          style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
             <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={`${baseColor}0.4)`} strokeWidth="1" />
             <path d="M 70 10 L 90 10 L 90 30" fill="none" stroke={`${baseColor}0.4)`} strokeWidth="1" />
             <path d="M 90 70 L 90 90 L 70 90" fill="none" stroke={`${baseColor}0.4)`} strokeWidth="1" />
             <path d="M 30 90 L 10 90 L 10 70" fill="none" stroke={`${baseColor}0.4)`} strokeWidth="1" />
          </svg>
        </motion.div>
        
        {/* Floating orbital particles (Hexagons/Squares) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              transform: `rotateZ(${i * 60}deg) translateY(-100px) translateZ(${Math.sin(i) * 20}px)`,
              background: `${baseColor}0.2)`,
              border: `1px solid ${baseColor}0.5)`
            }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        ))}

      </motion.div>
    </div>
  );
}

function Ring({ z, scale, border, opacity, color, width, reverse = false }: any) {
  return (
    <motion.div 
      className="absolute inset-0 rounded-full"
      style={{
        transform: `translateZ(${z}px) scale(${scale})`,
        borderStyle: border,
        borderWidth: width,
        borderColor: `${color}${opacity})`,
      }}
      animate={reverse ? { rotateZ: -360 } : {}}
      transition={reverse ? { duration: 30, repeat: Infinity, ease: "linear" } : {}}
    />
  );
}
