# Zaza Shared Tailwind Configuration Guide

## Overview

This guide explains the unified Tailwind CSS configuration that consolidates the best settings from all Zaza websites to ensure consistent branding, typography, spacing, and responsive design across the entire product ecosystem.

## What's Included

### 🎨 **Brand Colors**
- **Zaza Core Colors**: Coral, Yellow, Mint, Purple
- **Extended Palettes**: Purple, Pink, Orange with full 50-900 scales
- **Semantic Colors**: Primary, Secondary, Accent, Muted, Destructive
- **Theme Support**: Light and dark mode with CSS variables

### 📝 **Typography System**
- **Font Families**: Inter as primary, with comprehensive fallbacks
- **Font Sizes**: Extended scale from xs (12px) to 9xl (128px)
- **Line Heights**: Consistent spacing for readability
- **Letter Spacing**: Tighter to widest options for emphasis

### 📱 **Responsive Design**
- **Breakpoints**: xs (475px) to 3xl (1600px)
- **Container**: Centered with 1400px max-width
- **Spacing**: Extended scale with custom values

### ✨ **Animations & Effects**
- **Custom Animations**: Fade, slide, scale, bounce effects
- **Brand Shadows**: Purple-tinted shadows for depth
- **Gradient Utilities**: Text and background gradients
- **Focus Styles**: Accessible focus indicators

## File Structure

```
shared-components/
├── tailwind.config.ts          # Main Tailwind configuration
├── styles/
│   └── globals.css             # Global styles and CSS variables
└── TAILWIND_CONFIG_GUIDE.md    # This documentation
```

## Color Palette

### Zaza Brand Colors

```css
/* Core brand colors */
zaza-coral: #FF6B47      /* Primary brand color - energetic and engaging */
zaza-yellow: #FFD93D     /* Secondary brand color - optimistic and creative */
zaza-mint: #6BCF7F       /* Accent color - fresh and innovative */
zaza-purple: #8B5CF6     /* Purple variant - premium and trustworthy */
```

### Extended Purple Palette

```css
purple-50: #faf5ff   /* Lightest purple for backgrounds */
purple-100: #f3e8ff  /* Very light purple for subtle accents */
purple-200: #e9d5ff  /* Light purple for borders and dividers */
purple-300: #d8b4fe  /* Medium light purple for hover states */
purple-400: #c084fc  /* Medium purple for secondary elements */
purple-500: #a855f7  /* Standard purple for primary actions */
purple-600: #9333ea  /* Darker purple for emphasis */
purple-700: #7c3aed  /* Dark purple for text and icons */
purple-800: #6b21a8  /* Very dark purple for backgrounds */
purple-900: #581c87  /* Darkest purple for contrast */
```

### Semantic Colors (CSS Variables)

```css
/* Light mode */
--primary: 222.2 47.4% 11.2%        /* Dark primary */
--secondary: 210 40% 96%            /* Light secondary */
--accent: 210 40% 96%               /* Light accent */
--muted: 210 40% 96%                /* Light muted */
--destructive: 0 84.2% 60.2%        /* Red destructive */

/* Dark mode */
--primary: 210 40% 98%              /* Light primary */
--secondary: 217.2 32.6% 17.5%      /* Dark secondary */
--accent: 217.2 32.6% 17.5%         /* Dark accent */
--muted: 217.2 32.6% 17.5%          /* Dark muted */
--destructive: 0 62.8% 30.6%        /* Dark red destructive */
```

## Typography

### Font Families

```css
/* Primary font stack */
font-sans: [
  "var(--font-inter)", 
  "Inter", 
  "-apple-system", 
  "BlinkMacSystemFont", 
  "Segoe UI", 
  "Roboto", 
  "sans-serif"
]

/* Alternative stacks */
font-inter: ["Inter", "system-ui", "sans-serif"]
font-mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", ...]
```

### Font Sizes

