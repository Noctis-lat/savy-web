import { httpClient, unwrap } from "../http-client";

export const TRANSACTIONS_QUERY_KEY = ["transactions"] as const;

export const transactionService: TransactionService = {
	getTransactions: async (params?: TransactionParams): Promise<PaginatedResponse<Transaction>> => {
		const response = await httpClient.get<APIResponse<PaginatedResponse<Transaction>>>(
			"/transactions",
			{
				params,
			},
		);
		return unwrap<PaginatedResponse<Transaction>>(response);
	},

	getTransaction: async (id: string): Promise<Transaction> => {
		const response = await httpClient.get<APIResponse<Transaction>>(`/transactions/${id}`);
		return unwrap<Transaction>(response);
	},

	createTransaction: async (payload: CreateTransactionPayload): Promise<Transaction> => {
		const response = await httpClient.post<APIResponse<Transaction>>("/transactions", payload);
		return unwrap<Transaction>(response);
	},

	updateTransaction: async (
		id: string,
		payload: UpdateTransactionPayload,
	): Promise<Transaction> => {
		const response = await httpClient.patch<APIResponse<Transaction>>(
			`/transactions/${id}`,
			payload,
		);
		return unwrap<Transaction>(response);
	},

	deleteTransaction: async (id: string): Promise<void> => {
		await httpClient.delete(`/transactions/${id}`);
	},
};
