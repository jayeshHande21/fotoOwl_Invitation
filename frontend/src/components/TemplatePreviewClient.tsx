"use client";

import Link from "next/link";
import { useState } from "react";
import InviteCreatedToast from "@/components/InviteCreatedToast";
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
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const isScrollTemplate =
    template.id === "classic" ||
    template.id === "garden" ||
    template.id === "modern" ||
    template.id === "celebration";

  return (
    <div
      className={`relative ${isScrollTemplate ? "h-svh overflow-hidden" : "min-h-screen"}`}
    >
      <header className="absolute inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="template-preview-bar mx-auto flex max-w-5xl items-center gap-3 rounded-[var(--radius-md)] border border-[var(--line)] px-2.5 py-2 shadow-[var(--shadow-soft)] sm:gap-4 sm:px-3">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-[calc(var(--radius-sm)-2px)] px-2 py-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(182,111,91,0.35)]"
            aria-label="Back to templates"
          >
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5"
                aria-hidden
              >
                <path
                  d="M10 3.5 5.5 8 10 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="hidden sm:inline">Templates</span>
          </Link>

          <div
            className="hidden h-6 w-px shrink-0 bg-[var(--line)] sm:block"
            aria-hidden
          />

          <h1 className="min-w-0 flex-1 truncate font-display text-base leading-none text-[var(--ink)] sm:text-lg">
            {template.name}
          </h1>

          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="btn-primary shrink-0 !px-3.5 !py-2 text-sm sm:!px-4"
          >
            Update
          </button>
        </div>
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
        onCreated={setCreatedSlug}
      />

      <InviteCreatedToast
        slug={createdSlug}
        onDismiss={() => setCreatedSlug(null)}
      />
    </div>
  );
}
