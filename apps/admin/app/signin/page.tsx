import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  Text
} from "@repo/ui";
import { Suspense } from "react";

import { AdminSignInForm } from "../../components/auth/sign-in-form";
import { AdminShell } from "../../components/shell/admin-shell";

export default function AdminSignInPage() {
  return (
    <AdminShell>
      <Container className="py-10">
        <div className="mx-auto max-w-md space-y-6">
          <div>
            <Heading level={1} size="xl">
              Admin Sign In
            </Heading>
            <Text className="mt-2" tone="muted">
              Admin access requires an account with the Admin role.
            </Text>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Administrator access</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Text tone="muted">Loading sign in form...</Text>}>
                <AdminSignInForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AdminShell>
  );
}
