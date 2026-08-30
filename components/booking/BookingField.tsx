import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/icon";
import { cn } from "@/lib/utils/cn";

interface BookingFieldProps {
  id: string;
  label: string;
  icon: IconName;
  children: ReactNode;
  className?: string;
}

/** Label above, value below, gold affordance icon right — per the reference. */
export function BookingField({
  id,
  label,
  icon,
  children,
  className,
}: BookingFieldProps) {
  return (
    <div className={cn("field", className)}>
      <div className="min-w-0 flex-1">
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        {children}
      </div>
      <Icon name={icon} size={17} className="field__icon" />
    </div>
  );
}
