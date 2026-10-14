"use client";

import ClassicBotanicalShadow from "@/components/templates/ClassicBotanicalShadow";
import {
  ClassicDivider,
  ClassicSectionTitle,
} from "@/components/templates/ClassicOrnament";
import type { InvitationView } from "@/lib/templates";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  data: InvitationView;
  compact?: boolean;
};

function parseWeddingDate(date: string) {
  const dayMatch = date.match(/\b(\d{1,2})\b/);
  const yearMatch = date.match(/\b(20\d{2})\b/);
  const weekdayMatch = date.match(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i
  );
  const monthMatch = date.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i
  );

  return {
    day: dayMatch?.[1] ?? null,
    year: yearMatch?.[1] ?? null,
    weekday: weekdayMatch?.[1] ?? null,
    month: monthMatch?.[1] ?? null,
    raw: date,
  };
}

export default function ClassicTemplate({ data, compact }: Props) {
  if (compact) {
    return (
      <div className="classic-invite classic-invite-compact relative overflow-hidden">
        <ClassicBotanicalShadow compact />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center px-4 py-6 text-center">
          <p className="font-display text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
            You are invited
          </p>
          <h2 className="font-display mt-2 max-w-[14ch] text-[1.35rem] leading-tight text-[var(--ink)] break-words">
            {data.couple_names}
          </h2>
        </div>
      </div>
    );
  }

  const hasExtras = data.extra_details.length > 0 || Boolean(data.video_url);
  const parsed = parseWeddingDate(data.wedding_date);
  const hasStructuredDate = Boolean(parsed.day && parsed.month);

  return (
    <div className="classic-invite classic-scroll">
      {/* Screen 1 — Hero */}
      <section className="classic-screen classic-screen-hero">
        <ClassicBotanicalShadow />

        <div className="classic-screen-inner relative z-10 text-center">
          <p className="classic-hero-line classic-hero-line-1 font-display text-[0.7rem] uppercase tracking-[0.34em] text-[var(--muted)] sm:text-xs md:text-sm">
            You are invited
          </p>

          <ClassicDivider className="classic-hero-line classic-hero-line-2 mt-6 sm:mt-7" />

          <h1 className="classic-hero-line classic-hero-line-3 font-display mt-5 text-[clamp(2.4rem,8.5vw,4.75rem)] leading-[1.05] text-[var(--ink)] break-words sm:mt-6">
            {data.couple_names}
          </h1>

          <ClassicDivider className="classic-hero-line classic-hero-line-4 mt-5 sm:mt-6" />

          {data.message ? (
            <p className="classic-hero-line classic-hero-line-5 mx-auto mt-5 max-w-[32rem] text-[clamp(0.95rem,2.4vw,1.15rem)] leading-relaxed text-[var(--muted)] break-words sm:mt-6">
              {data.message}
            </p>
          ) : null}

          <div className="classic-hero-line classic-hero-line-5 mt-12 flex flex-col items-center gap-2 sm:mt-14">
            <span className="classic-scroll-chevron" aria-hidden />
            <p className="classic-scroll-hint">Scroll to continue</p>
          </div>
        </div>
      </section>

      {/* Screen 2 — When & where */}
      <section className="classic-screen classic-screen-details">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />

        <div className="classic-panel relative z-10">
          <ClassicSectionTitle>When & where</ClassicSectionTitle>

          <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center sm:mt-12">
            {hasStructuredDate ? (
              <div>
                {parsed.weekday ? (
                  <p className="font-display text-sm uppercase tracking-[0.32em] text-[var(--muted)]">
                    {parsed.weekday}
                  </p>
                ) : null}
                <p className="font-display mt-2 text-[clamp(7rem,24vw,11rem)] leading-none tracking-[-0.045em] text-[var(--ink)]">
                  {parsed.day}
                </p>
                <p className="font-display mt-4 text-[clamp(1.5rem,4vw,2.15rem)] tracking-[0.06em] text-[var(--ink)]">
                  {parsed.month}
                  {parsed.year ? ` ${parsed.year}` : ""}
                </p>
              </div>
            ) : (
              <p className="font-display text-[clamp(1.9rem,5vw,3rem)] leading-snug text-[var(--ink)] break-words">
                {data.wedding_date}
              </p>
            )}

            <div className="mt-10 w-full max-w-md sm:mt-14">
              <div className="mx-auto mb-8 h-px w-12 bg-[rgba(28,25,23,0.2)]" />
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                Place
              </p>
              <p className="font-display mt-3 text-[clamp(1.65rem,4vw,2.35rem)] leading-snug text-[var(--ink)] break-words">
                {data.location}
              </p>
              {data.venue_details ? (
                <>
                  <p className="mt-8 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Venue
                  </p>
                  <p className="mx-auto mt-3 max-w-sm text-[clamp(1.05rem,2.4vw,1.25rem)] leading-relaxed text-[#57534e] break-words">
                    {data.venue_details}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Screen 3 — Guest notes */}
      <section className="classic-screen classic-screen-notes">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />

        <div className="classic-panel relative z-10">
          <ClassicSectionTitle>For our guests</ClassicSectionTitle>

          {data.extra_details.length > 0 ? (
            <ul className="mt-10 flex flex-1 list-none flex-col items-center justify-center gap-0 p-0 sm:mt-12">
              {data.extra_details.map((detail, i) => (
                <li
                  key={detail.id ?? `${detail.label}-${i}`}
                  className="w-full max-w-lg border-t border-[rgba(28,25,23,0.12)] py-8 text-center last:border-b sm:py-10"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    {detail.label}
                  </p>
                  <p className="font-display mt-3 text-[clamp(1.55rem,4vw,2.1rem)] leading-snug text-[var(--ink)] break-words">
                    {detail.value}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 text-center text-[var(--muted)]">
              More guest details will appear here when you add them.
            </p>
          )}

          {hasExtras ? <VideoBlock url={data.video_url} /> : null}
        </div>
      </section>
    </div>
  );
}

function VideoBlock({ url }: { url: string }) {
  if (!url) return null;
  const embed = videoEmbedUrl(url);
  if (embed) {
    return (
      <div className="mx-auto mt-4 w-full max-w-xl sm:mt-6">
        <div className="aspect-video overflow-hidden">
          <iframe
            src={embed}
            title="Wedding video"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  return (
    <p className="mt-8 text-center">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--accent)] underline-offset-4 hover:underline"
      >
        Watch video
      </a>
    </p>
  );
}
