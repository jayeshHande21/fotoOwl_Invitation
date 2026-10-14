import Link from "next/link";
import type { Invitation } from "@/lib/api";
import { getTemplate } from "@/lib/templates";

export default function InvitationList({ items }: { items: Invitation[] }) {
  if (!items.length) {
    return (
      <p className="text-[var(--muted)]">
        No invitations yet. Choose a template to get started.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[var(--line)]">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl text-[var(--ink)]">
              {item.couple_names}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {getTemplate(item.template_id || "classic").name} ·{" "}
              {item.wedding_date} · {item.location}
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href={`/invite/${item.slug}`}
              className="text-[var(--accent)] underline-offset-4 hover:underline"
            >
              View link
            </Link>
            <Link
              href={`/manage/${item.slug}`}
              className="text-[var(--muted)] underline-offset-4 hover:underline"
            >
              Manage
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
