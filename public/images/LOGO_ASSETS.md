# Zaza Logo Assets

This directory contains the official Zaza "Z" logo assets for consistent branding across the Zaza Promptly website.

## Directory Structure

```
/public/images/
├── logo/
│   ├── zaza-logo.svg              # Full color logo (primary)
│   ├── zaza-logo-dark.svg         # White logo for dark backgrounds
│   ├── zaza-logo-light.svg        # Dark logo for light backgrounds
│   ├── zaza-logo-square.png       # Square 512x512 (favicon/app icon)
│   └── zaza-logo-square@2x.png    # Square 1024x1024 (high-res)
└── og/
    ├── zaza-og.png                # OpenGraph 1200x630
    └── zaza-og.svg                # OpenGraph source SVG
```

## Usage Guidelines

### 1. UI Components (Header/Footer)
- **Light backgrounds**: Use `zaza-logo.svg` (full color gradient)
- **Dark backgrounds**: Use `zaza-logo-dark.svg` (white variant)
- **Recommended size**: 32x32px (w-8 h-8 in Tailwind)

### 2. Favicons & App Icons
- **Browser favicon**: `/favicon.svg` (optimized for small sizes)
- **App manifest icons**: `zaza-logo-square.png` (512x512)
- **Apple touch icon**: `zaza-logo-square.png` (copied to `/apple-touch-icon.png`)
- **High-res displays**: `zaza-logo-square@2x.png` (1024x1024)

### 3. Social Media / OpenGraph
- **OpenGraph previews**: `zaza-og.png` (1200x630)
- **Twitter cards**: Same as OpenGraph
- **LinkedIn sharing**: Same as OpenGraph

## Implementation Examples

### React Components
```jsx
// Header logo (primary)
<img 
  src="/images/logo/zaza-logo.svg" 
  alt="Zaza Logo" 
  className="w-8 h-8" 
/>

// Footer logo (dark background)
<img 
  src="/images/logo/zaza-logo-dark.svg" 
  alt="Zaza Logo" 
  className="w-8 h-8" 
/>
```

### HTML Meta Tags
```html
<!-- Favicon -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">

<!-- OpenGraph -->
<meta property="og:image" content="/images/og/zaza-og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

## Design Specifications

### Colors
- **Primary Gradient**: #FF4081 → #E91E63 → #9C27B0 (Pink to Purple)
- **White Variant**: #FFFFFF with subtle gradient
- **Dark Variant**: #1F2937 → #374151 → #4B5563 (Gray gradient)

### Typography
- **Brand Name**: "Zaza Promptly"
- **Primary Font**: Inter
- **Logo Font**: Custom "Z" letterform

## File Status

✅ **Created**: SVG variants (zaza-logo.svg, zaza-logo-dark.svg, zaza-logo-light.svg)  
✅ **Created**: Square PNG assets (512x512, 1024x1024)  
✅ **Updated**: Favicon configuration (favicon.svg, favicon.ico)  
✅ **Updated**: Web manifest icons  
✅ **Updated**: Header and Footer components  
✅ **Updated**: OpenGraph metadata references  

⚠️ **Note**: PNG assets are currently copies of the original logo. For production, these should be properly resized using image processing tools to the exact specified dimensions.

## Maintenance

When updating logo assets:
1. Update source SVG files in `/public/images/logo/`
2. Regenerate PNG variants at correct sizes
3. Update favicon.svg for small-size optimization
4. Test favicon display across browsers
5. Validate OpenGraph previews on social platforms

## Contact

For logo design questions or asset requests, contact the design team or refer to the brand guidelines.