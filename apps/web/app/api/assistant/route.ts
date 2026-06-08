import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { conversationRepository } from "@repo/market-data";
import { aiProvider } from "@repo/ai";

export const dynamic = "force-dynamic";

// GET /api/assistant — list conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const conv = await conversationRepository.getConversation(id, session.user.id);
      return NextResponse.json(conv);
    }

    const conversations = await conversationRepository.getConversations(session.user.id);
    return NextResponse.json(conversations);
  } catch (error) {
    console.error("GET /api/assistant error:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}

// POST /api/assistant — create conversation OR send message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      action: "create" | "message";
      title?: string;
      conversationId?: string;
      content?: string;
    };

    if (body.action === "create") {
      const title = body.title?.trim() || "New Conversation";
      const conversation = await conversationRepository.createConversation(
        session.user.id,
        title
      );
      return NextResponse.json(conversation, { status: 201 });
    }

    if (body.action === "message") {
      if (!body.conversationId || !body.content?.trim()) {
        return NextResponse.json(
          { error: "conversationId and content are required" },
          { status: 400 }
        );
      }

      // Verify ownership
      const conversation = await conversationRepository.getConversation(
        body.conversationId,
        session.user.id
      );
      if (!conversation) {
        return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
      }

      // Save user message
      const userMessage = await conversationRepository.addMessage(
        body.conversationId,
        "user",
        body.content.trim()
      );

      // Build history for AI
      const history = conversation.messages.map((m) => ({
        role: m.role,
        content: m.content
      }));
      history.push({ role: "user", content: body.content.trim() });

      // Generate AI response
      let aiContent: string;
      try {
        aiContent = await aiProvider.generateCompletion(history);
      } catch (aiError) {
        console.error("AI provider error:", aiError);
        aiContent =
          "I'm having trouble connecting to my AI service right now. Please check that the GROQ_API_KEY is configured and try again.";
      }

      // Save assistant message
      const assistantMessage = await conversationRepository.addMessage(
        body.conversationId,
        "assistant",
        aiContent
      );

      return NextResponse.json({
        userMessage,
        assistantMessage
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/assistant error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// DELETE /api/assistant — delete a conversation
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("id");

    if (!conversationId) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await conversationRepository.deleteConversation(conversationId, session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/assistant error:", error);
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}
