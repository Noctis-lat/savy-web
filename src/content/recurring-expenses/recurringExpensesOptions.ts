export const RECURRING_EXPENSE_SORT_OPTIONS: Option[] = [
	{ label: "Nombre", value: "name" },
	{ label: "Monto", value: "amount" },
	{ label: "Fecha de creación", value: "createdAt" },
];

export const RECURRING_EXPENSE_TYPE_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	{ label: "Suscripción", value: "SUBSCRIPTION" },
	{ label: "Servicio", value: "SERVICE" },
	{ label: "Sin clasificar", value: "UNCLASSIFIED" },
];

export const RECURRING_EXPENSE_TYPE_LABELS: Record<RecurringExpenseType, string> = {
	SUBSCRIPTION: "Suscripción",
	SERVICE: "Servicio",
	UNCLASSIFIED: "Sin clasificar",
};

export const RECURRING_EXPENSE_FREQUENCY_LABELS: Record<RecurringExpenseFrequency, string> = {
	WEEKLY: "Semanal",
	BIWEEKLY: "Quincenal",
	MONTHLY: "Mensual",
	YEARLY: "Anual",
};

export const RECURRING_EXPENSE_FREQUENCY_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
	{ label: "Anual", value: "YEARLY" },
];

export const RECURRING_EXPENSE_TYPE_FORM_OPTIONS: Option[] = [
	{ label: "Suscripción", value: "SUBSCRIPTION" },
	{ label: "Servicio", value: "SERVICE" },
	{ label: "Sin clasificar", value: "UNCLASSIFIED" },
];
