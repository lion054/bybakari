/**
 * Renders the brand as "#byBakari" with "#by" always in small (lowercase)
 * letters. Needed inside font-display (Bebas Neue) headings, which only have
 * uppercase letterforms — "#by" is set in the body font at a reduced size.
 */
export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-body font-semibold lowercase tracking-tight text-[0.55em] align-[0.1em]">
        #by
      </span>
      Bakari
    </span>
  );
}
