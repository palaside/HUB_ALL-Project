'use client';

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

// Application definitions – update URLs as needed
const apps = [
  { id: "arty", name: "ARTY", url: "https://example.com/arty" },
  { id: "digital-evidence", name: "DIGITAL EVIDENCE", url: "https://example.com/digital-evidence" },
  { id: "ai-engineering", name: "ai-engineering-implementation-stack", url: "https://example.com/ai-engineering" },
  { id: "prompt-architect", name: "Prompt Architect 360", url: "https://example.com/prompt-architect" },
  { id: "pos", name: "POS", url: "https://example.com/pos" },
  { id: "design", name: "Design", url: "https://example.com/design" },
  { id: "herhyness", name: "Herhyness", url: "https://example.com/herhyness" },
];

const recoveryStyle = {
  backgroundColor: '#0a0a0a',   // solid dark charcoal
  color: '#f5f5f5',            // light text for contrast
  minHeight: '100vh',
};

export default function LandingHub() {
  const [artyModalOpen, setArtyModalOpen] = useState(false);
  const [artyPassword, setArtyPassword] = useState("");

  const handleAppClick = (app) => {
    if (app.id === "arty") {
      setArtyModalOpen(true);
      return;
    }
    window.open(app.url, "_blank");
  };

  const handleArtySubmit = (e) => {
    e.preventDefault();
    console.log("Entered ARTY password:", artyPassword);
    setArtyModalOpen(false);
    setArtyPassword("");
  };

  return (
    <div style={recoveryStyle} className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col lg:flex-row font-sans">
      <Head>
        <title>HUB ALL PROJECT</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section – Left side on Desktop, Top on Mobile */}
      <section className="relative w-full lg:w-5/12 h-[50vh] lg:h-screen flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-800 shrink-0">
        {/* Check if image exists, otherwise fallback to dark bg */}
        <div className="absolute inset-0 bg-neutral-900" />
        <Image src="/military-smoke.jpg" alt="Military smoke background" fill className="object-cover filter blur-sm opacity-50 mix-blend-overlay" priority unoptimized />
        {/* Dark charcoal overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-neutral-950" />
        
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg leading-tight">HUB ALL PROJECT</h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-300 font-medium">Experience a unified, premium gateway to all your tools.</p>
          <a href="#apps" className="lg:hidden inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            ENTER SYSTEM
          </a>
        </div>
      </section>

      {/* Applications Grid – Right side on Desktop, Bottom on Mobile */}
      <section id="apps" className="w-full lg:w-7/12 py-12 px-6 md:px-12 lg:px-16 bg-neutral-950 flex-grow lg:h-screen lg:overflow-y-auto custom-scrollbar">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center lg:text-left mb-10 tracking-tight text-white">Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
          {apps.map((app) => (
            <div key={app.id} className="group relative border border-gray-800 rounded-2xl p-6 text-center hover:bg-gray-800/80 transition-all duration-300 cursor-pointer bg-gray-900/50 hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-48" onClick={() => handleAppClick(app)}>
              <div className="flex flex-col items-center justify-center flex-grow">
                <h3 className="text-lg font-bold mb-2 text-gray-100 group-hover:text-indigo-400 transition-colors">{app.name}</h3>
              </div>
              <button className="inline-block w-full bg-gray-800 group-hover:bg-indigo-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors mt-4" onClick={(e) => { e.stopPropagation(); handleAppClick(app); }}>
                Open App
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ARTY Credential Modal */}
      {artyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">ARTY Authentication</h3>
            <form onSubmit={handleArtySubmit} className="space-y-6">
              <div>
                <input type="password" placeholder="Enter Security Code" value={artyPassword} onChange={(e) => setArtyPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500" required />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setArtyModalOpen(false)} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-600/20">Authorize</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
