"use client";

import { useEffect, useMemo, useState } from "react";
import { ClassicDivider } from "@/components/templates/ClassicOrnament";
import type { InvitationView } from "@/lib/templates";
import { buildMapsUrl } from "@/lib/maps";
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

function findDetail(data: InvitationView, ...labels: string[]) {
  const lower = labels.map((l) => l.toLowerCase());
  return data.extra_details.find((d) =>
    lower.some((l) => d.label.toLowerCase().includes(l)),
  );
}

export default function ClassicWhenSection({ data }: Props) {
  const parsed = parseWeddingDate(data.wedding_date);
  const eventDate = useMemo(
    () => buildEventDate(data.wedding_date, data.venue_details),
    [data.wedding_date, data.venue_details],
  );
  const ceremonyLabel =
    parseCeremonyLabel(data.venue_details) ||
    (data.venue_details.trim() || null);
  const placeOnly = data.location;
  const venueLine = data.venue_details
    .replace(ceremonyLabel ?? "", "")
    .replace(/^[\s·\-|]+|[\s·\-|]+$/g, "")
    .trim();

  const reception = findDetail(data, "reception");
  const travel = findDetail(data, "travel", "shuttle", "transport");
  const stay = findDetail(data, "stay", "hotel", "accommodation");

  const mapsUrl = buildMapsUrl(venueLine, placeOnly);

  const schedule = useMemo(() => {
    const items: { label: string; value: string }[] = [];
    if (ceremonyLabel) {
      items.push({
        label: "Ceremony",
        value: ceremonyLabel.replace(/^Ceremony\s+at\s+/i, "") || ceremonyLabel,
      });
    }
    if (reception?.value) {
      const timeMatch = reception.value.match(
        /(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i,
      );
      items.push({
        label: "Reception",
        value: timeMatch?.[1] ?? reception.value,
      });
    }
    if (travel?.value) {
      const timeMatch = travel.value.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i);
      items.push({
        label: "Shuttle",
        value: timeMatch ? `From ${timeMatch[1]}` : travel.value,
      });
    }
    return items;
  }, [ceremonyLabel, reception, travel]);

  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    if (!eventDate) {
      setCountdown(null);
      return;
    }

    const tick = () => {
      const next = getCountdown(eventDate);
      setCountdown((prev) => {
        if (
          prev &&
          prev.days === next.days &&
          prev.hours === next.hours &&
          prev.minutes === next.minutes &&
          prev.done === next.done
        ) {
          return prev;
        }
        return next;
      });
    };

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [eventDate]);

  const countdownBlock =
    countdown && !countdown.done ? (
      <div className="classic-countdown mt-4 grid w-full max-w-[17rem] grid-cols-3 gap-2 sm:mt-5 sm:max-w-xs lg:mt-6 lg:w-full lg:max-w-[19rem]">
        <CountdownTile value={countdown.days} label="Days" />
        <CountdownTile value={countdown.hours} label="Hours" />
        <CountdownTile value={countdown.minutes} label="Mins" />
      </div>
    ) : null;

  return (
    <div className="classic-when relative z-10 mx-auto flex w-full max-w-lg flex-col justify-center px-5 py-5 text-center sm:px-8 sm:py-8 lg:min-h-[min(88svh,52rem)] lg:max-w-[68rem] lg:px-12 lg:py-10 xl:max-w-[74rem]">
      <div>
        <p className="font-display text-[0.75rem] font-medium uppercase tracking-[0.38em] text-[var(--ink)] sm:text-sm lg:text-[0.95rem]">
          <span className="lg:hidden">When</span>
          <span className="hidden lg:inline">When &amp; Where</span>
        </p>
        <ClassicDivider emphasis className="mt-2.5 lg:mt-4" />
      </div>

      <div className="relative mt-5 grid w-full grid-cols-1 gap-5 sm:mt-7 sm:gap-8 lg:mt-9 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:text-left">
        <div className="flex flex-col items-center lg:items-start lg:px-8 xl:px-12">
          <p className="hidden text-[0.68rem] uppercase tracking-[0.32em] text-[var(--muted)] lg:block">
            When
          </p>

          {parsed.weekday ? (
            <p className="mt-0 text-[0.72rem] uppercase tracking-[0.34em] text-[var(--muted)] lg:mt-4">
              {parsed.weekday}
            </p>
          ) : null}

          <div className="mt-1 flex items-end justify-center gap-3 lg:justify-start lg:gap-4">
            {parsed.day ? (
              <p className="font-display text-[clamp(3.6rem,16vw,7.75rem)] leading-none tracking-[-0.04em] text-[var(--ink)]">
                {parsed.day}
              </p>
            ) : (
              <p className="font-display text-[clamp(1.8rem,5vw,2.6rem)] text-[var(--ink)]">
                {data.wedding_date}
              </p>
            )}
            {parsed.month ? (
              <div className="mb-2 text-left">
                <p className="font-display text-[clamp(1.25rem,3vw,1.85rem)] leading-tight tracking-[0.02em] text-[var(--ink)]">
                  {parsed.month}
                </p>
                {parsed.year ? (
                  <p className="mt-0.5 text-[0.95rem] tracking-[0.06em] text-[var(--muted)] lg:text-[1.1rem]">
                    {parsed.year}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {ceremonyLabel ? (
            <p className="font-display mt-3 text-[0.95rem] italic text-[#7c6f7a] lg:text-base">
              {ceremonyLabel}
            </p>
          ) : null}

          <div className="flex w-full justify-center lg:justify-start">
            {countdownBlock}
          </div>
        </div>

        <div
          className="h-px w-full bg-[rgba(28,25,23,0.1)] lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2"
          aria-hidden
        />

        <div className="flex flex-col items-center lg:items-start lg:justify-center lg:px-8 xl:px-12">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[var(--muted)]">
            Where
          </p>
          <p className="font-display mt-3 text-[clamp(1.45rem,3.2vw,2.35rem)] leading-snug text-[var(--ink)] lg:mt-4">
            {placeOnly}
          </p>
          {venueLine ? (
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[#57534e] lg:text-[1.05rem]">
              {venueLine}
            </p>
          ) : null}

          {stay ? (
            <div className="mt-5 w-full max-w-sm lg:mt-6 lg:max-w-none">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                {stay.label}
              </p>
              <p className="font-display mt-1.5 text-[1.05rem] leading-snug text-[var(--ink)] lg:text-[1.15rem]">
                {stay.value}
              </p>
            </div>
          ) : null}

          {travel ? (
            <div className="mt-4 w-full max-w-sm lg:max-w-none">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                {travel.label}
              </p>
              <p className="font-display mt-1.5 text-[1.05rem] leading-snug text-[var(--ink)] lg:text-[1.15rem]">
                {travel.value}
              </p>
            </div>
          ) : null}

          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-[0.68rem] uppercase tracking-[0.24em] text-[var(--ink)] underline decoration-[rgba(28,25,23,0.25)] underline-offset-[0.35em] transition-opacity hover:opacity-70 lg:mt-6"
            >
              View on map
            </a>
          ) : null}
        </div>
      </div>

      {/* Day schedule — fills lower empty band on laptop */}
      {schedule.length > 0 ? (
        <div className="mt-5 border-t border-[rgba(28,25,23,0.1)] pt-4 sm:mt-8 sm:pt-6 lg:mt-10 lg:pt-8">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted)]">
            Day schedule
          </p>
          <ul
            className={`mx-auto mt-3 grid w-full list-none gap-3 p-0 sm:mt-5 sm:gap-5 ${
              schedule.length === 1
                ? "max-w-xs grid-cols-1"
                : schedule.length === 2
                  ? "max-w-xl grid-cols-2"
                  : "max-w-3xl grid-cols-3"
            }`}
          >
            {schedule.map((item, i) => (
              <li
                key={item.label}
                className={`min-w-0 px-1 text-center sm:px-2 ${
                  i > 0
                    ? "border-l border-[rgba(28,25,23,0.1)] pl-2 sm:pl-5"
                    : ""
                }`}
              >
                <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[0.62rem] sm:tracking-[0.26em]">
                  {item.label}
                </p>
                <p className="font-display mt-1.5 text-[1.02rem] text-[var(--ink)] sm:mt-2 sm:text-[1.25rem]">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
