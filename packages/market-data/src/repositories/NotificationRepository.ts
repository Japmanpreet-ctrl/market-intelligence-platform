import { prisma } from "@repo/database";

export class NotificationRepository {
  async getNotificationsByUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: { userId, isRead: false }
    });
  }

  async createNotification(userId: string, title: string, message: string) {
    return prisma.notification.create({
      data: {
        userId,
        title,
        message
      }
    });
  }

  async markAsRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
  }
}

export const notificationRepository = new NotificationRepository();
