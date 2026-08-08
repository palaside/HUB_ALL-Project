"use client";

import React from 'react';
import { SystemHealthWidget } from './SystemHealthWidget';
import { QuickActionsWidget } from './QuickActionsWidget';
import { ChatInterface } from './ChatInterface';

export function CommandCenterWorkspace() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col noise-bg">
      <header className="mb-6 flex justify-between items-center glass-panel p-4 rounded-xl">
        <h1 className="text-xl font-bold tracking-widest text-cyan-400">PCCOS // ORBITAL HUD</h1>
      </header>
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <SystemHealthWidget />
        </div>
        
        <div className="lg:col-span-6 flex flex-col">
          <ChatInterface />
        </div>
        
        <div className="lg:col-span-3 flex flex-col gap-6">
          <QuickActionsWidget />
        </div>
      </main>
    </div>
  );
}
