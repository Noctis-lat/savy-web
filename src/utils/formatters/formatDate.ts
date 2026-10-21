import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type DateInput = string | Date | null | undefined;

function toValidDate(value: DateInput): Date | null {
	if (!value) return null;

	const date = typeof value === "string" ? parseISO(value) : value;

	return isValid(date) ? date : null;
}

/**
 * Parses an ISO date string as a local date, ignoring the UTC timezone offset.
 * Use this for date-only fields (startDate, endDate) where the API sends
 * "2026-10-01T00:00:00.000Z" but we want to display October 1st regardless
 * of the user's timezone.
 */
function parseDateAsLocal(value: string): Date | null {
	const [datePart] = value.split("T");
	if (!datePart) return null;

	const [year, month, day] = datePart.split("-").map(Number);
	if (!year || !month || !day) return null;

	const date = new Date(year, month - 1, day);
	return isValid(date) ? date : null;
}

function toValidLocalDate(value: DateInput): Date | null {
	if (!value) return null;
	if (value instanceof Date) return isValid(value) ? value : null;

	return parseDateAsLocal(value);
}

export function formatDate(value: DateInput): string {
	const parsed = toValidLocalDate(value);

	if (!parsed) return "-";

	return format(parsed, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function toDateOnly(value: DateInput): string {
	const parsed = toValidLocalDate(value);

	if (!parsed) return "";

	return format(parsed, "yyyy-MM-dd");
}

export function formatDateTime(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "d 'de' MMMM 'de' yyyy HH:mm", { locale: es });
}

export function formatDateRange(startDate: DateInput, endDate: DateInput): string {
	const formattedStartDate = formatDate(startDate);
	const formattedEndDate = formatDate(endDate);

	if (formattedStartDate === "-" && formattedEndDate === "-") return "-";

	if (formattedStartDate === "-") return `Hasta ${formattedEndDate}`;

	if (formattedEndDate === "-") return `Desde ${formattedStartDate}`;

	return `${formattedStartDate} - ${formattedEndDate}`;
}

export function formatTime(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "HH:mm");
}

export function formatShortDate(value: string): string {
	const parsed = toValidLocalDate(value);
	if (!parsed) return "-";
	return format(parsed, "d MMM", { locale: es });
}
