"use client";

import React, { useState } from "react";
import { Link2, Cloud, DatabaseZap, Search, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

export function UniversalMCPWorkspace() {
  const [repo, setRepo] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);
  const [mcpActive, setMcpActive] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCrawl = () => {
    if (!repo) return;
    setIsCrawling(true);
    setResult(null);

    setTimeout(() => {
      setIsCrawling(false);
      setResult({
        repo: repo,
        files: 243,
        components: 45,
        tree: [
          "src/",
          "  ├── app/",
          "  │   ├── layout.tsx",
          "  │   └── page.tsx",
          "  ├── components/",
          "  │   ├── ui/",
          "  │   └── workspaces/",
          "  └── lib/",
          "      └── utils.ts"
        ],
        summary: "Next.js App Router project with Tailwind CSS and Radix UI components detected."
      });
    }, 2000);
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Link2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-blue-300 font-bold tracking-widest text-sm">F6.2: UNIVERSAL MCP & GITHUB INTEGRATOR</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Integrations */}
        <div className="w-1/2 border-r border-[#222] bg-[#050505] p-8 flex flex-col gap-8">
          
          <div className="space-y-4">
            <h3 className="text-slate-400 text-xs font-bold tracking-widest flex items-center gap-2">
              <GitBranch className="w-4 h-4" /> GITHUB CRAWLER
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="flex-1 bg-[#111] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-blue-500 outline-none font-mono text-xs"
              />
              <button 
                onClick={handleCrawl}
                disabled={isCrawling || !repo}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-[#222] disabled:text-slate-500 text-white font-bold rounded-lg transition-colors"
              >
                {isCrawling ? "CRAWLING..." : "SCAN REPO"}
              </button>
            </div>
          </div>

          <div className="h-px bg-[#222] w-full" />

          <div className="space-y-4">
            <h3 className="text-slate-400 text-xs font-bold tracking-widest flex items-center gap-2">
              <DatabaseZap className="w-4 h-4" /> NOTEBOOKLM MCP PLUGINS
            </h3>
            <div className={cn(
              "p-6 border-2 rounded-xl flex items-center justify-between transition-all",
              mcpActive ? "border-blue-500 bg-blue-950/20" : "border-[#333] bg-[#111]"
            )}>
              <div className="flex items-center gap-4">
                <Cloud className={cn("w-8 h-8", mcpActive ? "text-blue-400" : "text-slate-600")} />
                <div>
                  <div className={cn("font-bold", mcpActive ? "text-blue-300" : "text-slate-400")}>Google Drive MCP Server</div>
                  <div className="text-[10px] text-slate-500 mt-1">Connects AI to your live documents.</div>
                </div>
              </div>
              <button 
                onClick={() => setMcpActive(!mcpActive)}
                className={cn(
                  "px-4 py-2 font-bold text-xs rounded-lg transition-colors border",
                  mcpActive ? "bg-blue-600 text-white border-blue-500" : "bg-transparent text-slate-400 border-slate-600 hover:text-slate-300"
                )}
              >
                {mcpActive ? "DISCONNECT" : "CONNECT"}
              </button>
            </div>
          </div>

        </div>

        {/* Right: Crawl Results */}
        <div className="w-1/2 bg-[#0a0a0a] p-8 flex flex-col">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-4 flex justify-between items-center">
            <span className="flex items-center gap-2"><Search className="w-4 h-4" /> INTEGRATION CONTEXT</span>
            {mcpActive && <span className="text-blue-400 text-[10px] animate-pulse">MCP SERVER CONNECTED</span>}
          </div>

          <div className="flex-1 bg-black border border-[#222] rounded-xl p-6 font-mono text-[11px] overflow-y-auto">
            {!result && !isCrawling && (
              <div className="text-slate-600 italic h-full flex items-center justify-center">Scan a repository to extract context...</div>
            )}
            
            {result && (
              <div className="animate-in fade-in space-y-6">
                <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-lg text-blue-300">
                  <strong>Analysis:</strong> {result.summary}
                </div>
                
                <div>
                  <div className="text-slate-500 mb-2 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" /> REPOSITORY TREE STRUCTURE ({result.files} files)
                  </div>
                  <div className="text-slate-400 leading-loose">
                    {result.tree.map((line: string, i: number) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
