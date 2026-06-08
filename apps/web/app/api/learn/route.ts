import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { courseRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

// GET /api/learn — list courses or get specific course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const course = await courseRepository.getCourseBySlug(slug);
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
      return NextResponse.json(course);
    }

    const courses = await courseRepository.getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("GET /api/learn error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST /api/learn — mark lesson complete
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      courseId: string;
      lessonId: string;
    };

    if (!body.courseId || !body.lessonId) {
      return NextResponse.json(
        { error: "courseId and lessonId are required" },
        { status: 400 }
      );
    }

    const progress = await courseRepository.markLessonComplete(
      session.user.id,
      body.courseId,
      body.lessonId
    );

    return NextResponse.json(progress);
  } catch (error) {
    console.error("POST /api/learn error:", error);
    return NextResponse.json(
      { error: "Failed to mark lesson complete" },
      { status: 500 }
    );
  }
}
