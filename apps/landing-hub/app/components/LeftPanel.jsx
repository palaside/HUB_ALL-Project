import { BrainCircuit, AlertTriangle, Navigation, Map as MapIcon, ChevronRight, Box, ExternalLink, Code, MessageSquare, BarChart2, CreditCard, PenTool } from 'lucide-react';

export default function LeftPanel() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2 shrink-0">
        <BrainCircuit className="text-sci-cyan" size={20} aria-hidden="true" />
        <h2 className="text-lg font-bold text-white tracking-wide uppercase">AI ops and routing</h2>
      </div>

      {/* AI Situation Brief */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-gray-600 transition-colors">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <BrainCircuit size={80} aria-hidden="true" />
        </div>
        <div className="flex items-start justify-between relative z-10 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Situation brief</h3>
            <p className="text-white font-medium text-lg leading-snug">
              Roadworks caused traffic congestion on Yasukuni-dori.
            </p>
          </div>
          <div className="bg-crimson-red/20 text-crimson-red px-2 py-1 rounded-md flex items-center space-x-1 shrink-0 ml-4 border border-crimson-red/30">
            <AlertTriangle size={14} aria-hidden="true" />
            <span className="text-xs font-bold tabular-nums">+28 min</span>
          </div>
        </div>

        <button 
          type="button"
          className="w-full bg-gray-800 hover:bg-sci-cyan hover:text-black text-sci-cyan font-bold py-3 px-4 rounded-lg flex items-center justify-between transition-all group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] border border-sci-cyan/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-hub-panel"
        >
          <span>Open AI ops console</span>
          <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>

      {/* Integrated Systems Directory */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-5 shadow-lg flex-1 flex flex-col relative group hover:border-gray-600 transition-colors overflow-hidden">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Navigation size={16} className="text-neon-green" aria-hidden="true" />
            Connected systems
          </h3>
          <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded border border-neon-green/30 font-mono tabular-nums">
            7 apps
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
          {/* 1. ARTY (Pending) */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-black border border-gray-800 opacity-60">
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-1.5 rounded text-gray-400"><Box size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-500">ARTY</span>
            </div>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono uppercase">Not created</span>
          </div>

          {/* 2. DIGITAL EVIDENCE */}
          <a href="https://digital-evidence-czhjg1fel-palaside-2318s-projects.vercel.app" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-neon-green hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green group/link">
            <div className="flex items-center gap-3">
              <div className="bg-neon-green/10 p-1.5 rounded text-neon-green"><Code size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-200 group-hover/link:text-white transition-colors">DIGITAL EVIDENCE</span>
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover/link:text-neon-green transition-colors" aria-hidden="true" />
          </a>

          {/* 3. AI Engineering Stack (PALASIDE Orbital Interface) */}
          <a href="/orbital" className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-neon-green hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green group/link">
            <div className="flex items-center gap-3">
              <div className="bg-neon-green/10 p-1.5 rounded text-neon-green"><Code size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-200 group-hover/link:text-white transition-colors">AI Engineering Stack</span>
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover/link:text-neon-green transition-colors" aria-hidden="true" />
          </a>


          {/* 4. Prompt Architect 360 */}
          <a href="https://design-architecture-generator.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-sci-cyan hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan group/link">
            <div className="flex items-center gap-3">
              <div className="bg-sci-cyan/10 p-1.5 rounded text-sci-cyan"><MessageSquare size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-200 group-hover/link:text-white transition-colors">Prompt Architect 360</span>
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover/link:text-sci-cyan transition-colors" aria-hidden="true" />
          </a>

          {/* 7. Herhyness */}
          <a href="https://sales-report-parser.vercel.app" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-sci-cyan hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan group/link">
            <div className="flex items-center gap-3">
              <div className="bg-sci-cyan/10 p-1.5 rounded text-sci-cyan"><BarChart2 size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-200 group-hover/link:text-white transition-colors">Herhyness</span>
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover/link:text-sci-cyan transition-colors" aria-hidden="true" />
          </a>

          {/* 5. POS (Pending) */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-black border border-gray-800 opacity-60">
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-1.5 rounded text-gray-400"><CreditCard size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-500">POS</span>
            </div>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono uppercase">Not created</span>
          </div>

          {/* 6. Design (Pending) */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-black border border-gray-800 opacity-60">
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-1.5 rounded text-gray-400"><PenTool size={16} aria-hidden="true" /></div>
              <span className="text-sm font-bold text-gray-500">Design</span>
            </div>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono uppercase">Not created</span>
          </div>

        </div>
      </div>
    </>
  );
}
