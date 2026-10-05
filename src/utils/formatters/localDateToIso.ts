/**
 * Converts a `yyyy-MM-dd` date-only string into an ISO string at local midnight.
 * Parsing the parts manually avoids `new Date("yyyy-MM-dd")`, which is treated as UTC
 * and may shift the calendar day for users west of UTC.
 *
 * @example localDateToIso("2026-10-03") // "2026-10-03T06:00:00.000Z" in UTC-6
 */
export const localDateToIso = (dateOnly: string): string => {
	const [year, month, day] = dateOnly.split("-").map(Number);
	return new Date(year, month - 1, day).toISOString();
};
