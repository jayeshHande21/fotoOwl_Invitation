import BrandLogo from "@/components/BrandLogo";
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
    <main className="home-shell">
      <div className="home-aura" aria-hidden />
      <div className="home-frame">
        <header className="home-nav animate-fade-up">
          <BrandLogo priority />
          {invitations.length > 0 ? (
            <a href="#your-invitations" className="home-nav-chip cursor-pointer">
              <span>Invitations</span>
              <span className="home-nav-count">{invitations.length}</span>
            </a>
          ) : (
            <span className="home-nav-aside">Studio</span>
          )}
        </header>

        <section className="home-hero animate-fade-up">
          <h1 className="font-display home-lead">
            Invitation links guests will love.
          </h1>
          <p className="home-sub">
            Choose a template, preview it, then personalize.
          </p>
          <div className="home-hero-rule" aria-hidden>
            <span />
            <i />
            <span />
          </div>
        </section>

        <TemplateGallery />

        {invitations.length > 0 ? (
          <section
            id="your-invitations"
            className="home-invites animate-fade-up-late"
          >
            <div className="home-invites-head">
              <div>
                <h2 className="font-display home-invites-title">
                  Your invitations
                </h2>
                <p className="home-invites-sub">
                  Open, manage, or remove a link.
                </p>
              </div>
              <p className="home-invites-meta">
                {invitations.length}{" "}
                {invitations.length === 1 ? "invitation" : "invitations"}
              </p>
            </div>
            <InvitationList items={invitations} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
