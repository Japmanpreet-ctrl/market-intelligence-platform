import Link from "next/link";
import { Button, Container, Section } from "@repo/ui";

export default function NotFoundPage() {
  return (
    <main>
      <Section>
        <Container className="flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-semibold tracking-normal">Page not found</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            The requested admin foundation route does not exist.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Go home</Link>
          </Button>
        </Container>
      </Section>
    </main>
  );
}
