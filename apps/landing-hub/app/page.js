'use client';

import Head from "next/head";
import { Search, User, Globe, MapPin } from "lucide-react";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";

export default function LandingHub() {
  return (
    <div className="h-screen w-full bg-hub-dark text-neutral-100 font-sans flex flex-col overflow-hidden">
      <Head>
        <title>HUB ALL PROJECT</title>
      </Head>

      {/* Top Navigation Header */}
      <header className="h-16 border-b border-gray-800 bg-hub-panel flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-sci-cyan tracking-widest drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            HUB ALL PROJECT
          </h1>
          
          {/* Breadcrumbs / Filters */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
            <Globe size={16} className="text-neon-green" />
            <span className="hover:text-white cursor-pointer transition-colors">Japan</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors">Tokyo</span>
            <span>/</span>
            <MapPin size={16} className="text-neon-green" />
            <span className="text-white font-semibold">Shinjuku</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search command..." 
              className="bg-black border border-gray-700 text-sm rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-sci-cyan focus:ring-1 focus:ring-sci-cyan transition-all text-white w-64"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600 cursor-pointer hover:border-sci-cyan transition-colors">
            <User size={16} className="text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden h-[calc(100vh-64px)] sci-fi-grid">
        
        {/* Left Panel: AI Situation & Drone Control (3 columns) */}
        <div className="col-span-1 lg:col-span-3 h-full overflow-y-auto custom-scrollbar flex flex-col gap-4">
          <LeftPanel />
        </div>

        {/* Center Panel: City Pulse Core Analytics (6 columns) */}
        <div className="col-span-1 lg:col-span-6 h-full overflow-hidden flex flex-col gap-4">
          <CenterPanel />
        </div>

        {/* Right Panel: Incident Response & Operations (3 columns) */}
        <div className="col-span-1 lg:col-span-3 h-full overflow-y-auto custom-scrollbar flex flex-col gap-4">
          <RightPanel />
        </div>

      </main>
    </div>
  );
}
