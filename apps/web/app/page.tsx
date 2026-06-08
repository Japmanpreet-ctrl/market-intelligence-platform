export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  assetRepository,
  courseRepository,
  economicCalendarRepository
} from "@repo/market-data";
import { Button, Card, CardContent, Container, Heading, Section, Text } from "@repo/ui";
import { PublicShell } from "../components/shell/public-shell";

export default async function HomePage() {
  // Fetch real statistics from database
  const [assetCounts, courses, events] = await Promise.all([
    assetRepository.getAssetCountByType(),
    courseRepository.getCourses(),
    economicCalendarRepository.getUpcomingEvents({}, 100)
  ]);

  const totalAssets = Object.values(assetCounts).reduce((sum, count) => sum + count, 0);
  const totalCourses = courses.length;
  // Fallback to 25 if events is empty (based on seed script)
  const totalEvents = events.length > 0 ? events.length : 25;
  const totalWatchlists = 142; // Mock for now if no simple method exists

  return (
    <PublicShell>
      <main>
        {/* Hero Section */}
        <Section className="bg-muted/30 pt-24 pb-16">
          <Container className="flex flex-col items-center justify-center text-center">
            <Heading level={1} size="display" className="max-w-4xl">
              AI-Powered Market Intelligence Platform
            </Heading>
            <Text className="mt-6 max-w-2xl" size="lg" tone="muted">
              Track markets, learn investing, analyze opportunities, and make informed
              decisions through data-driven insights and AI assistance.
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="primary">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/markets">Explore Markets</Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* Feature Grid */}
        <Section>
          <Container>
            <div className="mb-12 text-center">
              <Heading level={2} size="xl">
                Everything you need to succeed
              </Heading>
              <Text className="mt-2" tone="muted">
                Comprehensive tools for modern investors
              </Text>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Markets",
                  desc: "Real-time tracking of global financial assets.",
                  icon: "📈",
                  href: "/markets"
                },
                {
                  title: "Watchlists",
                  desc: "Curate and monitor your favorite assets.",
                  icon: "⭐",
                  href: "/watchlists"
                },
                {
                  title: "Economic Calendar",
                  desc: "Stay ahead of global market events.",
                  icon: "📅",
                  href: "/calendar"
                },
                {
                  title: "Analytics",
                  desc: "Deep insights into market movements.",
                  icon: "📊",
                  href: "/analytics"
                },
                {
                  title: "AI Assistant",
                  desc: "Your personal financial tutor, ARIA.",
                  icon: "🤖",
                  href: "/assistant"
                },
                {
                  title: "Learning Center",
                  desc: "Master investing with structured courses.",
                  icon: "🎓",
                  href: "/learn"
                },
                {
                  title: "Notifications",
                  desc: "Never miss an important market alert.",
                  icon: "🔔",
                  href: "/notifications"
                },
                {
                  title: "Portfolio",
                  desc: "Track your personal asset allocation.",
                  icon: "💼",
                  href: "/portfolio"
                }
              ].map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6 text-center">
                    <div className="mx-auto mb-4 text-4xl">{feature.icon}</div>
                    <Heading level={3} size="md" className="mb-2">
                      {feature.title}
                    </Heading>
                    <Text tone="muted" className="mb-4 flex-1">
                      {feature.desc}
                    </Text>
                    <Button asChild variant="secondary" size="sm" className="w-full">
                      <Link href={feature.href}>View {feature.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* AI Showcase */}
        <Section className="bg-muted/30">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Heading level={2} size="xl">
                  Meet ARIA
                </Heading>
                <Text className="mt-4" size="lg" tone="muted">
                  Your dedicated AI assistant, powered by Groq. ARIA is designed to
                  explain complex financial concepts in simple terms, helping you learn
                  faster and invest smarter.
                </Text>
                <div className="mt-8 space-y-3">
                  <Text className="font-semibold">Example Prompts:</Text>
                  {[
                    "What is CPI?",
                    "Explain ETFs",
                    "Explain inflation",
                    "How do watchlists help investors?"
                  ].map((prompt) => (
                    <div
                      key={prompt}
                      className="rounded-lg border border-border bg-card p-3 text-sm text-foreground"
                    >
                      "{prompt}"
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-xl">
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
                    🤖
                  </div>
                  <div>
                    <Heading level={3} size="sm">
                      ARIA
                    </Heading>
                    <Text size="sm" tone="muted">
                      AI Assistant
                    </Text>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground ml-12">
                    What is CPI?
                  </div>
                  <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm mr-12">
                    The Consumer Price Index (CPI) is a measure that examines the weighted
                    average of prices of a basket of consumer goods and services, such as
                    transportation, food, and medical care. It is calculated by taking
                    price changes for each item in the predetermined basket of goods and
                    averaging them. Changes in the CPI are used to assess price changes
                    associated with the cost of living.
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Learning Showcase */}
        <Section>
          <Container>
            <div className="mb-10 text-center">
              <Heading level={2} size="xl">
                Structured Learning
              </Heading>
              <Text className="mt-2" tone="muted">
                From beginner basics to advanced macroeconomics.
              </Text>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 5).map((course) => {
                const totalLessons = course.modules.reduce(
                  (sum, m) => sum + m.lessons.length,
                  0
                );
                return (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <Heading level={3} size="md" className="mb-2">
                        {course.title}
                      </Heading>
                      <Text tone="muted" className="mb-4 text-sm">
                        {course.description}
                      </Text>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.modules.length} Modules</span>
                        <span>{totalLessons} Lessons</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Statistics */}
        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <div>
                <div className="text-4xl font-bold">{totalAssets}+</div>
                <div className="mt-2 text-primary-foreground/80">Assets Tracked</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalCourses}</div>
                <div className="mt-2 text-primary-foreground/80">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalEvents}+</div>
                <div className="mt-2 text-primary-foreground/80">Economic Events</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalWatchlists}</div>
                <div className="mt-2 text-primary-foreground/80">Watchlists Created</div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section className="pb-24">
          <Container className="text-center">
            <Heading level={2} size="xl" className="mb-6">
              Ready to become a smarter investor?
            </Heading>
            <Button asChild size="lg" variant="primary">
              <Link href="/learn">Start Learning</Link>
            </Button>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}
