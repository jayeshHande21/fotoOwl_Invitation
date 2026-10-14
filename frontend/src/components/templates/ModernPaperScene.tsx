"use client";

type Props = {
  compact?: boolean;
  soft?: boolean;
};

/**
 * Quiet editorial paper field — warm ivory with soft sage / rose atmosphere.
 * No neon, gradients-as-decoration, or heavy motion.
 */
export default function ModernPaperScene({ compact, soft }: Props) {
  return (
    <div
      aria-hidden
      className={`modern-paper pointer-events-none absolute inset-0 overflow-hidden ${
        compact ? "modern-paper-compact" : ""
      } ${soft ? "modern-paper-soft" : ""}`}
    >
      <div className="modern-paper-base" />
      <div className="modern-paper-wash modern-paper-wash-sage" />
      <div className="modern-paper-wash modern-paper-wash-rose" />
      <div className="modern-paper-grain" />
    </div>
  );
}
