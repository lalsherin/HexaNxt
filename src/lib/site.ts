/**
 * Canonical site origin, used to build absolute canonical and Open Graph URLs.
 *
 * The production domain is now known and stable, so it is the default. It can
 * still be overridden per environment with the VITE_SITE_URL build-time
 * variable — useful for a staging domain — but no dashboard configuration is
 * required for the live site to emit correct tags.
 */
const DEFAULT_SITE_URL = "https://www.hexanxt.com";

export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL)
  .trim()
  .replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return SITE_URL ? `${SITE_URL}${suffix}` : suffix;
}
