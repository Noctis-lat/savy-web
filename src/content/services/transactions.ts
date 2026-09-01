export const transactionKeys = {
	transactions: () => ["transactions"] as const,
	transactionsByParams: (params?: TransactionParams) =>
		[...transactionKeys.transactions(), params ?? {}] as const,
	transaction: (id: string) => [...transactionKeys.transactions(), id] as const,
};
