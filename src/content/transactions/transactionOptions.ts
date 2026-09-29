export const TRANSACTION_TYPE_FILTER_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	{ label: "Ingresos", value: "INCOME" },
	{ label: "Gastos", value: "EXPENSE" },
	{ label: "Transferencias", value: "TRANSFER" },
	{ label: "Pagos", value: "PAYMENT" },
];

export const TRANSACTION_SORT_OPTIONS: Option[] = [
	{ label: "Fecha", value: "date" },
	{ label: "Monto", value: "amount" },
	{ label: "Creación", value: "createdAt" },
];
