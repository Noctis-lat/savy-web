import { PAYDAY_RULES } from "@/content/income-sources/incomeSourceContent";

/**
 * Validates paydays against the frequency rules enforced by the backend.
 * WEEKLY: 1 weekday (1-7). BIWEEKLY: 2 days of month (1-31). MONTHLY: 1 day of month (1-31).
 * Returns the first error message, or undefined when valid.
 */
export const getPaydaysError = (
	frequency: IncomeSourceFrequency,
	paydays: number[],
): string | undefined => {
	const rule = PAYDAY_RULES[frequency];

	if (paydays.length !== rule.count) {
		if (frequency === "WEEKLY") return "Selecciona un día de la semana";
		if (frequency === "BIWEEKLY") return "Selecciona dos días del mes";
		return "Selecciona un día del mes";
	}

	if (new Set(paydays).size !== paydays.length) {
		return "Los días de pago no pueden repetirse";
	}

	const isOutOfRange = paydays.some((day) => !Number.isInteger(day) || day < 1 || day > rule.max);
	if (isOutOfRange) {
		return `Los días de pago deben estar entre 1 y ${rule.max}`;
	}

	return undefined;
};
