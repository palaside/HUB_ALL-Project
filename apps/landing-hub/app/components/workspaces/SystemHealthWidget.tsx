"use client";

import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function SystemHealthWidget() {
  const [status, setStatus] = useState('IDLE');
  const [load, setLoad] = useState(12);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/pccos');
        if (res.ok) {
          const data = await res.json();
          setStatus(data.interpreterStatus);
          setLoad(data.coreLoad);
        }
      } catch (error) {
        console.error("Failed to fetch health", error);
      }
    };

    const interval = setInterval(fetchHealth, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-4">
        <Activity size={20} className={status === 'PROCESSING' ? 'animate-pulse' : ''} />
        <h2 className="font-semibold uppercase tracking-wider text-sm">System Health</h2>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Intent Interpreter</span>
            <span className={status === 'PROCESSING' ? 'text-green-400' : 'text-cyan-400'}>
              {status}
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full w-full ${status === 'PROCESSING' ? 'bg-green-400/40 animate-pulse' : 'bg-cyan-400/20'}`} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Core Engine Load</span>
            <span className={load > 30 ? 'text-red-400' : 'text-yellow-400'}>{load}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${load > 30 ? 'bg-red-400' : 'bg-yellow-400'}`} 
              style={{ width: `${load}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
