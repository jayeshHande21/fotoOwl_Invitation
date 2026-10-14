"use client";

import ClassicBotanicalShadow from "@/components/templates/ClassicBotanicalShadow";
import type { InvitationView } from "@/lib/templates";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  data: InvitationView;
  compact?: boolean;
};

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
          <p className="mt-3 text-[10px] text-[var(--muted)]">3 screens · scroll</p>
        </div>
      </div>
    );
  }

  const hasExtras = data.extra_details.length > 0 || Boolean(data.video_url);

  return (
    <div className="classic-invite classic-scroll">
      {/* Screen 1 — Hero (animation only here) */}
      <section className="classic-screen classic-screen-hero">
        <ClassicBotanicalShadow />
        <div className="classic-screen-inner relative z-10 text-center">
          <p className="classic-hero-line classic-hero-line-1 font-display text-[0.7rem] uppercase tracking-[0.32em] text-[var(--muted)] sm:text-xs md:text-sm">
            You are invited
          </p>
          <h1 className="classic-hero-line classic-hero-line-2 font-display mt-5 text-[clamp(2.25rem,8vw,4.5rem)] leading-[1.08] text-[var(--ink)] break-words sm:mt-7">
            {data.couple_names}
          </h1>
          {data.message ? (
            <p className="classic-hero-line classic-hero-line-3 mx-auto mt-5 max-w-[34rem] text-[clamp(0.95rem,2.4vw,1.15rem)] leading-relaxed text-[var(--muted)] break-words sm:mt-7">
              {data.message}
            </p>
          ) : null}
          <p className="classic-hero-line classic-hero-line-4 classic-scroll-hint mt-12 sm:mt-16">
            Scroll to continue
          </p>
        </div>
      </section>

      {/* Screen 2 — When & where */}
      <section className="classic-screen classic-screen-details">
        <div className="classic-screen-inner text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] sm:text-xs">
            When & where
          </p>
          <p className="font-display mt-6 text-[clamp(1.5rem,4.5vw,2.35rem)] leading-snug text-[var(--ink)] break-words sm:mt-8">
            {data.wedding_date}
          </p>
          <p className="mt-4 text-[clamp(1rem,2.4vw,1.25rem)] text-[var(--muted)] break-words">
            {data.location}
          </p>
          {data.venue_details ? (
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)] break-words sm:text-base">
              {data.venue_details}
            </p>
          ) : null}
        </div>
      </section>

      {/* Screen 3 — Guest notes */}
      <section className="classic-screen classic-screen-notes">
        <div className="classic-screen-inner text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] sm:text-xs">
            For our guests
          </p>

          {data.extra_details.length > 0 ? (
            <ul className="mx-auto mt-8 grid w-full max-w-md gap-8 sm:mt-10 sm:gap-10">
              {data.extra_details.map((detail, i) => (
                <li key={detail.id ?? `${detail.label}-${i}`} className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-[clamp(1rem,2.4vw,1.2rem)] leading-snug text-[var(--ink)] break-words">
                    {detail.value}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-[var(--muted)]">
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
      <div className="mx-auto mt-10 w-full max-w-lg overflow-hidden rounded-xl border border-stone-200 bg-white/80 sm:mt-12">
        <div className="aspect-video">
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
    <p className="mt-10 text-center">
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
