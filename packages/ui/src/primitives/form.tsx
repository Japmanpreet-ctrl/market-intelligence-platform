import type {
  InputHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from "react";

import { cn } from "../utils/cn";

const fieldClass =
  "min-h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} type={type} {...props} />;
}

export function SearchInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        /
      </span>
      <Input className={cn("pl-8", className)} type="search" {...props} />
    </div>
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-24 py-2", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClass, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export function SelectOption(props: OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props} />;
}

export function Checkbox({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "size-4 rounded border-border text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      type="checkbox"
      {...props}
    />
  );
}

export function Radio({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "size-4 rounded-full border-border text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      type="radio"
      {...props}
    />
  );
}

export function Switch({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-5 w-9 appearance-none rounded-full bg-muted transition-colors before:block before:size-4 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-background before:shadow-sm before:transition-transform checked:bg-primary checked:before:translate-x-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      role="switch"
      type="checkbox"
      {...props}
    />
  );
}
