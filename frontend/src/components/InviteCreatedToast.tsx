"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  slug: string | null;
  onDismiss?: () => void;
};

export default function InviteCreatedToast({ slug, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!slug) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setCopied(false);
    setCopyError(null);

    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 12000);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [slug]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  async function onCopy() {
    if (!slug) return;
    const url = `${window.location.origin}/invite/${slug}`;
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError("Could not copy");
    }
  }

  function dismiss() {
    setVisible(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    onDismiss?.();
  }

  if (!slug) return null;

  const invitePath = `/invite/${slug}`;

  return (
    <div
      className={`invite-toast ${visible ? "invite-toast-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="invite-toast-copy">
        <p className="invite-toast-title">Invitation link created</p>
        <p className="invite-toast-path" title={invitePath}>
          Ready to share with guests
        </p>
        {copyError ? (
          <p className="invite-toast-error">{copyError}</p>
        ) : null}
      </div>

      <div className="invite-toast-actions">
        <button
          type="button"
          onClick={onCopy}
          className="invite-toast-btn"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="invite-toast-dismiss"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
