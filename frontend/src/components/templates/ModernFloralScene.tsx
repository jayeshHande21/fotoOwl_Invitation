type Scene = "hero" | "details" | "notes";

type Props = {
  compact?: boolean;
  scene?: Scene;
};

const CHERRY = "/templates/modern/blossom-right.png";
const BLOOM = "/templates/modern/bloom-right.png";

/**
 * Pink sprigs only. Each screen places them differently:
 * hero frames both edges, details rises at the lower right, notes pools in the lower left.
 */
export default function ModernFloralScene({ compact, scene = "hero" }: Props) {
  if (compact) {
    return (
      <div aria-hidden className="modern-flora modern-flora-compact pointer-events-none absolute inset-0 overflow-hidden">
        <Sprig className="modern-flora-hero-left modern-flora-front" src={CHERRY} flip />
        <Sprig className="modern-flora-hero-right modern-flora-front" src={BLOOM} />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`modern-flora modern-flora-${scene} pointer-events-none absolute inset-0 overflow-hidden`}
    >
      {scene === "hero" ? (
        <>
          <Sprig className="modern-flora-hero-left modern-flora-back" src={CHERRY} flip />
          <Sprig className="modern-flora-hero-left modern-flora-front" src={CHERRY} flip />
          <Sprig className="modern-flora-hero-right modern-flora-back" src={BLOOM} />
          <Sprig className="modern-flora-hero-right modern-flora-front" src={BLOOM} />
        </>
      ) : null}

      {scene === "details" ? (
        <Sprig className="modern-flora-rise modern-flora-front" src={CHERRY} />
      ) : null}

      {scene === "notes" ? (
        <>
          <Sprig className="modern-flora-pool modern-flora-back" src={BLOOM} flip />
          <Sprig className="modern-flora-pool modern-flora-front" src={BLOOM} flip />
        </>
      ) : null}
    </div>
  );
}

function Sprig({
  className,
  src,
  flip,
}: {
  className: string;
  src: string;
  flip?: boolean;
}) {
  return (
    <div className={`modern-flora-layer ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`modern-flora-img${flip ? " modern-flora-img-flip" : ""}`}
        draggable={false}
      />
    </div>
  );
}
