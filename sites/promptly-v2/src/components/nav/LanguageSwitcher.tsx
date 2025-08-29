"use client";
import { usePathname, useRouter } from "next/navigation";
import { locales, defaultLocale } from "@/i18n";

function stripLeadingLocale(pathname: string): string {
  if (!pathname) return "/";
  const match = pathname.match(/^\/(en|de|fr|es|it)(?=\/|$)/);
  if (match) return pathname.replace(match[0], "") || "/";
  return pathname || "/";
}

interface LanguageSwitcherProps {
  variant?: string;
}

export default function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (next: string) => {
    if (!locales.includes(next as any)) next = defaultLocale;
    const rest = stripLeadingLocale(pathname ?? "/");   // "/pricing" or "/blog/post"
    const target = `/${next}${rest}`.replace(/\/+$/, "");
    try {
      document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;
    } catch {}
    router.push(target);
  };

  return (
    <div className="locale-switcher">
      {locales.map(l => (
        <button key={l} onClick={() => handleSwitch(l)} className="px-2 py-1">
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}