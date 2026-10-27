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
