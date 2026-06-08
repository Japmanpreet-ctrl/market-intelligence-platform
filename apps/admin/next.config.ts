import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/config", "@repo/ui"]
};

export default nextConfig;
