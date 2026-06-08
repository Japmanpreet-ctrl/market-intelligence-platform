import type { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("w-full py-12 sm:py-16", className)} {...props} />;
}
