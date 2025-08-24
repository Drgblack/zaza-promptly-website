/**
 * rehype-fix-internal-links: normalize internal MD/MDX links
 * - "pricing" -> "/pricing"
 * - strip ".md/.mdx" and trailing "/index"
 * - ignore external/mailto/tel/hash links
 */
export default function rehypeFixInternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'a' && node.properties) {
        const href = node.properties.href;
        if (typeof href === 'string' && href.length > 0) {
          // skip external schemes and pure hashes
          if (!/^[a-z]+:/i.test(href) && !href.startsWith('#')) {
            let nextHref = href.trim();
            if (!nextHref.startsWith('/')) nextHref = `/${nextHref}`;
            nextHref = nextHref
              .replace(/\/index(\.mdx?)?$/i, '') // "/dir/index" -> "/dir"
              .replace(/\.mdx?$/i, '')           // "page.mdx" -> "page"
              .replace(/\/{2,}/g, '/');          // collapse "//"
            node.properties.href = nextHref || '/';
          }
        }
      }
      const children = Array.isArray(node.children) ? node.children : [];
      for (const child of children) visit(child);
    };
    visit(tree);
  };
}