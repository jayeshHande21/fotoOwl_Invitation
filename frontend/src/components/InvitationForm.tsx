"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createInvitation } from "@/lib/api";

type ExtraRow = { label: string; value: string };

const emptyExtra = (): ExtraRow => ({ label: "", value: "" });

export default function InvitationForm() {
  const router = useRouter();
  const [coupleNames, setCoupleNames] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [location, setLocation] = useState("");
  const [venueDetails, setVenueDetails] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [slug, setSlug] = useState("");
  const [extras, setExtras] = useState<ExtraRow[]>([emptyExtra()]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const invitation = await createInvitation({
        couple_names: coupleNames,
        wedding_date: weddingDate,
        location,
        venue_details: venueDetails || undefined,
        video_url: videoUrl || undefined,
        message: message || undefined,
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Couple names" required>
          <input
            required
            value={coupleNames}
            onChange={(e) => setCoupleNames(e.target.value)}
            placeholder="Aanya & Rohan"
            className="field-input"
          />
        </Field>
        <Field label="Wedding date" required>
          <input
            required
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            placeholder="Saturday, 12 December 2026"
            className="field-input"
          />
        </Field>
        <Field label="Location" required>
          <input
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Jaipur, Rajasthan"
            className="field-input"
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
      </div>

      <Field label="Venue details">
        <textarea
          value={venueDetails}
          onChange={(e) => setVenueDetails(e.target.value)}
          placeholder="The Leela Palace · Ceremony at 5:00 PM"
          rows={3}
          className="field-input resize-y"
        />
      </Field>

      <Field label="Video reference URL">
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="field-input"
        />
      </Field>

      <Field label="Invitation message">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="With joy in our hearts, we invite you to celebrate with us..."
          rows={4}
          className="field-input resize-y"
        />
      </Field>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[var(--ink)]">
            Additional information
          </p>
          <button
            type="button"
            onClick={() => setExtras((rows) => [...rows, emptyExtra()])}
            className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Add field
          </button>
        </div>
        {extras.map((row, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-2">
            <input
              value={row.label}
              onChange={(e) =>
                setExtras((rows) =>
                  rows.map((r, i) =>
                    i === index ? { ...r, label: e.target.value } : r
                  )
                )
              }
              placeholder="Label (e.g. Dress code)"
              className="field-input"
            />
            <input
              value={row.value}
              onChange={(e) =>
                setExtras((rows) =>
                  rows.map((r, i) =>
                    i === index ? { ...r, value: e.target.value } : r
                  )
                )
              }
              placeholder="Value (e.g. Festive attire)"
              className="field-input"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Creating…" : "Create invitation link"}
      </button>
    </form>
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
