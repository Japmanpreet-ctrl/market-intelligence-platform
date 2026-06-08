"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardContent, Container, Heading, Section, Text } from "@repo/ui";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      // silently fail
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" })
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // silently fail
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={1} size="xl">
                Notifications
              </Heading>
              <Text className="mt-1" tone="muted">
                Stay updated on market movements and system alerts.
              </Text>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="secondary">
                Mark all as read
              </Button>
            )}
          </div>

          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center">
                  <Text tone="muted">Loading notifications...</Text>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mb-4 text-4xl">🔔</div>
                  <Heading level={3} size="lg">
                    All caught up!
                  </Heading>
                  <Text className="mt-2" tone="muted">
                    You don't have any new notifications.
                  </Text>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      className={`p-4 transition-colors ${
                        !notification.isRead ? "bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      key={notification.id}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                            !notification.isRead ? "bg-primary" : "bg-transparent"
                          }`}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{notification.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Text className="text-sm" tone="muted">
                            {notification.message}
                          </Text>
                        </div>
                        {!notification.isRead && (
                          <Button
                            className="ml-2"
                            onClick={() => markAsRead(notification.id)}
                            size="sm"
                            variant="secondary"
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
