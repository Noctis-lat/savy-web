import { WEEKDAY_NAMES } from "@/content/income-sources/incomeSourceContent";

/**
 * Builds a human readable payday summary.
 * @example formatIncomePaydays("BIWEEKLY", [30, 15]) // "Días de pago: 15 y 30"
 * @example formatIncomePaydays("WEEKLY", [5]) // "Día de pago: viernes"
 */
export const formatIncomePaydays = (
	frequency: IncomeSourceFrequency,
	paydays: number[],
): string => {
	if (paydays.length === 0) return "Sin días de pago";

	const days = [...paydays].sort((prev, next) => prev - next);
	const labels = days.map((day) =>
		frequency === "WEEKLY" ? (WEEKDAY_NAMES[day] ?? String(day)) : String(day),
	);

	if (labels.length === 1) return `Día de pago: ${labels[0]}`;

	const head = labels.slice(0, -1).join(", ");
	const last = labels[labels.length - 1];

	return `Días de pago: ${head} y ${last}`;
};
