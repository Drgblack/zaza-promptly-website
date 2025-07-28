# Zaza Shared Components

This directory contains unified Header, Footer, and UI components designed to be used across all Zaza websites for consistency and maintainability.

## Components

### Header

A responsive header component with navigation, dropdowns, dark mode toggle, and mobile menu.

**Features:**
- Shared navigation links (Home, Products, Pricing, About, Support)
- Responsive design with mobile hamburger menu
- Dark mode toggle
- Product dropdowns (Our Solutions, Learning Centre)
- Configurable product CTA buttons
- Support for different styling variants

**Props:**
```typescript
interface HeaderProps {
  variant?: "default" | "minimal" // Styling variant
  showProductButtons?: boolean // Show/hide product CTA buttons
  currentProduct?: string // Highlight current product in dropdown
}
```

**Usage:**
```typescript
import { Header } from "@/shared-components/Header"

<Header 
  variant="default"
  showProductButtons={true}
  currentProduct="zaza-teach"
/>
```

### Footer

A comprehensive footer component with navigation, social links, and trust badges.

**Features:**
- Shared navigation links
- Social media icons (LinkedIn, TikTok, Twitter)
- Zaza ecosystem links
- Trust & security badges (GDPR, FERPA, Built by Educators)
- Responsive layout
- Dark mode support

**Props:**
```typescript
interface FooterProps {
  variant?: "default" | "dark" // Styling variant
  currentProduct?: string // Highlight current product in ecosystem links
  showSocialIcons?: boolean // Show/hide social media icons
}
```

**Usage:**
```typescript
import { Footer } from "@/shared-components/Footer"

<Footer 
  variant="default"
  currentProduct="zaza-teach"
  showSocialIcons={true}
/>
```

## UI Components

### Basic Components

#### Button
Enhanced button component with gradient variants and better styling.

```typescript
import { Button } from "@/shared-components/ui/button"

<Button variant="gradient" size="xl">
  Try Zaza Teach
</Button>

<Button variant="purple" size="lg">
  Get Started
</Button>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `gradient`, `purple`
**Sizes:** `default`, `sm`, `lg`, `xl`, `icon`

#### Card
Complete card component with header, content, footer, title, and description.

```typescript
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/shared-components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### Badge
Enhanced badge component with color variants.

```typescript
import { Badge } from "@/shared-components/ui/badge"

<Badge variant="purple">Coming Soon</Badge>
<Badge variant="orange">New</Badge>
<Badge variant="pink">Featured</Badge>
```

**Variants:** `default`, `secondary`, `destructive`, `outline`, `purple`, `orange`, `pink`

#### Form Components
Complete set of form components including Input, Label, Textarea, and Select.

```typescript
import { Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared-components/ui"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="Enter your email" />

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Utility Components
- **Separator** - Radix-based separator component
- **Skeleton** - Loading skeleton component
- **Alert** - Alert component with variants

### Custom Components

#### Logo
Flexible logo component with variants and product support.

```typescript
import { Logo } from "@/shared-components/ui/logo"

<Logo variant="default" size="md" />
<Logo variant="white" product="Teach" size="lg" />
<Logo variant="gradient" product="Promptly" />
```

**Props:**
```typescript
interface LogoProps {
  variant?: "default" | "white" | "gradient"
  product?: string
  size?: "sm" | "md" | "lg"
  className?: string
}
```

#### HeroCTA
Hero call-to-action component with gradients and flexible configuration.

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

**Props:**
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

#### EmailSignup
Complete email signup form component with validation and success states.

```typescript
import { EmailSignup } from "@/shared-components/ui/email-signup"

<EmailSignup
  title="Join 1,000+ Teachers Already Using Zaza"
  description="Get early access to our tools plus exclusive teaching resources."
  buttonText="Get Early Access"
  variant="default"
  onSubmit={async (data) => {
    // Custom submission logic
  }}
/>
```

**Props:**
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

## Hooks

### useTheme

A React hook for managing dark/light theme state.

**Usage:**
```typescript
import { useTheme, ThemeProvider } from "@/shared-components/hooks/use-theme"

// Wrap your app
<ThemeProvider>
  <App />
</ThemeProvider>

// Use in components
const { theme, setTheme } = useTheme()
```

## Utils

### cn

A utility function for merging class names with Tailwind CSS.

**Usage:**
```typescript
import { cn } from "@/shared-components/lib/utils"

const className = cn("base-class", condition && "conditional-class")
```

## Installation

1. Copy the `shared-components` directory to your project
2. Install required dependencies:
   ```bash
   npm install @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-select @radix-ui/react-separator class-variance-authority clsx tailwind-merge lucide-react
   ```
3. Update import paths in the components to match your project structure
4. Wrap your app with `ThemeProvider` if using dark mode
5. Add the shared components path to your `tsconfig.json`:
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

## Dependencies

- React 18+
- Next.js 14+
- Tailwind CSS
- Lucide React (for icons)
- Radix UI (for accessible components)
- Class Variance Authority (for component variants)
- clsx & tailwind-merge (for class name utilities)

## Importing Components

### Individual Imports
```typescript
import { Button } from "@/shared-components/ui/button"
import { Card, CardContent } from "@/shared-components/ui/card"
import { Logo } from "@/shared-components/ui/logo"
import { HeroCTA } from "@/shared-components/ui/hero-cta"
```

### Bulk Import
```typescript
import * as UI from "@/shared-components/ui"

// Then use as:
<UI.Button variant="gradient">Click me</UI.Button>
<UI.Logo product="Teach" />
```

## Customization

### Styling

The components use Tailwind CSS classes and can be customized by:

1. **Modifying the component directly** for project-specific needs
2. **Creating wrapper components** that extend the base functionality
3. **Using CSS overrides** to modify specific styles

### Component Variants

Most components support multiple variants that can be customized:

- **Button:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `gradient`, `purple`
- **Badge:** `default`, `secondary`, `destructive`, `outline`, `purple`, `orange`, `pink`
- **Logo:** `default`, `white`, `gradient`
- **HeroCTA:** `orange-pink`, `purple-pink`, `blue-purple` gradients
- **EmailSignup:** `default`, `minimal`, `gradient`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When making changes to shared components:

1. Test across multiple projects
2. Ensure responsive design works
3. Verify dark mode functionality
4. Check accessibility features
5. Update documentation
6. Maintain backward compatibility

## Migration Guide

For detailed migration instructions from individual project components to shared components, see:

- [REFACTORING_GUIDE.md](../REFACTORING_GUIDE.md) - Header and Footer migration
- [UI_COMPONENTS_MIGRATION_GUIDE.md](../UI_COMPONENTS_MIGRATION_GUIDE.md) - UI components migration

## License

MIT License - see LICENSE file for details. 