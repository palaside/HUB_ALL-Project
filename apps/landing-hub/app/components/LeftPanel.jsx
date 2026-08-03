import { BrainCircuit, AlertTriangle, Navigation, Map as MapIcon, ChevronRight } from 'lucide-react';

export default function LeftPanel() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2 shrink-0">
        <BrainCircuit className="text-sci-cyan" size={20} aria-hidden="true" />
        <h2 className="text-lg font-bold text-white tracking-wide uppercase">AI Ops & Routing</h2>
      </div>

      {/* AI Situation Brief */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-gray-600 transition-colors">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <BrainCircuit size={80} aria-hidden="true" />
        </div>
        <div className="flex items-start justify-between relative z-10 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Situation Brief</h3>
            <p className="text-white font-medium text-lg leading-snug">
              Traffic congestion detected on Yasukuni-dori due to roadworks.
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
          <span>Open AI Ops Console</span>
          <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>

      {/* Smart Routes / Drone Control */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-5 shadow-lg flex-1 flex flex-col relative group hover:border-gray-600 transition-colors">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Navigation size={16} className="text-neon-green" aria-hidden="true" />
            Smart Routes
          </h3>
          <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded border border-neon-green/30 font-mono tabular-nums">
            ETA: 14 min
          </span>
        </div>

        {/* Map Preview Mockup */}
        <div className="flex-1 bg-black rounded-lg border border-gray-700 relative overflow-hidden flex flex-col items-center justify-center p-4 min-h-[200px]">
          {/* Faux map grid lines */}
          <div className="absolute inset-0 opacity-20 sci-fi-grid pointer-events-none" aria-hidden="true"></div>
          
          <MapIcon size={48} className="text-gray-600 mb-2 opacity-50" aria-hidden="true" />
          <p className="text-gray-400 text-sm font-mono text-center relative z-10">
            ACTIVE DRONE SURVEILLANCE
            <br />
            <span className="text-neon-green">SHINJUKU CITY, TOKYO</span>
          </p>
          
          <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur text-xs p-2 rounded border border-gray-700 text-gray-300 font-mono flex justify-between tabular-nums">
            <span>ALT: 120m</span>
            <span>SPD: 45km/h</span>
            <span className="text-sci-cyan">LINK: OK</span>
          </div>
        </div>
      </div>
    </>
  );
}
