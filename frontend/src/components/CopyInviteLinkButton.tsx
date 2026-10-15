"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  slug: string;
};

export default function CopyInviteLinkButton({ slug }: Props) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function onCopy() {
    const url = `${window.location.origin}/invite/${slug}`;
    setError(null);

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy");
      setCopied(false);
    }
  }

  return (
    <span className="home-invite-remove-wrap">
      <button
        type="button"
        onClick={onCopy}
        className="home-invite-btn home-invite-btn-primary cursor-pointer"
        aria-label={copied ? "Invite link copied" : "Copy invite link to share with guests"}
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      {error ? <span className="home-invite-remove-error">{error}</span> : null}
    </span>
  );
}
