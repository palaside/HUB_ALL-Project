"use client";

import React, { use, useState, useEffect } from "react";
import { LineChartWidget, DonutChartWidget, LogListWidget } from "@/components/dashboard/Widgets";
import { Power, Terminal, Play, Monitor, FileText, FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkspaceRegistry } from "@/components/workspaces/WorkspaceRegistry";

// Mapping of groupId to title
const groupTitles: Record<string, string> = {
  "1": "GROUP 4: COMMANDER & VOICE (THE OMNI-CORE)",
  "2": "GROUP 1: MASTER CONTROL (THE NEURAL COMPASS)",
  "3": "GROUP 2: HEALTH & LAW (THE PULSE SHIELD)",
  "4": "GROUP 3: BLUEPRINTS & SPECS (THE ARCHITECT MATRIX)",
  "5": "GROUP 5: PROMPT ENGINE (THE SYNAPTIC PRISM)",
  "6": "GROUP 6: INTEGRATIONS (THE ORBITAL NEXUS)",
  "7": "GROUP 7: SKILL ORCHESTRATION (THE MODULAR CORE)",
};

// Mapping of groupId to dynamic features
const groupFeatures: Record<string, { id: string; title: string; desc: string; button: string; type: string }[]> = {
  "1": [ // G4
    { id: "f4-1", title: "THE TRUMP CARDS DOCK", desc: "CEO Orchestrator, Legacy Transform, Auto-Heal", button: "EXECUTE TRUMP CARD", type: "console" },
    { id: "f4-2", title: "GHOST COMPUTER USE", desc: "OS Automation & Voice Engine", button: "ACTIVATE GHOST MODE", type: "voice" },
    { id: "f4-3", title: "COGNITIVE PERSONA SWITCHER", desc: "Switch between Fable 5, Architect, BA", button: "SWITCH PERSONA", type: "form" },
    { id: "f4-4", title: "GOD MODE TERMINAL", desc: "Root access, Jarvis, Ghost controls", button: "ENTER GOD MODE", type: "console" },
    { id: "f4-5", title: "THE TRUMP EXECUTION ENGINE", desc: "Execute heavy commands via START_THE_TRUMP", button: "START ENGINE", type: "console" },
    { id: "f4-6", title: "E-SLIP VERIFICATION ENGINE", desc: "eslip_processor.py - Heavy processing", button: "PROCESS SLIP", type: "console" },
    { id: "f4-7", title: "SWARM AGENT COORDINATOR", desc: "Multi-Agent Subagents Coordination (09, 10, 25)", button: "COORDINATE SWARM", type: "console" },
  ],
  "2": [ // G1
    { id: "f1-1", title: "OMNI-ROUTER DASHBOARD", desc: "Invisible Daemon Routing & Pre-Warm Context", button: "EXECUTE ROUTING", type: "console" },
    { id: "f1-2", title: "AGENTIC PHASE-LOCK", desc: "Workflow Gatekeeper (ASK -> PLAN -> IMPLEMENT)", button: "APPROVE PLAN", type: "form" },
    { id: "f1-3", title: "UNIVERSAL EXPANSION PORT", desc: "Module Setup Wizard for new stations", button: "+ ADD NEW MODULE", type: "form" },
    { id: "f1-4", title: "TRINITY ENGINE CONTROL CENTER", desc: "1.PALASIDE TRINITY ENGINE Setup", button: "MANAGE TRINITY", type: "form" },
    { id: "f1-5", title: "CORE ENGINE MONITOR", desc: "2.core_engine status & diagnostics", button: "MONITOR CORE", type: "console" },
    { id: "f1-6", title: "ULTIMATE BACKUP CORE", desc: "ANTIGRAVITY_ULTIMATE_CORE management", button: "ACCESS BACKUPS", type: "console" },
    { id: "f1-7", title: "PCCOS RUNTIME CONTROLLER", desc: "palaside_os.py & pccos_server.py daemon", button: "START PCCOS", type: "console" },
    { id: "f1-8", title: "KNOWLEDGE ARCH BASE", desc: "01_KNOWLEDGE_ARCHITECTURE_360", button: "ACCESS BASE", type: "form" },
  ],
  "3": [ // G2
    { id: "f2-1", title: "ONE-CLICK DIAGNOSTIC", desc: "Real-time System Health Scanner", button: "SCAN SYSTEM HEALTH", type: "console" },
    { id: "f2-2", title: "AUTONOMOUS ROADMAP", desc: "Interactive Kanban & Risk Radar", button: "VIEW PROJECT RADAR", type: "form" },
    { id: "f2-3", title: "RELEASE GATEKEEPER", desc: "Fail-Safe Release Quality Gate", button: "VERIFY RELEASE", type: "console" },
    { id: "f2-4", title: "CONSTITUTION & VAULT", desc: "360 - AI Constitutions & Standards", button: "VIEW CONSTITUTION", type: "form" },
    { id: "f2-5", title: "LEGAL & AUDIT SCANNER", desc: "slip_lawyer_cli.py & audit reports", button: "RUN AUDIT", type: "console" },
    { id: "f2-6", title: "WORKFLOW & COMPLIANCE LABS", desc: "Guardrails, Tuning, Ide control (18-22, 27)", button: "MANAGE LABS", type: "form" },
  ],
  "4": [ // G3
    { id: "f3-1", title: "VISUAL SPEC GENERATOR", desc: "Smart Form GUI for UI/Component specs", button: "CREATE NEW SPEC", type: "form" },
    { id: "f3-2", title: "CONTRACT VALIDATOR", desc: "Enterprise Principles & Compliance Engine", button: "ENFORCE CONTRACTS", type: "console" },
    { id: "f3-3", title: "OMNI-EXPORT STUDIO", desc: "Production-Ready PDF/Excel Pipeline", button: "CONFIGURE EXPORT", type: "form" },
    { id: "f3-4", title: "UI DEMO PLAYGROUND", desc: "3.ui_demo sandbox", button: "OPEN PLAYGROUND", type: "form" },
    { id: "f3-5", title: "AI ARCHITECT CONSOLE", desc: "AI_ARCHITECT core planning", button: "START ARCHITECT", type: "form" },
    { id: "f3-6", title: "DESIGN OS GENERATOR", desc: "DESIGN_OS & create_pccos_design_os.py", button: "GENERATE DESIGN", type: "console" },
    { id: "f3-7", title: "COMPONENT SCAFFOLD", desc: "create_template.py tools", button: "GENERATE TEMPLATE", type: "console" },
    { id: "f3-8", title: "ADVANCED UI/UX DECONSTRUCTION", desc: "Design systems & analysis (04, 05, 24, 26)", button: "ANALYZE UI", type: "form" },
  ],
  "5": [ // G5
    { id: "f5-1", title: "6C CONTEXT COMPRESSION", desc: "Collect, Clean, Curate, Compress, Compose", button: "COMPRESS CONTEXT", type: "console" },
    { id: "f5-2", title: "RCAO PROMPT STUDIO", desc: "Role, Context, Action, Output Formatter", button: "GENERATE PROMPT", type: "form" },
    { id: "f5-3", title: "ZERO-HALLUCINATION ENGINE", desc: "Strict Context Grounding Verifier", button: "VERIFY CONTEXT", type: "console" },
    { id: "f5-4", title: "SYSTEM AGENTS HUB", desc: "SYSTEM_AGENTS & Custom integrations", button: "MANAGE AGENTS", type: "form" },
    { id: "f5-5", title: "ULTIMATE PROMPT LIBRARY", desc: "พรอมเทวดาสั่ง GG.txt", button: "VIEW PROMPTS", type: "form" },
    { id: "f5-6", title: "CHAT CAPTURE STUDIO", desc: "Intelligent Chat Capture Production (17)", button: "CAPTURE CHAT", type: "console" },
  ],
  "6": [ // G6
    { id: "f6-1", title: "OMNI-VISION & OCR SCANNER", desc: "Local CUDA Accelerated Image/PDF Extraction", button: "DROP TO SCAN", type: "console" },
    { id: "f6-2", title: "UNIVERSAL MCP & GITHUB", desc: "API Gateway, Repo Crawler & MCP Hub", button: "CONNECT API", type: "form" },
    { id: "f6-3", title: "CINEMATIC HUD & MEDIA", desc: "3D Hologram Interface & Video Factory", button: "OPEN HUD", type: "console" },
    { id: "f6-4", title: "PCCOS EXPLORER GENERATOR", desc: "generate_explorer.py", button: "GENERATE EXPLORER", type: "console" },
    { id: "f6-5", title: "F-DRIVE SYNC TOOL", desc: "export_to_f.py", button: "SYNC DATA", type: "console" },
    { id: "f6-6", title: "DIRECTORY EXTRACTOR", desc: "extract_structure.py", button: "EXTRACT STRUCTURE", type: "console" },
    { id: "f6-7", title: "MCP CONFIGURATOR", desc: "mcp.json management", button: "EDIT MCP", type: "form" },
    { id: "f6-8", title: "LOCAL MODELS & ROUTING", desc: "Local Model, OCR & Port Routing (06-08, 11, 16, 23)", button: "MANAGE ROUTING", type: "console" },
  ],
  "7": [ // G7
    { id: "f7-1", title: "DYNAMIC SKILL PROVISIONER", desc: "Contextual Radar for AI Skill Recommendation", button: "SCAN CONTEXT", type: "console" },
    { id: "f7-2", title: "FABLE REASONING INJECTOR", desc: "Adjustable Deep Logic & Verification Engine", button: "ADJUST DEPTH", type: "form" },
    { id: "f7-3", title: "THE SKILL MATRIX DATABASE", desc: "Manage CUSTOM_SYSTEM_AGENTS.md Cartridges", button: "VIEW DATABASE", type: "console" },
    { id: "f7-4", title: "APP DEPLOYMENT BOILERPLATE", desc: "5.my-project orchestration", button: "DEPLOY BOILERPLATE", type: "console" },
    { id: "f7-5", title: "AGENT PROVISIONING HUB", desc: "Skills & .agents configurations", button: "MANAGE SKILLS", type: "form" },
    { id: "f7-6", title: "SKILL TRANSLATOR UTILITY", desc: "translate_palaside_skills.py", button: "TRANSLATE SKILLS", type: "console" },
    { id: "f7-7", title: "MULTIPLE RUNTIMES STUDIO", desc: "Mobile/Native/SPA (12, 13, 14, 15)", button: "CONFIGURE RUNTIME", type: "form" },
  ],
};

