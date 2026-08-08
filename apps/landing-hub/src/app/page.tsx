import { TimelineClient } from "@/components/TimelineClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      <TimelineClient />
    </main>
  );
}
