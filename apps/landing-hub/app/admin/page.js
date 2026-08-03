'use client';
import Head from "next/head";
import { useState } from "react";

// Mock categories (5 sub‑apps) – adjust names as needed
const categories = [
  { id: "arty", name: "ARTY" },
  { id: "digital-evidence", name: "DIGITAL EVIDENCE" },
  { id: "ai-engineering", name: "AI Engineering" },
  { id: "prompt-architect", name: "Prompt Architect" },
  { id: "pos", name: "POS" },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedCats, setSelectedCats] = useState([]);

  const toggleCategory = (catId) => {
    setSelectedCats((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!username) return;
    const newUser = {
      id: Date.now().toString(),
      name: username,
      access: selectedCats,
      cutSignal: false,
    };
    setUsers((prev) => [...prev, newUser]);
    setUsername("");
    setSelectedCats([]);
  };

  const toggleCutSignal = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, cutSignal: !u.cutSignal } : u))
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white antialiased py-12 px-4 md:px-8">
      <Head>
        <title>Admin Dashboard</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Add User Form */}
      <form
        onSubmit={addUser}
        className="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 mb-12 shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            User Name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium mb-1">Access Categories</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded"
                />
                <span className="ml-2">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded"
        >
          Add User
        </button>
      </form>

      {/* Users List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-700"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-400">
                Access: {user.access.length ? user.access.map((a) => categories.find((c) => c.id === a)?.name).join(", ") : "None"}
              </p>
            </div>
            <button
              onClick={() => toggleCutSignal(user.id)}
              className={`px-4 py-2 rounded ${user.cutSignal ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"} text-white font-medium`}
            >
              {user.cutSignal ? "Re‑enable" : "Cut Signal"}
            </button>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-400">No users added yet.</p>
        )}
      </div>
    </div>
  );
}
