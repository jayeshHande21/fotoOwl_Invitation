import Link from "next/link";
import TemplateViews from "@/components/templates/TemplateViews";
import { SAMPLE_INVITATION, TEMPLATES } from "@/lib/templates";

export default function TemplateGallery() {
  return (
    <section className="home-gallery animate-fade-up-delay" aria-labelledby="template-gallery-title">
      <div className="home-gallery-head">
        <h2 id="template-gallery-title" className="font-display home-gallery-title">
          Templates
        </h2>
        <p className="home-gallery-meta">{TEMPLATES.length}</p>
      </div>

      <div className="home-gallery-grid">
        {TEMPLATES.map((template, index) => (
          <Link
            key={template.id}
            href={`/template/${template.id}`}
            className="home-template-card group cursor-pointer"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="home-template-preview">
              <div className="home-template-preview-inner pointer-events-none">
                <TemplateViews
                  templateId={template.id}
                  data={SAMPLE_INVITATION}
                  compact
                />
              </div>
            </div>
            <div className="home-template-footer">
              <div className="min-w-0">
                <p className="font-display home-template-name">{template.name}</p>
                <p className="home-template-tagline">{template.tagline}</p>
              </div>
              <span className="home-template-cta">
                Preview
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="home-template-cta-icon"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
