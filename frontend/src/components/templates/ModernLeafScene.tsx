"use client";

type Props = {
  compact?: boolean;
  intensity?: "hero" | "soft";
};

/** Live dappled-light scene from the reference video + soft breeze overlays */
export default function ModernLeafScene({
  compact,
  intensity = "hero",
}: Props) {
  return (
    <div
      className={`modern-leaf-scene pointer-events-none absolute inset-0 overflow-hidden ${
        compact ? "modern-leaf-scene-compact" : ""
      } modern-leaf-scene-${intensity}`}
      aria-hidden
    >
      {/* Photographic / video base — must fill the screen */}
      <div className="modern-wall-stack">
        <img
          src="/templates/modern/wall.jpg"
          alt=""
          className="modern-wall-img modern-wall-img-a"
        />
        <img
          src="/templates/modern/wall-alt.jpg"
          alt=""
          className="modern-wall-img modern-wall-img-b"
        />
        {!compact && intensity === "hero" ? (
          <video
            className="modern-wall-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/templates/modern/wall.jpg"
          >
            <source src="/templates/modern/bg.mp4" type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="modern-shadow-layer">
        <span className="modern-shadow-blob modern-shadow-1" />
        <span className="modern-shadow-blob modern-shadow-2" />
        <span className="modern-shadow-blob modern-shadow-3" />
      </div>

      {/* Soft SVG accent leaves — lighter so they don't look like a cartoon vine */}
      <svg
        className="modern-branch modern-branch-tr"
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="modern-branch-sway modern-branch-sway-a">
          <path
            d="M260 10C210 40 170 90 150 140C130 190 125 240 140 300"
            stroke="#4f6044"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.28"
          />
          <LeafCluster x={230} y={35} r={-25} />
          <LeafCluster x={195} y={70} r={-15} />
          <LeafCluster x={168} y={115} r={-8} />
          <LeafCluster x={152} y={160} r={5} />
        </g>
      </svg>

      <svg
        className="modern-branch modern-branch-tl"
        viewBox="0 0 220 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="modern-branch-sway modern-branch-sway-b">
          <path
            d="M20 8C55 35 85 70 100 115C115 160 108 200 90 230"
            stroke="#4f6044"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.22"
          />
          <LeafCluster x={40} y={30} r={20} />
          <LeafCluster x={70} y={65} r={12} />
          <LeafCluster x={92} y={110} r={5} />
        </g>
      </svg>

      <div className="modern-light-shimmer" />
      <div className="modern-vignette" />
    </div>
  );
}

function LeafCluster({
  x,
  y,
  r,
}: {
  x: number;
  y: number;
  r: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} opacity="0.35">
      <ellipse
        className="modern-leaf"
        cx="-10"
        cy="0"
        rx="9"
        ry="4.5"
        fill="#5a6d4e"
        transform="rotate(-25)"
      />
      <ellipse
        className="modern-leaf"
        cx="10"
        cy="0"
        rx="9"
        ry="4.5"
        fill="#66785a"
        transform="rotate(25)"
      />
      <ellipse
        className="modern-leaf"
        cx="0"
        cy="-8"
        rx="7.5"
        ry="3.8"
        fill="#718463"
      />
    </g>
  );
}
