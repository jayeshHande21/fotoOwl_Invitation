import Link from "next/link";
import type { Invitation } from "@/lib/api";
import RemoveInvitationButton from "@/components/RemoveInvitationButton";
import TemplateViews from "@/components/templates/TemplateViews";
import {
  getTemplate,
  isTemplateId,
  type InvitationView,
} from "@/lib/templates";

function toView(item: Invitation): InvitationView {
  return {
    couple_names: item.couple_names,
    wedding_date: item.wedding_date,
    location: item.location,
    venue_details: item.venue_details || "",
    video_url: item.video_url || "",
    message: item.message || "",
    extra_details: item.extra_details || [],
  };
}

function isPublished(item: Invitation) {
  return Boolean(
    item.couple_names?.trim() &&
      item.wedding_date?.trim() &&
      item.location?.trim(),
  );
}

export default function InvitationList({ items }: { items: Invitation[] }) {
  if (!items.length) {
    return (
      <p className="home-invite-empty">
        No invitations yet. Choose a template to get started.
      </p>
    );
  }

  return (
    <ul className="home-invite-list">
      {items.map((item, index) => {
        const templateId = isTemplateId(item.template_id)
          ? item.template_id
          : "classic";
        const template = getTemplate(templateId);
        const published = isPublished(item);

        return (
          <li
            key={item.id}
            className="home-invite-row"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="home-invite-thumb" aria-hidden>
              <div className="home-invite-thumb-inner">
                <TemplateViews
                  templateId={templateId}
                  data={toView(item)}
                  compact
                />
              </div>
            </div>

            <div className="home-invite-body">
              <div className="home-invite-title-row">
                <p className="font-display home-invite-names">
                  {item.couple_names}
                </p>
                <span
                  className={
                    published
                      ? "home-invite-badge home-invite-badge-live"
                      : "home-invite-badge home-invite-badge-draft"
                  }
                >
                  {published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="home-invite-meta">
                <span className="home-invite-template">{template.name}</span>
                <span aria-hidden>·</span>
                <span>{item.wedding_date}</span>
                <span aria-hidden>·</span>
                <span>{item.location}</span>
              </p>
            </div>

            <div className="home-invite-actions">
              <Link
                href={`/invite/${item.slug}`}
                className="home-invite-btn home-invite-btn-primary cursor-pointer"
              >
                View link
              </Link>
              <Link
                href={`/manage/${item.slug}`}
                className="home-invite-btn home-invite-btn-ghost cursor-pointer"
              >
                Manage
              </Link>
              <RemoveInvitationButton
                slug={item.slug}
                coupleNames={item.couple_names}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
