import { config } from "dotenv";
config({ path: "../../.env" });

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  serverExternalPackages: [
    "@better-auth/prisma-adapter",
    "@prisma/client",
    "@repo/database",
    "better-auth",
    "kysely"
  ],
  transpilePackages: ["@repo/auth", "@repo/config", "@repo/ui"]
};

export default nextConfig;
