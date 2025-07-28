# 🎯 Unified Header & Footer System Guide

## Overview

This guide explains how to use the unified Header and Footer components across all Zaza applications. These shared components ensure consistency, reduce maintenance overhead, and provide a cohesive user experience across the entire Zaza ecosystem.

## 🚀 Quick Start

### 1. Import the Components

```tsx
import { Header, Footer, Layout } from "@zaza/shared-components"
```

### 2. Basic Usage

```tsx
export default function MyPage() {
  return (
    <div>
      <Header currentProduct="YourProduct" />
      <main>
        {/* Your page content */}
      </main>
      <Footer currentProduct="YourProduct" />
    </div>
  )
}
```

### 3. Using the Layout Component

```tsx
export default function MyPage() {
  return (
    <Layout currentProduct="YourProduct">
      {/* Your page content */}
    </Layout>
  )
}
```

## 📋 Component Reference

### Header Component

The Header component provides a unified navigation experience across all Zaza applications.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentProduct` | `string` | - | The current product name (e.g., "Promptly", "Visuals") |
| `showSearch` | `boolean` | `true` | Whether to show the search button |
| `showUserMenu` | `boolean` | `true` | Whether to show the user menu |
| `transparent` | `boolean` | `false` | Whether the header should be transparent |
| `className` | `string` | - | Additional CSS classes |

#### Features

- **Responsive Design**: Mobile-first approach with hamburger menu
- **Product Ecosystem**: Dropdown showing all Zaza products with status indicators
- **Navigation**: Standard navigation links (Features, Pricing, Resources, etc.)
- **Search**: Integrated search functionality
- **User Menu**: Sign-in and account management
- **CTA Button**: "Get Started" call-to-action

#### Example Usage

```tsx
// Basic usage
<Header currentProduct="Promptly" />

// Customized header
<Header 
  currentProduct="Visuals"
  showSearch={false}
  showUserMenu={false}
  transparent={true}
  className="custom-header"
/>
```

### Footer Component

The Footer component provides consistent branding and links across all Zaza applications.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentProduct` | `string` | - | The current product name |
| `showNewsletter` | `boolean` | `true` | Whether to show the newsletter signup |
| `showSocial` | `boolean` | `true` | Whether to show social media links |
| `className` | `string` | - | Additional CSS classes |

#### Features

- **Newsletter Signup**: Email subscription with social proof
- **Product Links**: Links to all Zaza products
- **Resource Links**: Free templates, blog, help center, etc.
- **Company Links**: About, careers, press, contact
- **Legal Links**: Privacy, terms, cookies, GDPR
- **Social Media**: Twitter, LinkedIn, GitHub, Email
- **Branding**: Consistent Zaza branding with product customization

#### Example Usage

```tsx
// Basic usage
<Footer currentProduct="Study" />

// Customized footer
<Footer 
  currentProduct="Spark"
  showNewsletter={false}
  showSocial={false}
  className="custom-footer"
/>
```

### Layout Component

The Layout component combines Header and Footer for easy implementation.

#### Props

The Layout component accepts all props from both Header and Footer components, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The page content to render between header and footer |
| `className` | `string` | - | Additional CSS classes for the layout wrapper |

#### Example Usage

```tsx
export default function MyPage() {
  return (
    <Layout 
      currentProduct="Promptly"
      showNewsletter={true}
      showSocial={true}
      transparent={false}
    >
      <section className="hero">
        <h1>Welcome to Zaza Promptly</h1>
        <p>AI-powered feedback generation for teachers</p>
      </section>
      
      <section className="features">
        {/* Feature content */}
      </section>
    </Layout>
  )
}
```

## 🎨 Customization

### Styling

The components use Tailwind CSS and can be customized using the `className` prop:

```tsx
<Header 
  currentProduct="Visuals"
  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
/>

<Footer 
  currentProduct="Study"
  className="bg-gray-900 text-white"
/>
```

### Product-Specific Branding

Each component automatically adapts to the current product:

