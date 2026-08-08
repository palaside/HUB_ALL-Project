"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'system' | 'user';
  content: string;
}

interface ChatInterfaceProps {
  featureId?: string;
  featureTitle?: string;
}

export function ChatInterface({ featureId = "CORE", featureTitle = "PCCOS Core" }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: `[${featureId}] ${featureTitle} Initialized. Awaiting directives.`
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMessage = input.trim();
      setInput('');
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage
      }]);

      try {
        const res = await fetch('/api/pccos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: userMessage, type: 'CHAT' })
        });
        const data = await res.json();
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: data.message
        }]);
      } catch (error) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: "ERROR: Connection to PCCOS Core failed."
        }]);
      }
    }
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-full overflow-hidden border border-cyan-500/20">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'system' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
            }`}>
              {msg.role === 'system' ? <Terminal size={16} /> : <User size={16} />}
            </div>
            <div className={`p-4 rounded-lg text-sm max-w-[80%] ${
              msg.role === 'system' 
                ? 'bg-white/5 border border-white/5 rounded-tl-none' 
                : 'bg-purple-500/10 border border-purple-500/20 rounded-tr-none text-purple-50'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command directive... (Press Enter to send)" 
          className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500/50 text-cyan-50 transition-colors placeholder:text-slate-500"
        />
        <button 
          onClick={() => handleKeyDown({ key: 'Enter' } as any)}
          disabled={!input.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(8,145,178,0.4)] disabled:shadow-none transition-all flex items-center justify-center gap-2"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
