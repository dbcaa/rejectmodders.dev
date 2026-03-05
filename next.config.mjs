// Site configuration - import from centralized config
const SITE_URL = "https://rejectmodders.dev"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Caching for pages (2-4 hours) ────────────────────────
          {
            key: "Cache-Control",
            value: "public, max-age=7200, s-maxage=7200, stale-while-revalidate=14400",
          },
          // ── XSS / injection ─────────────────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://api.github.com https://api.spotify.com https://accounts.spotify.com https://va.vercel-scripts.com",
              "media-src 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // ── Clickjacking ─────────────────────────────────────────
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // ── MIME sniffing ────────────────────────────────────────
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // ── Referrer ─────────────────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // ── Browser features ─────────────────────────────────────
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // ── HSTS — preload-ready ──────────────────────────────────
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // ── Cross-origin isolation ───────────────────────────────
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          // ── Reporting ────────────────────────────────────────────
          {
            key: "Report-To",
            value: JSON.stringify({
              group: "default",
              max_age: 86400,
              endpoints: [{ url: `${SITE_URL}/api/csp-report` }],
            }),
          },
          {
            key: "NEL",
            value: JSON.stringify({
              report_to: "default",
              max_age: 86400,
              include_subdomains: true,
            }),
          },
        ],
      },
      // Static assets - long-term caching (1 year)
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API routes — shorter cache, tighten CORS to own origin only
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=600, stale-while-revalidate=1200",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: SITE_URL,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ]
  },
}

export default nextConfig
