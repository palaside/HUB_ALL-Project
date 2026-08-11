import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design System | Production-Ready UI Components",
  description: "ระบบออกแบบครบวงจร พร้อม Design Tokens, Interactive Components, และ Clean Architecture ตามมาตรฐาน SOLID Principles",
  keywords: ["design system", "ui components", "react", "typescript", "tailwind css"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
