"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteInvitation } from "@/lib/api";

type Props = {
  slug: string;
  coupleNames: string;
};

export default function RemoveInvitationButton({ slug, coupleNames }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onRemove() {
    const ok = window.confirm(
      `Remove “${coupleNames}”? This deletes the invitation link permanently.`,
    );
    if (!ok) return;

    setError(null);
    startTransition(async () => {
      try {
        await deleteInvitation(slug);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not remove");
      }
    });
  }

  return (
    <span className="home-invite-remove-wrap">
      <button
        type="button"
        onClick={onRemove}
        disabled={pending}
        className="home-invite-btn home-invite-btn-danger cursor-pointer"
        aria-label={`Remove invitation for ${coupleNames}`}
      >
        {pending ? "Removing…" : "Remove"}
      </button>
      {error ? <span className="home-invite-remove-error">{error}</span> : null}
    </span>
  );
}
