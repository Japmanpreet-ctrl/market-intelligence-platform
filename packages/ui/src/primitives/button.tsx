import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/cn";

export const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "md",
      variant: "primary"
    },
    variants: {
      size: {
        sm: "min-h-9 px-3 text-sm",
        md: "min-h-10 px-4 text-sm",
        lg: "min-h-11 px-5 text-base"
      },
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
        secondary:
          "border border-border bg-background text-foreground hover:bg-muted focus-visible:outline-primary",
        ghost: "text-foreground hover:bg-muted focus-visible:outline-primary",
        danger:
          "bg-[hsl(var(--danger))] text-[hsl(var(--danger-foreground))] hover:bg-[hsl(var(--danger))]/90 focus-visible:outline-[hsl(var(--danger))]",
        link: "min-h-0 px-0 py-0 text-primary underline-offset-4 hover:underline"
      }
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  loadingLabel?: string;
}

export function Button({
  asChild = false,
  children,
  className,
  disabled,
  isLoading = false,
  leadingIcon,
  loadingLabel = "Loading",
  size,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  if (asChild) {
    return (
      <Component className={cn(buttonVariants({ size, variant }), className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={cn(buttonVariants({ size, variant }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leadingIcon
      )}
      {isLoading ? loadingLabel : children}
    </Component>
  );
}
