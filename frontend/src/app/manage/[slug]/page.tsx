import Link from "next/link";
import { notFound } from "next/navigation";
import AddDetailForm from "@/components/AddDetailForm";
import { getInvitation } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ManagePage({ params }: Props) {
  const { slug } = await params;

  let invitation;
  try {
    invitation = await getInvitation(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14 sm:py-20">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← Back to portal
      </Link>

      <header className="mt-6 animate-fade-up">
        <p className="font-display text-4xl text-[var(--ink)]">
          {invitation.couple_names}
        </p>
        <p className="mt-2 text-[var(--muted)]">
          Manage invitation ·{" "}
          <Link
            href={`/invite/${invitation.slug}`}
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            /invite/{invitation.slug}
          </Link>
        </p>
      </header>

      <section className="animate-fade-up-delay mt-10 space-y-4 border-t border-[var(--line)] pt-8">
        <h2 className="font-display text-2xl text-[var(--ink)]">
          Current details
        </h2>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--muted)]">Date</dt>
            <dd className="mt-1 text-[var(--ink)]">{invitation.wedding_date}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Location</dt>
            <dd className="mt-1 text-[var(--ink)]">{invitation.location}</dd>
          </div>
          {invitation.venue_details ? (
            <div className="sm:col-span-2">
              <dt className="text-[var(--muted)]">Venue</dt>
              <dd className="mt-1 text-[var(--ink)]">
                {invitation.venue_details}
              </dd>
            </div>
          ) : null}
          {invitation.video_url ? (
            <div className="sm:col-span-2">
              <dt className="text-[var(--muted)]">Video</dt>
              <dd className="mt-1 break-all text-[var(--ink)]">
                {invitation.video_url}
              </dd>
            </div>
          ) : null}
        </dl>

        {invitation.extra_details.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {invitation.extra_details.map((detail) => (
              <li
                key={detail.id}
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-3"
              >
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  {detail.label}
                </p>
                <p className="mt-1 text-[var(--ink)]">{detail.value}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            No extra information yet.
          </p>
        )}
      </section>

      <section className="animate-fade-up-late mt-10 rounded-2xl border border-[var(--line)] bg-white p-6">
        <h2 className="font-display mb-4 text-2xl text-[var(--ink)]">
          Add new information
        </h2>
        <p className="mb-5 text-sm text-[var(--muted)]">
          Use this form whenever you want to add dress code, RSVP notes,
          schedule, or any other guest detail.
        </p>
        <AddDetailForm slug={invitation.slug} />
      </section>
    </main>
  );
}
