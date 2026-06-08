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

import { SignInForm } from "../../components/auth/sign-in-form";
import { PublicShell } from "../../components/shell/public-shell";

export default function SignInPage() {
  return (
    <PublicShell>
      <Container className="py-10">
        <div className="mx-auto max-w-md space-y-6">
          <div>
            <Heading level={1} size="xl">
              Sign In
            </Heading>
            <Text className="mt-2" tone="muted">
              Sign in with your email or username.
            </Text>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Text tone="muted">Loading sign in form...</Text>}>
                <SignInForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PublicShell>
  );
}
