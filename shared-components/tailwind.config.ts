import type { Config } from "tailwindcss"

/**
 * Zaza Shared Tailwind Configuration
 * 
 * This configuration consolidates the best settings from all Zaza websites
 * to ensure consistent branding, typography, spacing, and responsive design
 * across the entire product ecosystem.
 */

const config: Config = {
  // Enable class-based dark mode for consistent theming
  darkMode: ["class"],
  
  // Content paths for all Zaza projects
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    // Include shared components
    "../shared-components/**/*.{ts,tsx}",
  ],
  
  // No prefix to maintain compatibility with existing code
  prefix: "",
  
  theme: {
    // Container configuration for consistent layout
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Consistent max-width across all sites
      },
    },
    
    extend: {
      // Zaza Brand Color Palette
      // Consolidated from all projects with consistent naming
      colors: {
        // CSS Variables for theme switching (light/dark mode)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary brand colors with semantic naming
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Zaza Brand Colors (from zaza-visuals-marketing)
        // These are the core brand colors used across the ecosystem
        "zaza-coral": "#FF6B47",      // Primary brand color - energetic and engaging
        "zaza-yellow": "#FFD93D",     // Secondary brand color - optimistic and creative
        "zaza-mint": "#6BCF7F",       // Accent color - fresh and innovative
        "zaza-purple": "#8B5CF6",     // Purple variant - premium and trustworthy
        
        // Extended Purple Palette (from zaza-pricing and zaza-founder-page)
        // Comprehensive purple scale for gradients and variations
        purple: {
          50: "#faf5ff",   // Lightest purple for backgrounds
          100: "#f3e8ff",  // Very light purple for subtle accents
          200: "#e9d5ff",  // Light purple for borders and dividers
          300: "#d8b4fe",  // Medium light purple for hover states
          400: "#c084fc",  // Medium purple for secondary elements
          500: "#a855f7",  // Standard purple for primary actions
          600: "#9333ea",  // Darker purple for emphasis
          700: "#7c3aed",  // Dark purple for text and icons
          800: "#6b21a8",  // Very dark purple for backgrounds
          900: "#581c87",  // Darkest purple for contrast
        },
        
        // Extended Pink Palette (from zaza-pricing)
        // Pink variations for gradients and complementary elements
        pink: {
          50: "#fdf2f8",   // Lightest pink for backgrounds
          100: "#fce7f3",  // Very light pink for subtle accents
          200: "#fbcfe8",  // Light pink for borders and dividers
          300: "#f9a8d4",  // Medium light pink for hover states
          400: "#f472b6",  // Medium pink for secondary elements
          500: "#ec4899",  // Standard pink for primary actions
          600: "#db2777",  // Darker pink for emphasis
          700: "#be185d",  // Dark pink for text and icons
          800: "#9d174d",  // Very dark pink for backgrounds
          900: "#831843",  // Darkest pink for contrast
        },
        
        // Extended Orange Palette (from zaza-pricing)
        // Orange variations for gradients and warm accents
        orange: {
          50: "#fff7ed",   // Lightest orange for backgrounds
          100: "#ffedd5",  // Very light orange for subtle accents
          200: "#fed7aa",  // Light orange for borders and dividers
          300: "#fdba74",  // Medium light orange for hover states
          400: "#fb923c",  // Medium orange for secondary elements
          500: "#f97316",  // Standard orange for primary actions
          600: "#ea580c",  // Darker orange for emphasis
          700: "#c2410c",  // Dark orange for text and icons
          800: "#9a3412",  // Very dark orange for backgrounds
          900: "#7c2d12",  // Darkest orange for contrast
        },
        
        // Chart colors for data visualization (from zaza-spark)
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        
        // Sidebar colors for navigation components (from zaza-spark)
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      
      // Typography Configuration
      // Consistent font families across all Zaza products
      fontFamily: {
        // Primary font stack - Inter for modern, clean typography
        sans: [
          "var(--font-inter)", 
          "Inter", 
          "-apple-system", 
          "BlinkMacSystemFont", 
          "Segoe UI", 
          "Roboto", 
          "sans-serif"
        ],
        
        // Alternative font stack for fallback
        inter: [
          "Inter", 
          "system-ui", 
          "sans-serif"
        ],
        
        // Monospace font for code and technical content
        mono: [
          "ui-monospace", 
          "SFMono-Regular", 
          "Menlo", 
          "Monaco", 
          "Consolas", 
          "Liberation Mono", 
          "Courier New", 
          "monospace"
        ],
      },
      
      // Font Size Configuration
      // Extended font sizes for better typography hierarchy
      fontSize: {
        // Custom sizes for Zaza brand typography
        "xs": ["0.75rem", { lineHeight: "1rem" }],           // 12px - Small labels, captions
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],       // 14px - Body text, descriptions
        "base": ["1rem", { lineHeight: "1.5rem" }],          // 16px - Default body text
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],       // 18px - Large body text
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],        // 20px - Subheadings
        "2xl": ["1.5rem", { lineHeight: "2rem" }],           // 24px - Section headings
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],      // 30px - Page headings
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],        // 36px - Large headings
        "5xl": ["3rem", { lineHeight: "1" }],                // 48px - Hero headings
        "6xl": ["3.75rem", { lineHeight: "1" }],             // 60px - Large hero headings
        "7xl": ["4.5rem", { lineHeight: "1" }],              // 72px - Extra large hero
        "8xl": ["6rem", { lineHeight: "1" }],                // 96px - Massive headings
        "9xl": ["8rem", { lineHeight: "1" }],                // 128px - Display headings
      },
      
      // Line Height Configuration
      // Consistent line heights for better readability
      lineHeight: {
        "none": "1",           // No line height
        "tight": "1.25",       // Tight line height for headings
        "snug": "1.375",       // Snug line height for subheadings
        "normal": "1.5",       // Normal line height for body text
        "relaxed": "1.625",    // Relaxed line height for large text
        "loose": "2",          // Loose line height for very large text
      },
      
      // Letter Spacing Configuration
      // Consistent letter spacing for typography
      letterSpacing: {
        "tighter": "-0.05em",  // Tighter spacing for headings
        "tight": "-0.025em",   // Tight spacing for subheadings
        "normal": "0em",       // Normal spacing
        "wide": "0.025em",     // Wide spacing for emphasis
        "wider": "0.05em",     // Wider spacing for large text
        "widest": "0.1em",     // Widest spacing for display text
      },
      
      // Border Radius Configuration
      // Consistent border radius using CSS variables
      borderRadius: {
        lg: "var(--radius)",                    // Large radius (8px)
        md: "calc(var(--radius) - 2px)",        // Medium radius (6px)
        sm: "calc(var(--radius) - 4px)",        // Small radius (4px)
        // Additional custom radius values
        "xl": "0.75rem",                        // 12px - Extra large radius
        "2xl": "1rem",                          // 16px - 2X large radius
        "3xl": "1.5rem",                        // 24px - 3X large radius
        "full": "9999px",                       // Full radius for circles
      },
      
      // Spacing Configuration
      // Extended spacing scale for consistent layouts
      spacing: {
        // Custom spacing values for Zaza design system
        "18": "4.5rem",     // 72px - Large section spacing
        "88": "22rem",      // 352px - Extra large spacing
        "128": "32rem",     // 512px - Massive spacing
      },
      
      // Breakpoint Configuration
      // Consistent responsive breakpoints across all sites
      screens: {
        "xs": "475px",      // Extra small screens (mobile landscape)
        "sm": "640px",      // Small screens (tablets)
        "md": "768px",      // Medium screens (tablets landscape)
        "lg": "1024px",     // Large screens (desktops)
        "xl": "1280px",     // Extra large screens (large desktops)
        "2xl": "1400px",    // 2X large screens (from container config)
        "3xl": "1600px",    // 3X large screens (ultra-wide)
      },
      
      // Animation Configuration
      // Custom animations for Zaza brand interactions
      keyframes: {
        // Accordion animations (from shadcn/ui)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        // Custom Zaza brand animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "bounce-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      
      // Animation Duration and Timing
      animation: {
        // Accordion animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        // Custom Zaza brand animations
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "scale-in": "scale-in 0.6s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        
        // Fast animations for micro-interactions
        "fade-in-fast": "fade-in 0.2s ease-out",
        "scale-in-fast": "scale-in 0.2s ease-out",
      },
      
      // Box Shadow Configuration
      // Custom shadows for Zaza brand depth and elevation
      boxShadow: {
        // Enhanced shadow system
        "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        
        // Zaza brand shadows with color
        "zaza-sm": "0 1px 2px 0 rgb(139 92 246 / 0.05)",
        "zaza": "0 1px 3px 0 rgb(139 92 246 / 0.1), 0 1px 2px -1px rgb(139 92 246 / 0.1)",
        "zaza-md": "0 4px 6px -1px rgb(139 92 246 / 0.1), 0 2px 4px -2px rgb(139 92 246 / 0.1)",
        "zaza-lg": "0 10px 15px -3px rgb(139 92 246 / 0.1), 0 4px 6px -4px rgb(139 92 246 / 0.1)",
        "zaza-xl": "0 20px 25px -5px rgb(139 92 246 / 0.1), 0 8px 10px -6px rgb(139 92 246 / 0.1)",
        
        // Inner shadows
        "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        "zaza-inner": "inset 0 2px 4px 0 rgb(139 92 246 / 0.05)",
      },
      
      // Z-Index Configuration
      // Consistent z-index scale for layering
      zIndex: {
        "auto": "auto",
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "dropdown": "1000",
        "sticky": "1020",
        "fixed": "1030",
        "modal-backdrop": "1040",
        "modal": "1050",
        "popover": "1060",
        "tooltip": "1070",
        "toast": "1080",
      },
    },
  },
  
  // Plugins for enhanced functionality
  plugins: [
    // Animation plugin for smooth transitions
    require("tailwindcss-animate"),
    
    // Custom plugin for Zaza brand utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        // Gradient text utilities
        ".gradient-text": {
          background: "linear-gradient(135deg, #ff6b47, #ffd93d, #6bcf7f)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".gradient-text-purple": {
          background: "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".gradient-text-orange": {
          background: "linear-gradient(135deg, #ff6b47, #f97316, #fb923c)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        
        // Smooth scrolling
        ".scroll-smooth": {
          "scroll-behavior": "smooth",
        },
        
        // Custom focus styles
        ".focus-zaza": {
          "outline": "2px solid rgb(139 92 246)",
          "outline-offset": "2px",
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config 