"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addExtraDetail } from "@/lib/api";

export default function AddDetailForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await addExtraDetail(slug, { label, value });
      setLabel("");
      setValue("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add detail");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="field-input"
        />
        <input
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="field-input"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-secondary">
        {loading ? "Saving…" : "Add information"}
      </button>
    </form>
  );
}
