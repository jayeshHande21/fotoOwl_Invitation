import CelebrationTemplate from "@/components/templates/CelebrationTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import GardenTemplate from "@/components/templates/GardenTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
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
