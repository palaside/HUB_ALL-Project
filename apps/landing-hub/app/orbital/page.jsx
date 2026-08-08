"use client";

import React from "react";
import { TimelineClient } from "../components/orbital_components/TimelineClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrbitalPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      {/* Back to Hub Header Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-gray-900/80 hover:bg-gray-800 text-sci-cyan px-4 py-2 rounded-lg border border-gray-700 transition-colors text-sm font-bold shadow-lg"
        >
          <ArrowLeft size={16} />
          <span>Back to Hub Dashboard</span>
        </Link>
      </div>

      <TimelineClient />
    </main>
  );
}
