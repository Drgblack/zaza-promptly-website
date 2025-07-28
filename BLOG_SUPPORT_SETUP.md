# Zaza Blog MDX Support Setup

## Folder Structure
```
apps/zaza-blog-post/
├── pages/
│   └── blog/
│       └── [slug].tsx
├── content/
│   └── posts/
│       └── blog-post-example.mdx
```

## How It Works
- Blog posts are written in `.mdx` format and stored in `apps/zaza-blog-post/content/posts/`.
- Each post must have frontmatter (YAML block at the top) for SEO:
  ```mdx
  ---
  title: "My Blog Post Title"
  description: "Short summary for SEO and social sharing."
  date: "YYYY-MM-DD"
  ---
  ```
- The dynamic route `pages/blog/[slug].tsx` loads and renders each post using `next-mdx-remote` and parses frontmatter with `gray-matter`.
- SEO tags (title, description, canonical, og) are set automatically from frontmatter.

## Adding or Editing Blog Posts
1. Add a new `.mdx` file to `apps/zaza-blog-post/content/posts/`.
2. Use the frontmatter block for SEO.
3. Write your post in Markdown/MDX. You can embed React components if needed.
4. The slug (URL) is based on the filename (e.g., `blog-post-example.mdx` → `/blog/blog-post-example`).

## Embedding Components or SEO Tags
- You can import and use React components in your MDX posts.
- SEO tags are handled automatically from frontmatter, but you can add custom tags in the `[slug].tsx` page if needed.

## Example Post
See `blog-post-example.mdx` for a template.

---

If you need advanced features (syntax highlighting, custom components, etc.), let the team know! 