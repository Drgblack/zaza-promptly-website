/**
 * Zaza Brand Spacing and Border Tokens
 */

export const borderRadius = {
  xl: '16px',
  '2xl': '20px',
} as const;

export const boxShadow = {
  card: '0 8px 24px rgba(2,6,23,0.24)',
  focus: '0 0 0 3px rgba(59,130,246,0.4)',
} as const;

/**
 * CSS custom properties for spacing tokens
 */
export const spacingCss = `
  :root {
    --border-radius-xl: ${borderRadius.xl};
    --border-radius-2xl: ${borderRadius['2xl']};
    --box-shadow-card: ${boxShadow.card};
    --box-shadow-focus: ${boxShadow.focus};
  }
`;

export type BorderRadius = keyof typeof borderRadius;
export type BoxShadow = keyof typeof boxShadow;