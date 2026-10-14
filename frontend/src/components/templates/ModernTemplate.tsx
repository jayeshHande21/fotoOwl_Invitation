"use client";

import ModernLeafScene from "@/components/templates/ModernLeafScene";
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

const TRAVEL_STAY = /stay|hotel|accommodation|travel|shuttle|transport/i;

function splitNames(names: string) {
  const parts = names
    .split(/\s*&\s*|\s+and\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 2) return { left: parts[0], right: parts[1] };
  return null;
}

export default function ModernTemplate({ data, compact }: Props) {
  const names = splitNames(data.couple_names);
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

  if (compact) {
    return (
      <div className="modern-invite modern-invite-compact relative overflow-hidden">
        <ModernLeafScene compact />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end px-5 py-6">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#5c6658]">
            Wedding invitation
          </p>
          <h2 className="font-display mt-2 max-w-[12ch] text-[1.55rem] leading-[1.05] text-[#1f241c] break-words">
            {data.couple_names}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-invite modern-scroll">
      <section className="modern-screen modern-screen-hero">
        <ModernLeafScene intensity="hero" />

        <div className="modern-hero-panel relative z-10">
          <p className="modern-line modern-line-1 text-[0.68rem] uppercase tracking-[0.34em] text-[#5c6658]">
            Wedding invitation
          </p>

          {names ? (
            <div className="modern-line modern-line-2 mt-6 sm:mt-8">
              <h1 className="font-display text-[clamp(3rem,11vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-[#1f241c]">
                {names.left}
              </h1>
              <p className="modern-and font-display mt-1 text-[clamp(1.25rem,3vw,1.75rem)] text-[#6b7a64]">
                and
              </p>
              <h1 className="font-display mt-1 text-[clamp(3rem,11vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-[#1f241c]">
                {names.right}
              </h1>
            </div>
          ) : (
            <h1 className="modern-line modern-line-2 font-display mt-6 text-[clamp(2.8rem,10vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#1f241c] break-words sm:mt-6">
              {data.couple_names}
            </h1>
          )}

          <div className="modern-line modern-line-3 modern-rule mt-7 sm:mt-8" aria-hidden />

          {data.message ? (
            <p className="modern-line modern-line-4 mt-6 max-w-[22rem] text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-[#4a5446] sm:mt-7">
              {data.message}
            </p>
          ) : null}

          <div className="modern-line modern-line-5 mt-10 flex items-center gap-3 sm:mt-12">
            <span className="modern-scroll-bar" aria-hidden />
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#6b7566]">
              Scroll
            </p>
          </div>
        </div>
      </section>

      <section className="modern-screen modern-screen-details">
        <ModernLeafScene intensity="soft" />
        <div className="modern-content relative z-10 w-full max-w-5xl px-6 py-14 sm:px-10 lg:px-14">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#5c6658]">
            When &amp; where
          </p>
          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#7a8474]">
                When
              </p>
              {parsed.weekday ? (
                <p className="mt-4 text-[0.72rem] uppercase tracking-[0.3em] text-[#5c6658]">
                  {parsed.weekday}
                </p>
              ) : null}
              <p className="font-display mt-2 text-[clamp(3.5rem,10vw,6rem)] leading-none tracking-[-0.03em] text-[#1f241c]">
                {parsed.day ?? "—"}
              </p>
              {parsed.month ? (
                <p className="font-display mt-3 text-[clamp(1.4rem,3vw,1.9rem)] text-[#1f241c]">
                  {parsed.month}
                  {parsed.year ? ` ${parsed.year}` : ""}
                </p>
              ) : (
                <p className="font-display mt-3 text-xl text-[#1f241c]">
                  {data.wedding_date}
                </p>
              )}
              {ceremony ? (
                <p className="mt-4 text-[1.05rem] text-[#4a5446]">{ceremony}</p>
              ) : null}
            </div>
            <div className="border-t border-[#1f241c]/12 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#7a8474]">
                Where
              </p>
              <p className="font-display mt-4 text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-[#1f241c]">
                {data.location}
              </p>
              {venueOnly ? (
                <p className="mt-3 text-[1.05rem] text-[#4a5446]">{venueOnly}</p>
              ) : null}
              {stayTravel.length > 0 ? (
                <ul className="mt-8 space-y-5 list-none p-0">
                  {stayTravel.map((d, i) => (
                    <li key={d.id ?? `${d.label}-${i}`}>
                      <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#7a8474]">
                        {d.label}
                      </p>
                      <p className="font-display mt-1.5 text-lg text-[#1f241c]">
                        {d.value}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="mt-14 flex items-center gap-3">
            <span className="modern-scroll-bar" aria-hidden />
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#6b7566]">
              Guest notes
            </p>
          </div>
        </div>
      </section>

      <section className="modern-screen modern-screen-notes">
        <ModernLeafScene intensity="soft" />
        <div className="modern-content relative z-10 w-full max-w-5xl px-6 py-14 sm:px-10 lg:px-14">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#5c6658]">
            For our guests
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1f241c]">
            Details for the day
          </h2>
          {guestNotes.length > 0 ? (
            <ul className="modern-guest-grid mt-10 grid list-none gap-0 p-0 sm:mt-12">
              {guestNotes.map((detail, i) => (
                <li
                  key={detail.id ?? `${detail.label}-${i}`}
                  className="modern-guest-cell border-t border-[#1f241c]/10 py-6 sm:border-t-0"
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#7a8474]">
                    {detail.label}
                  </p>
                  <p className="font-display mt-2 text-[clamp(1.2rem,2.4vw,1.55rem)] leading-snug text-[#1f241c]">
                    {detail.value}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-[#6b7566]">
              Guest notes will appear here when you add them.
            </p>
          )}
          {data.video_url ? (
            <div className="mt-10 max-w-md">
              <p className="mb-3 text-[0.6rem] uppercase tracking-[0.24em] text-[#7a8474]">
                A note from us
              </p>
              <VideoBlock url={data.video_url} />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function VideoBlock({ url }: { url: string }) {
  const embed = videoEmbedUrl(url);
  if (!embed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-[#3d4a38] underline-offset-4 hover:underline"
      >
        Watch video
      </a>
    );
  }
  return (
    <div className="aspect-video overflow-hidden border border-[#1f241c]/10 bg-white/40 backdrop-blur-sm">
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
