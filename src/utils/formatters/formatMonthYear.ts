import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/** Formats an ISO date as "octubre de 2026". Returns undefined for invalid input. */
export const formatMonthYear = (value: string | undefined): string | undefined => {
	if (!value) return undefined;

	const date = parseISO(value);

	if (!isValid(date)) return undefined;

	return format(date, "MMMM 'de' yyyy", { locale: es });
};