export default function DashboardPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  
  const title = groupTitles[groupId] || "UNKNOWN GROUP";
  const features = groupFeatures[groupId];

  // State to track which features are toggled ON (Default to true for all existing features)
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({});
  
  // Set default toggles to true on mount
  useEffect(() => {
    if (features) {
      const initialToggles: Record<string, boolean> = {};
      features.forEach(f => {
        initialToggles[f.id] = true;
      });
      setActiveToggles(initialToggles);
    }
  }, [features]);

  // State to track which feature's workspace is currently open
  const [openWorkspace, setOpenWorkspace] = useState<string | null>(null);

  const toggleFeature = (id: string) => {
    setActiveToggles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExecute = (id: string) => {
    // Must be toggled on to execute
    if (!activeToggles[id]) {
      // Auto-toggle it on
      setActiveToggles(prev => ({ ...prev, [id]: true }));
    }
    
    setOpenWorkspace(openWorkspace === id ? null : id);
  };

  return (
    // Replaced max-w-7xl mx-auto with w-full px-8 for FULL WIDTH expansion
    <div className="flex flex-col gap-6 w-full h-full pb-8 px-2 md:px-8">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-sm text-cyan-500/70 font-mono mt-1">
            System overview and real-time telemetry for Node #{groupId}
          </p>
        </div>
        

      </div>

      {/* Top Stats Row - Hidden in Focus Mode */}
      {!openWorkspace && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Total Processing</h3>
            <div className="text-3xl font-bold text-white">14.2 TB</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <span className="font-bold">↑ 12%</span> vs last week
            </div>
          </div>
          <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Active Agents</h3>
            <div className="text-3xl font-bold text-white">37 / 37</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <span className="font-bold">100%</span> optimal capacity
            </div>
          </div>
          <div className="bg-[#0a101f] border border-cyan-900/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">System Latency</h3>
            <div className="text-3xl font-bold text-white">12 ms</div>
            <div className="text-xs text-amber-400 mt-2 flex items-center gap-1">
              <span className="font-bold">~ 2ms</span> jitter detected
            </div>
          </div>
        </div>
      )}

      {/* Interactive Group Specific Features Module */}
      {!openWorkspace && features && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => {
            const isActive = activeToggles[feat.id] || false;
            const isWorkspaceOpen = openWorkspace === feat.id;

            return (
              <div 
                key={feat.id} 
                className={cn(
                  "bg-[#050505] border rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300",
                  isActive ? "border-cyan-500/60 shadow-[0_0_20px_rgba(14,165,233,0.2)]" : "border-cyan-500/20 shadow-[0_0_15px_rgba(14,165,233,0.05)]",
                  isWorkspaceOpen ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#050505]" : ""
                )}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn("text-sm font-bold transition-colors", isActive ? "text-cyan-300" : "text-cyan-500/50")}>
                      {feat.title}
                    </h3>
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => toggleFeature(feat.id)}
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-300",
                        isActive ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-slate-800 text-slate-500"
                      )}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Feature Content */}
                <div className="p-6 pt-0">
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {feat.desc}
                  </p>

                  {/* How to Use / SOP Section */}
                  <div className="mb-6 rounded-lg bg-[#0a101f] border border-cyan-900/30 overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-3 cursor-pointer select-none text-xs font-bold tracking-wider text-cyan-500/70 hover:bg-cyan-900/20 transition-colors">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4" />
                          <span>HOW TO USE & BOOTSTRAPPING</span>
                        </div>
                        <span className="transform transition-transform duration-200 group-open:rotate-180">▼</span>
                      </summary>
                      <div className="p-4 border-t border-cyan-900/30 text-[11px] text-slate-300 space-y-3 font-mono">
                        <div>
                          <strong className="text-cyan-400 block mb-1">Step 1: Environment Setup (ชี้เป้าหมายฐานข้อมูล)</strong>
                          ตรวจสอบให้แน่ใจว่า AI ของคุณกำลังชี้ Path การค้นหาไปที่โครงสร้างระบบ <span className="bg-black/50 text-emerald-400 px-1 py-0.5 rounded">F:\PALASIDE\4.UNIVERSAL_360_AGENTIC_FRAMEWORK_EMPIRE</span> เพื่อให้ Vector Database พร้อมทำ Indexing
                        </div>
                        <div>
                          <strong className="text-cyan-400 block mb-1">Step 2: Lazy-Loading Activation (กระชากฟีเจอร์เข้าสู่ RAG)</strong>
                          พิมพ์คำสั่งลงในหน้าแชทของคุณเพื่อปลุกเครื่องยนต์ขึ้นมาทำงาน (ห้ามโหลดทั้งหมดพร้อมกัน)
                        </div>
                        <div>
                          <strong className="text-cyan-400 block mb-1">Step 3: Run Command (ป้อนคำสั่งดิบ)</strong>
                          บอกความต้องการสั้นๆ ของคุณให้ระบบฟัง เช่น: <em>"ฉันต้องการสร้างหน้าจอ Login ระบบ POS ช่วยใช้เครื่องยนต์ผลิต Prompt ระดับสถาปนิกซอฟต์แวร์ให้ฉันหน่อย"</em>
                        </div>
                        <div>
                          <strong className="text-cyan-400 block mb-1">Step 4: Execution (นำผลลัพธ์ไปใช้งาน)</strong>
                          AI จะคืนค่าผลลัพธ์เป็น "Prompt ฉบับสมบูรณ์" คุณสามารถนำไปยิงคำสั่งในสถานีงานอื่นต่อได้ทันที เช่น โยนเข้า @directory:14_INTELLIGENT_POS_PRODUCTION_STUDIO
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleExecute(feat.id)}
                    disabled={!isActive}
                    className={cn(
                      "w-full py-3 rounded-lg font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300",
                      isActive 
                        ? (isWorkspaceOpen 
                            ? "bg-cyan-900/50 text-cyan-400 border border-cyan-500/50" 
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]")
                        : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                    )}
                  >
                    <Play className={cn("w-4 h-4", isActive && "text-cyan-400")} />
                    {isWorkspaceOpen ? "WORKSPACE ACTIVE" : feat.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openWorkspace && (
        <div className="mb-4 flex justify-between items-center bg-[#080c16] p-4 rounded-xl border border-cyan-500/40 shadow-[0_0_20px_rgba(14,165,233,0.1)] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-sm font-bold tracking-widest">FOCUS MODE : MAXIMUM WORKSPACE</span>
          </div>
          <button 
            onClick={() => setOpenWorkspace(null)} 
            className="px-5 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 hover:border-red-500/60 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)]"
          >
            <Power className="w-3.5 h-3.5" />
            EXIT FOCUS MODE
          </button>
        </div>
      )}

      {/* Dynamic Execution Workspace Area */}
      <WorkspaceRegistry activeWorkspaceId={openWorkspace} features={features || []} />

      {/* Main Content Grid (Hidden when workspace is open to maximize space) */}
      {!openWorkspace && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2">
            <LineChartWidget />
          </div>
          <div className="flex flex-col gap-6">
            <DonutChartWidget />
            <LogListWidget />
          </div>
        </div>
      )}

    </div>
  );
}
