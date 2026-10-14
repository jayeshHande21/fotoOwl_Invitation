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

  const isClassic = template.id === "classic";

  return (
    <div className={`relative ${isClassic ? "h-svh overflow-hidden" : "min-h-screen"}`}>
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0 rounded-md bg-white/80 px-2 py-1 backdrop-blur-md">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-[var(--ink)]"
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
          className="shrink-0 rounded-md border border-[var(--line)] bg-white/90 px-3 py-1.5 text-sm font-medium text-[var(--ink)] shadow-sm backdrop-blur-md transition hover:bg-white"
        >
          Update
        </button>
      </header>

      <div className={isClassic ? "h-full" : "animate-fade-up"}>
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
