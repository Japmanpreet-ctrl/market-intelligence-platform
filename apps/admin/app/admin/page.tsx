import { EmptyState, Heading, Text } from "@repo/ui";

import { AdminShell } from "../../components/shell/admin-shell";

export default function AdminRoutePage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <Heading level={1} size="xl">
            Admin
          </Heading>
          <Text className="mt-2" tone="muted">
            Admin content layout placeholder.
          </Text>
        </div>
        <EmptyState
          description="Admin functionality will be added in a future phase."
          title="Admin shell ready"
        />
      </div>
    </AdminShell>
  );
}
