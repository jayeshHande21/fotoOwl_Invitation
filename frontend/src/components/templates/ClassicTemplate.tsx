"use client";

import ClassicBotanicalShadow from "@/components/templates/ClassicBotanicalShadow";
import {
  ClassicDivider,
  ClassicSectionTitle,
} from "@/components/templates/ClassicOrnament";
import ClassicWhenSection from "@/components/templates/ClassicWhenSection";
import PhotosLink from "@/components/templates/PhotosLink";
import type { InvitationView } from "@/lib/templates";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  data: InvitationView;
  compact?: boolean;
};

/** Details already surfaced on When & Where */
const WHEN_WHERE_LABELS = /stay|hotel|accommodation|travel|shuttle|transport/i;

function guestGridClass(count: number) {
  if (count <= 1) return "max-w-md grid-cols-1";
  if (count === 2) return "max-w-3xl grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "max-w-4xl grid-cols-1 sm:grid-cols-3";
  return "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

function itemBorders(index: number, count: number) {
  const parts = ["min-w-0 px-4 py-5 text-center sm:px-6 lg:px-4 lg:py-4"];

  if (index > 0) {
    parts.push("border-t border-[rgba(28,25,23,0.12)]");
  }

  if (count === 2) {
    parts.push("sm:border-t-0");
    if (index === 1) parts.push("sm:border-l");
  } else if (count === 3) {
    parts.push("sm:border-t-0");
    if (index > 0) parts.push("sm:border-l");
  } else if (count >= 4) {
    // 2×2 on tablet, 1×4 on laptop
    parts.push("sm:border-t-0");
    if (index % 2 === 1) parts.push("sm:border-l");
    if (index >= 2) parts.push("sm:border-t");
    parts.push("lg:border-t-0");
    if (index > 0) parts.push("lg:border-l");
  }

  return parts.join(" ");
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

  const guestDetails = data.extra_details.filter(
    (d) => !WHEN_WHERE_LABELS.test(d.label),
  );
  const detailCount = guestDetails.length;

  return (
    <div className="classic-invite classic-scroll">
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

      <section className="classic-screen classic-screen-details">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />
        <ClassicWhenSection data={data} />
      </section>

      <section className="classic-screen classic-screen-notes">
        <div className="classic-soft-mark classic-soft-mark-left" aria-hidden />
        <div className="classic-soft-mark classic-soft-mark-right" aria-hidden />

        <div className="classic-panel classic-panel-wide relative z-10 justify-center">
          <ClassicSectionTitle>For our guests</ClassicSectionTitle>

          <div className="mt-7 flex w-full flex-1 flex-col justify-center gap-7 sm:mt-8 sm:gap-8 lg:gap-9">
            {detailCount > 0 ? (
              <ul
                className={`mx-auto grid w-full list-none p-0 ${guestGridClass(detailCount)}`}
              >
                {guestDetails.map((detail, i) => (
                  <li
                    key={detail.id ?? `${detail.label}-${i}`}
                    className={itemBorders(i, detailCount)}
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                      {detail.label}
                    </p>
                    <p className="font-display mt-2.5 text-[clamp(1.2rem,2.2vw,1.55rem)] leading-snug text-[var(--ink)] [overflow-wrap:normal] [word-break:normal]">
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
              <div className="mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-[36rem]">
                <p className="mb-2.5 text-center text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  A note from us
                </p>
                <VideoBlock url={data.video_url} />
              </div>
            ) : null}

            <PhotosLink url={data.photos_url} variant="classic" />
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
        <div className="aspect-video overflow-hidden rounded-sm">
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
    <p className="text-center">
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
