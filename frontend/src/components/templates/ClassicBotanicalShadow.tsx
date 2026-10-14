type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Soft botanical shadows — full left-side atmosphere that sways gently.
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
      <div className="classic-shadow-layer classic-shadow-back">
        <div
          className="classic-shadow-img"
          style={{ backgroundImage: "url(/templates/classic/plant-shadow-soft.png)" }}
        />
      </div>
      <div className="classic-shadow-layer classic-shadow-front">
        <div
          className="classic-shadow-img"
          style={{ backgroundImage: "url(/templates/classic/plant-shadow.png)" }}
        />
      </div>
    </div>
  );
}
