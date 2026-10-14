const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type ParsedWeddingDate = {
  day: string | null;
  year: string | null;
  weekday: string | null;
  month: string | null;
  raw: string;
};

export function parseWeddingDate(date: string): ParsedWeddingDate {
  const dayMatch = date.match(/\b(\d{1,2})\b/);
  const yearMatch = date.match(/\b(20\d{2})\b/);
  const weekdayMatch = date.match(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i
  );
  const monthMatch = date.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i
  );

  return {
    day: dayMatch?.[1] ?? null,
    year: yearMatch?.[1] ?? null,
    weekday: weekdayMatch?.[1] ?? null,
    month: monthMatch?.[1] ?? null,
    raw: date,
  };
}

export function parseCeremonyLabel(venueDetails: string): string | null {
  const match = venueDetails.match(
    /((?:ceremony|reception|celebration)\s+at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm))/i
  );
  if (match) return match[1];
  const timeOnly = venueDetails.match(
    /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i
  );
  return timeOnly ? `Ceremony at ${timeOnly[1]}` : null;
}

function parseTimeParts(venueDetails: string): { hours: number; minutes: number } {
  const full = venueDetails.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i);
  if (full) {
    let hours = Number(full[1]);
    const minutes = Number(full[2]);
    const meridiem = full[3].toLowerCase();
    if (meridiem === "pm" && hours < 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;
    return { hours, minutes };
  }

  const simple = venueDetails.match(/\b(\d{1,2})\s*(am|pm)\b/i);
  if (simple) {
    let hours = Number(simple[1]);
    const meridiem = simple[2].toLowerCase();
    if (meridiem === "pm" && hours < 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;
    return { hours, minutes: 0 };
  }

  return { hours: 17, minutes: 0 };
}

export function buildEventDate(
  weddingDate: string,
  venueDetails = ""
): Date | null {
  const parsed = parseWeddingDate(weddingDate);
  if (!parsed.day || !parsed.month || !parsed.year) return null;

  const monthIndex = MONTHS.findIndex(
    (m) => m.toLowerCase() === parsed.month!.toLowerCase()
  );
  if (monthIndex < 0) return null;

  const { hours, minutes } = parseTimeParts(venueDetails);
  return new Date(
    Number(parsed.year),
    monthIndex,
    Number(parsed.day),
    hours,
    minutes,
    0,
    0
  );
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  done: boolean;
};

export function getCountdown(target: Date, now = new Date()): CountdownParts {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, done: true };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes, done: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(date: Date) {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z",
  ].join("");
}

export function downloadCalendarEvent(options: {
  title: string;
  location: string;
  description?: string;
  start: Date;
  durationHours?: number;
}) {
  const end = new Date(
    options.start.getTime() + (options.durationHours ?? 4) * 60 * 60 * 1000
  );
  const stamp = toIcsDate(new Date());
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FotoOwl Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${stamp}-${Math.random().toString(36).slice(2)}@fotoowl`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDate(options.start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(options.title)}`,
    `LOCATION:${escapeIcs(options.location)}`,
    options.description
      ? `DESCRIPTION:${escapeIcs(options.description)}`
      : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
