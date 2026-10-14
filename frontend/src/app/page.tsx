import TemplateGallery from "@/components/TemplateGallery";
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
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
      <header className="mb-12 animate-fade-up">
        <p className="font-display text-4xl tracking-tight text-[var(--ink)] sm:text-5xl">
          FotoOwl
        </p>
        <h1 className="mt-3 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
          Start with a template, preview it, then update the details for your
          wedding invitation link.
        </h1>
      </header>

      <TemplateGallery />

      {invitations.length > 0 ? (
        <section className="animate-fade-up-late mt-16 border-t border-[var(--line)] pt-10">
          <h2 className="font-display mb-4 text-2xl text-[var(--ink)]">
            Your invitations
          </h2>
          <InvitationList items={invitations} />
        </section>
      ) : null}
    </main>
  );
}
