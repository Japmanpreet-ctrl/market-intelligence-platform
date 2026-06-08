import { prisma } from "@repo/database";

export class ConversationRepository {
  async createConversation(userId: string, title: string) {
    return prisma.conversation.create({
      data: { userId, title },
      include: { messages: true }
    });
  }

  async getConversations(userId: string) {
    return prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { messages: { take: 1, orderBy: { createdAt: "desc" } } }
    });
  }

  async getConversation(id: string, userId: string) {
    return prisma.conversation.findFirst({
      where: { id, userId },
      include: { messages: { orderBy: { createdAt: "asc" } } }
    });
  }

  async deleteConversation(id: string, userId: string) {
    return prisma.conversation.deleteMany({ where: { id, userId } });
  }

  async addMessage(conversationId: string, role: string, content: string) {
    const msg = await prisma.conversationMessage.create({
      data: { conversationId, role, content }
    });
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });
    return msg;
  }
}

export const conversationRepository = new ConversationRepository();
