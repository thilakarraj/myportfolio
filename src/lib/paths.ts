/**
 * Prefix a root-relative public asset for GitHub Pages.
 * `next/image` with `images.unoptimized` does not apply `basePath`,
 * so `/images/profile.jpg` would 404 at the domain root.
 */
export function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}
