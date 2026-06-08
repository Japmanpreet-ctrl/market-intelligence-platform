export const dynamic = "force-dynamic";

import type { ReactNode } from "react";

import { ADMIN_ROLE, requireRole } from "@repo/auth/guards";

const adminBaseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_ADMIN_URL ??
  "http://localhost:3001";

export default async function AdminSectionLayout({ children }: { children: ReactNode }) {
  await requireRole(ADMIN_ROLE, {
    baseURL: adminBaseURL,
    redirectTo: "/"
  });

  return children;
}
