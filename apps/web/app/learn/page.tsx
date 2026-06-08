export const dynamic = "force-dynamic";

import Link from "next/link";
import { courseRepository } from "@repo/market-data";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  Section,
  Text
} from "@repo/ui";

import { SmartShell } from "../../components/shell/smart-shell";

export default async function LearnPage() {
  const courses = await courseRepository.getCourses();

  return (
    <SmartShell>
      <Section>
        <Container>
          <div className="space-y-6">
            <div>
              <Heading level={1} size="xl">
                Learning Center
              </Heading>
              <Text className="mt-2" tone="muted">
                Build your financial knowledge with structured courses on investing,
                markets, and economics.
              </Text>
            </div>

            {/* Stats row */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{courses.length}</div>
                  <Text tone="muted">Courses Available</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">
                    {courses.reduce((sum, c) => sum + c.modules.length, 0)}
                  </div>
                  <Text tone="muted">Modules</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">
                    {courses.reduce(
                      (sum, c) =>
                        sum + c.modules.reduce((ms, m) => ms + m.lessons.length, 0),
                      0
                    )}
                  </div>
                  <Text tone="muted">Lessons</Text>
                </CardContent>
              </Card>
            </div>

            {/* Course grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                const totalLessons = course.modules.reduce(
                  (sum, m) => sum + m.lessons.length,
                  0
                );

                return (
                  <Link href={`/learn/${course.slug}`} key={course.id}>
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge>{course.modules.length} modules</Badge>
                          <Badge>{totalLessons} lessons</Badge>
                        </div>
                        <CardTitle>{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Text tone="muted">{course.description}</Text>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {courses.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="mb-4 text-4xl">📚</div>
                  <Heading level={3} size="lg">
                    No courses yet
                  </Heading>
                  <Text className="mt-2" tone="muted">
                    Courses will be available soon. Check back later!
                  </Text>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </Section>
    </SmartShell>
  );
}
