/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable Tailwind JIT and any other future features if needed
  // Adjust the basePath if the app is served from a subpath
};

module.exports = nextConfig;
