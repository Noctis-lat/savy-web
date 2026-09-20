export const ACCOUNT_SORT_OPTIONS: Option[] = [
	{ label: "Nombre", value: "name" },
	{ label: "Balance", value: "balance" },
	{ label: "Fecha de creación", value: "createdAt" },
];

export const ACCOUNT_TYPE_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	{ label: "Débito", value: "DEBIT" },
	{ label: "Efectivo", value: "CASH" },
	{ label: "Crédito", value: "CREDIT" },
	{ label: "Préstamo", value: "LOAN" },
];

export const GROUPED_OPTIONS: Option[] = [
	{ label: "Sin agrupar", value: "all" },
	{ label: "Bancos", value: "banks" },
	{ label: "Tipos de cuenta", value: "types" },
];
