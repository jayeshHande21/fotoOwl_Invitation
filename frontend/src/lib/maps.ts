/** Google Maps search link from venue + place fragments. */
export function buildMapsUrl(
  ...parts: Array<string | null | undefined>
): string | null {
  const query = parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(", ");

  if (!query) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
