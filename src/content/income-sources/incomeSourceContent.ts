export const FREQUENCY_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
];

export const FREQUENCY_LABELS: Record<string, string> = {
	WEEKLY: "Semanal",
	BIWEEKLY: "Quincenal",
	MONTHLY: "Mensual",
	YEARLY: "Anual",
};

/** Mirrors savy-core PAYDAY_RULES: how many paydays each frequency needs and their max value. */
export const PAYDAY_RULES: Record<IncomeSourceFrequency, { count: number; max: number }> = {
	WEEKLY: { count: 1, max: 7 },
	BIWEEKLY: { count: 2, max: 31 },
	MONTHLY: { count: 1, max: 31 },
};

/** Account types the backend accepts as income destination. */
export const INCOME_DESTINATION_ACCOUNT_TYPES: AccountType[] = ["DEBIT", "CASH"];

/** Shared accounts query params so the list, item and forms reuse one cached request. */
export const INCOME_DESTINATION_ACCOUNT_PARAMS: AccountParams = {
	sortBy: "name",
	order: "asc",
	perPage: 100,
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
