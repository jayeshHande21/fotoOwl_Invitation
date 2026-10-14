"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createInvitation } from "@/lib/api";
import type { InvitationView, TemplateId } from "@/lib/templates";

type ExtraRow = { label: string; value: string };

type Props = {
  open: boolean;
  onClose: () => void;
  templateId: TemplateId;
  values: InvitationView;
  onChange: (values: InvitationView) => void;
};

const emptyExtra = (): ExtraRow => ({ label: "", value: "" });

export default function UpdateFormPanel({
  open,
  onClose,
  templateId,
  values,
  onChange,
}: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function update<K extends keyof InvitationView>(key: K, value: InvitationView[K]) {
    onChange({ ...values, [key]: value });
  }

  const extras: ExtraRow[] =
    values.extra_details.length > 0
      ? values.extra_details.map(({ label, value }) => ({ label, value }))
      : [emptyExtra()];

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const invitation = await createInvitation({
        template_id: templateId,
        couple_names: values.couple_names,
        wedding_date: values.wedding_date,
        location: values.location,
        venue_details: values.venue_details || undefined,
        video_url: values.video_url || undefined,
        message: values.message || undefined,
        slug: slug || undefined,
        extra_details: extras.filter((row) => row.label && row.value),
      });
      router.push(`/invite/${invitation.slug}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[var(--ink)]/20 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[var(--line)] bg-white shadow-[-12px_0_40px_rgba(28,25,23,0.08)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div>
            <p className="font-display text-xl text-[var(--ink)]">Update details</p>
            <p className="text-sm text-[var(--muted)]">
              Changes appear on the template as you type.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--background-soft)] hover:text-[var(--ink)]"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex-1 space-y-5 overflow-y-auto px-5 py-5"
        >
          <Field label="Couple names" required>
            <input
              required
              value={values.couple_names}
              onChange={(e) => update("couple_names", e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label="Wedding date" required>
            <input
              required
              value={values.wedding_date}
              onChange={(e) => update("wedding_date", e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label="Location" required>
            <input
              required
              value={values.location}
              onChange={(e) => update("location", e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label="Venue details">
            <textarea
              value={values.venue_details}
              onChange={(e) => update("venue_details", e.target.value)}
              rows={2}
              className="field-input resize-y"
            />
          </Field>
          <Field label="Video reference URL">
            <input
              type="url"
              value={values.video_url}
              onChange={(e) => update("video_url", e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label="Invitation message">
            <textarea
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              rows={3}
              className="field-input resize-y"
            />
          </Field>
          <Field label="Custom link slug (optional)">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="aanya-rohan"
              className="field-input"
            />
          </Field>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--ink)]">
                Additional information
              </p>
              <button
                type="button"
                onClick={() =>
                  update("extra_details", [
                    ...extras,
                    emptyExtra(),
                  ])
                }
                className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Add field
              </button>
            </div>
            {extras.map((row, index) => (
              <div key={index} className="grid gap-2">
                <input
                  value={row.label}
                  onChange={(e) => {
                    const next = extras.map((r, i) =>
                      i === index ? { ...r, label: e.target.value } : r
                    );
                    update("extra_details", next);
                  }}
                  placeholder="Label"
                  className="field-input"
                />
                <input
                  value={row.value}
                  onChange={(e) => {
                    const next = extras.map((r, i) =>
                      i === index ? { ...r, value: e.target.value } : r
                    );
                    update("extra_details", next);
                  }}
                  placeholder="Value"
                  className="field-input"
                />
              </div>
            ))}
          </div>

          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Saving…" : "Create invitation link"}
          </button>
        </form>
      </aside>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[var(--ink)]">
        {label}
        {required ? <span className="text-[var(--accent)]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
