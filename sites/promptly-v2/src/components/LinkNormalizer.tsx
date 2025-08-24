"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Normalizes internal links so relative hrefs work from any depth.
 * Works two ways:
 *  1) Scans the DOM on each route change and rewrites anchors.
 *  2) Intercepts clicks (capture phase) and fixes the href before Next Router sees it.
 */
export default function LinkNormalizer({ rootSelector = "main" }: { rootSelector?: string }) {
  const pathname = usePathname();

  // --- Common normalize function
  const normalize = (href: string) => {
    const raw = (href || "").trim();
    if (!raw || raw.startsWith("#")) return raw;
    // Any scheme: http:, https:, mailto:, tel:, data:, etc. -> leave alone
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return raw;

    let nextHref = raw;
    if (!nextHref.startsWith("/")) nextHref = "/" + nextHref; // make root-absolute

    nextHref = nextHref
      .replace(/\/index(?:\.[a-z0-9]+)?$/i, "/") // /dir/index(.html|.mdx) -> /dir/
      .replace(/\.mdx$/i, "")                    // strip .mdx suffix
      .replace(/\/{2,}/g, "/");                  // collapse //

    return nextHref || "/";
  };

  // 1) Re-scan on every route change
  useEffect(() => {
    const root = (document.querySelector(rootSelector) ?? document.body) as HTMLElement;
    const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href]"));

    let changed = 0;
    for (const a of anchors) {
      const fixed = normalize(a.getAttribute("href") || "");
      if (fixed && fixed !== a.getAttribute("href")) {
        a.setAttribute("href", fixed);
        changed++;
      }
    }
    if (changed > 0) {
      // visible breadcrumb for us in DevTools to confirm deployment affected prod
      console.log(`[LinkNormalizer] rewrote ${changed} anchors on ${pathname}`);
    }
  }, [pathname, rootSelector]);

  // 2) Intercept clicks *before* Next.js processes them
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Only left-click without modifier keys
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = (e.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!target) return;

      const raw = target.getAttribute("href") || "";
      const fixed = normalize(raw);
      if (fixed && fixed !== raw) {
        target.setAttribute("href", fixed);
        // no preventDefault: we want Next.js to proceed with the corrected href
      }
    };

    document.addEventListener("click", onClick, true); // capture phase
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
