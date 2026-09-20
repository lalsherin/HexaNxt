/**
 * Canonical site origin, resolved from the VITE_SITE_URL build-time variable.
 *
 * Crawlers need absolute URLs for canonical and Open Graph tags, but the
 * production domain is deployment-specific, so it is never hardcoded here.
 * When the variable is unset (local dev, preview deploys), absoluteUrl falls
 * back to a relative path and the Open Graph URL/image tags are omitted.
 */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return SITE_URL ? `${SITE_URL}${suffix}` : suffix;
}
