# Zaza Websites Refactoring Guide

## Overview

This guide explains how to refactor all individual Zaza websites to use the unified Header and Footer components from the `shared-components` directory.

## What's Been Created

### Unified Components

1. **`shared-components/Header.tsx`** - Unified header with:
   - Shared navigation links (Home, Products, Pricing, About, Support)
   - Responsive design with mobile menu
   - Dark mode toggle
   - Product dropdowns (Our Solutions, Learning Centre)
   - Configurable product buttons
   - Support for different variants (default, minimal)

2. **`shared-components/Footer.tsx`** - Unified footer with:
   - Shared navigation links
   - Social media icons (LinkedIn, TikTok, Twitter)
   - Zaza ecosystem links
   - Trust & security badges
   - Responsive layout
   - Dark mode support

3. **`shared-components/hooks/use-theme.tsx`** - Shared theme management
4. **`shared-components/lib/utils.ts`** - Shared utility functions
5. **`shared-components/ui/button.tsx`** - Shared Button component

## Migration Steps

### Step 1: Copy Shared Components

Copy the `shared-components` directory to each project that needs to be refactored.

### Step 2: Update Dependencies

Add the following dependencies to each project's `package.json` if they don't exist:

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

### Step 3: Update Import Paths

In each project, update the import paths in the shared components:

**In `shared-components/Header.tsx`:**
```typescript
// Update these imports to match your project structure
import { Button } from "@/components/ui/button" // or your local button component
import { useTheme } from "@/hooks/use-theme" // or your local theme hook
import { cn } from "@/lib/utils" // or your local utils
```

**In `shared-components/Footer.tsx`:**
```typescript
// Update these imports to match your project structure
import { useTheme } from "@/hooks/use-theme" // or your local theme hook
```

### Step 4: Replace Individual Components

#### Replace Header Components

**Before:**
```typescript
// In your page component
import { Header } from "@/components/header"

export default function Page() {
  return (
    <div>
      <Header />
      {/* page content */}
    </div>
  )
}
```

**After:**
```typescript
// In your page component
import { Header } from "@/shared-components/Header"

export default function Page() {
  return (
    <div>
      <Header 
        variant="default" // or "minimal"
        showProductButtons={true} // or false
        currentProduct="zaza-teach" // optional: highlight current product
      />
      {/* page content */}
    </div>
  )
}
```

#### Replace Footer Components

**Before:**
```typescript
// In your page component
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div>
      {/* page content */}
      <Footer />
    </div>
  )
}
```

**After:**
```typescript
// In your page component
import { Footer } from "@/shared-components/Footer"

export default function Page() {
  return (
    <div>
      {/* page content */}
      <Footer 
        variant="default" // or "dark"
        currentProduct="zaza-teach" // optional: highlight current product
        showSocialIcons={true} // or false
      />
    </div>
  )
}
```

### Step 5: Update Theme Provider

Ensure your app has the ThemeProvider wrapper:

```typescript
// In your root layout or app component
import { ThemeProvider } from "@/shared-components/hooks/use-theme"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 6: Remove Old Components

After confirming the new components work correctly:

1. Delete the old `components/header.tsx` file
2. Delete the old `components/footer.tsx` file
3. Remove any unused theme-related files if they're no longer needed

## Component Props Reference

### Header Props

```typescript
interface HeaderProps {
  variant?: "default" | "minimal" // Styling variant
  showProductButtons?: boolean // Show/hide product CTA buttons
  currentProduct?: string // Highlight current product in dropdown
}
```

### Footer Props

```typescript
interface FooterProps {
  variant?: "default" | "dark" // Styling variant
  currentProduct?: string // Highlight current product in ecosystem links
  showSocialIcons?: boolean // Show/hide social media icons
}
```

## Project-Specific Customizations

### Custom Styling

If you need project-specific styling, you can:

1. **Extend the components** by creating a wrapper:
```typescript
// components/CustomHeader.tsx
import { Header } from "@/shared-components/Header"

export function CustomHeader(props: HeaderProps) {
  return (
    <div className="custom-header-wrapper">
      <Header {...props} />
    </div>
  )
}
```

2. **Override styles** using CSS:
```css
/* styles/custom-header.css */
.custom-header-wrapper .header {
  /* your custom styles */
}
```

### Custom Navigation

If you need different navigation items, you can:

1. **Modify the shared component** for your specific needs
2. **Create a project-specific version** that extends the base component
3. **Use CSS to hide/show specific elements**

## Testing Checklist

After refactoring each project:

- [ ] Header renders correctly on desktop and mobile
- [ ] Dark mode toggle works
- [ ] All navigation links work
- [ ] Dropdown menus function properly
- [ ] Footer displays all sections correctly
- [ ] Social media links work
- [ ] Responsive design works on all screen sizes
- [ ] No console errors
- [ ] Performance is maintained or improved

## Benefits of This Refactoring

1. **Consistency** - All Zaza websites will have the same header and footer
2. **Maintainability** - Changes to navigation or branding only need to be made once
3. **Performance** - Shared components can be optimized and cached
4. **Developer Experience** - Easier to maintain and update across all projects
5. **Brand Cohesion** - Ensures consistent brand experience across all touchpoints

## Troubleshooting

### Common Issues

1. **Import Path Errors**
   - Ensure the shared-components directory is in the correct location
   - Update import paths to match your project structure

2. **Styling Conflicts**
   - Check for conflicting CSS classes
   - Ensure Tailwind CSS is properly configured

3. **Theme Not Working**
   - Verify ThemeProvider is wrapping your app
   - Check that the theme hook is properly imported

4. **Mobile Menu Issues**
   - Ensure all required dependencies are installed
   - Check for JavaScript errors in the console

### Getting Help

If you encounter issues during refactoring:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Compare with a working implementation
4. Test on different devices and browsers

## Next Steps

After completing the refactoring:

1. **Audit all pages** to ensure they're using the new components
2. **Update documentation** to reflect the new component usage
3. **Set up monitoring** to track any issues with the shared components
4. **Plan future updates** to the shared components
5. **Consider creating a component library** for even more shared components 