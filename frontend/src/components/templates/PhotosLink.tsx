type Variant = "classic" | "garden" | "modern" | "celebration";

type Props = {
  url?: string | null;
  variant?: Variant;
};

/** Guest CTA to the couple’s photo gallery — shown when a URL is set. */
export default function PhotosLink({ url, variant = "classic" }: Props) {
  const href = url?.trim();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`photos-cta photos-cta-${variant}`}
    >
      <span className="photos-cta-icon" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
          <path
            d="M4.5 7.5h2.1l1.2-2h8.4l1.2 2h2.1A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V9a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13.25" r="3.1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
      <span>Get Your Photos</span>
    </a>
  );
}