```css
text-xs: 0.75rem (12px)     /* Small labels, captions */
text-sm: 0.875rem (14px)    /* Body text, descriptions */
text-base: 1rem (16px)      /* Default body text */
text-lg: 1.125rem (18px)    /* Large body text */
text-xl: 1.25rem (20px)     /* Subheadings */
text-2xl: 1.5rem (24px)     /* Section headings */
text-3xl: 1.875rem (30px)   /* Page headings */
text-4xl: 2.25rem (36px)    /* Large headings */
text-5xl: 3rem (48px)       /* Hero headings */
text-6xl: 3.75rem (60px)    /* Large hero headings */
text-7xl: 4.5rem (72px)     /* Extra large hero */
text-8xl: 6rem (96px)       /* Massive headings */
text-9xl: 8rem (128px)      /* Display headings */
```

### Line Heights

```css
leading-none: 1           /* No line height */
leading-tight: 1.25       /* Tight line height for headings */
leading-snug: 1.375       /* Snug line height for subheadings */
leading-normal: 1.5       /* Normal line height for body text */
leading-relaxed: 1.625    /* Relaxed line height for large text */
leading-loose: 2          /* Loose line height for very large text */
```

## Responsive Breakpoints

```css
xs: 475px      /* Extra small screens (mobile landscape) */
sm: 640px      /* Small screens (tablets) */
md: 768px      /* Medium screens (tablets landscape) */
lg: 1024px     /* Large screens (desktops) */
xl: 1280px     /* Extra large screens (large desktops) */
2xl: 1400px    /* 2X large screens (container max-width) */
3xl: 1600px    /* 3X large screens (ultra-wide) */
```

## Animations

### Custom Animations

```css
/* Fade animations */
animate-fade-in: fadeIn 0.6s ease-out
animate-fade-in-up: fadeInUp 0.6s ease-out
animate-fade-in-down: fadeInDown 0.6s ease-out

/* Slide animations */
animate-slide-in-left: slideInLeft 0.6s ease-out
animate-slide-in-right: slideInRight 0.6s ease-out

/* Scale animations */
animate-scale-in: scaleIn 0.6s ease-out
animate-bounce-in: bounceIn 0.6s ease-out

/* Fast animations for micro-interactions */
animate-fade-in-fast: fadeIn 0.2s ease-out
animate-scale-in-fast: scaleIn 0.2s ease-out
```

### Accordion Animations (shadcn/ui)

```css
animate-accordion-down: accordion-down 0.2s ease-out
animate-accordion-up: accordion-up 0.2s ease-out
```

## Shadows

### Standard Shadows

```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Zaza Brand Shadows

```css
shadow-zaza-sm: 0 1px 2px 0 rgb(139 92 246 / 0.05)
shadow-zaza: 0 1px 3px 0 rgb(139 92 246 / 0.1), 0 1px 2px -1px rgb(139 92 246 / 0.1)
shadow-zaza-md: 0 4px 6px -1px rgb(139 92 246 / 0.1), 0 2px 4px -2px rgb(139 92 246 / 0.1)
shadow-zaza-lg: 0 10px 15px -3px rgb(139 92 246 / 0.1), 0 4px 6px -4px rgb(139 92 246 / 0.1)
shadow-zaza-xl: 0 20px 25px -5px rgb(139 92 246 / 0.1), 0 8px 10px -6px rgb(139 92 246 / 0.1)
```

## Custom Utilities

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #ff6b47, #ffd93d, #6bcf7f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-purple {
  background: linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-orange {
  background: linear-gradient(135deg, #ff6b47, #f97316, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Focus Styles

```css
.focus-zaza {
  outline: 2px solid rgb(139 92 246);
  outline-offset: 2px;
}
```

## Component Classes

### Buttons

```css
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-200;
}

.btn-outline {
  @apply border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200;
}
```

### Cards

```css
.card-zaza {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6;
}

.card-zaza-hover {
  @apply card-zaza hover:shadow-xl transition-shadow duration-300;
}
```

### Navigation

```css
.nav-link {
  @apply text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium;
}

.nav-link-active {
  @apply text-purple-600 font-semibold;
}
```

### Forms

```css
.input-zaza {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white;
}

.label-zaza {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}
```

## Utility Classes

### Spacing

```css
.section-padding {
  @apply py-16 md:py-24;
}

