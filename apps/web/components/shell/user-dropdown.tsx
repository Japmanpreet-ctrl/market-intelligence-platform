"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@repo/ui";

import { signOut } from "../../lib/auth-client";

interface UserDropdownProps {
  userLabel: string;
}

export function UserDropdown({ userLabel }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    router.push("/signin");
    router.refresh();
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        className="relative flex items-center outline-none ring-primary focus-visible:ring-2 rounded-full"
        onClick={() => setOpen(!open)}
        type="button"
        aria-label="User account menu"
      >
        <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
          {userLabel.slice(0, 1).toUpperCase()}
        </Avatar>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <p className="text-sm font-medium truncate">{userLabel}</p>
          </div>
          <div className="flex flex-col py-1">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <div className="h-px bg-border my-1" />
            <button
              className="px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors text-left"
              disabled={isSigningOut}
              onClick={handleSignOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
