import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbital Interface - Impeccable Design",
  description: "Next-gen immersive UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-white">
        <div className="fixed inset-0 noise-bg pointer-events-none z-50 mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