```tsx
// Shows "Promptly by Zaza" in header and footer
<Header currentProduct="Promptly" />
<Footer currentProduct="Promptly" />

// Shows "Visuals by Zaza" in header and footer  
<Header currentProduct="Visuals" />
<Footer currentProduct="Visuals" />
```

## 🔧 Migration Guide

### From Local Headers/Footers

1. **Remove local components**:
   ```bash
   rm components/Header.tsx
   rm components/footer.tsx
   ```

2. **Update imports**:
   ```tsx
   // Before
   import Header from "@/components/Header"
   import Footer from "@/components/footer"
   
   // After
   import { Header, Footer } from "@zaza/shared-components"
   ```

3. **Update usage**:
   ```tsx
   // Before
   <Header />
   <Footer />
   
   // After
   <Header currentProduct="YourProduct" />
   <Footer currentProduct="YourProduct" />
   ```

### Common Migration Patterns

#### Pattern 1: Simple Header/Footer
```tsx
// Before
<Header />
<main>{children}</main>
<Footer />

// After
<Header currentProduct="ProductName" />
<main>{children}</main>
<Footer currentProduct="ProductName" />
```

#### Pattern 2: Using Layout Component
```tsx
// Before
<Header />
<main>{children}</main>
<Footer />

// After
<Layout currentProduct="ProductName">
  {children}
</Layout>
```

## 📱 Responsive Behavior

### Header
- **Desktop**: Full navigation with dropdown menus
- **Tablet**: Collapsed navigation with hamburger menu
- **Mobile**: Hamburger menu with full-screen overlay

### Footer
- **Desktop**: Multi-column layout with all sections
- **Tablet**: Responsive grid with stacked sections
- **Mobile**: Single-column layout with collapsible sections

## 🔗 Navigation Structure

### Header Navigation
- **Products**: Dropdown with all Zaza products
- **Features**: Link to features page
- **Pricing**: Link to pricing page
- **Resources**: Link to resources page
- **Blog**: Link to blog
- **Support**: Link to support page
- **About**: Link to about page

### Footer Links
- **Products**: All Zaza products with external links
- **Resources**: Free templates, blog, help center, API docs, community
- **Company**: About, careers, press, contact, partners
- **Legal**: Privacy, terms, cookies, GDPR, security

## 🎯 Best Practices

### 1. Always Specify Current Product
```tsx
// ✅ Good
<Header currentProduct="Promptly" />
<Footer currentProduct="Promptly" />

// ❌ Avoid
<Header />
<Footer />
```

### 2. Use Layout Component for New Pages
```tsx
// ✅ Good for new pages
<Layout currentProduct="Visuals">
  <YourPageContent />
</Layout>

// ✅ Good for existing pages
<Header currentProduct="Study" />
<ExistingContent />
<Footer currentProduct="Study" />
```

### 3. Customize When Needed
```tsx
// ✅ Good - customize for specific needs
<Header 
  currentProduct="Promptly"
  transparent={true}
  showSearch={false}
/>

<Footer 
  currentProduct="Promptly"
  showNewsletter={false}
/>
```

### 4. Maintain Accessibility
The components include:
- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Skip links

## 🚀 Performance Considerations

### Bundle Size
- Components are tree-shakeable
- Only import what you need
- Shared dependencies are optimized

### Loading Strategy
- Components load with the page
- No additional network requests
- Optimized for Core Web Vitals

## 🔄 Updates and Maintenance

### Centralized Updates
- All updates happen in `shared-components/ui/`
- Changes automatically propagate to all apps
- Version control for breaking changes

### Testing
- Components are tested across different screen sizes
- Accessibility testing included
- Cross-browser compatibility verified

## 📞 Support

For questions or issues with the unified header/footer system:

1. Check this documentation
2. Review the component source code
3. Test in different browsers and devices
4. Contact the development team

## 🎉 Success Stories

### Before (Fragmented)
- 15+ different header implementations
- Inconsistent navigation patterns
- Maintenance overhead
- Poor user experience

### After (Unified)
- Single source of truth
- Consistent branding
- Reduced maintenance
- Better user experience
- Faster development

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Zaza Development Team 