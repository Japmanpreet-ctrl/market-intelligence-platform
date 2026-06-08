"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
          setUnreadCount(data.unreadCount || 0);
        }
      } catch {
        // silently fail
      }
    };

    // Load initial
    loadNotifications();

    // Poll every 30s
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // silently fail
    }
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <Button
        className="relative"
        onClick={() => setOpen(!open)}
        type="button"
        variant="secondary"
      >
        Notifications
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
            <h3 className="font-semibold">Notifications</h3>
            <Link
              className="text-xs text-primary hover:underline"
              href="/notifications"
              onClick={() => setOpen(false)}
            >
              View all
            </Link>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.slice(0, 5).map((n) => (
                  <Link
                    className={`block p-4 hover:bg-muted/50 ${
                      !n.isRead ? "bg-primary/5" : ""
                    }`}
                    href="/notifications"
                    key={n.id}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{n.title}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {n.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!n.isRead && (
                        <button
                          className="flex h-2 w-2 flex-shrink-0 rounded-full bg-primary ring-2 ring-transparent transition-all hover:ring-primary/30"
                          onClick={(e) => markAsRead(e, n.id)}
                          title="Mark as read"
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {notifications.length > 5 && (
            <div className="border-t border-border bg-muted/30 p-2 text-center">
              <Link
                className="text-xs text-primary hover:underline"
                href="/notifications"
                onClick={() => setOpen(false)}
              >
                View {notifications.length - 5} older notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
