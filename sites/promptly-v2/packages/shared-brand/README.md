# @zaza/shared-brand

Shared brand assets and design tokens for Zaza Technologies product suite.

## Installation

This package is used as a local file dependency:

```json
{
  "dependencies": {
    "@zaza/shared-brand": "file:./packages/shared-brand"
  }
}
```

## Usage

### Design Tokens

Import the Tailwind theme directly in your `tailwind.config.ts`:

```typescript
import { tailwindTheme } from "@zaza/shared-brand";

export default {
  theme: tailwindTheme,
  // ... other config
};
```

Or import individual token sets:

```typescript
import { brandColors, borderRadius, boxShadow } from "@zaza/shared-brand";
```

### Components

```typescript
import { AuthorAvatar } from "@zaza/shared-brand";

<AuthorAvatar size="lg" />
```

### SEO Helpers

```typescript
import { getAuthorPersonJsonLd, getBlogPostingWithAuthorJsonLd } from "@zaza/shared-brand";

const authorSchema = getAuthorPersonJsonLd();
const articleSchema = getBlogPostingWithAuthorJsonLd({
  title: "Article Title",
  description: "Article description"
});
```

## Brand Colors

- `brand.300`: #93C5FD (light blue)
- `brand.400`: #60A5FA (medium light blue)  
- `brand.500`: #3B82F6 (primary blue)
- `brand.600`: #2563EB (primary dark blue)
- `brand.700`: #1D4ED8 (dark blue)

## Assets

Copy these assets to your site's public directory:
- `/images/founder.jpg` - Dr Greg Blackburn founder photo

## Cloning Instructions

When cloning this for a new site:

1. Copy the entire `packages/shared-brand` directory
2. Update author information in `types/author.ts`
3. Replace founder photo in assets
4. Update brand colors in `tokens/colors.ts` if needed
5. Add to package.json dependencies
6. Import `tailwindTheme` in your Tailwind config