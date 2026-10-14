"use client";

import Link from "next/link";
import { useState } from "react";
import TemplateViews from "@/components/templates/TemplateViews";
import UpdateFormPanel from "@/components/UpdateFormPanel";
import {
  SAMPLE_INVITATION,
  type InvitationView,
  type TemplateId,
  type TemplateMeta,
} from "@/lib/templates";

type Props = {
  template: TemplateMeta;
};

export default function TemplatePreviewClient({ template }: Props) {
  const [values, setValues] = useState<InvitationView>(SAMPLE_INVITATION);
  const [formOpen, setFormOpen] = useState(false);

  const isScrollTemplate =
    template.id === "classic" ||
    template.id === "garden" ||
    template.id === "modern" ||
    template.id === "celebration";

  return (
    <div
      className={`relative ${isScrollTemplate ? "h-svh overflow-hidden" : "min-h-screen"}`}
    >
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 shadow-[var(--shadow-soft)]">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            ← Templates
          </Link>
          <p className="truncate font-display text-lg text-[var(--ink)] sm:text-xl">
            {template.name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="btn-secondary shrink-0 !px-3 !py-1.5 text-sm"
        >
          Update
        </button>
      </header>

      <div className={isScrollTemplate ? "h-full" : "animate-fade-up"}>
        <TemplateViews templateId={template.id as TemplateId} data={values} />
      </div>

      <UpdateFormPanel
        open={formOpen}
        onClose={() => setFormOpen(false)}
        templateId={template.id as TemplateId}
        values={values}
        onChange={setValues}
      />
    </div>
  );
}
