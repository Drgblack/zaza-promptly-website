import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: { 
          500: '#3B82F6', 
          600: '#2563EB', 
          700: '#1D4ED8' 
        },
      },
      borderRadius: { 
        xl: '16px', 
        '2xl': '20px' 
      },
      boxShadow: {
        card: '0 8px 24px rgba(2,6,23,0.24)',
        focus: '0 0 0 3px rgba(59,130,246,0.4)'
      }
    },
  },
  plugins: [],
};
export default config;
