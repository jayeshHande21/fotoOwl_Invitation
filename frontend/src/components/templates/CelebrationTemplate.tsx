"use client";

import CelebrationHeroCover from "@/components/templates/CelebrationHeroCover";
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

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 108C28 88 42 72 62 58C78 46 96 36 112 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M22 90C36 82 48 78 62 78C52 68 48 54 50 40"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse
        cx="68"
        cy="54"
        rx="10"
        ry="6"
        fill="currentColor"
        opacity="0.28"
        transform="rotate(-30 68 54)"
      />
      <ellipse
        cx="88"
        cy="40"
        rx="9"
        ry="5.5"
        fill="currentColor"
        opacity="0.24"
        transform="rotate(-15 88 40)"
      />
      <ellipse
        cx="48"
        cy="72"
        rx="8"
        ry="5"
        fill="currentColor"
        opacity="0.22"
        transform="rotate(-40 48 72)"
      />
    </svg>
  );
}

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
  const mapsUrl = buildMapsUrl(venueOnly, data.location);

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
      {/* 1 — Envelope cover (featured animation) */}
      <section className="celeb-screen celeb-screen-cover">
        <CelebrationHeroCover
          coupleNames={data.couple_names}
          message={data.message}
        />
      </section>

      {/* 2 — Deep burgundy letter page (not a boxed split) */}
      <section className="celeb-screen celeb-screen-letter">
        <div className="celeb-letter-wash" aria-hidden />
        <FloralCorner className="celeb-floral celeb-floral-tl" />
        <FloralCorner className="celeb-floral celeb-floral-br" />

        <div className="celeb-letter">
          <p className="celeb-letter-script">Save the date</p>

          <div className="celeb-letter-block">
            <p className="celeb-letter-kicker">The celebration begins</p>
            {parsed.weekday ? (
              <p className="celeb-letter-weekday">{parsed.weekday}</p>
            ) : null}
            <p className="celeb-letter-day">
              {parsed.day && parsed.month
                ? `${parsed.day} ${parsed.month}`
                : data.wedding_date}
            </p>
            {parsed.year ? (
              <p className="celeb-letter-year">{parsed.year}</p>
            ) : null}
            {ceremony ? (
              <p className="celeb-letter-time">{ceremony}</p>
            ) : null}
          </div>

          <div className="celeb-letter-rule" aria-hidden>
            <span />
            <i />
            <span />
          </div>

          <div className="celeb-letter-block">
            <p className="celeb-letter-kicker">We gather at</p>
            <p className="celeb-letter-place">{data.location}</p>
            {venueOnly ? (
              <p className="celeb-letter-venue">{venueOnly}</p>
            ) : null}
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="celeb-map-link"
              >
                View on map
              </a>
            ) : null}
          </div>

          {stayTravel.length > 0 ? (
            <ul className="celeb-letter-notes">
              {stayTravel.map((d, i) => (
                <li key={d.id ?? `${d.label}-${i}`}>
                  <em>{d.label}</em>
                  <span>{d.value}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="celeb-letter-foot">
            <span className="celeb-scroll-bar celeb-scroll-bar-light" aria-hidden />
            <p>Continue</p>
          </div>
        </div>
      </section>

      {/* 3 — Cream ribbon list (no card grid) */}
      <section className="celeb-screen celeb-screen-ribbon">
        <div className="celeb-ribbon-bg" aria-hidden />
        <div className="celeb-ribbon-accent" aria-hidden />
        <FloralCorner className="celeb-floral celeb-floral-ink celeb-floral-tr" />

        <div className="celeb-ribbon">
          <p className="celeb-ribbon-script">For our guests</p>
          <p className="celeb-ribbon-lead">
            A few notes as you prepare for the day
          </p>

          {guestNotes.length > 0 ? (
            <ol className="celeb-ribbon-list">
              {guestNotes.map((detail, i) => (
                <li key={detail.id ?? `${detail.label}-${i}`}>
                  <span className="celeb-ribbon-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="celeb-ribbon-copy">
                    <p className="celeb-ribbon-label">{detail.label}</p>
                    <p className="celeb-ribbon-value">{detail.value}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="celeb-ribbon-empty">
              Guest notes will appear here when you add them.
            </p>
          )}

          {data.video_url ? (
            <div className="celeb-ribbon-video">
              <p className="celeb-ribbon-label">A note from us</p>
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
