import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-strong shadow-[0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-glow",
  secondary:
    "bg-surface-2 text-text border border-border hover:border-border-strong hover:bg-surface-hover",
  outline:
    "bg-transparent text-text border border-border-strong hover:bg-surface-2",
  ghost: "bg-transparent text-muted hover:text-text hover:bg-surface-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-full",
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-12 px-6 text-[0.95rem] rounded-full",
  icon: "size-10 rounded-full",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a
      ref={ref}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  ),
);
ButtonLink.displayName = "ButtonLink";
