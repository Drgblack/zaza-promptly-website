import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5B4BFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#74F2B2",
          foreground: "#0B0B0F",
        },
        accent: {
          DEFAULT: "#FF89BA",
          foreground: "#0B0B0F",
        },
        muted: {
          DEFAULT: "#616D79",
          foreground: "#0B0B0F",
        },
        "hero-from": "#EAFEF2",
        "hero-to": "#FDFEFF",
        "primary-cta": "#5B4BFF",
        "accent-pink": "#FF89BA",
        "vivid-mint": "#74F2B2",
        "text-primary": "#0B0B0F",
        "text-secondary": "#616D79",
        "footer-bg": "#0C0D1B",
        "footer-text": "#FFFFFFCC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #EAFEF2 0%, #FDFEFF 100%)",
      },
      boxShadow: {
        "soft-glow": "0 0 20px rgba(91, 75, 255, 0.15)",
        "mint-glow": "0 0 20px rgba(116, 242, 178, 0.2)",
        "pink-glow": "0 0 20px rgba(255, 137, 186, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
