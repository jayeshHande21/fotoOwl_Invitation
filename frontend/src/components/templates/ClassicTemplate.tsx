"use client";

import ClassicBotanicalShadow from "@/components/templates/ClassicBotanicalShadow";
import {
  ClassicDivider,
  ClassicSectionTitle,
} from "@/components/templates/ClassicOrnament";
import ClassicWhenSection from "@/components/templates/ClassicWhenSection";
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
        </div>
      </div>
    );
  }

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

      {/* Screen 2 — When & where (reference style) */}
      <section className="classic-screen classic-screen-details">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />
        <ClassicWhenSection data={data} />
      </section>

      {/* Screen 3 — Guest notes (horizontal details, video below) */}
      <section className="classic-screen classic-screen-notes">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />

        <div className="classic-panel classic-panel-wide relative z-10">
          <ClassicSectionTitle>For our guests</ClassicSectionTitle>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-12 sm:mt-12 sm:gap-14">
            {data.extra_details.length > 0 ? (
              <ul
                className={`mx-auto grid w-full list-none gap-10 p-0 ${
                  data.extra_details.length === 1
                    ? "max-w-md grid-cols-1"
                    : "max-w-3xl grid-cols-1 sm:grid-cols-[minmax(14rem,1fr)_minmax(14rem,1fr)] sm:gap-0"
                }`}
              >
                {data.extra_details.map((detail, i) => (
                  <li
                    key={detail.id ?? `${detail.label}-${i}`}
                    className={`min-w-0 px-4 text-center sm:px-10 ${
                      i > 0
                        ? "border-t border-[rgba(28,25,23,0.14)] pt-10 sm:border-t-0 sm:border-l sm:pt-0"
                        : ""
                    }`}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                      {detail.label}
                    </p>
                    <p className="font-display mt-3 text-[clamp(1.5rem,3.2vw,2rem)] leading-snug text-[var(--ink)] [overflow-wrap:normal] [word-break:normal]">
                      {detail.value}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[var(--muted)]">
                More guest details will appear here when you add them.
              </p>
            )}

            {data.video_url ? (
              <div className="mx-auto w-full max-w-3xl">
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
  if (!url) return null;
  const embed = videoEmbedUrl(url);
  if (embed) {
    return (
      <div className="w-full min-w-0">
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
    <p className="text-center lg:text-left">
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
