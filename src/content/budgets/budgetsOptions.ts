export const BUDGET_SORT_OPTIONS: Option[] = [
	{ label: "Nombre", value: "name" },
	{ label: "Fecha de inicio", value: "startDate" },
	{ label: "Fecha de creación", value: "createdAt" },
];

export const BUDGET_KIND_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	{ label: "Recurrente", value: "RECURRING" },
	{ label: "Único", value: "ONE_TIME" },
];

export const BUDGET_PERIOD_OPTIONS: Option[] = [
	{ label: "Todos los periodos", value: "all" },
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
	{ label: "Anual", value: "YEARLY" },
];

export const BUDGET_KIND_LABELS: Record<BudgetKind, string> = {
	RECURRING: "Recurrente",
	ONE_TIME: "Único",
};

export const BUDGET_PERIOD_LABELS: Record<BudgetPeriod, string> = {
	WEEKLY: "Semanal",
	BIWEEKLY: "Quincenal",
	MONTHLY: "Mensual",
	YEARLY: "Anual",
};

export const BUDGET_KIND_FORM_OPTIONS: Option[] = [
	{ label: "Recurrente", value: "RECURRING" },
	{ label: "Único", value: "ONE_TIME" },
];

export const BUDGET_PERIOD_FORM_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
	{ label: "Anual", value: "YEARLY" },
];
