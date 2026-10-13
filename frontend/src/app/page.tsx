import Link from "next/link";
import InvitationForm from "@/components/InvitationForm";
import InvitationList from "@/components/InvitationList";
import { listInvitations } from "@/lib/api";

export const dynamic = "force-dynamic";

async function loadInvitations() {
  try {
    return await listInvitations();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const invitations = await loadInvitations();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <header className="mb-12 animate-fade-up">
        <p className="font-display text-4xl tracking-tight text-[var(--ink)] sm:text-5xl">
          FotoOwl
        </p>
        <h1 className="mt-3 max-w-xl text-lg text-[var(--muted)] sm:text-xl">
          Create a wedding invitation link with date, location, video, and any
          details your guests need.
        </h1>
      </header>

      <section className="animate-fade-up-delay mb-16 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="font-display mb-6 text-2xl text-[var(--ink)]">
          Invitation details
        </h2>
        <InvitationForm />
      </section>

      <section className="animate-fade-up-late">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl text-[var(--ink)]">
            Your invitations
          </h2>
          <Link
            href="#top"
            className="text-sm text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Back to form
          </Link>
        </div>
        <InvitationList items={invitations} />
      </section>
    </main>
  );
}
