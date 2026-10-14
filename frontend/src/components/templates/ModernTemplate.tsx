"use client";

import type { CSSProperties } from "react";
import ModernPaperScene from "@/components/templates/ModernPaperScene";
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

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
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
        <ModernPaperScene compact />
        <div className="modern-compact relative z-10">
          <p className="modern-kicker">Wedding invitation</p>
          <h2 className="modern-compact-names font-display">{data.couple_names}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-invite modern-scroll">
      {/* 1 — Editorial cover */}
      <section className="modern-screen modern-screen-hero">
        <ModernPaperScene />
        <div className="modern-hero relative z-10">
          <p className="modern-fade modern-fade-1 modern-kicker">
            Wedding invitation
          </p>

          {names ? (
            <div className="modern-fade modern-fade-2 modern-names font-display">
              <h1>{names.left}</h1>
              <p className="modern-and font-script">and</p>
              <h1>{names.right}</h1>
            </div>
          ) : (
            <h1 className="modern-fade modern-fade-2 modern-names-solo font-display">
              {data.couple_names}
            </h1>
          )}

          <div className="modern-fade modern-fade-3 modern-rule" aria-hidden />

          <p className="modern-fade modern-fade-4 modern-meta">
            {parsed.day && parsed.month
              ? `${parsed.weekday ? `${parsed.weekday} · ` : ""}${parsed.day} ${parsed.month}${
                  parsed.year ? ` ${parsed.year}` : ""
                }`
              : data.wedding_date}
            <span className="modern-meta-sep" aria-hidden>
              ·
            </span>
            {data.location}
          </p>

          {data.message ? (
            <p className="modern-fade modern-fade-5 modern-msg">{data.message}</p>
          ) : null}

          <div className="modern-fade modern-fade-6 modern-scroll-cue">
            <span className="modern-scroll-line" aria-hidden />
            <p>Scroll</p>
          </div>
        </div>
      </section>

      {/* 2 — When & where */}
      <section className="modern-screen modern-screen-details">
        <ModernPaperScene soft />
        <div className="modern-sheet relative z-10">
          <p className="modern-kicker">When &amp; where</p>
          <div className="modern-details-grid">
            <article>
              <p className="modern-label">When</p>
              {parsed.weekday ? (
                <p className="modern-weekday">{parsed.weekday}</p>
              ) : null}
              <p className="modern-day font-display">
                {parsed.day && parsed.month
                  ? `${parsed.day} ${parsed.month}`
                  : data.wedding_date}
              </p>
              {parsed.year ? <p className="modern-sub">{parsed.year}</p> : null}
              {ceremony ? <p className="modern-sub">{ceremony}</p> : null}
            </article>
            <article>
              <p className="modern-label">Where</p>
              <p className="modern-place font-display">{data.location}</p>
              {venueOnly ? <p className="modern-sub">{venueOnly}</p> : null}
              {stayTravel.length > 0 ? (
                <ul className="modern-side-notes">
                  {stayTravel.map((d, i) => (
                    <li key={d.id ?? `${d.label}-${i}`}>
                      <em>{d.label}</em>
                      <span>{d.value}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </div>
          <div className="modern-scroll-cue">
            <span className="modern-scroll-line" aria-hidden />
            <p>Guest notes</p>
          </div>
        </div>
      </section>

      {/* 3 — Guest notes */}
      <section className="modern-screen modern-screen-notes">
        <ModernPaperScene soft />
        <div className="modern-sheet modern-sheet-notes relative z-10">
          <p className="modern-kicker">For our guests</p>
          <h2 className="modern-notes-title font-display">Details for the day</h2>
          {guestNotes.length > 0 ? (
            <ul className="modern-notes-list">
              {guestNotes.map((detail, i) => (
                <li
                  key={detail.id ?? `${detail.label}-${i}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  <p className="modern-label">{detail.label}</p>
                  <p className="modern-note-value font-display">{detail.value}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="modern-empty">
              Guest notes will appear here when you add them.
            </p>
          )}
          {data.video_url ? (
            <aside className="modern-cinema">
              <p className="modern-label">A note from us</p>
              <VideoBlock url={data.video_url} />
            </aside>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function VideoBlock({ url }: { url: string }) {
  const embed = videoEmbedUrl(url);
  if (isDirectVideo(url)) {
    return (
      <div className="modern-cinema-frame">
        <video
          className="modern-cinema-media"
          src={url}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }
  if (!embed) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="modern-link">
        Open video
      </a>
    );
  }
  const safe = embed.includes("?")
    ? `${embed}&rel=0&modestbranding=1`
    : `${embed}?rel=0&modestbranding=1`;
  return (
    <div className="modern-cinema-frame">
      <iframe
        src={safe}
        title="Wedding video"
        className="modern-cinema-media"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
