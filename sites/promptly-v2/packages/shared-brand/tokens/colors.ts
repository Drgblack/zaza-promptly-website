/**
 * Zaza Brand Color Tokens
 * 
 * Primary brand colors used across all Zaza Technologies products
 */

export const brandColors = {
  300: '#93C5FD',
  400: '#60A5FA', 
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
} as const;

/**
 * Background and foreground tokens for theme support
 */
export const semanticColors = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
} as const;

/**
 * Complete color palette for Tailwind configuration
 */
export const colors = {
  background: semanticColors.background,
  foreground: semanticColors.foreground,
  brand: brandColors,
} as const;

/**
 * CSS custom properties for the brand colors
 */
export const brandColorsCss = `
  :root {
    --brand-300: ${brandColors[300]};
    --brand-400: ${brandColors[400]};
    --brand-500: ${brandColors[500]};
    --brand-600: ${brandColors[600]};
    --brand-700: ${brandColors[700]};
  }
`;

export type BrandColor = keyof typeof brandColors;