import { Container, Heading, Section, Text } from "@repo/ui";

import { PublicShell } from "../components/shell/public-shell";

export default function HomePage() {
  return (
    <PublicShell>
      <main>
        <Section>
          <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <Heading level={1} size="display">
              Market Intelligence Platform
            </Heading>
            <Text className="mt-3" size="lg" tone="muted">
              Production MVP Foundation
            </Text>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}
