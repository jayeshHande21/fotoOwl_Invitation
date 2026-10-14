"use client";

import Link from "next/link";
import { useState } from "react";
import type { Invitation } from "@/lib/api";
import RemoveInvitationButton from "@/components/RemoveInvitationButton";
import TemplateViews from "@/components/templates/TemplateViews";
import {
  getTemplate,
  isTemplateId,
  type InvitationView,
} from "@/lib/templates";

function toView(item: Invitation): InvitationView {
  return {
    couple_names: item.couple_names,
    wedding_date: item.wedding_date,
    location: item.location,
    venue_details: item.venue_details || "",
    video_url: item.video_url || "",
    message: item.message || "",
    extra_details: item.extra_details || [],
  };
}

function isPublished(item: Invitation) {
  return Boolean(
    item.couple_names?.trim() &&
      item.wedding_date?.trim() &&
      item.location?.trim(),
  );
}

const MONTHS: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

function tidy(value: string) {
  return value.replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ").trim();
}

function formatInvitationDate(raw: string) {
  const cleaned = tidy(raw);
  if (!cleaned) return "";

  const weekday = cleaned.match(
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
  )?.[1];
  const day = cleaned.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/i)?.[1];
  const year = cleaned.match(/\b(?:19|20)\d{2}\b/)?.[0];
  const monthToken = cleaned.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i,
  )?.[1];
  const month = monthToken ? MONTHS[monthToken.slice(0, 3).toLowerCase()] : null;
  const dayNumber = day ? Number(day) : NaN;

  if (!month || !Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) {
    return cleaned;
  }

  const date = year ? `${dayNumber} ${month} ${year}` : `${dayNumber} ${month}`;
  if (!weekday) return date;
  const label = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();
  return `${label}, ${date}`;
}

const COLLAPSED_COUNT = 4;

export default function InvitationList({ items }: { items: Invitation[] }) {
  const [expanded, setExpanded] = useState(false);

  if (!items.length) {
    return (
      <p className="home-invite-empty">
        No invitations yet. Choose a template to get started.
      </p>
    );
  }

  const hiddenCount = Math.max(0, items.length - COLLAPSED_COUNT);
  const visible = expanded ? items : items.slice(0, COLLAPSED_COUNT);

  return (
    <div>
      <ul className="home-invite-list" id="invitation-list">
      {visible.map((item, index) => {
        const templateId = isTemplateId(item.template_id)
          ? item.template_id
          : "classic";
        const template = getTemplate(templateId);
        const published = isPublished(item);

        const when = formatInvitationDate(item.wedding_date);
        const where = tidy(item.location);

        return (
          <li
            key={item.id}
            className="home-invite-card"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="home-invite-cover" aria-hidden>
              <div className="home-invite-cover-inner">
                <TemplateViews
                  templateId={templateId}
                  data={toView(item)}
                  compact
                />
              </div>
            </div>

            <div className="home-invite-body">
              <div className="home-invite-kicker">
                <p className="home-invite-template">{template.name}</p>
                <span
                  className={
                    published
                      ? "home-invite-badge home-invite-badge-live"
                      : "home-invite-badge home-invite-badge-draft"
                  }
                >
                  <span className="home-invite-badge-dot" aria-hidden />
                  {published ? "Published" : "Draft"}
                </span>
              </div>

              <h3 className="font-display home-invite-names">
                {item.couple_names}
              </h3>

              <p className="home-invite-meta">
                <span>{when}</span>
                <span aria-hidden>·</span>
                <span>{where}</span>
              </p>
            </div>

            <div className="home-invite-actions">
              <Link
                href={`/invite/${item.slug}`}
                className="home-invite-btn home-invite-btn-primary cursor-pointer"
              >
                View link
              </Link>
              <Link
                href={`/manage/${item.slug}`}
                className="home-invite-btn home-invite-btn-ghost cursor-pointer"
              >
                Manage
              </Link>
              <RemoveInvitationButton
                slug={item.slug}
                coupleNames={item.couple_names}
              />
            </div>
          </li>
        );
      })}
      </ul>
      {hiddenCount > 0 ? (
        <div className="home-invite-more">
          <button
            type="button"
            className="home-invite-more-btn cursor-pointer"
            aria-expanded={expanded}
            aria-controls="invitation-list"
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded
              ? "Show less"
              : `Show ${hiddenCount} more`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
