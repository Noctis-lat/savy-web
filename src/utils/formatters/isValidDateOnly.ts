/**
 * Checks that a string is a real calendar date in `yyyy-MM-dd` format.
 * Rejects malformed strings and impossible dates such as "2026-02-30".
 *
 * @example isValidDateOnly("2026-10-03") // true
 * @example isValidDateOnly("2026-02-30") // false
 */
export const isValidDateOnly = (value: string): boolean => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

	const [year, month, day] = value.split("-").map(Number);
	const date = new Date(year, month - 1, day);

	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
