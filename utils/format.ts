// utils/format.ts

/**
 * Formats a number using the en-US locale for hydration-safe rendering.
 * @param number The number to format
 * @returns The formatted string
 */
export function formatNumber(number: number): string {
  return number.toLocaleString('en-US');
} 