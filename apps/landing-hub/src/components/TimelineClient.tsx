"use client";

import React from "react";
import { RadialOrbitalTimeline, type TimelineItem } from "./ui/radial-orbital-timeline";
import { Aperture, Compass, Shield, PencilRuler, Hexagon, Globe, Cpu } from "lucide-react";

const mockData: TimelineItem[] = [
  {
    id: 1,
    title: "GROUP 4: COMMANDER & VOICE",
    date: "THE OMNI-CORE",
    content: "Boss: CEO Orchestrator & Jarvis Omnibot. ศูนย์กลางบัญชาการสูงสุด รับคำสั่งและจ่ายงานให้กลุ่ม Support",
    category: "COMMANDER",
    icon: Aperture,
    status: "completed",
    energy: 5,
  },
  {
    id: 2,
    title: "GROUP 1: MASTER CONTROL",
    date: "THE NEURAL COMPASS",
    content: "Boss: Master Router Agent. ซัพพอร์ตการจัดการโครงสร้าง สารบัญ และตั้งค่าระบบเริ่มต้น",
    category: "ROUTER",
    icon: Compass,
    status: "completed",
    energy: 4,
  },
  {
    id: 3,
    title: "GROUP 2: HEALTH & LAW",
    date: "THE PULSE SHIELD",
    content: "Boss: System Health & QA Auditor. ตรวจสอบสุขภาพระบบ และบังคับใช้ The Supreme Law",
    category: "HEALTH",
    icon: Shield,
    status: "in-progress",
    energy: 3,
  },
  {
    id: 4,
    title: "GROUP 3: BLUEPRINTS & SPECS",
    date: "THE ARCHITECT MATRIX",
    content: "Boss: Principal Architect Agent. คลอดสเปกเอกสาร โครงสร้าง UI และสัญญาระบบ",
    category: "BLUEPRINTS",
    icon: PencilRuler,
    status: "in-progress",
    energy: 2,
  },
  {
    id: 5,
    title: "GROUP 5: PROMPT ENGINE",
    date: "THE SYNAPTIC PRISM",
    content: "Boss: Context Synthesis Agent. บีบอัดบริบท แปลง Prompt ป้องกันอาการความจำล้น",
    category: "PROMPT",
    icon: Hexagon,
    status: "pending",
    energy: 1,
  },
  {
    id: 6,
    title: "GROUP 6: INTEGRATIONS",
    date: "THE ORBITAL NEXUS",
    content: "Boss: External Integration Agent. ทะลวงดึงข้อมูลจากภายนอก API, Github, CUDA",
    category: "INTEGRATION",
    icon: Globe,
    status: "pending",
    energy: 1,
  },
  {
    id: 7,
    title: "GROUP 7: SKILL ORCHESTRATION",
    date: "THE MODULAR CORE",
    content: "Boss: Skill Provisioner Agent. วิเคราะห์และกระซิบเสนอแนะการติดตั้งสกิลเฉพาะทาง",
    category: "SKILLS",
    icon: Cpu,
    status: "pending",
    energy: 1,
  },
];

export function TimelineClient() {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
      <RadialOrbitalTimeline timelineData={mockData} />
    </div>
  );
}
