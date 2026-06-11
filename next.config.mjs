/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  serverExternalPackages: ['mammoth'],
  experimental: {
    cpus: 1,
  },
  images: {
    deviceSizes: [320, 420, 640, 768, 1024, 1200],
    imageSizes: [64, 96, 128, 256],
    formats: ["image/webp"],
    minimumCacheTTL: 3600,
  },
  async rewrites() {
    return [
      {
        source: "/blogs/:file*",
        destination: "/blog-images/:file*",
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
