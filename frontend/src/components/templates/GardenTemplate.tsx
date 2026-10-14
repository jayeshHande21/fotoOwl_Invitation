"use client";

import GardenButterflies, {
  GardenButterflyMark,
  GardenCornerVines,
  splitCoupleNames,
} from "@/components/templates/GardenButterflies";
import type { InvitationView } from "@/lib/templates";
import {
  parseCeremonyLabel,
  parseWeddingDate,
} from "@/lib/weddingDate";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  data: InvitationView;
  compact?: boolean;
};

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
      {/* Hero */}
      <section className="garden-screen garden-screen-hero">
        <div className="garden-hero-wash" aria-hidden />
        <GardenButterflies />

        <div className="garden-stage relative z-10">
          <div className="garden-frame" aria-hidden />
          <GardenCornerVines />

          <div className="garden-hero-inner relative z-10 text-center">
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

            <div className="garden-hero-line garden-hero-line-5 mt-8 sm:mt-9">
              {parsed.weekday ? (
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#7a8f7e]">
                  {parsed.weekday}
                </p>
              ) : null}
              <p className="font-display mt-2 text-[clamp(1.25rem,2.8vw,1.65rem)] tracking-[0.04em] text-[#243528]">
                {parsed.day && parsed.month
                  ? `${parsed.day} ${parsed.month}${parsed.year ? ` ${parsed.year}` : ""}`
                  : data.wedding_date}
              </p>
              <p className="mt-2 text-[0.95rem] text-[#5a6f5e]">{data.location}</p>
            </div>

            <div className="garden-hero-line garden-hero-line-5 mt-10 flex flex-col items-center gap-2 sm:mt-12">
              <span className="garden-scroll-chevron" aria-hidden />
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8a9d8e]">
                Scroll for details
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details — framed, fuller composition */}
      <section className="garden-screen garden-screen-details">
        <div className="garden-hero-wash garden-hero-wash-soft" aria-hidden />
        <GardenButterflies dense />

        <div className="garden-stage garden-stage-details relative z-10">
          <div className="garden-frame" aria-hidden />
          <GardenCornerVines />

          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-14">
            <GardenButterflyMark className="mx-auto h-10 w-14 text-[#5f8a68]" />
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-[#5f8a68]">
              Celebration details
            </p>

            <div className="relative mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:text-left">
              <div className="flex flex-col items-center lg:items-start lg:px-10 xl:px-12">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7a8f7e]">
                  When
                </p>
                {parsed.weekday ? (
                  <p className="mt-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#5f8a68]">
                    {parsed.weekday}
                  </p>
                ) : null}
                <p className="font-display mt-1 text-[clamp(2.4rem,5vw,3.5rem)] leading-none text-[#243528]">
                  {parsed.day ?? data.wedding_date}
                </p>
                {parsed.month ? (
                  <p className="font-display mt-2 text-xl text-[#243528]">
                    {parsed.month}
                    {parsed.year ? ` ${parsed.year}` : ""}
                  </p>
                ) : null}
                {ceremony ? (
                  <p className="font-display mt-3 text-base italic text-[#5f8a68]">
                    {ceremony}
                  </p>
                ) : null}
              </div>

              <div
                className="h-px w-full bg-[#5f8a68]/20 lg:absolute lg:inset-y-2 lg:left-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2"
                aria-hidden
              />

              <div className="flex flex-col items-center lg:items-start lg:justify-center lg:px-10 xl:px-12">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7a8f7e]">
                  Where
                </p>
                <p className="font-display mt-3 text-[clamp(1.6rem,3.2vw,2.2rem)] leading-snug text-[#243528]">
                  {data.location}
                </p>
                {venueOnly ? (
                  <p className="mt-2 text-[1.05rem] text-[#4f6354]">{venueOnly}</p>
                ) : null}
              </div>
            </div>

            {data.extra_details.length > 0 ? (
              <ul className="garden-detail-grid mt-10 grid list-none gap-0 p-0 sm:mt-12">
                {data.extra_details.slice(0, 4).map((detail, i) => (
                  <li
                    key={detail.id ?? `${detail.label}-${i}`}
                    className={`garden-detail-cell px-4 py-5 ${i > 0 ? "border-t border-[#5f8a68]/15 sm:border-t-0" : ""}`}
                  >
                    <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#7a8f7e]">
                      {detail.label}
                    </p>
                    <p className="font-display mt-2 text-[1.15rem] leading-snug text-[#243528] sm:text-[1.25rem]">
                      {detail.value}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            {data.video_url ? (
              <div className="mx-auto mt-8 w-full max-w-md sm:mt-10">
                <VideoBlock url={data.video_url} />
              </div>
            ) : null}
          </div>
        </div>
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
