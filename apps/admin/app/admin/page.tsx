import { prisma } from "@repo/database";
import { Button, Card, Heading, Section, Table, Text } from "@repo/ui";
import { AdminShell } from "../../components/shell/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminRoutePage() {
  const [courses, lessons, events] = await Promise.all([
    prisma.course.findMany({ take: 10 }),
    prisma.lesson.findMany({ take: 10 }),
    prisma.economicEvent.findMany({ take: 10 })
  ]);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <Heading level={1} size="xl">
            Admin CMS
          </Heading>
          <Text className="mt-2" tone="muted">
            Simple CRUD Management
          </Text>
        </div>

        <Section>
          <div className="flex items-center justify-between mb-4">
            <Heading level={2} size="lg">
              Courses
            </Heading>
            <Button size="sm">Add Course</Button>
          </div>
          <Card>
            <Table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 font-medium">Title</th>
                  <th className="p-3 font-medium">Slug</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3">{c.title}</td>
                    <td className="p-3">{c.slug}</td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger hover:bg-danger/10"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Section>

        <Section>
          <div className="flex items-center justify-between mb-4">
            <Heading level={2} size="lg">
              Lessons
            </Heading>
            <Button size="sm">Add Lesson</Button>
          </div>
          <Card>
            <Table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 font-medium">Title</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lessons.map((l) => (
                  <tr key={l.id}>
                    <td className="p-3">{l.title}</td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger hover:bg-danger/10"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Section>

        <Section>
          <div className="flex items-center justify-between mb-4">
            <Heading level={2} size="lg">
              Economic Events
            </Heading>
            <Button size="sm">Add Event</Button>
          </div>
          <Card>
            <Table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 font-medium">Event Name</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((e) => (
                  <tr key={e.id}>
                    <td className="p-3">{e.title}</td>
                    <td className="p-3">{new Date(e.eventDate).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger hover:bg-danger/10"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Section>
      </div>
    </AdminShell>
  );
}
