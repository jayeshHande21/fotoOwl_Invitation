export type TemplateId = "classic" | "garden" | "modern" | "celebration";

export type InvitationView = {
  couple_names: string;
  wedding_date: string;
  location: string;
  venue_details: string;
  video_url: string;
  message: string;
  extra_details: { id?: number; label: string; value: string }[];
};

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  tagline: string;
  accent: string;
};

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Centered, timeless, and elegant",
    accent: "#1c1917",
  },
  {
    id: "garden",
    name: "Garden",
    tagline: "Minimal butterfly announcement in soft sage",
    accent: "#6b8f74",
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Clean lines and editorial type",
    accent: "#292524",
  },
  {
    id: "celebration",
    name: "Celebration",
    tagline: "Warm, joyful, and guest-ready",
    accent: "#9a3412",
  },
];

export const SAMPLE_INVITATION: InvitationView = {
  couple_names: "Aanya & Rohan",
  wedding_date: "Saturday, 12 December 2026",
  location: "Jaipur, Rajasthan",
  venue_details: "The Leela Palace · Ceremony at 5:00 PM",
  video_url: "",
  message:
    "With joy in our hearts, we invite you to celebrate our wedding day with us.",
  extra_details: [
    { label: "Dress code", value: "Festive attire" },
    { label: "Reception", value: "Dinner & dancing from 7:30 PM" },
    { label: "Stay", value: "Rooms held at The Leela Palace" },
    { label: "Travel", value: "Complimentary shuttle from 4:00 PM" },
    { label: "Gifts", value: "Your presence is the only gift we need" },
    { label: "Parking", value: "Valet available at the main entrance" },
  ],
};

export function getTemplate(id: string): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export function isTemplateId(id: string): id is TemplateId {
  return TEMPLATES.some((t) => t.id === id);
}
