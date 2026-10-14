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
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    if (values.video_url || slug) setShowOptional(true);
  }, [open, values.video_url, slug]);

  function update<K extends keyof InvitationView>(key: K, value: InvitationView[K]) {
    onChange({ ...values, [key]: value });
  }

  const extras: ExtraRow[] =
    values.extra_details.length > 0
      ? values.extra_details.map(({ label, value }) => ({ label, value }))
      : [emptyExtra()];

  function setExtras(next: ExtraRow[]) {
    update("extra_details", next);
  }

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
        className={`fixed inset-0 z-40 bg-[var(--ink)]/25 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[var(--line)] bg-[#fafaf9] shadow-[-16px_0_48px_rgba(28,25,23,0.1)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-labelledby="update-form-title"
      >
        <div className="shrink-0 border-b border-[var(--line)] bg-white px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                id="update-form-title"
                className="font-display text-2xl text-[var(--ink)]"
              >
                Update details
              </p>
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                Edit a few sections — the preview updates live.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2.5 py-1.5 text-sm text-[var(--muted)] hover:bg-[var(--background-soft)] hover:text-[var(--ink)]"
            >
              Close
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
            <Section
              step="1"
              title="Who"
              hint="Names shown on the invitation"
            >
              <Field label="Couple names" required hint='e.g. Aanya & Rohan'>
                <input
                  required
                  value={values.couple_names}
                  onChange={(e) => update("couple_names", e.target.value)}
                  className="field-input"
                  placeholder="Aanya & Rohan"
                />
              </Field>
              <Field label="Invitation message" hint="Short welcome line">
                <textarea
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={2}
                  className="field-input resize-none"
                  placeholder="With joy in our hearts…"
                />
              </Field>
            </Section>

            <Section
              step="2"
              title="When & where"
              hint="Date, city, and venue"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Wedding date" required hint="As you want it written">
                  <input
                    required
                    value={values.wedding_date}
                    onChange={(e) => update("wedding_date", e.target.value)}
                    className="field-input"
                    placeholder="Saturday, 12 December 2026"
                  />
                </Field>
                <Field label="City / location" required>
                  <input
                    required
                    value={values.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="field-input"
                    placeholder="Jaipur, Rajasthan"
                  />
                </Field>
              </div>
              <Field
                label="Venue"
                hint="Venue name and ceremony time"
              >
                <input
                  value={values.venue_details}
                  onChange={(e) => update("venue_details", e.target.value)}
                  className="field-input"
                  placeholder="The Leela Palace · Ceremony at 5:00 PM"
                />
              </Field>
            </Section>

            <Section
              step="3"
              title="Guest notes"
              hint="Dress code, stay, travel — each note has a title and a short line"
            >
              <div className="space-y-3">
                {extras.map((row, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-[var(--line)] bg-white p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                        Note {index + 1}
                      </p>
                      {extras.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExtras(extras.filter((_, i) => i !== index))
                          }
                          className="text-xs text-[var(--muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
                      <label className="block space-y-1">
                        <span className="text-xs text-[var(--muted)]">Title</span>
                        <input
                          value={row.label}
                          onChange={(e) => {
                            const next = extras.map((r, i) =>
                              i === index ? { ...r, label: e.target.value } : r,
                            );
                            setExtras(next);
                          }}
                          placeholder="Dress code"
                          className="field-input"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="text-xs text-[var(--muted)]">Details</span>
                        <input
                          value={row.value}
                          onChange={(e) => {
                            const next = extras.map((r, i) =>
                              i === index ? { ...r, value: e.target.value } : r,
                            );
                            setExtras(next);
                          }}
                          placeholder="Festive attire"
                          className="field-input"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setExtras([...extras, emptyExtra()])}
                className="mt-1 text-sm font-medium text-[var(--ink)] underline-offset-4 hover:underline"
              >
                + Add another note
              </button>
            </Section>

            <Section
              step="4"
              title="Optional"
              hint="Video and custom link — only if you need them"
            >
              <button
                type="button"
                onClick={() => setShowOptional((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg border border-dashed border-[var(--line)] bg-white px-3 py-2.5 text-left text-sm text-[var(--ink)]"
              >
                <span>
                  {showOptional ? "Hide optional fields" : "Show video & custom link"}
                </span>
                <span className="text-[var(--muted)]">
                  {showOptional ? "−" : "+"}
                </span>
              </button>

              {showOptional ? (
                <div className="mt-3 space-y-3">
                  <Field
                    label="Video URL"
                    hint="YouTube or Vimeo link for the guest page"
                  >
                    <input
                      type="url"
                      value={values.video_url}
                      onChange={(e) => update("video_url", e.target.value)}
                      className="field-input"
                      placeholder="https://youtube.com/…"
                    />
                  </Field>
                  <Field
                    label="Custom link"
                    hint="fotoowl.com/invite/your-link"
                  >
                    <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-[var(--line)] bg-white focus-within:border-[#d6d3d1] focus-within:shadow-[0_0_0_3px_rgba(154,52,18,0.08)]">
                      <span className="shrink-0 border-r border-[var(--line)] bg-[var(--background-soft)] px-2.5 py-2.5 text-xs text-[var(--muted)]">
                        /invite/
                      </span>
                      <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="aanya-rohan"
                        className="min-w-0 flex-1 border-0 bg-transparent px-2.5 py-2.5 text-[0.95rem] outline-none"
                      />
                    </div>
                  </Field>
                </div>
              ) : null}
            </Section>

            {error ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-[var(--line)] bg-white px-5 py-4 sm:px-6">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Saving…" : "Create invitation link"}
            </button>
            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              You can keep editing — nothing is final until you create the link.
            </p>
          </div>
        </form>
      </aside>
    </>
  );
}

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[var(--line)] bg-white p-4 shadow-[0_1px_0_rgba(28,25,23,0.03)] sm:p-5">
      <header className="mb-4 flex gap-3 border-b border-[var(--line)] pb-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-medium text-white"
          aria-hidden
        >
          {step}
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg leading-tight text-[var(--ink)]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[var(--muted)] sm:text-sm">{hint}</p>
        </div>
      </header>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-sm font-medium text-[var(--ink)]">
          {label}
          {required ? <span className="text-[var(--accent)]"> *</span> : null}
        </span>
        {hint ? (
          <span className="text-xs text-[var(--muted)]">{hint}</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
