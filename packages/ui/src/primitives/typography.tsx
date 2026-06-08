import type { ElementType, HTMLAttributes, LabelHTMLAttributes } from "react";

import { cn } from "../utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: "display" | "xl" | "lg" | "md" | "sm";
}

const headingSizes = {
  display: "text-4xl font-semibold leading-tight sm:text-5xl",
  xl: "text-3xl font-semibold leading-tight",
  lg: "text-2xl font-semibold leading-snug",
  md: "text-xl font-semibold leading-snug",
  sm: "text-base font-semibold leading-snug"
};

const headingElements: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6"
};

export function Heading({ className, level = 2, size = "lg", ...props }: HeadingProps) {
  const Component = headingElements[level];

  return (
    <Component
      className={cn("tracking-normal text-foreground", headingSizes[size], className)}
      {...props}
    />
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "lg" | "md" | "sm";
  tone?: "default" | "muted";
}

export function Text({ className, size = "md", tone = "default", ...props }: TextProps) {
  return (
    <p
      className={cn(
        "leading-7",
        size === "lg" && "text-lg",
        size === "md" && "text-base",
        size === "sm" && "text-sm leading-6",
        tone === "muted" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium leading-none text-foreground", className)}
      {...props}
    />
  );
}

export function Caption({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs font-medium leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}
