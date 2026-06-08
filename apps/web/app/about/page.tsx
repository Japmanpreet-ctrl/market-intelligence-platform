export const dynamic = "force-dynamic";

import { Card, CardContent, Container, Heading, Section, Text } from "@repo/ui";
import { SmartShell } from "../../components/shell/smart-shell";

export default function AboutPage() {
  return (
    <SmartShell>
      <main>
        {/* Hero Section */}
        <Section className="bg-muted/30 pt-16 pb-12">
          <Container className="text-center max-w-4xl">
            <Heading level={1} size="display">
              About Market Intelligence
            </Heading>
            <Text className="mt-4 mx-auto" size="lg" tone="muted">
              Democratizing financial data, analytics, and education through modern
              engineering and artificial intelligence.
            </Text>
          </Container>
        </Section>

        {/* Mission & Vision */}
        <Section>
          <Container className="max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2 mb-16">
              <Card>
                <CardContent className="p-8">
                  <Heading level={2} size="xl" className="mb-4 text-primary">
                    Our Mission
                  </Heading>
                  <Text tone="muted" className="leading-relaxed">
                    To empower individual investors by providing institutional-grade
                    market data, personalized learning paths, and actionable AI-driven
                    insights—all in one unified platform.
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Heading level={2} size="xl" className="mb-4 text-primary">
                    Our Vision
                  </Heading>
                  <Text tone="muted" className="leading-relaxed">
                    A world where financial literacy and advanced market intelligence are
                    accessible to everyone, helping them build sustainable wealth and
                    secure their financial future.
                  </Text>
                </CardContent>
              </Card>
            </div>

            {/* Architecture & Tech Stack */}
            <Heading level={2} size="xl" className="mb-6 text-center">
              Technology Stack
            </Heading>
            <Text tone="muted" className="text-center mb-10">
              Built with cutting-edge tools to ensure performance, security, and
              scalability.
            </Text>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {[
                {
                  name: "Next.js",
                  desc: "React framework for server-side rendering, routing, and API endpoints."
                },
                {
                  name: "TypeScript",
                  desc: "Strongly typed language ensuring reliability across the entire monorepo."
                },
                {
                  name: "PostgreSQL",
                  desc: "Robust, scalable relational database for structured data storage."
                },
                {
                  name: "Prisma",
                  desc: "Next-generation ORM for type-safe database access and migrations."
                },
                {
                  name: "Better Auth",
                  desc: "Comprehensive authentication and session management system."
                },
                {
                  name: "Groq API",
                  desc: "Lightning-fast inference engine powering the ARIA AI Assistant (Llama 3)."
                },
                {
                  name: "Turborepo",
                  desc: "High-performance build system for TypeScript monorepo management."
                },
                {
                  name: "Tailwind CSS",
                  desc: "Utility-first CSS framework used via custom design tokens."
                }
              ].map((tech) => (
                <Card key={tech.name} className="border border-border">
                  <CardContent className="p-6">
                    <Heading level={3} size="md" className="mb-2 font-bold">
                      {tech.name}
                    </Heading>
                    <Text tone="muted" className="text-sm">
                      {tech.desc}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Monorepo Architecture */}
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <Heading level={2} size="xl" className="mb-4 text-center">
                Monorepo Architecture
              </Heading>
              <Text tone="muted" className="text-center max-w-2xl mx-auto mb-8">
                The platform is architected as a modular monorepo, cleanly separating
                concerns across dedicated packages.
              </Text>

              <div className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-4 text-center border border-border">
                  <div className="font-bold text-primary mb-1">@repo/ui</div>
                  <div className="text-muted-foreground text-xs">Shared Components</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center border border-border">
                  <div className="font-bold text-primary mb-1">@repo/database</div>
                  <div className="text-muted-foreground text-xs">Prisma ORM Layer</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center border border-border">
                  <div className="font-bold text-primary mb-1">@repo/auth</div>
                  <div className="text-muted-foreground text-xs">Auth & RBAC</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center border border-border">
                  <div className="font-bold text-primary mb-1">@repo/ai</div>
                  <div className="text-muted-foreground text-xs">Groq AI Provider</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </SmartShell>
  );
}
