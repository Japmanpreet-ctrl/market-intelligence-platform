export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Impact } from "@repo/database";
import { economicCalendarRepository } from "@repo/market-data";
import { Badge, Container, EmptyState, Heading, Section, Table, Text } from "@repo/ui";

import { PublicShell } from "../../components/shell/public-shell";

interface CalendarPageProps {
  searchParams: Promise<{ country?: string; impact?: string }>;
}

function impactBadgeClass(impact: Impact): string {
  switch (impact) {
    case "HIGH":
      return "border-[hsl(var(--danger))]/40 bg-[hsl(var(--danger))]/10 text-[hsl(var(--danger))]";
    case "MEDIUM":
      return "border-[hsl(var(--warning))]/40 bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]";
    case "LOW":
      return "border-border bg-muted text-muted-foreground";
    default:
      return "";
  }
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const sp = await searchParams;
  const country = sp.country ?? undefined;
  const impact = (sp.impact as Impact) ?? undefined;

  const events = await economicCalendarRepository.getUpcomingEvents({ country, impact });
  const countries = await economicCalendarRepository.getDistinctCountries();

  const impactLevels: Impact[] = ["HIGH", "MEDIUM", "LOW"];

  return (
    <PublicShell>
      <main>
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <Heading level={1} size="xl">
                  Economic Calendar
                </Heading>
                <Text className="mt-2" tone="muted">
                  Upcoming economic events and data releases.
                </Text>
              </div>

              {/* Filters */}
              <form className="flex flex-wrap gap-3" method="GET">
                <select
                  aria-label="Filter by country"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={country ?? ""}
                  id="country-filter"
                  name="country"
                >
                  <option value="">All Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter by impact"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={impact ?? ""}
                  id="impact-filter"
                  name="impact"
                >
                  <option value="">All Impact</option>
                  {impactLevels.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <button
                  className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  id="calendar-apply-btn"
                  type="submit"
                >
                  Apply
                </button>
                {(country || impact) && (
                  <Link
                    className="flex h-10 items-center rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
                    href="/calendar"
                  >
                    Clear
                  </Link>
                )}
              </form>

              {/* Events Table */}
              {events.length === 0 ? (
                <EmptyState
                  description="No economic events match your filters."
                  title="No events found"
                />
              ) : (
                <Table>
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Event
                      </th>
                      <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                        Country
                      </th>
                      <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr
                        className="border-b border-border transition-colors hover:bg-muted/30"
                        key={event.id}
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                          {new Date(event.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {event.title}
                        </td>
                        <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">
                          {event.country ?? "—"}
                        </td>
                        <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                          {event.category ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={impactBadgeClass(event.impact)}>
                            {event.impact}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}
