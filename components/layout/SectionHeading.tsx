import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  titleLines: readonly string[];
  eyebrow?: string;
  lede?: readonly string[];
  link?: { label: string; href: string };
  /** `id` for the heading, so sections can be referenced by anchor. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  titleLines,
  eyebrow,
  lede,
  link,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("section-head", className)}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id} className="display section-head__title">
          <DisplayLines lines={titleLines} />
        </h2>
        {lede ? (
          <p className="section-head__lede">
            {lede.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      {link ? (
        <Link href={link.href} className="section-head__link">
          {link.label}
          <Icon name="arrow" size={14} className="btn__arrow" />
        </Link>
      ) : null}
    </div>
  );
}
