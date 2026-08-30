import { SmallCaps } from "@/components/ui/SmallCaps";

interface DisplayLinesProps {
  lines: readonly string[];
  /** Small caps composition is on by default for editorial display type. */
  smallCaps?: boolean;
}

/**
 * Editorial heading lines in the two-element structure a masked reveal needs:
 * a fixed clipping `.line` and a `.line__inner` that travels inside it.
 *
 * The resting appearance is identical to a plain block line — `.line` only
 * clips, and its padding/negative-margin pair reserves room for Cormorant's
 * descenders so nothing is shaved off. Without JS the inner sits at rest and
 * the heading simply reads normally.
 */
export function DisplayLines({ lines, smallCaps = true }: DisplayLinesProps) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className="line">
          <span className="line__inner">
            {smallCaps ? <SmallCaps>{line}</SmallCaps> : line}
          </span>
        </span>
      ))}
    </>
  );
}
