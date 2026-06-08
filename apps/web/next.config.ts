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
    "better-auth",
    "groq-sdk",
    "kysely"
  ],
  transpilePackages: [
    "@repo/ai",
    "@repo/auth",
    "@repo/config",
    "@repo/database",
    "@repo/market-data",
    "@repo/ui"
  ]
  // Do not hardcode PRISMA_QUERY_ENGINE_BINARY here — let Prisma provide
  // the correct query engine for the runtime platform (Vercel uses Linux).
};

export default nextConfig;
