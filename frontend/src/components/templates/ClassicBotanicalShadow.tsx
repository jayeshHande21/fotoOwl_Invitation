type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Soft botanical shadows on both sides of the hero — gentle breeze sway.
 * Uses <img> for reliable rendering of the PNG assets.
 */
export default function ClassicBotanicalShadow({
  className = "",
  compact,
}: Props) {
  return (
    <div
      aria-hidden
      className={`classic-shadow-root pointer-events-none absolute inset-0 overflow-hidden ${
        compact ? "classic-shadow-root-compact" : ""
      } ${className}`}
    >
      <div className="classic-shadow-layer classic-shadow-left classic-shadow-back">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/classic/plant-shadow-soft.png"
          alt=""
          className="classic-shadow-img"
          draggable={false}
        />
      </div>
      <div className="classic-shadow-layer classic-shadow-left classic-shadow-front">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/classic/plant-shadow.png"
          alt=""
          className="classic-shadow-img"
          draggable={false}
        />
      </div>

      <div className="classic-shadow-layer classic-shadow-right classic-shadow-back">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/classic/plant-shadow-soft.png"
          alt=""
          className="classic-shadow-img classic-shadow-img-flip"
          draggable={false}
        />
      </div>
      <div className="classic-shadow-layer classic-shadow-right classic-shadow-front">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/classic/plant-shadow.png"
          alt=""
          className="classic-shadow-img classic-shadow-img-flip"
          draggable={false}
        />
      </div>
    </div>
  );
}
