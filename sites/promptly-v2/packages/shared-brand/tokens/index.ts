/**
 * Zaza Brand Design Tokens
 * 
 * Centralized design tokens for consistent styling across all Zaza Technologies products
 */

export * from './colors';
export * from './spacing';

import { colors } from './colors';
import { borderRadius, boxShadow } from './spacing';

/**
 * Complete Tailwind theme extension object
 * Import this in your tailwind.config.ts to use Zaza brand tokens
 */
export const tailwindTheme = {
  extend: {
    colors,
    borderRadius,
    boxShadow,
  },
} as const;

/**
 * Brand constants for easy reference
 */
export const brand = {
  name: 'Zaza Technologies',
  tagline: 'AI for Teachers & Parent Communication',
  domain: 'zazatechnologies.com',
  primaryColor: colors.brand[600],
  founderName: 'Dr Greg Blackburn',
} as const;