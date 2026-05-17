/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // Use server-side env vars (runtime) — NOT NEXT_PUBLIC_ (build-time only)
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8080';
    const authUrl = process.env.AUTH_URL ?? 'http://localhost:3001';
    const adminUrl = process.env.ADMIN_URL ?? 'http://healthcare-admin.staging.svc.cluster.local';
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
