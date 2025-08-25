# @zaza/shared-brand

Shared brand assets and components for the Zaza Technologies product suite.

## Overview

This package provides consistent founder photo, avatar components, and SEO schemas across all Zaza product sites (Promptly, Teach, AutoPlanner, Notably Suite, Spark, Looop, KnowledgeCore).

## Structure

```
packages/shared-brand/
├── assets/
│   └── founder.jpg          # Canonical founder photo
├── components/
│   └── AuthorAvatar.tsx     # Smart avatar component
├── seo/
│   └── author.ts           # JSON-LD schema helpers
├── types/
│   └── author.ts           # TypeScript definitions
├── index.ts                # Main exports
├── package.json            # Package configuration
└── README.md               # This file
```

## Usage

### 1. Install in your site

```bash
# In each site's package.json, add workspace dependency
"dependencies": {
  "@zaza/shared-brand": "workspace:*"
}
```

### 2. Copy founder image

The founder photo must be available at `/public/images/founder.jpg` in each site:

```bash
cp packages/shared-brand/assets/founder.jpg public/images/founder.jpg
```

### 3. Use AuthorAvatar component

```tsx
import { AuthorAvatar } from '@zaza/shared-brand';

// Automatically shows founder photo for Greg Blackburn
<AuthorAvatar name="Dr Greg Blackburn" size="lg" showName showRole />

// Shows initials for other authors  
<AuthorAvatar name="Jane Smith" size="md" />
```

### 4. Add Person JSON-LD schema

```tsx
import { getAuthorPersonJsonLd } from '@zaza/shared-brand';

const authorSchema = getAuthorPersonJsonLd({
  urlBase: 'https://zazapromptly.com',
  name: 'Dr Greg Blackburn'
});

// Add to page metadata or structured data component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
/>
```

### 5. Blog posts with author schema

```tsx
import { getBlogPostingWithAuthorJsonLd } from '@zaza/shared-brand';

const blogSchema = getBlogPostingWithAuthorJsonLd({
  title: 'Blog Post Title',
  description: 'Description',
  url: 'https://site.com/blog/post',
  datePublished: '2025-01-01',
  authorName: 'Dr Greg Blackburn',
  urlBase: 'https://site.com'
});
```

## Component Props

### AuthorAvatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Author name (required) |
| `role` | `string` | - | Optional role/title |
| `size` | `number \| 'sm' \| 'md' \| 'lg'` | `'md'` | Avatar size |
| `className` | `string` | `''` | Additional CSS classes |
| `priority` | `boolean` | `false` | Load image with priority |
| `showName` | `boolean` | `false` | Show name next to avatar |
| `showRole` | `boolean` | `false` | Show role next to avatar |

Size mappings:
- `sm`: 32px
- `md`: 48px  
- `lg`: 64px

## Automatic Founder Detection

The system automatically detects Dr. Greg Blackburn using pattern matching:

```typescript
// These all resolve to founder photo:
"Dr Greg Blackburn"
"Greg Blackburn" 
"Dr. Greg Blackburn"
"Gregory Blackburn"
```

## Localization

### English
- Alt text: "Dr Greg Blackburn, Founder of Zaza Technologies"
- Available via: `FOUNDER_ALT_TEXT`

### German  
- Alt text: "Dr Greg Blackburn, Gründer von Zaza Technologies"
- Available via: `FOUNDER_ALT_TEXT_DE`

## Schema.org Features

The JSON-LD schemas include:

- **Person**: Complete founder profile with credentials, affiliation, expertise
- **Article/BlogPosting**: Rich content metadata with author attribution
- **Organization**: Zaza Technologies company information
- **Educational credentials**: PhD qualification details
- **Knowledge areas**: EdTech expertise topics

## Dark/Light Mode Support

All components support dark mode via Tailwind CSS dark: variants:

```tsx
// Avatar backgrounds adapt to theme
className="bg-purple-100 dark:bg-purple-900"
```

## Best Practices

1. **Consistent naming**: Always use "Dr Greg Blackburn" for founder posts
2. **Image optimization**: Founder photo is optimized at 512x512px
3. **Accessibility**: All avatars include proper alt text and ARIA labels
4. **Performance**: Use `priority={true}` for above-the-fold founder images
5. **SEO**: Include Person JSON-LD on founder-authored content

## Site Integration Checklist

For each product site:

- [ ] Add workspace dependency to package.json
- [ ] Copy founder.jpg to public/images/
- [ ] Replace existing author avatars with AuthorAvatar component
- [ ] Add Person JSON-LD to About Founder pages
- [ ] Update blog post schemas with author information
- [ ] Test dark/light mode rendering
- [ ] Verify Lighthouse accessibility scores ≥90
- [ ] Remove old/duplicate founder image files

## Supported Sites

- ✅ Main Site (root `/app`)  
- ✅ Promptly v2 (`/sites/promptly-v2`)
- 🔄 Teach (integration in progress)
- 🔄 AutoPlanner (integration in progress) 
- 🔄 Notably Suite (integration in progress)
- 🔄 Spark (integration in progress)
- 🔄 Looop (integration in progress)
- 🔄 KnowledgeCore (integration in progress)