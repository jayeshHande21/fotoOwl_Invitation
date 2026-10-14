"use client";

import CelebrationHeroCover from "@/components/templates/CelebrationHeroCover";
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

export default function CelebrationTemplate({ data, compact }: Props) {
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
      <div className="celeb-invite celeb-invite-compact relative overflow-hidden">
        <CelebrationHeroCover
          coupleNames={data.couple_names}
          message={data.message}
          compact
        />
      </div>
    );
  }

  return (
    <div className="celeb-invite celeb-scroll">
      {/* 1 — Envelope cover */}
      <section className="celeb-screen celeb-screen-cover">
        <CelebrationHeroCover
          coupleNames={data.couple_names}
          message={data.message}
        />
      </section>

      {/* 2 — When & where */}
      <section className="celeb-screen celeb-screen-details">
        <div className="celeb-paper-bg" aria-hidden />
        <div className="celeb-panel">
          <p className="celeb-eyebrow">Save the date</p>
          <div className="celeb-split">
            <div className="celeb-col">
              <p className="celeb-label">When</p>
              {parsed.weekday ? (
                <p className="celeb-weekday">{parsed.weekday}</p>
              ) : null}
              <p className="celeb-day">{parsed.day ?? "—"}</p>
              {parsed.month ? (
                <p className="celeb-month">
                  {parsed.month}
                  {parsed.year ? ` ${parsed.year}` : ""}
                </p>
              ) : (
                <p className="celeb-month">{data.wedding_date}</p>
              )}
              {ceremony ? <p className="celeb-ceremony">{ceremony}</p> : null}
            </div>

            <div className="celeb-divider" aria-hidden />

            <div className="celeb-col">
              <p className="celeb-label">Where</p>
              <p className="celeb-place">{data.location}</p>
              {venueOnly ? <p className="celeb-venue">{venueOnly}</p> : null}
              {stayTravel.length > 0 ? (
                <ul className="celeb-mini-list">
                  {stayTravel.map((d, i) => (
                    <li key={d.id ?? `${d.label}-${i}`}>
                      <span>{d.label}</span>
                      <strong>{d.value}</strong>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="celeb-continue">
            <span className="celeb-scroll-bar" aria-hidden />
            <p>Guest notes</p>
          </div>
        </div>
      </section>

      {/* 3 — Guests */}
      <section className="celeb-screen celeb-screen-notes">
        <div className="celeb-paper-bg" aria-hidden />
        <div className="celeb-panel celeb-panel-wide">
          <p className="celeb-eyebrow">For our guests</p>
          <h2 className="celeb-section-title">Details for the day</h2>

          {guestNotes.length > 0 ? (
            <ul
              className={`celeb-guest-grid celeb-guest-${
                guestNotes.length <= 1
                  ? "1"
                  : guestNotes.length === 2
                    ? "2"
                    : guestNotes.length === 3
                      ? "3"
                      : "4"
              }`}
            >
              {guestNotes.map((detail, i) => (
                <li key={detail.id ?? `${detail.label}-${i}`}>
                  <p className="celeb-label">{detail.label}</p>
                  <p className="celeb-guest-value">{detail.value}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="celeb-empty">
              Guest notes will appear here when you add them.
            </p>
          )}

          {data.video_url ? (
            <div className="celeb-video">
              <p className="celeb-label">A note from us</p>
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
      <a href={url} target="_blank" rel="noreferrer" className="celeb-link">
        Watch video
      </a>
    );
  }
  return (
    <div className="celeb-video-frame">
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
