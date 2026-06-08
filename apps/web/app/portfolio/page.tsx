export const dynamic = "force-dynamic";

import { requireAuth } from "@repo/auth/guards";
import { AuthenticatedShell } from "../../components/shell/authenticated-shell";
import PortfolioClient from "./portfolio-client";
import { assetRepository } from "@repo/market-data";

export default async function PortfolioPage() {
  const session = await requireAuth();
  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  const assetsResponse = await assetRepository.getAssets({}, { pageSize: 500 });

  return (
    <AuthenticatedShell userLabel={displayName}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortfolioClient assets={assetsResponse.data as any[]} />
    </AuthenticatedShell>
  );
}
