"use client";

import { useEffect, useState } from "react";
import { ClassicDivider } from "@/components/templates/ClassicOrnament";
import type { InvitationView } from "@/lib/templates";
import {
  buildEventDate,
  getCountdown,
  parseCeremonyLabel,
  parseWeddingDate,
  type CountdownParts,
} from "@/lib/weddingDate";

type Props = {
  data: InvitationView;
};

export default function ClassicWhenSection({ data }: Props) {
  const parsed = parseWeddingDate(data.wedding_date);
  const eventDate = buildEventDate(data.wedding_date, data.venue_details);
  const ceremonyLabel =
    parseCeremonyLabel(data.venue_details) ||
    (data.venue_details.trim() || null);
  const placeOnly = data.location;
  const venueLine = data.venue_details
    .replace(ceremonyLabel ?? "", "")
    .replace(/^[\s·\-|]+|[\s·\-|]+$/g, "")
    .trim();

  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    if (!eventDate) return;

    const tick = () => setCountdown(getCountdown(eventDate));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [eventDate]);

  const countdownBlock =
    countdown && !countdown.done ? (
      <div className="classic-countdown mt-5 grid w-full max-w-[17rem] grid-cols-3 gap-2 sm:mt-6 sm:max-w-xs lg:max-w-none lg:w-[18rem]">
        <CountdownTile value={countdown.days} label="Days" />
        <CountdownTile value={countdown.hours} label="Hours" />
        <CountdownTile value={countdown.minutes} label="Mins" />
      </div>
    ) : null;

  return (
    <div className="classic-when relative z-10 mx-auto w-full max-w-lg px-5 py-8 text-center lg:max-w-5xl lg:px-10 lg:py-6 xl:max-w-6xl">
      <div className="hidden lg:block">
        <p className="font-display text-sm font-medium uppercase tracking-[0.38em] text-[var(--ink)]">
          When &amp; Where
        </p>
        <ClassicDivider emphasis className="mt-3" />
      </div>

      <div className="flex flex-col items-center lg:hidden">
        <p className="font-display text-[0.75rem] font-medium uppercase tracking-[0.38em] text-[var(--ink)] sm:text-sm">
          When
        </p>
        <ClassicDivider emphasis className="mt-3" />

        {parsed.weekday ? (
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.34em] text-[var(--muted)]">
            {parsed.weekday}
          </p>
        ) : null}

        {parsed.day ? (
          <p className="font-display mt-1 text-[clamp(5rem,20vw,7.5rem)] leading-none tracking-[-0.04em] text-[var(--ink)]">
            {parsed.day}
          </p>
        ) : (
          <p className="font-display mt-4 text-[clamp(1.8rem,5vw,2.6rem)] text-[var(--ink)]">
            {data.wedding_date}
          </p>
        )}

        {parsed.month ? (
          <p className="font-display mt-2 text-[clamp(1.3rem,3.6vw,1.7rem)] tracking-[0.04em] text-[var(--ink)]">
            {parsed.month}
            {parsed.year ? ` ${parsed.year}` : ""}
          </p>
        ) : null}

        {ceremonyLabel ? (
          <p className="font-display mt-3 text-[0.95rem] italic text-[#7c6f7a]">
            {ceremonyLabel}
          </p>
        ) : null}

        {countdownBlock}

        <div className="mt-8 w-full border-t border-[rgba(28,25,23,0.1)] pt-7">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[var(--muted)]">
            Where
          </p>
          <p className="font-display mt-2 text-[clamp(1.4rem,3.6vw,1.85rem)] leading-snug text-[var(--ink)]">
            {placeOnly}
          </p>
          {venueLine ? (
            <p className="mx-auto mt-1.5 max-w-sm text-[0.95rem] leading-relaxed text-[#57534e]">
              {venueLine}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 hidden items-stretch gap-0 lg:grid lg:grid-cols-[1.15fr_minmax(0,1px)_0.95fr] lg:gap-0 xl:mt-10">
        <div className="flex flex-col items-center justify-center px-6 py-2 xl:px-10">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--muted)]">
            When
          </p>

          {parsed.weekday ? (
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.34em] text-[var(--muted)]">
              {parsed.weekday}
            </p>
          ) : null}

          <div className="mt-1 flex items-end gap-4">
            {parsed.day ? (
              <p className="font-display text-[7.5rem] leading-none tracking-[-0.04em] text-[var(--ink)] xl:text-[8.25rem]">
                {parsed.day}
              </p>
            ) : null}
            <div className="mb-3 text-left">
              {parsed.month ? (
                <p className="font-display text-[1.65rem] leading-tight tracking-[0.02em] text-[var(--ink)] xl:text-[1.85rem]">
                  {parsed.month}
                  {parsed.year ? (
                    <span className="mt-0.5 block text-[1.25rem] text-[var(--muted)] xl:text-[1.35rem]">
                      {parsed.year}
                    </span>
                  ) : null}
                </p>
              ) : (
                <p className="font-display text-2xl text-[var(--ink)]">
                  {data.wedding_date}
                </p>
              )}
            </div>
          </div>

          {ceremonyLabel ? (
            <p className="font-display mt-3 text-base italic text-[#7c6f7a]">
              {ceremonyLabel}
            </p>
          ) : null}

          {countdownBlock}
        </div>

        <div
          className="mx-auto w-px self-stretch bg-[rgba(28,25,23,0.12)]"
          aria-hidden
        />

        <div className="flex flex-col items-center justify-center px-6 py-2 xl:px-10">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--muted)]">
            Where
          </p>
          <p className="font-display mt-5 max-w-[16ch] text-[clamp(1.85rem,3vw,2.45rem)] leading-snug text-[var(--ink)]">
            {placeOnly}
          </p>
          {venueLine ? (
            <p className="mt-3 max-w-[22ch] text-[1.05rem] leading-relaxed text-[#57534e]">
              {venueLine}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="classic-countdown-tile">
      <p className="font-display text-[1.55rem] leading-none text-[var(--ink)] sm:text-[1.75rem]">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}
