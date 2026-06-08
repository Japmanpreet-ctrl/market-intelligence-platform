import { Container, Heading, Section, Text } from "@repo/ui";

import { PublicShell } from "./public-shell";

export function PlaceholderPage({
  description,
  title
}: {
  description: string;
  title: string;
}) {
  return (
    <PublicShell>
      <main>
        <Section>
          <Container className="flex min-h-[60vh] flex-col justify-center">
            <div className="max-w-2xl">
              <Heading level={1} size="display">
                {title}
              </Heading>
              <Text className="mt-4" size="lg" tone="muted">
                {description}
              </Text>
            </div>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}
