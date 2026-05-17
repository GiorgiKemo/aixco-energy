import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 86400,
  },
  async headers() {
    const publicAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=2592000",
      },
    ];

    return [
      {
        source: "/aixco-energy/video/:path*",
        headers: publicAssetHeaders,
      },
      {
        source: "/aixco-energy/images/:path*",
        headers: publicAssetHeaders,
      },
      {
        source: "/aixco-energy/news/:path*",
        headers: publicAssetHeaders,
      },
    ];
  },
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
