/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint for production builds
  },
};

module.exports = nextConfig;
