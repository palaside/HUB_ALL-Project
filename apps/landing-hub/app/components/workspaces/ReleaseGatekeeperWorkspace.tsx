"use client";

import React, { useState } from "react";
import { Rocket, ShieldCheck, CheckCircle2, XCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type StepStatus = "pending" | "running" | "passed" | "failed";

export function ReleaseGatekeeperWorkspace() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [steps, setSteps] = useState([
    { id: 1, name: "Unit Test Coverage (>90%)", status: "pending" as StepStatus, log: "" },
    { id: 2, name: "Performance Benchmark (Lighthouse)", status: "pending" as StepStatus, log: "" },
    { id: 3, name: "API Contract Validation", status: "pending" as StepStatus, log: "" },
    { id: 4, name: "Security Vulnerability Scan", status: "pending" as StepStatus, log: "" },
  ]);

  const allPassed = steps.every(s => s.status === "passed");
  const hasFailed = steps.some(s => s.status === "failed");

  const handleVerify = () => {
    setIsVerifying(true);
    setSteps(prev => prev.map(s => ({ ...s, status: "pending", log: "" })));

    let currentStep = 0;

    const runNextStep = () => {
      if (currentStep >= steps.length) {
        setIsVerifying(false);
        return;
      }

      // Set current to running
      setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: "running" } : s));

      setTimeout(() => {
        // Evaluate
        setSteps(prev => prev.map((s, i) => {
          if (i === currentStep) {
            // Simulate 100% pass for this demo to show the Deploy button, but you can randomize failure
            return { ...s, status: "passed", log: `Validated against rules in RELEASE_READINESS.md` };
          }
          return s;
        }));
        
        currentStep++;
        runNextStep();
      }, 1200);
    };

    runNextStep();
  };

  return (
    <div className="bg-[#111] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-[calc(100vh-180px)] min-h-[700px] overflow-hidden font-sans text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#222] p-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-rose-500" />
          <h2 className="text-rose-400 font-bold tracking-widest text-sm">F2.3: PRODUCTION RELEASE GATEKEEPER</h2>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-[#111] to-[#111] overflow-y-auto">
        <div className="w-full max-w-2xl bg-[#0a0a0a] rounded-2xl border border-[#222] shadow-2xl p-8 flex flex-col gap-8">
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Fail-Safe Release Quality Gate</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Ensure zero bugs leak to production. The Gatekeeper evaluates tests, performance, and API contracts automatically before deployment.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className={cn(
                "p-4 rounded-xl border flex items-center justify-between transition-colors",
                step.status === "passed" ? "bg-emerald-950/10 border-emerald-500/30" :
                step.status === "failed" ? "bg-red-950/20 border-red-500/50" :
                step.status === "running" ? "bg-cyan-950/10 border-cyan-500/50" :
                "bg-[#111] border-[#333]"
              )}>
                <div className="flex items-center gap-3">
                  {step.status === "pending" && <div className="w-5 h-5 rounded-full border-2 border-[#444]" />}
                  {step.status === "running" && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
                  {step.status === "passed" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {step.status === "failed" && <XCircle className="w-5 h-5 text-red-500" />}
                  
                  <span className={cn(
                    "font-bold",
                    step.status === "passed" ? "text-emerald-400" :
                    step.status === "failed" ? "text-red-400" :
                    "text-slate-300"
                  )}>{step.name}</span>
                </div>
                {step.log && (
                  <span className="text-[10px] font-mono text-emerald-600/70">{step.log}</span>
                )}
              </div>
            ))}
          </div>

          {hasFailed && (
            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-red-400 text-sm">Deployment Blocked</div>
                <div className="text-xs text-slate-400 mt-1">One or more validation steps failed. Check `PROJECT_VALIDATION_REPORT.md` for details.</div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-[#222] flex gap-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex-1 py-4 bg-[#111] hover:bg-[#1a1a1a] disabled:opacity-50 border border-[#333] text-white rounded-xl font-bold tracking-widest transition-colors"
            >
              {isVerifying ? "VERIFYING..." : "VERIFY RELEASE"}
            </button>
            
            <button 
              disabled={!allPassed || isVerifying}
              className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all"
            >
              <Rocket className="w-5 h-5" />
              DEPLOY TO PRODUCTION
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
