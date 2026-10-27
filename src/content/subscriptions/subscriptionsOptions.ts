export const SUBSCRIPTION_SORT_OPTIONS: Option[] = [
	{ label: "Nombre", value: "name" },
	{ label: "Monto", value: "amount" },
	{ label: "Fecha de creación", value: "createdAt" },
];

export const SUBSCRIPTION_FREQUENCY_LABELS: Record<RecurringExpenseFrequency, string> = {
	WEEKLY: "Semanal",
	BIWEEKLY: "Quincenal",
	MONTHLY: "Mensual",
	YEARLY: "Anual",
};

export const SUBSCRIPTION_FREQUENCY_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
	{ label: "Anual", value: "YEARLY" },
];
