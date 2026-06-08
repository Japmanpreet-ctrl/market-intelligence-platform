export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
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

import { SmartShell } from "../../../components/shell/smart-shell";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await courseRepository.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <SmartShell>
      <Section>
        <Container>
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-foreground hover:underline" href="/learn">
                Learning Center
              </Link>
              <span>/</span>
              <span className="text-foreground">{course.title}</span>
            </div>

            {/* Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge>{course.modules.length} modules</Badge>
                <Badge>{totalLessons} lessons</Badge>
              </div>
              <Heading level={1} size="xl">
                {course.title}
              </Heading>
              <Text className="mt-2 max-w-2xl" tone="muted">
                {course.description}
              </Text>
            </div>

            {/* Modules */}
            <div className="space-y-6">
              {course.modules.map((module) => (
                <Card key={module.id}>
                  <CardHeader>
                    <CardTitle>
                      Module {module.order}: {module.title}
                    </CardTitle>
                    {module.description && <Text tone="muted">{module.description}</Text>}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <Link
                          className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                          href={`/learn/${course.slug}/${lesson.slug}`}
                          key={lesson.id}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {lesson.order}
                            </div>
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">→</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </SmartShell>
  );
}
