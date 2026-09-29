export const TRANSACTION_TYPE_OPTIONS: Option[] = [
	{ label: "Ingreso", value: "INCOME" },
	{ label: "Gasto", value: "EXPENSE" },
	{ label: "Transferencia", value: "TRANSFER" },
	{ label: "Pago", value: "PAYMENT" },
];

export const TRANSACTION_TYPE_FILTER_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	...TRANSACTION_TYPE_OPTIONS,
];

export const TRANSACTION_SORT_OPTIONS: Option[] = [
	{ label: "Fecha", value: "date" },
	{ label: "Monto", value: "amount" },
	{ label: "Creación", value: "createdAt" },
];
