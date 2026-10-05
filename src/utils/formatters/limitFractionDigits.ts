/**
 * Truncates the fractional part of a raw numeric string to `maxDigits` digits.
 * Keeps a trailing dot so the user can keep typing decimals.
 *
 * @example limitFractionDigits("16.555", 2) // "16.55"
 */
export const limitFractionDigits = (value: string, maxDigits: number): string => {
	const dotIndex = value.indexOf(".");
	if (dotIndex === -1) return value;
	return value.slice(0, dotIndex + 1 + maxDigits);
};
