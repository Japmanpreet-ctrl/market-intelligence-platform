export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { courseRepository } from "@repo/market-data";
import { Card, CardContent, Container, Heading, Section, Text } from "@repo/ui";

import { SmartShell } from "../../../../components/shell/smart-shell";
import { MarkCompleteButton } from "./mark-complete-button";

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = await courseRepository.getLessonBySlug(lessonSlug);

  if (!lesson) {
    notFound();
  }

  const course = lesson.module.course;

  return (
    <SmartShell>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-foreground hover:underline" href="/learn">
                Learning Center
              </Link>
              <span>/</span>
              <Link
                className="hover:text-foreground hover:underline"
                href={`/learn/${course.slug}`}
              >
                {course.title}
              </Link>
              <span>/</span>
              <span className="text-foreground">{lesson.title}</span>
            </div>

            {/* Lesson content */}
            <div>
              <Text className="mb-1" tone="muted">
                {lesson.module.title} · Lesson {lesson.order}
              </Text>
              <Heading level={1} size="xl">
                {lesson.title}
              </Heading>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none leading-relaxed">
                  <Text>{lesson.content}</Text>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-primary hover:underline"
                href={`/learn/${course.slug}`}
              >
                ← Back to {course.title}
              </Link>
              <MarkCompleteButton courseId={course.id} lessonId={lesson.id} />
            </div>
          </div>
        </Container>
      </Section>
    </SmartShell>
  );
}
