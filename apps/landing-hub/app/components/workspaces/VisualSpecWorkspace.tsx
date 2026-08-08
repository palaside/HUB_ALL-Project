"use client";

import React, { useState } from "react";
import { 
  Layout, Square, CheckCircle, Layers, MousePointer2, 
  AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter,
  Plus, Minus, Eye, Copy, Trash2, Send, Code, FileCode, Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualSpecWorkspaceProps {
  featureId: string;
  title: string;
}

interface DesignElement {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  radius: number;
  fill: string;
}

export function VisualSpecWorkspace({ title }: VisualSpecWorkspaceProps) {
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addElement = (type: string) => {
    const newEl: DesignElement = {
      id: `el_${Date.now()}`,
      type,
      x: 100 + elements.length * 20,
      y: 100 + elements.length * 20,
      w: type === 'Data Table' ? 400 : type === 'Action Button' ? 120 : 250,
      h: type === 'Data Table' ? 300 : type === 'Action Button' ? 40 : 150,
      opacity: 100,
      radius: type === 'Action Button' ? 6 : 12,
      fill: type === 'Action Button' ? '#0ea5e9' : '#0f172a'
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const selectedEl = elements.find(el => el.id === selectedId);

  // Figma-like Property Section Component
  const PropSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-b border-[#333] pb-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold text-[#888] tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );

  // Figma-like Input Component
  const PropInput = ({ label, value, suffix }: { label?: string, value: string | number, suffix?: string }) => (
    <div className="flex items-center bg-[#222] border border-[#333] rounded hover:border-[#555] transition-colors focus-within:border-[#0ea5e9] overflow-hidden h-7">
      {label && <span className="text-[#888] text-[10px] pl-2 w-5 font-mono select-none">{label}</span>}
      <input 
        type="text" 
        value={value}
        readOnly
        className="bg-transparent border-none outline-none text-[#eee] text-[11px] w-full px-2"
      />
      {suffix && <span className="text-[#666] text-[10px] pr-2 select-none">{suffix}</span>}
    </div>
  );

  // Figma-like IconButton
  const IconButton = ({ active, children }: { active?: boolean, children: React.ReactNode }) => (
    <button className={cn(
      "p-1.5 rounded flex items-center justify-center transition-colors",
      active ? "bg-[#333] text-white" : "text-[#888] hover:text-[#ddd] hover:bg-[#2a2a2a]"
    )}>
      {children}
    </button>
  );

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] animate-in zoom-in-95 fade-in duration-300 overflow-hidden font-sans text-sm selection:bg-[#0ea5e9]/30">
      
      {/* Top Toolbar */}
      <div className="flex justify-between items-center border-b border-[#222] p-3 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center text-black font-bold text-xs">V</div>
          <h2 className="text-sm font-semibold text-[#ddd] flex items-center gap-2">
            {title} <span className="text-[#666] text-xs font-normal">/ Draft</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#222] rounded-md p-0.5 border border-[#333]">
            <IconButton active><MousePointer2 className="w-3.5 h-3.5" /></IconButton>
            <IconButton><Square className="w-3.5 h-3.5" /></IconButton>
            <IconButton><Layout className="w-3.5 h-3.5" /></IconButton>
          </div>
          <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            <FileCode className="w-4 h-4" />
            GENERATE MARKDOWN SPEC
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded flex items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" />
            EXPORT TO FIGMA MCP
          </button>
        </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-[#1e1e1e]">
        {/* LEFT COLUMN: Layers / Assets */}
        <div className="w-60 border-r border-[#222] bg-[#181818] flex flex-col">
          <div className="flex items-center gap-4 px-4 py-3 border-b border-[#222] text-[11px] font-semibold text-[#888]">
            <span className="text-white">Layers</span>
            <span>Assets</span>
          </div>
          <div className="p-2 flex flex-col gap-0.5 overflow-y-auto">
            {elements.length === 0 ? (
              <div className="p-4 text-[11px] text-[#666] italic">No layers yet. Add from palette below.</div>
            ) : (
              elements.map((el) => (
                <div 
                  key={el.id}
                  onClick={() => setSelectedId(el.id)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded text-[11px] cursor-default select-none",
                    selectedId === el.id ? "bg-[#0ea5e9]/20 text-[#0ea5e9]" : "text-[#bbb] hover:bg-[#222]"
                  )}
                >
                  <Layers className="w-3.5 h-3.5 opacity-70" />
                  {el.type}
                </div>
              ))
            )}
          </div>
          
          <div className="mt-auto border-t border-[#222] p-2">
             <div className="text-[10px] font-semibold text-[#666] mb-2 px-2">QUICK ADD</div>
             <div className="grid grid-cols-2 gap-1">
               <button onClick={() => addElement('Data Table')} className="bg-[#222] hover:bg-[#333] text-[#aaa] text-[10px] py-1.5 rounded border border-[#333]">Table</button>
               <button onClick={() => addElement('Action Button')} className="bg-[#222] hover:bg-[#333] text-[#aaa] text-[10px] py-1.5 rounded border border-[#333]">Button</button>
               <button onClick={() => addElement('Form Matrix')} className="bg-[#222] hover:bg-[#333] text-[#aaa] text-[10px] py-1.5 rounded border border-[#333]">Form</button>
               <button onClick={() => addElement('Dashboard Card')} className="bg-[#222] hover:bg-[#333] text-[#aaa] text-[10px] py-1.5 rounded border border-[#333]">Card</button>
             </div>
          </div>
        </div>

        {/* CENTER COLUMN: Infinite Canvas */}
        <div className="flex-1 bg-[#1e1e1e] overflow-hidden relative" onClick={() => setSelectedId(null)}>
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="relative w-full h-full">
            {elements.map((el) => (
              <div 
                key={el.id} 
                onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                className={cn(
                  "absolute flex items-center justify-center text-[#888] text-xs font-medium backdrop-blur-sm cursor-pointer transition-shadow",
                  selectedId === el.id ? "ring-1 ring-[#0ea5e9]" : "border border-[#444] hover:border-[#666]"
                )}
                style={{
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  height: el.h,
                  backgroundColor: `${el.fill}80`,
                  borderRadius: el.radius,
                  opacity: el.opacity / 100
                }}
              >
                {el.type}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Figma-Style Properties Panel */}
        <div className="w-[280px] border-l border-[#222] bg-[#181818] flex flex-col text-[11px] overflow-y-auto">
          {selectedEl ? (
            <div className="p-4">
              
              {/* Alignment Controls */}
              <div className="flex items-center justify-between mb-6 text-[#888]">
                <IconButton><AlignLeft className="w-3.5 h-3.5" /></IconButton>
                <IconButton><AlignHorizontalJustifyCenter className="w-3.5 h-3.5" /></IconButton>
                <IconButton><AlignRight className="w-3.5 h-3.5" /></IconButton>
                <div className="w-px h-4 bg-[#333] mx-1" />
                <IconButton><AlignVerticalJustifyCenter className="w-3.5 h-3.5 transform rotate-90" /></IconButton>
                <IconButton><AlignCenter className="w-3.5 h-3.5" /></IconButton>
                <IconButton><AlignVerticalJustifyCenter className="w-3.5 h-3.5" /></IconButton>
              </div>

              {/* Position */}
              <PropSection title="Position">
                <div className="grid grid-cols-2 gap-2">
                  <PropInput label="X" value={selectedEl.x} />
                  <PropInput label="Y" value={selectedEl.y} />
                </div>
              </PropSection>

              {/* Layout */}
              <PropSection title="Layout">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <PropInput label="W" value={selectedEl.w} />
                  <PropInput label="H" value={selectedEl.h} />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <input type="checkbox" className="accent-[#0ea5e9] bg-[#222] border-[#333]" checked readOnly />
                  <span className="text-[#ccc]">Clip content</span>
                </div>
              </PropSection>

              {/* Appearance */}
              <PropSection title="Appearance">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <PropInput value={selectedEl.opacity} suffix="%" />
                  <PropInput value={selectedEl.radius} suffix="rx" />
                </div>
              </PropSection>

              {/* Fill */}
              <div className="border-b border-[#333] pb-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] font-semibold text-[#888] tracking-wide">Fill</h3>
                  <div className="flex items-center gap-1">
                    <IconButton><Layout className="w-3 h-3" /></IconButton>
                    <IconButton><Plus className="w-3.5 h-3.5" /></IconButton>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm border border-[#444]" style={{ backgroundColor: selectedEl.fill }} />
                  <div className="flex-1 bg-[#222] border border-[#333] rounded h-7 flex items-center px-2">
                    <span className="text-[#eee] text-[11px] font-mono">{selectedEl.fill.toUpperCase()}</span>
                  </div>
                  <div className="w-12 bg-[#222] border border-[#333] rounded h-7 flex items-center justify-center">
                    <span className="text-[#eee] text-[11px]">100%</span>
                  </div>
                  <IconButton><Eye className="w-3.5 h-3.5" /></IconButton>
                  <IconButton><Minus className="w-3.5 h-3.5" /></IconButton>
                </div>
              </div>

              {/* Stroke */}
              <div className="border-b border-[#333] pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-semibold text-[#888] tracking-wide">Stroke</h3>
                  <IconButton><Plus className="w-3.5 h-3.5" /></IconButton>
                </div>
              </div>

              {/* Effects */}
              <div className="border-b border-[#333] pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-semibold text-[#888] tracking-wide">Effects</h3>
                  <IconButton><Plus className="w-3.5 h-3.5" /></IconButton>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 flex flex-col items-center justify-center text-center h-full text-[#666]">
              <MousePointer2 className="w-8 h-8 mb-3 opacity-50" />
              <p>Select a layer to view and edit its properties.</p>
            </div>
          )}

          {/* Export / MCP Integration Button */}
          <div className="mt-auto border-t border-[#222] p-4 bg-[#141414]">
            <div className="text-[10px] text-[#666] mb-2 flex items-center justify-between">
              <span>MCP SERVER</span>
              <span className="text-emerald-500 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />CONNECTED</span>
            </div>
            <button className="w-full py-2 bg-[#222] hover:bg-[#333] border border-[#444] text-[#ddd] rounded shadow-sm transition-colors text-[11px] font-semibold flex items-center justify-center gap-2">
              <Code className="w-3.5 h-3.5" />
              Export to Figma MCP
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
