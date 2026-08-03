import { AlertTriangle, ShieldAlert, Car, Map, Zap, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const reportData = Array.from({ length: 7 }, (_, i) => ({ day: i, issues: Math.random() * 40 + 10 }));

export default function RightPanel() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2 shrink-0">
        <ShieldAlert className="text-hazard-orange" size={20} aria-hidden="true" />
        <h2 className="text-lg font-bold text-white tracking-wide uppercase">Alerts & Response</h2>
      </div>

      {/* Alert Toggles */}
      <div className="flex space-x-2 mb-4 shrink-0">
        <button type="button" className="flex-1 bg-crimson-red/20 text-crimson-red border border-crimson-red border-b-2 text-xs font-bold py-2 rounded uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red">
          Emergency
        </button>
        <button type="button" className="flex-1 bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 text-xs font-bold py-2 rounded uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan">
          Alerts
        </button>
        <button type="button" className="flex-1 bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 text-xs font-bold py-2 rounded uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan">
          Transport
        </button>
      </div>

      {/* Actionable Incident Card */}
      <div className="bg-hub-panel border border-crimson-red/50 rounded-xl p-4 shadow-[0_0_15px_rgba(220,20,60,0.1)] relative overflow-hidden group mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex space-x-3">
            <div className="bg-crimson-red/20 p-2 rounded-lg shrink-0">
              <Car size={20} className="text-crimson-red" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Roadworks Obstruction</h3>
              <p className="text-gray-400 text-xs mt-1 tabular-nums">Shinjuku-dori Ave. • 2 Lanes Blocked</p>
            </div>
          </div>
          <span className="text-xs text-crimson-red font-mono font-bold tabular-nums">12:04 PM</span>
        </div>
        
        <p className="text-gray-300 text-xs mb-4 leading-relaxed tabular-nums">
          Unscheduled maintenance causing severe bottleneck. AI predicts total gridlock in 15 mins if unresolved.
        </p>

        <div className="flex space-x-2 mt-auto">
          <button type="button" className="flex-1 bg-crimson-red hover:bg-red-600 text-white font-bold py-2 px-3 rounded text-xs flex items-center justify-center space-x-1 transition-all hover:shadow-[0_0_10px_rgba(220,20,60,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Zap size={14} aria-hidden="true" />
            <span>OPTIMIZE</span>
          </button>
          <button type="button" className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 font-bold py-2 px-3 rounded text-xs flex items-center justify-center space-x-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sci-cyan">
            <Map size={14} aria-hidden="true" />
            <span>VIEW IN MAP</span>
          </button>
        </div>
      </div>

      {/* Secondary Alert */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-4 opacity-75 hover:opacity-100 transition-opacity mb-4">
         <div className="flex items-start justify-between mb-3">
          <div className="flex space-x-3">
            <div className="bg-hazard-orange/20 p-2 rounded-lg shrink-0">
              <AlertTriangle size={20} className="text-hazard-orange" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Elevated AQI Warning</h3>
              <p className="text-gray-400 text-xs mt-1">Kabukicho Sector • Industrial Emission</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Backlog Tracker */}
      <div className="bg-hub-panel border border-gray-800 rounded-xl p-5 shadow-lg flex-1 flex flex-col group hover:border-gray-600 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider tabular-nums">7-Day Response</h3>
          <div className="flex items-center space-x-1 bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs border border-gray-700">
            <CheckCircle2 size={12} className="text-neon-green" aria-hidden="true" />
            <span className="tabular-nums">128 PENDING</span>
          </div>
        </div>
        
        <div className="flex-1 min-h-[100px] w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <Bar dataKey="issues" fill="#39FF14" fillOpacity={0.6} radius={[2, 2, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-2 text-gray-500 text-[10px] font-mono tabular-nums">
          <span>T-7</span>
          <span>T-3</span>
          <span>TODAY</span>
        </div>
      </div>
    </>
  );
}
