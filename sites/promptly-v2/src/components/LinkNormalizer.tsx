"use client";
import { useEffect } from "react";

/** Normalizes internal anchors:
 * - "pricing"     -> "/pricing"
 * - "/foo/index"  -> "/foo"
 * - "*.md/.mdx"   -> stripped
 * Skips absolute (http://...), mailto:, tel:, and hash-only links.
 */
export default function LinkNormalizer({ rootSelector = "main" }: { rootSelector?: string }) {
  useEffect(() => {
    const root = (document.querySelector(rootSelector) ?? document.body) as HTMLElement;
    const anchors = Array.from(root.querySelectorAll("a[href]")) as HTMLAnchorElement[];
    for (const a of anchors) {
      const raw = a.getAttribute("href") || "";
      if (!raw || raw.startsWith("#")) continue;             // anchors
      if (/^[a-z]+:/i.test(raw)) continue;                   // external schemes
      let nextHref = raw.trim();
      if (!nextHref.startsWith("/")) nextHref = "/" + nextHref;
      nextHref = nextHref
        .replace(/\/index(\.mdx?)?$/i, "")   // "/dir/index" -> "/dir"
        .replace(/\.mdx?$/i, "")             // "page.mdx"   -> "page"
        .replace(/\/{2,}/g, "/");            // collapse double slashes
      if (nextHref !== raw) a.setAttribute("href", nextHref || "/");
    }
  }, [rootSelector]);
  return null;
}