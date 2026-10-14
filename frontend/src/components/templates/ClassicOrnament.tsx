import type { ReactNode } from "react";

type Props = {
  className?: string;
  emphasis?: boolean;
};

/** Quiet divider between invitation text blocks */
export function ClassicDivider({ className = "", emphasis = false }: Props) {
  return (
    <div
      className={`classic-ornament ${emphasis ? "classic-ornament-emphasis" : ""} ${className}`}
      aria-hidden
    >
      <span className="classic-ornament-line" />
      <span className="classic-ornament-diamond" />
      <span className="classic-ornament-line" />
    </div>
  );
}

/** Section title — uses Tailwind so it always renders strongly */
export function ClassicSectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mx-auto w-full max-w-2xl text-center ${className}`}>
      <h2 className="font-display m-0 text-[clamp(2rem,6vw,3.25rem)] font-medium uppercase leading-[1.1] tracking-[0.16em] text-[var(--ink)]">
        {children}
      </h2>
      <ClassicDivider emphasis className="mt-5 sm:mt-6" />
    </header>
  );
}
