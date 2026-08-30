import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";

type Variant = "outline" | "metallic";
type Size = "sm" | "md";

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Appends the trailing arrow used by the reference CTAs. */
  withArrow?: boolean;
  className?: string;
}

function classes({ variant = "outline", size = "md", className }: SharedProps) {
  return cn("btn", `btn--${variant}`, `btn--${size}`, className);
}

interface LinkButtonProps extends SharedProps {
  href: string;
}

export function LuxuryLinkButton({ href, children, withArrow, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={classes({ children, withArrow, ...rest })}>
      {children}
      {withArrow ? <Icon name="arrow" size={15} className="btn__arrow" /> : null}
    </Link>
  );
}

type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function LuxuryButton({
  children,
  variant,
  size,
  withArrow,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={classes({ children, variant, size, withArrow, className })} {...rest}>
      {children}
      {withArrow ? <Icon name="arrow" size={15} className="btn__arrow" /> : null}
    </button>
  );
}
