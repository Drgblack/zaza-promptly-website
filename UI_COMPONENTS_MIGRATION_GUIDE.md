# UI Components Migration Guide

## Overview

This guide explains how to migrate from individual UI components in each project to the unified shared UI components in the `shared-components/ui` directory.

## What's Been Created

### Shared UI Components Directory

The `shared-components/ui` directory now contains all reusable UI components:

#### Basic Components
- **Button** - Enhanced with gradient variants and better styling
- **Card** - Complete card component with header, content, footer
- **Badge** - Enhanced with color variants (purple, orange, pink)
- **Input** - Standard input component
- **Label** - Radix-based label component
- **Textarea** - Standard textarea component
- **Select** - Complete select component with all Radix primitives
- **Separator** - Radix-based separator component
- **Skeleton** - Loading skeleton component
- **Alert** - Alert component with variants

#### Custom Components
- **Logo** - Flexible logo component with variants and product support
- **HeroCTA** - Hero call-to-action component with gradients
- **EmailSignup** - Complete email signup form component

## Migration Steps

### Step 1: Update Dependencies

Add the following dependencies to each project's `package.json` if they don't exist:

```json
{
  "dependencies": {
    "@radix-ui/react-label": "^2.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

### Step 2: Update Import Paths

#### Before (Individual Project Imports)
```typescript
// Old imports
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
```

#### After (Shared Components Imports)
```typescript
// New imports
import { Button } from "@/shared-components/ui/button"
import { Card, CardContent } from "@/shared-components/ui/card"
import { Badge } from "@/shared-components/ui/badge"
import { Input } from "@/shared-components/ui/input"
import { Label } from "@/shared-components/ui/label"
import { Textarea } from "@/shared-components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared-components/ui/select"
import { Separator } from "@/shared-components/ui/separator"
import { Skeleton } from "@/shared-components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/shared-components/ui/alert"

// Or import all UI components at once
import * as UI from "@/shared-components/ui"
```

### Step 3: Update Component Usage

#### Button Component Updates

**Before:**
```typescript
<Button variant="default" size="sm">
  Click me
</Button>
```

**After:**
```typescript
// New gradient variants available
<Button variant="gradient" size="xl">
  Try Zaza Teach
</Button>

<Button variant="purple" size="lg">
  Get Started
</Button>
```

#### Badge Component Updates

**Before:**
```typescript
<Badge variant="default">Coming Soon</Badge>
```

**After:**
```typescript
// New color variants available
<Badge variant="purple">Coming Soon</Badge>
<Badge variant="orange">New</Badge>
<Badge variant="pink">Featured</Badge>
```

#### Logo Component Usage

**Before:**
```typescript
// Custom logo implementations in each project
<div className="flex items-center space-x-2">
  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
    <Sparkles className="w-5 h-5 text-white" />
  </div>
  <span className="text-xl font-bold">Zaza Technologies</span>
</div>
```

**After:**
```typescript
import { Logo } from "@/shared-components/ui/logo"

<Logo variant="default" size="md" />
<Logo variant="white" product="Teach" size="lg" />
<Logo variant="gradient" product="Promptly" />
```

#### HeroCTA Component Usage

**Before:**
```typescript
// Custom hero sections in each project
<section className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 py-16 px-4">
  {/* Custom implementation */}
</section>
```

**After:**
```typescript
import { HeroCTA } from "@/shared-components/ui/hero-cta"

<HeroCTA
  title="The AI Visual Generator"
  subtitle="Built for Classrooms"
  description="Instantly create curriculum-aligned images and explainer videos — inclusive, shareable, and ready to teach"
  primaryButton={{
    text: "Try Free",
    variant: "default"
  }}
  badge={{
    text: "New for 2025"
  }}
  gradient="orange-pink"
/>
```

#### EmailSignup Component Usage

**Before:**
```typescript
// Custom email signup forms in each project
<section className="py-16 px-4">
  {/* Custom implementation */}
