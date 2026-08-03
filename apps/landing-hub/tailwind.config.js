/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/landing-hub/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'sci-cyan': '#00FFFF',
        'crimson-red': '#DC143C',
        'hazard-orange': '#FF4500',
        'hub-dark': '#0a0a0a',
        'hub-panel': '#111111',
      }
    },
  },
  plugins: [],
};
