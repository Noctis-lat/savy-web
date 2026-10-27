import { differenceInCalendarDays } from "date-fns";

/**
 * Relative label for how far a date is from the reference date.
 * @example getDaysUntilLabel(new Date(2026, 9, 28), new Date(2026, 9, 27)) // "Mañana"
 */
export const getDaysUntilLabel = (target: Date, referenceDate: Date): string => {
	const days = differenceInCalendarDays(target, referenceDate);

	if (days <= 0) return "Hoy";
	if (days === 1) return "Mañana";

	return `en ${days} días`;
};
