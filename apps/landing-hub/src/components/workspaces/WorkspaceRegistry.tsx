"use client";

import React from "react";
import { GenericTerminalWorkspace } from "./GenericTerminalWorkspace";
import { VisualSpecWorkspace } from "./VisualSpecWorkspace";
import { OmniRouterWorkspace } from "./OmniRouterWorkspace";
import { PhaseLockWorkspace } from "./PhaseLockWorkspace";
import { ExpansionPortWorkspace } from "./ExpansionPortWorkspace";
import { DiagnosticWorkspace } from "./DiagnosticWorkspace";
import { RoadmapWorkspace } from "./RoadmapWorkspace";
import { ReleaseGatekeeperWorkspace } from "./ReleaseGatekeeperWorkspace";
import { ContractValidatorWorkspace } from "./ContractValidatorWorkspace";
import { ExportStudioWorkspace } from "./ExportStudioWorkspace";
import { TrumpCardsWorkspace } from "./TrumpCardsWorkspace";
import { GhostComputerWorkspace } from "./GhostComputerWorkspace";
import { PersonaSwitcherWorkspace } from "./PersonaSwitcherWorkspace";
import { ContextCompressionWorkspace } from "./ContextCompressionWorkspace";
import { PromptStudioWorkspace } from "./PromptStudioWorkspace";
import { ReasoningShieldWorkspace } from "./ReasoningShieldWorkspace";
import { OmniVisionWorkspace } from "./OmniVisionWorkspace";
import { UniversalMCPWorkspace } from "./UniversalMCPWorkspace";
import { CinematicHudWorkspace } from "./CinematicHudWorkspace";
import { SkillProvisionerWorkspace } from "./SkillProvisionerWorkspace";
import { FableInjectorWorkspace } from "./FableInjectorWorkspace";
import { SkillOrchestrationWorkspace } from "./SkillOrchestrationWorkspace";

interface WorkspaceRegistryProps {
  activeWorkspaceId: string | null;
  features: { id: string; title: string; desc: string; button: string; type: string }[];
}

export function WorkspaceRegistry({ activeWorkspaceId, features }: WorkspaceRegistryProps) {
  if (!activeWorkspaceId) return null;

  const activeFeature = features.find(f => f.id === activeWorkspaceId);
  if (!activeFeature) return null;

  // We now route ALL workspaces to the upgraded GenericTerminalWorkspace 
  // to ensure they all get the HOW TO Manual and Contextual Chatbot layout.
  const workspaceMap: Record<string, React.ReactNode> = {
    // Legacy bespoke workspaces are bypassed to enforce the unified layout.
  };

  if (workspaceMap[activeWorkspaceId]) {
    return <>{workspaceMap[activeWorkspaceId]}</>;
  }

  // Fallback to Generic Workspaces based on type
  return (
    <GenericTerminalWorkspace 
      featureId={activeFeature.id} 
      title={activeFeature.title} 
      type={activeFeature.type} 
    />
  );
}
