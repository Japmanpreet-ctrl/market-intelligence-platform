import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  serverExternalPackages: [
    "@better-auth/prisma-adapter",
    "@prisma/client",
    "better-auth",
    "kysely"
  ],
  transpilePackages: ["@repo/auth", "@repo/config", "@repo/database", "@repo/ui"]
};

export default nextConfig;
