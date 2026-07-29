/** @type {import('next').NextConfig} */

/**
 * Security headers.
 *
 * The site previously sent none, which is the Best Practices gap Lighthouse
 * reports on production. The CSP is deliberately permissive around inline
 * styles/scripts because the app relies on styled-jsx, inline `style`
 * attributes, GSAP-driven inline styles and GTM — a stricter policy would
 * require removing those first.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "media-src 'self' blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  trailingSlash: true,
  serverExternalPackages: ["mammoth"],
  // gzip/brotli for HTML and RSC payloads. Lighthouse flagged
  // `uses-text-compression`; this app runs behind a self-hosted Node process
  // (PM2), so there is no platform edge doing it for us.
  compress: true,
  poweredByHeader: false,
  experimental: {
    // `cpus: 1` was throttling builds to a single core with no runtime benefit.
    // Icon barrels and GSAP were pulling far more into each chunk than the
    // handful of named exports actually used.
    optimizePackageImports: ["react-icons", "gsap", "@gsap/react"],
  },
  images: {
    // Every extra breakpoint is another URL in every responsive image's
    // srcset, and the page carries a lot of images — keep the ladder tight.
    deviceSizes: [320, 640, 768, 1024, 1280, 1600],
    imageSizes: [64, 96, 128, 256],
    // AVIF first — typically 20–30% smaller than WebP at equal quality.
    formats: ["image/avif", "image/webp"],
    // Optimized derivatives are content-addressed, so a one-hour TTL only
    // forced needless re-encodes on the origin.
    minimumCacheTTL: 31536000,
  },
  async rewrites() {
    return [
      {
        source: "/blogs/:file*",
        destination: "/blog-images/:file*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Immutable, content-hashed build output.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(mp4|webm|webp|avif|jpg|jpeg|png|gif|svg|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@imgly/background-removal"],
};

export default nextConfig;
