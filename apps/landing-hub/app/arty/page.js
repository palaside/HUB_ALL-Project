import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";

// Mock data for demonstration (would be fetched from API in real implementation)
const mockTacticalTargets = [
  {
    targetId: "T-001",
    senderId: "1",
    eGrid: "E12",
    nGrid: "N34",
    altitude: 1500,
    description: "Enemy position",
    status: "Pending",
    createdAt: "2026-08-01",
  },
  {
    targetId: "T-002",
    senderId: "2",
    eGrid: "E15",
    nGrid: "N38",
    altitude: 1200,
    description: "Vehicle convoy",
    status: "Engaged",
    createdAt: "2026-08-02",
  },
];

export default function ArtyPage() {
  const [users, setUsers] = useState([]);
  const [fdcSetup, setFdcSetup] = useState({});
  const [targets, setTargets] = useState([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  // Load mock data on mount
  useEffect(() => {
    // Fetch users list (for admin view)
    fetch("/api/admin/kill-switch")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => setUsers([]));

    // Fetch FDC setup (mock GET endpoint)
    fetch("/api/setup/save")
      .then((res) => res.json())
      .then((data) => setFdcSetup(data.fdcSetup || {}))
      .catch(() => setFdcSetup({}));

    // Load tactical targets (mock local data)
    setTargets(mockTacticalTargets);

    // Load JWT token from localStorage if present
    const stored = localStorage.getItem("arty_token");
    const storedRole = localStorage.getItem("arty_role");
    if (stored) setToken(stored);
    if (storedRole) setRole(storedRole);
  }, []);

  const handleCutSignal = async (userId) => {
    // Call kill-switch API to deactivate user
    await fetch("/api/admin/kill-switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    // Simulate FORCE_LOGOUT by clearing local state
    localStorage.clear();
    alert(`Force logout executed for user ${userId}. All session data cleared.`);
    // Refresh page state
    setToken("");
    setRole("");
    // Optionally redirect to login page or show login UI
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("arty_token", data.token);
      localStorage.setItem("arty_role", data.role);
      setToken(data.token);
      setRole(data.role);
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white antialiased relative">
      <Head>
        <title>ARTY C2 Hub</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-64 bg-gray-800">
        <div className="relative z-10 text-center max-w-xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ARTY C2 Hub</h1>
          <p className="text-lg mb-6">Tactical command and control interface.</p>
        </div>
      </section>

      {/* Login Form (if not authenticated) */}
      {!token && (
        <section className="py-8 max-w-md mx-auto">
          <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded"
            >
              Sign In
            </button>
          </form>
        </section>
      )}

      {/* Main Dashboard (visible when logged in) */}
      {token && (
        <section className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <span className="px-3 py-1 bg-gray-700 rounded">Role: {role}</span>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto mb-8">
            <h3 className="text-xl font-medium mb-2">Users</h3>
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Active</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{u.id}</td>
                    <td className="px-4 py-2">{u.username}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">{u.isActive ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">
                      {u.isActive && (
                        <button
                          onClick={() => handleCutSignal(u.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
                        >
                          Cut Signal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FDC Setup */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">FDC System Setup</h3>
            <pre className="bg-gray-800 p-4 rounded">{JSON.stringify(fdcSetup, null, 2) || "No setup saved."}</pre>
          </div>

          {/* Tactical Targets */}
          <div className="overflow-x-auto">
            <h3 className="text-xl font-medium mb-2">Tactical Targets</h3>
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Target ID</th>
                  <th className="px-4 py-2 text-left">Sender ID</th>
                  <th className="px-4 py-2 text-left">E‑Grid</th>
                  <th className="px-4 py-2 text-left">N‑Grid</th>
                  <th className="px-4 py-2 text-left">Altitude</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {targets.map((t) => (
                  <tr key={t.targetId} className="border-b border-gray-700">
                    <td className="px-4 py-2">{t.targetId}</td>
                    <td className="px-4 py-2">{t.senderId}</td>
                    <td className="px-4 py-2">{t.eGrid}</td>
                    <td className="px-4 py-2">{t.nGrid}</td>
                    <td className="px-4 py-2">{t.altitude} m</td>
                    <td className="px-4 py-2">{t.description}</td>
                    <td className="px-4 py-2">{t.status}</td>
                    <td className="px-4 py-2">{t.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
