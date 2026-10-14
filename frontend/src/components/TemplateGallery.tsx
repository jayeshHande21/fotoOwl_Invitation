import Link from "next/link";
import TemplateViews from "@/components/templates/TemplateViews";
import { SAMPLE_INVITATION, TEMPLATES } from "@/lib/templates";

export default function TemplateGallery() {
  return (
    <section className="animate-fade-up-delay">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-[var(--ink)] sm:text-3xl">
          Choose a template
        </h2>
        <p className="mt-2 text-[var(--muted)]">
          Pick a look first. You can update the details on the next screen.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {TEMPLATES.map((template, index) => (
          <Link
            key={template.id}
            href={`/template/${template.id}`}
            className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#d6d3d1] hover:shadow-[0_12px_40px_rgba(28,25,23,0.06)]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="pointer-events-none border-b border-[var(--line)]">
              <TemplateViews
                templateId={template.id}
                data={SAMPLE_INVITATION}
                compact
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-display text-xl text-[var(--ink)]">
                  {template.name}
                </p>
                <p className="text-sm text-[var(--muted)]">{template.tagline}</p>
              </div>
              <span className="text-sm text-[var(--accent)] transition group-hover:translate-x-0.5">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
