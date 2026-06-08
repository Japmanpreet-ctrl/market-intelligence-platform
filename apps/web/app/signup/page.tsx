import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  Text
} from "@repo/ui";

import { SignUpForm } from "../../components/auth/sign-up-form";
import { PublicShell } from "../../components/shell/public-shell";

export default function SignUpPage() {
  return (
    <PublicShell>
      <Container className="py-10">
        <div className="mx-auto max-w-md space-y-6">
          <div>
            <Heading level={1} size="xl">
              Sign Up
            </Heading>
            <Text className="mt-2" tone="muted">
              Create your account to access the dashboard.
            </Text>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Create account</CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </div>
      </Container>
    </PublicShell>
  );
}
