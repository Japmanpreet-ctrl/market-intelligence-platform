import { EmptyState, Heading, Text } from "@repo/ui";

import { AdminShell } from "../components/shell/admin-shell";

export default function AdminHomePage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <Heading level={1} size="xl">
            Admin Foundation
          </Heading>
          <Text className="mt-2" tone="muted">
            Admin shell placeholder.
          </Text>
        </div>
        <EmptyState
          description="Admin modules will be added in a future phase."
          title="No admin modules yet"
        />
      </div>
    </AdminShell>
  );
}
