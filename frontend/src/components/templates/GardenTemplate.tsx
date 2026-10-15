"use client";

import GardenButterflies, {
  GardenButterflyMark,
  GardenCornerVines,
  splitCoupleNames,
} from "@/components/templates/GardenButterflies";
import type { InvitationView } from "@/lib/templates";
import { buildMapsUrl } from "@/lib/maps";
import {
  parseCeremonyLabel,
  parseWeddingDate,
} from "@/lib/weddingDate";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  data: InvitationView;
  compact?: boolean;
};

const TRAVEL_STAY = /stay|hotel|accommodation|travel|shuttle|transport/i;

function guestGridClass(count: number) {
  if (count <= 1) return "max-w-sm grid-cols-1";
  if (count === 2) return "max-w-2xl grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "max-w-3xl grid-cols-1 sm:grid-cols-3";
  return "max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

function guestCellClass(index: number, count: number) {
  const parts = ["min-w-0 px-4 py-6 text-center"];
  if (index > 0) parts.push("border-t border-[#5f8a68]/15");
  if (count === 2) {
    parts.push("sm:border-t-0");
    if (index === 1) parts.push("sm:border-l sm:border-[#5f8a68]/15");
  } else if (count === 3) {
    parts.push("sm:border-t-0");
    if (index > 0) parts.push("sm:border-l sm:border-[#5f8a68]/15");
  } else if (count >= 4) {
    parts.push("sm:border-t-0");
    if (index % 2 === 1) parts.push("sm:border-l sm:border-[#5f8a68]/15");
    if (index >= 2) parts.push("sm:border-t sm:border-[#5f8a68]/15");
    parts.push("lg:border-t-0");
    if (index > 0) parts.push("lg:border-l lg:border-[#5f8a68]/15");
  }
  return parts.join(" ");
}

function Stage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`garden-stage relative z-10 ${className}`}>
      <div className="garden-frame" aria-hidden />
      <GardenCornerVines />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default function GardenTemplate({ data, compact }: Props) {
  const names = splitCoupleNames(data.couple_names);
  const parsed = parseWeddingDate(data.wedding_date);
  const ceremony =
    parseCeremonyLabel(data.venue_details) ||
    data.venue_details.trim() ||
    null;
  const venueOnly = data.venue_details
    .replace(ceremony ?? "", "")
    .replace(/^[\s·\-|]+|[\s·\-|]+$/g, "")
    .trim();

  const stayTravel = data.extra_details.filter((d) => TRAVEL_STAY.test(d.label));
  const guestNotes = data.extra_details.filter((d) => !TRAVEL_STAY.test(d.label));
  const mapsUrl = buildMapsUrl(venueOnly, data.location);

  if (compact) {
    return (
      <div className="garden-invite garden-invite-compact relative overflow-hidden">
        <div className="garden-frame garden-frame-compact" aria-hidden />
        <GardenCornerVines />
        <GardenButterflies compact />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center px-5 py-6 text-center">
          <GardenButterflyMark className="mb-2 h-8 w-11 text-[#5f8a68]" />
          <p className="text-[9px] uppercase tracking-[0.32em] text-[#5f8a68]">
            Save the date
          </p>
          <h2 className="font-display mt-2 max-w-[14ch] text-[1.4rem] leading-tight text-[#243528] break-words">
            {data.couple_names}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="garden-invite garden-scroll">
      {/* Page 1 — Hero */}
      <section className="garden-screen garden-screen-hero">
        <div className="garden-hero-wash" aria-hidden />
        <GardenButterflies />

        <Stage>
          <div className="garden-hero-inner mx-auto text-center">
            <div className="garden-hero-line garden-hero-line-1 flex flex-col items-center">
              <span className="garden-pill">Save the date</span>
              <GardenButterflyMark className="mt-5 h-12 w-[4.25rem] text-[#5f8a68] sm:h-14 sm:w-[5rem]" />
            </div>

            <p className="garden-hero-line garden-hero-line-2 mt-4 text-[0.72rem] uppercase tracking-[0.38em] text-[#5f8a68] sm:text-xs">
              We&apos;re getting married
            </p>

            {names ? (
              <div className="garden-hero-line garden-hero-line-3 mt-5 flex flex-col items-center gap-1 sm:mt-6 sm:flex-row sm:justify-center sm:gap-5">
                <h1 className="font-display text-[clamp(2.4rem,8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#243528]">
                  {names.left}
                </h1>
                <span className="garden-amp font-display text-[clamp(1.6rem,4vw,2.4rem)] text-[#5f8a68]">
                  &amp;
                </span>
                <h1 className="font-display text-[clamp(2.4rem,8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#243528]">
                  {names.right}
                </h1>
              </div>
            ) : (
              <h1 className="garden-hero-line garden-hero-line-3 font-display mt-5 text-[clamp(2.5rem,8.5vw,4.75rem)] font-medium leading-[1.05] text-[#243528] break-words sm:mt-6">
                {data.couple_names}
              </h1>
            )}

            <div
              className="garden-hero-line garden-hero-line-4 mx-auto mt-6 flex max-w-sm items-center gap-3 sm:mt-7"
              aria-hidden
            >
              <span className="garden-rule" />
              <GardenButterflyMark className="h-6 w-8 shrink-0 text-[#5f8a68]" />
              <span className="garden-rule" />
            </div>

            {data.message ? (
              <p className="garden-hero-line garden-hero-line-5 mx-auto mt-6 max-w-[26rem] text-[clamp(0.95rem,2.1vw,1.12rem)] leading-relaxed text-[#4f6354] sm:mt-7">
                {data.message}
              </p>
            ) : null}

            <div className="garden-hero-line garden-hero-line-5 mt-12 flex flex-col items-center gap-2 sm:mt-14">
              <span className="garden-scroll-chevron" aria-hidden />
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8a9d8e]">
                Scroll to continue
              </p>
            </div>
          </div>
        </Stage>
      </section>

      {/* Page 2 — When & where */}
      <section className="garden-screen garden-screen-details">
        <div className="garden-hero-wash garden-hero-wash-soft" aria-hidden />
        <GardenButterflies dense />

        <Stage className="garden-stage-details">
          <div className="mx-auto w-full max-w-3xl px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-12">
            <GardenButterflyMark className="mx-auto h-10 w-14 text-[#5f8a68]" />
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-[#5f8a68]">
              When &amp; where
            </p>

            <div className="relative mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:text-left">
              <div className="flex flex-col items-center lg:items-start lg:px-8 xl:px-10">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7a8f7e]">
                  When
                </p>
                {parsed.weekday ? (
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-[#5f8a68]">
                    {parsed.weekday}
                  </p>
                ) : null}
                <p className="font-display mt-1 text-[clamp(3rem,7vw,4.25rem)] leading-none text-[#243528]">
                  {parsed.day ?? data.wedding_date}
                </p>
                {parsed.month ? (
                  <p className="font-display mt-3 text-[clamp(1.35rem,2.8vw,1.75rem)] text-[#243528]">
                    {parsed.month}
                    {parsed.year ? ` ${parsed.year}` : ""}
                  </p>
                ) : null}
                {ceremony ? (
                  <p className="font-display mt-4 text-base italic text-[#5f8a68] sm:text-lg">
                    {ceremony}
                  </p>
                ) : null}
              </div>

              <div
                className="h-px w-full bg-[#5f8a68]/20 lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2"
                aria-hidden
              />

              <div className="flex flex-col items-center lg:items-start lg:justify-center lg:px-8 xl:px-10">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7a8f7e]">
                  Where
                </p>
                <p className="font-display mt-4 text-[clamp(1.7rem,3.4vw,2.35rem)] leading-snug text-[#243528]">
                  {data.location}
                </p>
                {venueOnly ? (
                  <p className="mt-2 text-[1.05rem] text-[#4f6354] sm:text-lg">
                    {venueOnly}
                  </p>
                ) : null}

                {stayTravel.length > 0 ? (
                  <ul className="mt-8 w-full max-w-sm space-y-5 list-none p-0 lg:max-w-none">
                    {stayTravel.map((detail, i) => (
                      <li key={detail.id ?? `${detail.label}-${i}`}>
                        <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#7a8f7e]">
                          {detail.label}
                        </p>
                        <p className="font-display mt-1.5 text-[1.1rem] text-[#243528]">
                          {detail.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex text-[0.68rem] uppercase tracking-[0.24em] text-[#3d5c45] underline decoration-[rgba(95,138,104,0.45)] underline-offset-[0.35em] transition-opacity hover:opacity-70"
                  >
                    View on map
                  </a>
                ) : null}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-2 lg:mt-14">
              <span className="garden-scroll-chevron" aria-hidden />
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8a9d8e]">
                Guest notes below
              </p>
            </div>
          </div>
        </Stage>
      </section>

      {/* Page 3 — Guest notes */}
      <section className="garden-screen garden-screen-notes">
        <div className="garden-hero-wash garden-hero-wash-soft" aria-hidden />
        <GardenButterflies dense />

        <Stage className="garden-stage-details">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
            <GardenButterflyMark className="h-10 w-14 text-[#5f8a68]" />
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-[#5f8a68]">
              For our guests
            </p>
            <p className="font-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-[#243528]">
              A few notes for the day
            </p>

            {guestNotes.length > 0 ? (
              <ul className={`garden-guest-grid mt-10 grid w-full list-none p-0 ${guestGridClass(guestNotes.length)}`}>
                {guestNotes.map((detail, i) => (
                  <li
                    key={detail.id ?? `${detail.label}-${i}`}
                    className={guestCellClass(i, guestNotes.length)}
                  >
                    <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#7a8f7e]">
                      {detail.label}
                    </p>
                    <p className="font-display mt-2.5 text-[clamp(1.15rem,2.2vw,1.4rem)] leading-snug text-[#243528]">
                      {detail.value}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 text-[#7a8f7e]">
                Guest notes will appear here when you add them.
              </p>
            )}

            {data.video_url ? (
              <div className="mx-auto mt-10 w-full max-w-md">
                <p className="mb-3 text-[0.62rem] uppercase tracking-[0.26em] text-[#7a8f7e]">
                  A note from us
                </p>
                <VideoBlock url={data.video_url} />
              </div>
            ) : null}
          </div>
        </Stage>
      </section>
    </div>
  );
}

function VideoBlock({ url }: { url: string }) {
  const embed = videoEmbedUrl(url);
  if (!embed) {
    return (
      <p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-[#5f8a68] underline-offset-4 hover:underline"
        >
          Watch video
        </a>
      </p>
    );
  }
  return (
    <div className="aspect-video overflow-hidden rounded-sm border border-[#5f8a68]/20">
      <iframe
        src={embed}
        title="Wedding video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
