import Image from 'next/image';
import { useEffect, useState } from 'react';

// Mock app data – replace URLs with real ones later
const apps = [
  { id: 'report', name: 'รายงานรอง', url: 'https://example.com/report' },
  { id: 'digital-evidence', name: 'DIGITAL EVIDENCE', url: 'https://example.com/digital-evidence' },
  { id: 'ai-engineering', name: 'ai-engineering-implementation-stack', url: 'https://example.com/ai-engineering' },
  { id: 'prompt-architect', name: 'Prompt Architect 360', url: 'https://example.com/prompt-architect' },
  { id: 'pos', name: 'POS', url: 'https://example.com/pos' },
  { id: 'design', name: 'Design', url: 'https://example.com/design' },
  { id: 'herhyness', name: 'Herhyness', url: 'https://example.com/herhyness' },
];

export default function LandingHub() {
  const [credentials, setCredentials] = useState({});

  // Load any stored passwords from localStorage (mock persistence)
  useEffect(() => {
    const stored = {};
    apps.forEach(app => {
      const pwd = localStorage.getItem(`crg-admin:${app.id}`);
      if (pwd) stored[app.id] = pwd;
    });
    setCredentials(stored);
  }, []);

  const handleAppClick = (app) => {
    // If a credential exists for this app, require password
    if (credentials[app.id]) {
      const entered = prompt(`Enter password to access ${app.name}:`);
      if (entered !== credentials[app.id]) {
        alert('Incorrect password – access denied');
        return;
      }
    }
    // Navigate to the app URL (opens in new tab)
    window.open(app.url, '_blank');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen antialiased">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-950">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/HOMEPAGE.png"
            alt="Landing hero"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="relative z-10 text-center p-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to the Central Hub
          </h1>
          <p className="text-lg mb-6 drop-shadow-md">
            Access all your integrated tools from one sleek, premium interface.
          </p>
          <a
            href="#apps"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Explore Apps
          </a>
        </div>
      </section>

      {/* Apps Grid */}
      <section id="apps" className="py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apps.map(app => (
            <div
              key={app.id}
              className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => handleAppClick(app)}
            >
              <div className="text-2xl font-semibold mb-2">{app.name}</div>
              {credentials[app.id] && (
                <div className="text-sm text-indigo-400 mb-2">Password protected</div>
              )}
              <button
                className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 px-4 rounded"
                onClick={(e) => { e.stopPropagation(); handleAppClick(app); }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
