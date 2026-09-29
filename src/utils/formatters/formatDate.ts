import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type DateInput = string | Date | null | undefined;

function toValidDate(value: DateInput): Date | null {
	if (!value) return null;

	const date = typeof value === "string" ? parseISO(value) : value;

	return isValid(date) ? date : null;
}

export function formatDate(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function toDateOnly(value: DateInput): string {
	const parsed = toValidDate(value);

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
	const date = parseISO(value);
	if (!isValid(date)) return "-";
	return format(date, "d MMM", { locale: es });
}
