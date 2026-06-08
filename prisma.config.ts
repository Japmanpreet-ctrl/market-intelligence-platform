import "dotenv/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    path: "packages/database/prisma/migrations",
    seed: "tsx packages/database/prisma/seed.ts"
  },
  schema: "packages/database/prisma/schema.prisma"
});