.container-zaza {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### Text

```css
.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}
```

### Backgrounds

```css
.bg-gradient-zaza {
  @apply bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400;
}

.bg-gradient-zaza-reverse {
  @apply bg-gradient-to-tl from-purple-600 via-purple-500 to-purple-400;
}
```

### Borders

```css
.border-gradient-zaza {
  @apply border-2 border-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-border;
}
```

### Shadows

```css
.shadow-zaza {
  @apply shadow-lg shadow-purple-500/25;
}

.shadow-zaza-hover {
  @apply shadow-zaza hover:shadow-xl hover:shadow-purple-500/30 transition-shadow duration-300;
}
```

## Implementation Guide

### 1. Install Dependencies

```bash
npm install tailwindcss tailwindcss-animate
```

### 2. Update Project Configuration

Replace your project's `tailwind.config.ts` with:

```typescript
import sharedConfig from "../shared-components/tailwind.config"

export default {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    // Add your project-specific content paths
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
}
```

### 3. Import Global Styles

In your main CSS file (e.g., `app/globals.css`):

```css
@import "../shared-components/styles/globals.css";

/* Add any project-specific styles below */
```

### 4. Set Up Font Loading

In your layout or root component:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## Usage Examples

### Hero Section

```tsx
<section className="section-padding bg-gradient-zaza">
  <div className="container-zaza text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
      Welcome to <span className="gradient-text">Zaza</span>
    </h1>
    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
      Discover our complete suite of AI-powered tools for education and productivity.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn-primary">Get Started</button>
      <button className="btn-outline bg-white/10 border-white/20 text-white hover:bg-white hover:text-purple-600">
        Learn More
      </button>
    </div>
  </div>
</section>
```

### Product Card

```tsx
<div className="card-zaza-hover">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 bg-gradient-zaza rounded-lg flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Zaza Teach
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        AI-powered lesson planning
      </p>
    </div>
  </div>
  <p className="text-gray-700 dark:text-gray-300 mb-4">
    Create engaging lesson plans and curriculum with AI assistance.
  </p>
  <button className="btn-primary w-full">Try Now</button>
</div>
```

### Navigation

```tsx
<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <div className="container-zaza">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold gradient-text-purple">
          Zaza
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
      <button className="btn-primary">Get Started</button>
    </div>
  </div>
</nav>
```

## Accessibility Features

### Focus Management

- Custom focus styles with purple outline
- Proper focus indicators for all interactive elements
- Keyboard navigation support

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  .btn-primary {
    @apply bg-black text-white border-2 border-black;
  }
  
  .btn-secondary {
    @apply bg-white text-black border-2 border-black;
  }
  
  .card-zaza {
    @apply border-2 border-black;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}
```

## Best Practices

### 1. Use Semantic Colors

```tsx
// ✅ Good - Uses semantic colors
<button className="bg-primary text-primary-foreground">Submit</button>

// ❌ Avoid - Uses hardcoded colors
<button className="bg-purple-600 text-white">Submit</button>
```

### 2. Leverage Component Classes

```tsx
// ✅ Good - Uses component classes
<button className="btn-primary">Get Started</button>
<div className="card-zaza-hover">Content</div>

// ❌ Avoid - Recreating styles
<button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
  Get Started
</button>
```

### 3. Use Responsive Design

```tsx
// ✅ Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card-zaza">Content</div>
</div>

// ❌ Avoid - Fixed layout
<div className="grid grid-cols-3 gap-6">
  <div className="card-zaza">Content</div>
</div>
```

### 4. Implement Dark Mode

```tsx
// ✅ Good - Dark mode support
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>

// ❌ Avoid - Light mode only
<div className="bg-white text-gray-900">
  Content
</div>
```

## Migration Guide

### From Individual Configs

1. **Backup your current config**
2. **Replace with shared config**
3. **Update content paths**
4. **Test all components**
5. **Update any custom utilities**

### Common Issues

1. **Missing fonts**: Ensure Inter font is loaded
2. **Color conflicts**: Remove project-specific color overrides
3. **Animation issues**: Check for conflicting animation names
4. **Spacing differences**: Update custom spacing values

## Support

For questions or issues with the shared Tailwind configuration:

1. Check this documentation first
2. Review the source files in `shared-components/`
3. Test with the provided examples
4. Create an issue with specific details

## Contributing

When contributing to the shared configuration:

1. **Test across multiple projects**
2. **Maintain backward compatibility**
3. **Update documentation**
4. **Follow the established patterns**
5. **Consider accessibility implications** 