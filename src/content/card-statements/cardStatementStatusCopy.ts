export const CARD_STATEMENT_HEADER_STATUS_COPY = {
	paid: {
		title: "Pagado",
		description: "Este estado de cuenta está liquidado.",
	},
	overdue: {
		title: "Pago vencido",
		description: (amount: string, date: string): string => `Debías pagar ${amount} el ${date}.`,
	},
	pending: {
		title: (date: string): string => `Fecha límite ${date}`,
		description: (amount: string): string => `Paga ${amount} para no generar intereses.`,
	},
	remaining: (amount: string): string => `Restan ${amount}.`,
};
