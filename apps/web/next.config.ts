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
    "kysely"
  ],
  transpilePackages: ["@repo/auth", "@repo/config", "@repo/database", "@repo/ui"],
  env: {
    PRISMA_QUERY_ENGINE_BINARY:
      "./node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node"
  }
};

export default nextConfig;
