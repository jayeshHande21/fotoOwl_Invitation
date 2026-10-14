import Link from "next/link";
import { notFound } from "next/navigation";
import TemplateViews from "@/components/templates/TemplateViews";
import { getInvitation } from "@/lib/api";
import { getTemplate, isTemplateId, type InvitationView } from "@/lib/templates";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;

  let invitation;
  try {
    invitation = await getInvitation(slug);
  } catch {
    notFound();
  }

  const templateId = isTemplateId(invitation.template_id)
    ? invitation.template_id
    : "classic";
  const template = getTemplate(templateId);

  const data: InvitationView = {
    couple_names: invitation.couple_names,
    wedding_date: invitation.wedding_date,
    location: invitation.location,
    venue_details: invitation.venue_details || "",
    video_url: invitation.video_url || "",
    message: invitation.message || "",
    extra_details: invitation.extra_details,
  };

  const isScrollTemplate =
    templateId === "classic" ||
    templateId === "garden" ||
    templateId === "modern" ||
    templateId === "celebration";

  if (isScrollTemplate) {
    return (
      <main className="h-svh overflow-hidden">
        <TemplateViews templateId={templateId} data={data} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <TemplateViews templateId={templateId} data={data} />
      <p className="pb-10 text-center text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--ink)]">
          FotoOwl · {template.name}
        </Link>
      </p>
    </main>
  );
}
