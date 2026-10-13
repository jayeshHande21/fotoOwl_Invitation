import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvitation } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

function videoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;

  let invitation;
  try {
    invitation = await getInvitation(slug);
  } catch {
    notFound();
  }

  const embed = invitation.video_url
    ? videoEmbedUrl(invitation.video_url)
    : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#fff7ed_0%,_transparent_50%)]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-16 sm:py-24">
        <p className="animate-fade-up font-display text-center text-sm uppercase tracking-[0.35em] text-[var(--muted)]">
          You are invited
        </p>

        <h1 className="animate-fade-up-delay font-display mt-6 text-center text-5xl leading-tight text-[var(--ink)] sm:text-6xl">
          {invitation.couple_names}
        </h1>

        <p className="animate-fade-up-late mx-auto mt-6 max-w-md text-center text-lg text-[var(--muted)]">
          {invitation.message ||
            "Join us as we celebrate our wedding day together."}
        </p>

        <dl className="animate-fade-up-late mt-12 space-y-6 border-y border-[var(--line)] py-8">
          <div className="text-center">
            <dt className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Date
            </dt>
            <dd className="font-display mt-2 text-2xl text-[var(--ink)]">
              {invitation.wedding_date}
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Location
            </dt>
            <dd className="font-display mt-2 text-2xl text-[var(--ink)]">
              {invitation.location}
            </dd>
            {invitation.venue_details ? (
              <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--muted)]">
                {invitation.venue_details}
              </p>
            ) : null}
          </div>
        </dl>

        {invitation.extra_details.length > 0 ? (
          <ul className="mt-10 space-y-4">
            {invitation.extra_details.map((detail) => (
              <li key={detail.id} className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {detail.label}
                </p>
                <p className="mt-1 text-[var(--ink)]">{detail.value}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {embed ? (
          <div className="mt-12 overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-sm">
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
        ) : invitation.video_url ? (
          <p className="mt-10 text-center">
            <a
              href={invitation.video_url}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Watch video
            </a>
          </p>
        ) : null}

        <p className="mt-14 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)]">
            FotoOwl Invitation
          </Link>
        </p>
      </div>
    </main>
  );
}
