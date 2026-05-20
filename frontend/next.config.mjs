import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    root: rootDir,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // Use server-side env vars (runtime) — NOT NEXT_PUBLIC_ (build-time only)
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8080';
    const authUrl = process.env.AUTH_URL ?? 'http://localhost:3001';
    const adminUrl = process.env.ADMIN_URL ?? 'http://localhost:3002';
    return [
      {
        source: '/api/auth/:path*',
        destination: `${authUrl}/v1/auth/:path*`,
      },
      {
        source: '/api/v1/admin/:path*',
        destination: `${adminUrl}/v1/admin/:path*`,
      },
      {
        source: '/api/v1/doctor-admin/:path*',
        destination: `${adminUrl}/v1/doctor-admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
