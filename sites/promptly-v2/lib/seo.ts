export function alternatesFor(path: string, locales = ['en','de']) {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/,'') ?? 'https://www.zazapromptly.com';
  const langs: Record<string,string> = {};
  for (const l of locales) langs[l] = `${base}/${l}${path}`;
  return {
    canonical: `${base}/${locales[0]}${path}`,
    languages: langs,
  };
}