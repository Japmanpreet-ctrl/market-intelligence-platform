import { prisma } from "@repo/database";

export class CourseRepository {
  async getCourses() {
    return prisma.course.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });
  }

  async getCourseBySlug(slug: string) {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" }
            }
          }
        }
      }
    });
  }

  async getLessonBySlug(slug: string) {
    return prisma.lesson.findUnique({
      where: { slug },
      include: {
        module: {
          include: {
            course: true
          }
        }
      }
    });
  }

  async getUserProgress(userId: string) {
    return prisma.userCourseProgress.findMany({
      where: { userId }
    });
  }

  async markLessonComplete(userId: string, courseId: string, lessonId: string) {
    return prisma.userCourseProgress.upsert({
      where: {
        userId_courseId_lessonId: {
          userId,
          courseId,
          lessonId
        }
      },
      create: {
        userId,
        courseId,
        lessonId
      },
      update: {}
    });
  }
}

export const courseRepository = new CourseRepository();
