"use client";

import { useEffect, useState } from "react";

type Props = {
  coupleNames: string;
  message?: string;
  compact?: boolean;
};

function splitNames(names: string) {
  const parts = names
    .split(/\s*&\s*|\s+and\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 2) return { left: parts[0], right: parts[1] };
  return null;
}

/** Burgundy envelope opens onto cream stationery — Celebration cover only */
export default function CelebrationHeroCover({
  coupleNames,
  message,
  compact,
}: Props) {
  const names = splitNames(coupleNames);
  const [opened, setOpened] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    if (compact) {
      setOpened(true);
      setSkipIntro(true);
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOpened(true);
      setSkipIntro(true);
      return;
    }
    const t = window.setTimeout(() => setOpened(true), 850);
    return () => window.clearTimeout(t);
  }, [compact]);

  return (
    <div
      className={`celeb-cover ${opened ? "celeb-cover-open" : ""} ${
        skipIntro ? "celeb-cover-instant" : ""
      } ${compact ? "celeb-cover-compact" : ""}`}
    >
      <div className="celeb-cover-paper" aria-hidden>
        <div className="celeb-cover-light" />
      </div>

      <svg
        className="celeb-cover-pampas"
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g className="celeb-cover-pampas-sway">
          <path
            d="M40 270C48 210 55 160 70 120C85 80 105 55 130 40"
            stroke="#d9d0c2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M55 270C62 200 78 145 98 105C118 65 145 42 170 30"
            stroke="#d4cbbd"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M28 270C35 220 42 175 52 140C62 105 78 78 95 60"
            stroke="#ddd4c6"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse
            cx="132"
            cy="38"
            rx="18"
            ry="28"
            fill="#ebe4d8"
            opacity="0.9"
            transform="rotate(-25 132 38)"
          />
          <ellipse
            cx="148"
            cy="52"
            rx="14"
            ry="24"
            fill="#e6dfd2"
            opacity="0.85"
            transform="rotate(-10 148 52)"
          />
          <ellipse
            cx="118"
            cy="55"
            rx="12"
            ry="22"
            fill="#e8e1d4"
            opacity="0.8"
            transform="rotate(-40 118 55)"
          />
          <ellipse
            cx="172"
            cy="28"
            rx="16"
            ry="26"
            fill="#ebe4d8"
            opacity="0.88"
            transform="rotate(5 172 28)"
          />
          <ellipse
            cx="95"
            cy="58"
            rx="11"
            ry="20"
            fill="#e4dccf"
            opacity="0.75"
            transform="rotate(-50 95 58)"
          />
          <ellipse
            cx="70"
            cy="115"
            rx="10"
            ry="18"
            fill="#e8e1d4"
            opacity="0.55"
            transform="rotate(-30 70 115)"
          />
        </g>
      </svg>

      <div className="celeb-cover-invite">
        <div className="celeb-cover-invite-inner">
          <p className="celeb-cover-kicker celeb-cover-fade">
            <span className="celeb-cover-serif">You&apos;re</span>
            <span className="celeb-cover-script-word"> cordially </span>
            <span className="celeb-cover-serif">invited</span>
          </p>

          <p className="celeb-cover-married celeb-cover-fade celeb-cover-fade-2">
            We&apos;re getting married
          </p>

          {names ? (
            <div className="celeb-cover-names celeb-cover-fade celeb-cover-fade-3">
              <span className="celeb-cover-ampersand" aria-hidden>
                &amp;
              </span>
              <h1 className="celeb-cover-name celeb-cover-name-a">{names.left}</h1>
              <h1 className="celeb-cover-name celeb-cover-name-b">{names.right}</h1>
            </div>
          ) : (
            <h1 className="celeb-cover-name celeb-cover-fade celeb-cover-fade-3">
              {coupleNames}
            </h1>
          )}

          {message && !compact ? (
            <p className="celeb-cover-message celeb-cover-fade celeb-cover-fade-4">
              {message}
            </p>
          ) : null}

          {!compact ? (
            <div className="celeb-cover-scroll celeb-cover-fade celeb-cover-fade-5">
              <span className="celeb-scroll-bar" aria-hidden />
              <p>Scroll</p>
            </div>
          ) : null}
        </div>
      </div>

      {!compact ? (
        <div className="celeb-cover-flaps" aria-hidden>
          <div className="celeb-flap celeb-flap-top">
            <FloralPattern />
          </div>
          <div className="celeb-flap celeb-flap-bottom">
            <FloralPattern />
          </div>
          <div className="celeb-flap celeb-flap-left">
            <FloralPattern />
          </div>
          <div className="celeb-flap celeb-flap-right">
            <FloralPattern />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FloralPattern() {
  return (
    <svg
      className="celeb-flap-floral"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.55">
        <path
          d="M100 30C108 55 120 70 145 78C120 86 108 105 100 130C92 105 80 86 55 78C80 70 92 55 100 30Z"
          fill="currentColor"
        />
        <path
          d="M55 120C70 115 82 122 90 140C78 135 65 140 55 155C52 138 48 125 55 120Z"
          fill="currentColor"
        />
        <path
          d="M145 120C130 115 118 122 110 140C122 135 135 140 145 155C148 138 152 125 145 120Z"
          fill="currentColor"
        />
        <circle cx="100" cy="78" r="6" fill="currentColor" opacity="0.7" />
        <path
          d="M100 130C102 150 98 170 100 185"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M100 150C88 148 78 155 72 165M100 160C112 158 122 164 128 174"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
