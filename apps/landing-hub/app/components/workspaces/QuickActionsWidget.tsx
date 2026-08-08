"use client";

import React, { useState } from 'react';
import { Zap, ShieldAlert, RefreshCw } from 'lucide-react';

export function QuickActionsWidget() {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAction = async (command: string) => {
    setLoadingAction(command);
    setFeedback(null);
    try {
      const res = await fetch('/api/pccos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, type: 'QUICK_ACTION' })
      });
      const data = await res.json();
      setFeedback(data.message);
    } catch (e) {
      setFeedback("Failed to execute action.");
    } finally {
      setLoadingAction(null);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 relative">
      <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-4">
        <Zap size={20} />
        <h2 className="font-semibold uppercase tracking-wider text-sm">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 relative">
        <button 
          onClick={() => handleAction('REPLAN')}
          disabled={loadingAction !== null}
          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/50 transition-all rounded-lg text-sm text-left group disabled:opacity-50"
        >
          <RefreshCw size={16} className={`text-slate-400 ${loadingAction === 'REPLAN' ? 'animate-spin text-cyan-400' : 'group-hover:text-cyan-400'}`} />
          <span>Re-Plan Task</span>
        </button>
        <button 
          onClick={() => handleAction('EMERGENCY_STOP')}
          disabled={loadingAction !== null}
          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/50 transition-all rounded-lg text-sm text-left group disabled:opacity-50"
        >
          <ShieldAlert size={16} className={`text-slate-400 ${loadingAction === 'EMERGENCY_STOP' ? 'animate-pulse text-red-400' : 'group-hover:text-red-400'}`} />
          <span className="text-red-200">Emergency Stop</span>
        </button>
      </div>
      
      {feedback && (
        <div className="absolute -bottom-16 left-0 right-0 p-3 bg-black/80 border border-cyan-500/30 rounded-lg text-xs text-cyan-100 shadow-xl shadow-cyan-500/20 animate-in fade-in slide-in-from-top-2">
          {feedback}
        </div>
      )}
    </div>
  );
}
