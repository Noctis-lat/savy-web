type AccountTypeOption = {
	label: string;
	value: AccountType;
	description: string;
};

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
	{ label: "Débito", value: "DEBIT", description: "Cuenta de débito tradicional" },
	{ label: "Efectivo", value: "CASH", description: "Dinero en efectivo" },
	{ label: "Crédito", value: "CREDIT", description: "Tarjeta de crédito" },
	{ label: "Préstamo", value: "LOAN", description: "Préstamo o crédito de banco" },
];

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
	DEBIT: "Débito",
	CASH: "Efectivo",
	CREDIT: "Crédito",
	LOAN: "Préstamo",
};

export const PERIOD_OPTIONS: PeriodOption[] = [
	{ label: "Hoy", shortLabel: "Hoy", value: "day" },
	{ label: "Esta semana", shortLabel: "Sem", value: "week" },
	{ label: "Este mes", shortLabel: "Mes", value: "month" },
	{ label: "Mes anterior", shortLabel: "Mes ant", value: "other_month" },
	{ label: "Trimestre", shortLabel: "Trim", value: "quarter" },
	{ label: "Semestre", shortLabel: "Semest", value: "semester" },
	{ label: "Año", shortLabel: "Año", value: "year" },
];
