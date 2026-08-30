import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** The single horizontal alignment authority: max width plus page gutter. */
export function Container({ children, as, className }: ContainerProps) {
  const Component = as ?? "div";
  return <Component className={cn("container", className)}>{children}</Component>;
}
