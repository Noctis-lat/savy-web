/**
 * Converts a plain percent (16.5 = 16.5%) into the decimal fraction the API expects (0.165).
 * Rounds to 4 decimals to match the backend `Decimal(5,4)` column and avoid float noise.
 *
 * @example percentToRate(16.5) // 0.165
 */
export const percentToRate = (percent: number): number => Math.round(percent * 100) / 10000;
