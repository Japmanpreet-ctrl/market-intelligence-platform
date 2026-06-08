export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  Container,
  Heading,
  Section,
  Text,
  Table
} from "@repo/ui";
import { SmartShell } from "../../components/shell/smart-shell";

export default function PricingPage() {
  return (
    <SmartShell>
      <main>
        <Section className="bg-muted/30 pt-16 pb-12">
          <Container className="text-center">
            <Heading level={1} size="display">
              Simple, Transparent Pricing
            </Heading>
            <Text className="mt-4 max-w-2xl mx-auto" size="lg" tone="muted">
              Choose the plan that fits your investing needs. From absolute beginners to
              advanced market researchers.
            </Text>
          </Container>
        </Section>

        <Section>
          <Container className="max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              {/* Starter Plan */}
              <Card className="flex flex-col border-border shadow-sm">
                <CardContent className="flex flex-1 flex-col p-8">
                  <div className="mb-6">
                    <Heading level={2} size="xl" className="mb-2">
                      Starter
                    </Heading>
                    <Text tone="muted">
                      For beginners starting their investing journey.
                    </Text>
                  </div>
                  <div className="mb-8 text-4xl font-bold">Free</div>
                  <div className="flex-1 space-y-4 mb-8">
                    {["Markets", "Learn", "Calendar"].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <span className="text-primary">✓</span>
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="secondary" size="lg" className="w-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Plan */}
              <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-bold text-primary-foreground rounded-bl-lg">
                  POPULAR
                </div>
                <CardContent className="flex flex-1 flex-col p-8">
                  <div className="mb-6">
                    <Heading level={2} size="xl" className="mb-2">
                      Professional
                    </Heading>
                    <Text tone="muted">
                      For active investors needing advanced intelligence.
                    </Text>
                  </div>
                  <div className="mb-8 text-4xl font-bold">
                    $29
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                  <div className="flex-1 space-y-4 mb-8">
                    {[
                      "Everything in Starter, plus:",
                      "Watchlists",
                      "Analytics",
                      "AI Assistant"
                    ].map((feature, i) => (
                      <div
                        key={feature}
                        className={`flex items-center gap-3 ${i === 0 ? "font-semibold mb-2" : ""}`}
                      >
                        {i > 0 && <span className="text-primary">✓</span>}
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="primary" size="lg" className="w-full">
                    <Link href="/signup">Upgrade to Professional</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-col border-border shadow-sm">
                <CardContent className="flex flex-1 flex-col p-8">
                  <div className="mb-6">
                    <Heading level={2} size="xl" className="mb-2">
                      Enterprise
                    </Heading>
                    <Text tone="muted">
                      For organizations requiring advanced tools and support.
                    </Text>
                  </div>
                  <div className="mb-8 text-4xl font-bold">Custom</div>
                  <div className="flex-1 space-y-4 mb-8">
                    {["Teams", "Advanced Analytics", "Priority Support"].map(
                      (feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <span className="text-primary">✓</span>
                          <Text>{feature}</Text>
                        </div>
                      )
                    )}
                  </div>
                  <Button asChild variant="secondary" size="lg" className="w-full">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Heading level={2} size="xl" className="text-center mb-8">
              Feature Comparison
            </Heading>
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table className="w-full text-left border-collapse">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-4 font-semibold">Features</th>
                    <th className="p-4 font-semibold text-center w-1/5">Starter</th>
                    <th className="p-4 font-semibold text-center w-1/5">Professional</th>
                    <th className="p-4 font-semibold text-center w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      feature: "Markets & Calendar",
                      starter: true,
                      pro: true,
                      ent: true
                    },
                    { feature: "Learning Center", starter: true, pro: true, ent: true },
                    {
                      feature: "Watchlists",
                      starter: false,
                      pro: "Unlimited",
                      ent: "Unlimited"
                    },
                    {
                      feature: "Analytics",
                      starter: false,
                      pro: "Advanced",
                      ent: "Advanced"
                    },
                    {
                      feature: "AI Assistant (ARIA)",
                      starter: false,
                      pro: true,
                      ent: true
                    },
                    { feature: "Team Management", starter: false, pro: false, ent: true },
                    { feature: "Priority Support", starter: false, pro: false, ent: true }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-muted-foreground">
                        {typeof row.starter === "boolean"
                          ? row.starter
                            ? "✓"
                            : "—"
                          : row.starter}
                      </td>
                      <td className="p-4 text-center font-medium text-primary">
                        {typeof row.pro === "boolean" ? (row.pro ? "✓" : "—") : row.pro}
                      </td>
                      <td className="p-4 text-center font-medium text-primary">
                        {typeof row.ent === "boolean" ? (row.ent ? "✓" : "—") : row.ent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </Section>
      </main>
    </SmartShell>
  );
}
