import { Fragment } from "react";

interface SmallCapsProps {
  /** Title-cased source text, e.g. "Explore More." */
  children: string;
}

/**
 * Reproduces the reference's caps-plus-small-caps display setting: each word's
 * leading capital stays at full cap height while the remainder drops to
 * `--display-sc-scale`.
 *
 * Composed manually rather than with `font-variant-caps` because the Cormorant
 * Garamond webfont has no real `smcp` feature and browser synthesis renders
 * noticeably lighter than the reference. The DOM text stays title-cased, so
 * assistive technology and search engines read "Explore More.", not spelled-out
 * capitals.
 */
export function SmallCaps({ children }: SmallCapsProps) {
  const words = children.split(" ");

  return (
    <>
      {words.map((word, index) => {
        const first = word.charAt(0);
        // A word starting lowercase ("the") has no full-height capital: the
        // whole word drops to small caps, as real small-caps setting does.
        const leads = first === first.toUpperCase() && first !== first.toLowerCase();

        return (
          <Fragment key={`${word}-${index}`}>
            {index > 0 ? " " : null}
            {leads ? (
              <span>
                {first}
                {word.length > 1 ? <span className="sc">{word.slice(1)}</span> : null}
              </span>
            ) : (
              <span className="sc">{word}</span>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
