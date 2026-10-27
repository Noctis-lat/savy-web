import { WEEKDAY_NAMES } from "@/content/recurring-expenses/recurringExpenseContent";

/**
 * Builds a human readable billing days summary.
 * @example formatBillingDays("BIWEEKLY", [30, 15]) // "Días de cobro: 15 y 30"
 * @example formatBillingDays("WEEKLY", [5]) // "Día de cobro: viernes"
 */
export const formatBillingDays = (
	frequency: RecurringExpenseFrequency,
	billingDays: number[],
): string => {
	if (billingDays.length === 0) return "Sin días de cobro";

	const days = [...billingDays].sort((prev, next) => prev - next);
	const labels = days.map((day) =>
		frequency === "WEEKLY" ? (WEEKDAY_NAMES[day] ?? String(day)) : String(day),
	);

	if (labels.length === 1) return `Día de cobro: ${labels[0]}`;

	const head = labels.slice(0, -1).join(", ");
	const last = labels[labels.length - 1];

	return `Días de cobro: ${head} y ${last}`;
};
