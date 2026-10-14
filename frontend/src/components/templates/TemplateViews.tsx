import ClassicTemplate from "@/components/templates/ClassicTemplate";
import type { InvitationView, TemplateId } from "@/lib/templates";
import { videoEmbedUrl } from "@/lib/video";

type Props = {
  templateId: TemplateId;
  data: InvitationView;
  compact?: boolean;
};

export default function TemplateViews({ templateId, data, compact }: Props) {
  switch (templateId) {
    case "garden":
      return <GardenTemplate data={data} compact={compact} />;
    case "modern":
      return <ModernTemplate data={data} compact={compact} />;
    case "celebration":
      return <CelebrationTemplate data={data} compact={compact} />;
    case "classic":
    default:
      return <ClassicTemplate data={data} compact={compact} />;
  }
}

function VideoBlock({ url, compact }: { url: string; compact?: boolean }) {
  if (!url || compact) return null;
  const embed = videoEmbedUrl(url);
  if (embed) {
    return (
      <div className="mt-10 overflow-hidden rounded-xl border border-[var(--line)] bg-white">
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

function ExtraList({
  items,
  className = "text-center",
}: {
  items: InvitationView["extra_details"];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul className={`mt-8 space-y-3 ${className}`}>
      {items.map((detail, i) => (
        <li key={detail.id ?? `${detail.label}-${i}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {detail.label}
          </p>
          <p className="mt-1 text-[var(--ink)]">{detail.value}</p>
        </li>
      ))}
    </ul>
  );
}

function GardenTemplate({
  data,
  compact,
}: {
  data: InvitationView;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#fbfcf9] ${
        compact ? "min-h-[280px] p-5" : "min-h-full px-6 py-16 sm:py-24"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-8 bottom-8 rounded-[2rem] border border-[#d7e3d4]"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <p
          className={`tracking-[0.3em] text-[#4d7c5a] uppercase ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          Together with their families
        </p>
        <h1
          className={`font-display mt-4 text-[#243528] ${
            compact ? "text-2xl" : "mt-6 text-5xl sm:text-6xl"
          }`}
        >
          {data.couple_names}
        </h1>
        <div
          aria-hidden
          className={`mx-auto my-4 h-px w-16 bg-[#4d7c5a]/40 ${
            compact ? "my-3" : "my-8 w-24"
          }`}
        />
        {!compact && data.message ? (
          <p className="mx-auto max-w-md text-[#5f6f61]">{data.message}</p>
        ) : null}
        <p
          className={`font-display text-[#243528] ${
            compact ? "mt-3 text-base" : "mt-10 text-2xl"
          }`}
        >
          {data.wedding_date}
        </p>
        <p className={`text-[#5f6f61] ${compact ? "mt-1 text-sm" : "mt-2 text-lg"}`}>
          {data.location}
        </p>
        {!compact && data.venue_details ? (
          <p className="mt-2 text-sm text-[#5f6f61]">{data.venue_details}</p>
        ) : null}
        {!compact ? (
          <ExtraList
            items={data.extra_details}
            className="text-center [&_p]:text-[#5f6f61] [&_p:last-child]:text-[#243528]"
          />
        ) : null}
        <VideoBlock url={data.video_url} compact={compact} />
      </div>
    </div>
  );
}

function ModernTemplate({
  data,
  compact,
}: {
  data: InvitationView;
  compact?: boolean;
}) {
  return (
    <div
      className={`bg-white ${
        compact ? "min-h-[280px] p-5" : "min-h-full px-6 py-14 sm:px-10 sm:py-20"
      }`}
    >
      <div className={`mx-auto ${compact ? "" : "max-w-3xl"}`}>
        <div className="flex items-start justify-between gap-4 border-b border-[var(--ink)] pb-4">
          <p
            className={`uppercase tracking-[0.25em] text-[var(--muted)] ${
              compact ? "text-[10px]" : "text-xs"
            }`}
          >
            Wedding invitation
          </p>
          <p
            className={`text-right font-display text-[var(--ink)] ${
              compact ? "text-sm" : "text-lg"
            }`}
          >
            {data.wedding_date}
          </p>
        </div>
        <h1
          className={`font-display mt-6 leading-[0.95] text-[var(--ink)] ${
            compact ? "text-3xl" : "mt-10 text-6xl sm:text-7xl"
          }`}
        >
          {data.couple_names}
        </h1>
        {!compact && data.message ? (
          <p className="mt-6 max-w-lg text-lg text-[var(--muted)]">{data.message}</p>
        ) : null}
        <div
          className={`grid gap-4 border-t border-[var(--line)] ${
            compact ? "mt-5 pt-4" : "mt-12 grid-cols-2 gap-8 pt-8"
          }`}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              Location
            </p>
            <p
              className={`mt-1 font-display text-[var(--ink)] ${
                compact ? "text-base" : "text-2xl"
              }`}
            >
              {data.location}
            </p>
            {!compact && data.venue_details ? (
              <p className="mt-2 text-sm text-[var(--muted)]">{data.venue_details}</p>
            ) : null}
          </div>
          {!compact && data.extra_details[0] ? (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {data.extra_details[0].label}
              </p>
              <p className="mt-1 font-display text-2xl text-[var(--ink)]">
                {data.extra_details[0].value}
              </p>
            </div>
          ) : null}
        </div>
        {!compact ? (
          <ExtraList
            items={data.extra_details.slice(1)}
            className="mt-8 grid gap-4 text-left sm:grid-cols-2"
          />
        ) : null}
        <VideoBlock url={data.video_url} compact={compact} />
      </div>
    </div>
  );
}

function CelebrationTemplate({
  data,
  compact,
}: {
  data: InvitationView;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-white ${
        compact ? "min-h-[280px] p-5" : "min-h-full px-6 py-16 sm:py-24"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#fff1e8]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#f5f5f4]"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <span
          className={`inline-block rounded-full bg-[#fff7ed] px-3 py-1 font-medium text-[#9a3412] ${
            compact ? "text-[10px]" : "text-xs tracking-wide"
          }`}
        >
          Celebrate with us
        </span>
        <h1
          className={`font-display mt-5 text-[var(--ink)] ${
            compact ? "text-2xl" : "mt-8 text-5xl sm:text-6xl"
          }`}
        >
          {data.couple_names}
        </h1>
        {!compact && data.message ? (
          <p className="mx-auto mt-5 max-w-md text-[var(--muted)]">{data.message}</p>
        ) : null}
        <div
          className={`mx-auto mt-6 rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-4 ${
            compact ? "mt-4" : "mt-10 max-w-md px-6 py-6"
          }`}
        >
          <p
            className={`font-display text-[var(--ink)] ${
              compact ? "text-base" : "text-2xl"
            }`}
          >
            {data.wedding_date}
          </p>
          <p className={`mt-1 text-[var(--muted)] ${compact ? "text-sm" : "text-base"}`}>
            {data.location}
          </p>
          {!compact && data.venue_details ? (
            <p className="mt-2 text-sm text-[var(--muted)]">{data.venue_details}</p>
          ) : null}
        </div>
        {!compact ? <ExtraList items={data.extra_details} /> : null}
        <VideoBlock url={data.video_url} compact={compact} />
      </div>
    </div>
  );
}
