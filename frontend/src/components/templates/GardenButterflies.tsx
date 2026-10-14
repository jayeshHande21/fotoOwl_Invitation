type Props = {
  compact?: boolean;
  dense?: boolean;
};

/** Soft butterflies — larger & more visible for the Garden theme */
export default function GardenButterflies({ compact, dense }: Props) {
  return (
    <div
      className={`garden-butterflies pointer-events-none absolute inset-0 overflow-hidden ${
        compact ? "garden-butterflies-compact" : ""
      } ${dense ? "garden-butterflies-dense" : ""}`}
      aria-hidden
    >
      <Butterfly className="garden-bf garden-bf-1" />
      <Butterfly className="garden-bf garden-bf-2" />
      <Butterfly className="garden-bf garden-bf-3" />
      {!compact ? (
        <>
          <Butterfly className="garden-bf garden-bf-4" />
          <Butterfly className="garden-bf garden-bf-5" />
          <Butterfly className="garden-bf garden-bf-6" />
        </>
      ) : null}
    </div>
  );
}

function Butterfly({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="garden-bf-body">
        <ellipse cx="32" cy="24" rx="1.6" ry="11" fill="currentColor" opacity="0.7" />
        <circle cx="32" cy="11.5" r="1.8" fill="currentColor" opacity="0.55" />
        <path
          d="M32 13c-1.8-4.5-4-7.2-6.2-8.2M32 13c1.8-4.5 4-7.2 6.2-8.2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
      <g className="garden-bf-wing garden-bf-wing-l">
        <path
          d="M30.5 15C21 8 10 9 6 15c-3.5 4.5-1.2 12.5 5.5 15.5 5.5 2.5 13.2 1 17-4 1.6-2.2 2.6-6 2-11.5Z"
          fill="currentColor"
          opacity="0.38"
        />
        <path
          d="M30.5 22C23.5 19.5 17 22 13.5 26.5c-2.4 3.2-.6 7.8 3.8 9 3.8 1 8.8 0 11.5-3.4 1.3-1.6 2.2-4.2 1.7-10Z"
          fill="currentColor"
          opacity="0.28"
        />
      </g>
      <g className="garden-bf-wing garden-bf-wing-r">
        <path
          d="M33.5 15C43 8 54 9 58 15c3.5 4.5 1.2 12.5-5.5 15.5-5.5 2.5-13.2 1-17-4-1.6-2.2-2.6-6-2-11.5Z"
          fill="currentColor"
          opacity="0.38"
        />
        <path
          d="M33.5 22C40.5 19.5 47 22 50.5 26.5c2.4 3.2.6 7.8-3.8 9-3.8 1-8.8 0-11.5-3.4-1.3-1.6-2.2-4.2-1.7-10Z"
          fill="currentColor"
          opacity="0.28"
        />
      </g>
    </svg>
  );
}

export function GardenButterflyMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`garden-bf-mark ${className}`}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="32" cy="24" rx="1.4" ry="10" fill="currentColor" opacity="0.65" />
      <path
        d="M30.5 15C22 9 12 10 8 16c-3 4-1.2 11 4.8 14 5 2.2 11.5.9 15.2-3.5 1.5-1.8 2.4-5.4 2.5-11.5Z"
        fill="currentColor"
        opacity="0.42"
      />
      <path
        d="M33.5 15C42 9 52 10 56 16c3 4 1.2 11-4.8 14-5 2.2-11.5.9-15.2-3.5-1.5-1.8-2.4-5.4-2.5-11.5Z"
        fill="currentColor"
        opacity="0.42"
      />
    </svg>
  );
}

/** Corner vine flourishes for framed invitation look */
export function GardenCornerVines({ className = "" }: { className?: string }) {
  return (
    <div className={`garden-vines pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <svg className="garden-vine garden-vine-tl" viewBox="0 0 120 120" fill="none">
        <path
          d="M8 95C18 70 28 48 48 32C62 22 78 14 108 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M22 78c8-4 12-12 10-20M38 52c6-3 14-4 20-1M58 34c5-5 14-8 22-6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
        />
        <ellipse cx="30" cy="68" rx="5" ry="3" fill="currentColor" opacity="0.22" transform="rotate(-35 30 68)" />
        <ellipse cx="52" cy="42" rx="6" ry="3.5" fill="currentColor" opacity="0.2" transform="rotate(-20 52 42)" />
        <ellipse cx="78" cy="24" rx="5" ry="3" fill="currentColor" opacity="0.18" transform="rotate(-10 78 24)" />
      </svg>
      <svg className="garden-vine garden-vine-tr" viewBox="0 0 120 120" fill="none">
        <path
          d="M112 95C102 70 92 48 72 32C58 22 42 14 12 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M98 78c-8-4-12-12-10-20M82 52c-6-3-14-4-20-1M62 34c-5-5-14-8-22-6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
        />
        <ellipse cx="90" cy="68" rx="5" ry="3" fill="currentColor" opacity="0.22" transform="rotate(35 90 68)" />
        <ellipse cx="68" cy="42" rx="6" ry="3.5" fill="currentColor" opacity="0.2" transform="rotate(20 68 42)" />
        <ellipse cx="42" cy="24" rx="5" ry="3" fill="currentColor" opacity="0.18" transform="rotate(10 42 24)" />
      </svg>
      <svg className="garden-vine garden-vine-bl" viewBox="0 0 120 120" fill="none">
        <path
          d="M8 25C18 50 28 72 48 88C62 98 78 106 108 112"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <ellipse cx="34" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.18" transform="rotate(30 34 55)" />
        <ellipse cx="58" cy="78" rx="6" ry="3.5" fill="currentColor" opacity="0.16" transform="rotate(15 58 78)" />
      </svg>
      <svg className="garden-vine garden-vine-br" viewBox="0 0 120 120" fill="none">
        <path
          d="M112 25C102 50 92 72 72 88C58 98 42 106 12 112"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <ellipse cx="86" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.18" transform="rotate(-30 86 55)" />
        <ellipse cx="62" cy="78" rx="6" ry="3.5" fill="currentColor" opacity="0.16" transform="rotate(-15 62 78)" />
      </svg>
    </div>
  );
}

export function splitCoupleNames(names: string): { left: string; right: string } | null {
  const parts = names.split(/\s*&\s*|\s+and\s+/i).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 2) return { left: parts[0], right: parts[1] };
  return null;
}
