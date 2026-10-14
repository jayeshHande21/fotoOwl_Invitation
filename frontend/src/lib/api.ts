const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type ExtraDetail = {
  id: number;
  label: string;
  value: string;
};

export type Invitation = {
  id: number;
  slug: string;
  template_id: string;
  couple_names: string;
  wedding_date: string;
  location: string;
  venue_details: string | null;
  video_url: string | null;
  message: string | null;
  extra_details: ExtraDetail[];
  created_at: string;
  updated_at: string;
};

export type InvitationPayload = {
  couple_names: string;
  wedding_date: string;
  location: string;
  template_id?: string;
  venue_details?: string;
  video_url?: string;
  message?: string;
  slug?: string;
  extra_details?: { label: string; value: string }[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = "Request failed";
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export function listInvitations() {
  return request<Invitation[]>("/api/invitations");
}

export function getInvitation(slug: string) {
  return request<Invitation>(`/api/invitations/${slug}`);
}

export function createInvitation(payload: InvitationPayload) {
  return request<Invitation>("/api/invitations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateInvitation(
  slug: string,
  payload: Partial<InvitationPayload>
) {
  return request<Invitation>(`/api/invitations/${slug}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteInvitation(slug: string) {
  return request<void>(`/api/invitations/${slug}`, {
    method: "DELETE",
  });
}

export function addExtraDetail(
  slug: string,
  payload: { label: string; value: string }
) {
  return request<ExtraDetail>(`/api/invitations/${slug}/details`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteExtraDetail(slug: string, detailId: number) {
  return request<void>(`/api/invitations/${slug}/details/${detailId}`, {
    method: "DELETE",
  });
}