</section>
```

**After:**
```typescript
import { EmailSignup } from "@/shared-components/ui/email-signup"

<EmailSignup
  title="Join 1,000+ Teachers Already Using Zaza"
  description="Get early access to our image and video generator plus exclusive teaching resources."
  buttonText="Get Early Access"
  variant="default"
  onSubmit={async (data) => {
    // Custom submission logic
  }}
/>
```

### Step 4: Update tsconfig.json Paths

Add the shared components path to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/shared-components/*": ["./shared-components/*"]
    }
  }
}
```

### Step 5: Remove Old Components

After confirming the new components work correctly:

1. Delete the old `components/ui` directory
2. Remove any unused UI component files
3. Update any remaining import references

## Component Props Reference

### Button Props
```typescript
interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "purple"
  size?: "default" | "sm" | "lg" | "xl" | "icon"
  asChild?: boolean
  // ... standard button props
}
```

### Badge Props
```typescript
interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "purple" | "orange" | "pink"
  // ... standard div props
}
```

### Logo Props
```typescript
interface LogoProps {
  variant?: "default" | "white" | "gradient"
  product?: string
  size?: "sm" | "md" | "lg"
  className?: string
}
```

### HeroCTA Props
```typescript
interface HeroCTAProps {
  title: string
  subtitle?: string
  description: string
  primaryButton: {
    text: string
    href?: string
    onClick?: () => void
    variant?: "default" | "gradient" | "purple"
  }
  secondaryButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  badge?: {
    text: string
    icon?: React.ReactNode
  }
  gradient?: "orange-pink" | "purple-pink" | "blue-purple"
  className?: string
}
```

### EmailSignup Props
```typescript
interface EmailSignupProps {
  title?: string
  description?: string
  placeholder?: {
    name?: string
    email?: string
  }
  buttonText?: string
  successMessage?: string
  errorMessage?: string
  onSubmit?: (data: { name: string; email: string }) => Promise<void>
  className?: string
  variant?: "default" | "minimal" | "gradient"
}
```

## Benefits of This Migration

1. **Consistency** - All projects use the same UI components
2. **Maintainability** - Changes to UI components only need to be made once
3. **Performance** - Shared components can be optimized and cached
4. **Developer Experience** - Easier to maintain and update across all projects
5. **Enhanced Features** - New variants and improved styling
6. **Type Safety** - Better TypeScript support with proper interfaces

## Testing Checklist

After migrating each project:

- [ ] All buttons render correctly with new variants
- [ ] Badges display with new color options
- [ ] Logo component works with different products
- [ ] HeroCTA sections display properly
- [ ] EmailSignup forms function correctly
- [ ] All form inputs work as expected
- [ ] Select dropdowns function properly
- [ ] No console errors
- [ ] Responsive design works on all screen sizes
- [ ] Dark mode compatibility maintained

## Troubleshooting

### Common Issues

1. **Import Path Errors**
   - Ensure the shared-components directory is in the correct location
   - Check tsconfig.json paths configuration
   - Verify all dependencies are installed

2. **Styling Conflicts**
   - Check for conflicting CSS classes
   - Ensure Tailwind CSS is properly configured
   - Verify CSS variables are defined

3. **Component Not Rendering**
   - Check for missing dependencies
   - Verify import statements are correct
   - Check browser console for errors

4. **TypeScript Errors**
   - Ensure all type definitions are properly imported
   - Check for missing type dependencies
   - Verify interface compatibility

### Getting Help

If you encounter issues during migration:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Compare with a working implementation
4. Test on different devices and browsers
5. Check the shared components documentation

## Next Steps

After completing the migration:

1. **Audit all pages** to ensure they're using the new components
2. **Update documentation** to reflect the new component usage
3. **Set up monitoring** to track any issues with the shared components
4. **Plan future updates** to the shared components
5. **Consider creating additional shared components** for other common patterns 