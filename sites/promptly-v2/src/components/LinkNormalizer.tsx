"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Normalizes <a href> in rendered content so that:
 *  - relative links become root-absolute ("/foo" instead of "foo")
 *  - "/dir/index" -> "/dir"
 *  - strips ".mdx" suffix
 *  - skips in-page anchors (#...), absolute/protocol links, mailto:, tel:, etc.
 */
export default function LinkNormalizer({ rootSelector = "main" }: { rootSelector?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = (document.querySelector(rootSelector) ?? document.body) as HTMLElement;
    if (!root) return;

    const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href]"));
    for (const a of anchors) {
      const raw = (a.getAttribute("href") || "").trim();
      if (!raw || raw.startsWith("#")) continue;

      // Any scheme like "http:", "https:", "mailto:", "tel:", "data:", etc.
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) continue;

      let nextHref = raw;

      // Ensure root-absolute
      if (!nextHref.startsWith("/")) nextHref = "/" + nextHref;

      // Tidy common variations
      nextHref = nextHref
        .replace(/\/index(?:\.[a-z0-9]+)?$/i, "/") // /dir/index(.html|.mdx) -> /dir/
        .replace(/\.mdx$/i, "")                    // /page.mdx -> /page
        .replace(/\/{2,}/g, "/");                  // collapse // -> /

      if (nextHref !== raw) a.setAttribute("href", nextHref || "/");
    }
  }, [pathname, rootSelector]); // <- run on every route change

  return null;
}