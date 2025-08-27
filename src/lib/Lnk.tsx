"use client";
import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";
import { locales, defaultLocale } from "@/i18n";
import * as React from "react";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;               // require a real string path like "pricing" or "blog/post"
  locale?: string;            // optional override
  absolute?: boolean;         // set true if href already starts with "/en" etc
};

function normalizePath(href: string): string {
  if (!href || typeof href !== "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Lnk] Invalid href:", href);
    }
    return "/"; // fail safe
  }
  // allow full URLs or hash/mailto
  if (/^https?:\/\//i.test(href) || href.startsWith("#") || href.startsWith("mailto:")) return href;

  // remove leading slash for join
  return href.replace(/^\/+/, "");
}

export default function Lnk({ href, locale, absolute, ...rest }: Props) {
  const activeLocale = locale || useLocale() || defaultLocale;
  const safeLocale = locales.includes(activeLocale as any) ? activeLocale : defaultLocale;

  // absolute paths that already contain locale (e.g. "/de/pricing")
  if (absolute) {
    return <Link href={href} {...rest} />;
  }

  const clean = normalizePath(href);        // "pricing" or "blog/my-post"
  const finalHref = `/${safeLocale}/${clean}`.replace(/\/+$/, ""); // no trailing slash
  return <Link href={finalHref} {...rest} />;
}