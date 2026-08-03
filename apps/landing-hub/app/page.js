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
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col items-center justify-start px-6 py-12">
      <Head>
        <title>HUB ALL PROJECT</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section – Full‑screen blurred military smoke background */}
      <section className="relative flex items-center justify-center h-screen">
        <Image src="/military-smoke.jpg" alt="Military smoke background" fill className="object-cover filter blur-sm opacity-70" priority />
        {/* Dark charcoal overlay */}
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative z-10 text-center max-w-xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">HUB ALL PROJECT</h1>
          <p className="text-lg md:text-xl mb-8">Experience a unified, premium gateway to all your tools.</p>
          <a href="#apps" className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-md transition-colors">ENTER SYSTEM</a>
        </div>
      </section>

      {/* Applications Grid */}
      <section id="apps" className="py-16 px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Applications</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="border border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-800" onClick={() => handleAppClick(app)}>
              <h3 className="text-xl font-semibold mb-3">{app.name}</h3>
              <button className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 px-4 rounded" onClick={(e) => { e.stopPropagation(); handleAppClick(app); }}>Open</button>
            </div>
          ))}
        </div>
      </section>

      {/* ARTY Credential Modal */}
      {artyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Enter ARTY Credential</h3>
            <form onSubmit={handleArtySubmit} className="space-y-4">
              <input type="password" placeholder="Password" value={artyPassword} onChange={(e) => setArtyPassword(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none" required />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setArtyModalOpen(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
