import { EmptyState, Heading, Text } from "@repo/ui";

import { AuthenticatedShell } from "../../components/shell/authenticated-shell";

export default function DashboardPage() {
  return (
    <AuthenticatedShell>
      <div className="space-y-6">
        <div>
          <Heading level={1} size="xl">
            Dashboard
          </Heading>
          <Text className="mt-2" tone="muted">
            Authenticated shell placeholder.
          </Text>
        </div>
        <EmptyState
          description="Dashboard content will be added in a future phase."
          title="No dashboard modules yet"
        />
      </div>
    </AuthenticatedShell>
  );
}
