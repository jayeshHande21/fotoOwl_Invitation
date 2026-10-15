"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import ModernFloralScene from "@/components/templates/ModernFloralScene";
import ModernPaperScene from "@/components/templates/ModernPaperScene";
import PhotosLink from "@/components/templates/PhotosLink";
import type { InvitationView } from "@/lib/templates";
import { videoEmbedUrl } from "@/lib/video";
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

function initials(names: string) {
  return names
    .split(/\s*&\s*|\s+and\s+/i)
    .map((part) => part.trim().charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, 2);
}

function clockTime(value: string) {
  return value.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i)?.[1] ?? null;
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function findDetail(data: InvitationView, ...labels: string[]) {
  const lower = labels.map((label) => label.toLowerCase());
  return data.extra_details.find((detail) =>
    lower.some((label) => detail.label.toLowerCase().includes(label)),
  );
}

export default function ModernTemplate({ data, compact }: Props) {
  const names = splitNames(data.couple_names);
  const marks = initials(data.couple_names);
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
  const reception = findDetail(data, "reception");
  const travel = findDetail(data, "travel", "shuttle", "transport");
  const countdown = useCountdown(data.wedding_date, data.venue_details);

  const mapsUrl = buildMapsUrl(venueOnly, data.location);

  const schedule = useMemo(() => {
    const items: { label: string; value: string }[] = [];
    if (ceremony) {
      items.push({
        label: "Ceremony",
        value: clockTime(ceremony) ?? ceremony,
      });
    }
    if (reception?.value) {
      items.push({
        label: "Reception",
        value: clockTime(reception.value) ?? reception.value,
      });
    }
    if (travel?.value) {
      const time = clockTime(travel.value);
      items.push({
        label: "Shuttle",
        value: time ? `From ${time}` : travel.value,
      });
    }
    return items;
  }, [ceremony, reception, travel]);

  if (compact) {
    return (
      <div className="modern-invite modern-invite-compact relative overflow-hidden">
        <ModernPaperScene compact />
        <ModernFloralScene compact />
        <div className="modern-compact relative z-10">
          <p className="modern-kicker">You&apos;re invited</p>
          <h2 className="modern-compact-names font-display">{data.couple_names}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-invite modern-scroll">
      <section className="modern-screen modern-screen-hero">
        <ModernPaperScene />
        <ModernFloralScene scene="hero" />
        <div className="modern-hero relative z-10">
          <div className="modern-fade modern-fade-1 modern-rule modern-rule-top" aria-hidden>
            <span />
            <i />
            <span />
          </div>

          <div className="modern-fade modern-fade-1 modern-mention">
            <p className="modern-mention-you">You&apos;re</p>
            <p className="modern-mention-script font-script">cordially</p>
            <p className="modern-mention-invited">Invited</p>
          </div>

          {marks.length > 0 ? (
            <div className="modern-fade modern-fade-2 modern-monogram-row" aria-hidden>
              <span className="modern-rule-arm" />
              <p className="modern-monogram">{marks.join("  ·  ")}</p>
              <span className="modern-rule-arm" />
            </div>
          ) : null}

          {names ? (
            <div className="modern-fade modern-fade-3 modern-names font-display">
              <h1>{names.left}</h1>
              <p className="modern-and font-script">and</p>
              <h1>{names.right}</h1>
            </div>
          ) : (
            <h1 className="modern-fade modern-fade-3 modern-names-solo font-display">
              {data.couple_names}
            </h1>
          )}

          <div className="modern-fade modern-fade-4 modern-ornament" aria-hidden>
            <span />
            <span className="modern-ornament-gem" />
            <span />
          </div>

          {data.message ? (
            <p className="modern-fade modern-fade-5 modern-msg">{data.message}</p>
          ) : null}

          <div className="modern-fade modern-fade-6 modern-scroll-cue">
            <span className="modern-scroll-line" aria-hidden />
            <p>Scroll</p>
          </div>
        </div>
      </section>

      <section className="modern-screen modern-screen-details">
        <ModernPaperScene soft />
        <ModernFloralScene scene="details" />
        <div className="modern-sheet relative z-10">
          <p className="modern-kicker">When &amp; where</p>
          <div className="modern-details-grid">
            <article>
              <p className="modern-label">When</p>
              {parsed.weekday ? (
                <p className="modern-weekday">{parsed.weekday}</p>
              ) : null}
              <div className="modern-date-lockup">
                {parsed.day ? (
                  <p className="modern-day font-display">{parsed.day}</p>
                ) : (
                  <p className="modern-day modern-day-raw font-display">
                    {data.wedding_date}
                  </p>
                )}
                {parsed.month ? (
                  <div>
                    <p className="modern-month font-display">{parsed.month}</p>
                    {parsed.year ? <p className="modern-sub">{parsed.year}</p> : null}
                  </div>
                ) : null}
              </div>
              {ceremony ? <p className="modern-sub modern-ceremony">{ceremony}</p> : null}
              {countdown && !countdown.done ? (
                <div className="modern-count">
                  <CountTile value={countdown.days} label="Days" />
                  <CountTile value={countdown.hours} label="Hours" />
                  <CountTile value={countdown.minutes} label="Mins" />
                </div>
              ) : null}
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
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="modern-map"
                >
                  View on map
                </a>
              ) : null}
            </article>
          </div>

          {schedule.length > 0 ? (
            <div className="modern-schedule">
              <p className="modern-label">Day schedule</p>
              <ul>
                {schedule.map((item) => (
                  <li key={item.label}>
                    <p className="modern-label">{item.label}</p>
                    <p className="font-display">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="modern-scroll-cue">
            <span className="modern-scroll-line" aria-hidden />
            <p>Guest notes</p>
          </div>
        </div>
      </section>

      <section className="modern-screen modern-screen-notes">
        <ModernPaperScene soft />
        <ModernFloralScene scene="notes" />
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
          <PhotosLink url={data.photos_url} variant="modern" />
        </div>
      </section>
    </div>
  );
}

function useCountdown(weddingDate: string, venueDetails: string) {
  const eventDate = useMemo(
    () => buildEventDate(weddingDate, venueDetails),
    [weddingDate, venueDetails],
  );
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

  return countdown;
}

function CountTile({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <strong className="font-display">{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
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
