export const BILLING_FREQUENCY_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
	{ label: "Anual", value: "YEARLY" },
];

/** Mirrors savy-core billing rules: how many billing days each frequency needs and their max value. */
export const BILLING_DAY_RULES: Record<RecurringExpenseFrequency, { count: number; max: number }> =
	{
		WEEKLY: { count: 1, max: 7 },
		BIWEEKLY: { count: 2, max: 31 },
		MONTHLY: { count: 1, max: 31 },
		YEARLY: { count: 1, max: 31 },
	};

export const WEEKDAY_NAMES: Record<number, string> = {
	1: "lunes",
	2: "martes",
	3: "miércoles",
	4: "jueves",
	5: "viernes",
	6: "sábado",
	7: "domingo",
};

export const MONTH_DAYS: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

export const WEEKDAY_OPTIONS: { value: number; label: string }[] = [
	{ value: 1, label: "Lun" },
	{ value: 2, label: "Mar" },
	{ value: 3, label: "Mié" },
	{ value: 4, label: "Jue" },
	{ value: 5, label: "Vie" },
	{ value: 6, label: "Sáb" },
	{ value: 7, label: "Dom" },
];
