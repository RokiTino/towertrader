/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ disables type checking at build time
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
async rewrites() {
    const apiOrigin = process.env.API_ORIGIN || 'http://localhost:8080';
    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },

};

module.exports = nextConfig;
