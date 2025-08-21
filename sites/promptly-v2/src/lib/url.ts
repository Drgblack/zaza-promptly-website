export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Fallbacks for preview/dev
  return typeof window === 'undefined'
    ? `http://localhost:3000`
    : window.location.origin;
}