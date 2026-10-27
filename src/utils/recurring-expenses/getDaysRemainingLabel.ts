import { differenceInCalendarDays } from "date-fns";

/**
 * Builds the remaining-days label for the current billing cycle.
 * @example getDaysRemainingLabel(new Date(2026, 10, 22), new Date(2026, 9, 27)) // "Faltan 26 días"
 */
export const getDaysRemainingLabel = (next: Date, referenceDate: Date): string => {
	const days = differenceInCalendarDays(next, referenceDate);

	if (days <= 0) return "El cobro es hoy";
	if (days === 1) return "Falta 1 día";

	return `Faltan ${days} días`;
};
