import { Activity, Wind, Train, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, YAxis } from 'recharts';

const trafficData = Array.from({ length: 20 }, () => ({ value: Math.random() * 100 + 50 }));
const aqiData = Array.from({ length: 20 }, () => ({ value: Math.random() * 20 + 40 }));
const transitData = Array.from({ length: 10 }, () => ({ value: Math.random() * 10 }));

export default function CenterPanel() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2 shrink-0">
        <Activity className="text-neon-green" size={20} />
        <h2 className="text-lg font-bold text-white tracking-wide uppercase">City Pulse : Shinjuku</h2>
      </div>

      {/* 3D Map View Mockup */}
      <div className="bg-black border border-gray-800 rounded-xl shadow-lg flex-1 relative overflow-hidden group hover:border-gray-600 transition-colors">
        {/* Perspective Grid Background */}
        <div className="absolute inset-0 sci-fi-grid opacity-30 transform perspective-[1000px] rotateX-[60deg] scale-150 origin-bottom" style={{ transformStyle: 'preserve-3d', transform: 'perspective(500px) rotateX(60deg) scale(2) translateY(-20%)' }}></div>
        
        {/* Glowing Nodes / Map Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black pointer-events-none"></div>

        {/* Incident Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-crimson-red rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-crimson-red p-2 rounded-full border-2 border-white shadow-[0_0_15px_rgba(220,20,60,0.8)]">
              <MapPin size={24} className="text-white" />
            </div>
          </div>
          <div className="mt-2 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-crimson-red/50 shadow-[0_0_10px_rgba(220,20,60,0.5)]">
            INCIDENT: YASUKUNI-DORI
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur p-2 rounded border border-gray-700">
          <p className="text-xs text-gray-400 font-mono">DIGITAL TWIN: ACTIVE</p>
        </div>
      </div>

      {/* Telemetry Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0 mt-4">
        
        {/* Traffic Flow */}
        <div className="bg-hub-panel border border-gray-800 rounded-xl p-4 flex flex-col justify-between hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Traffic Flow</h3>
            <span className="text-xs font-bold text-crimson-red bg-crimson-red/10 px-2 py-0.5 rounded">+9% vs base</span>
          </div>
          <div className="h-16 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Line type="monotone" dataKey="value" stroke="#DC143C" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Air Quality */}
        <div className="bg-hub-panel border border-gray-800 rounded-xl p-4 flex flex-col justify-between hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Wind size={14} /> Air Quality
            </h3>
            <span className="text-xs font-bold text-sci-cyan bg-sci-cyan/10 px-2 py-0.5 rounded">AQI 62</span>
          </div>
          <div className="h-16 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aqiData}>
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Line type="step" dataKey="value" stroke="#00FFFF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transit Status */}
        <div className="bg-hub-panel border border-gray-800 rounded-xl p-4 flex flex-col justify-between hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Train size={14} /> Transit Status
            </h3>
            <span className="text-xs font-bold text-hazard-orange bg-hazard-orange/10 px-2 py-0.5 rounded">+5 min</span>
          </div>
          <div className="h-16 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transitData}>
                <YAxis hide domain={[0, 'dataMax']} />
                <Bar dataKey="value" fill="#FF4500" radius={[2, 2, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </>
  );
}
