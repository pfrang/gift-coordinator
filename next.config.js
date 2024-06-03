
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "endpoint.ts"],
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: 'X-Frame-Options',
            value: "SAMEORIGIN",
          },
          {
            key: 'Strict-Transport-Security',
            value: "max-age=31536000; includeSubDomains"
          },
          {
            key: "Referrer-policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://my-profile-page-phi.vercel.app/; style-src 'self' 'unsafe-inline'",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=()"
          }
        ]
      }
    ]
  }
}
