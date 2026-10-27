import { httpClient, unwrap } from "../http-client";

export const recurringExpenseService: RecurringExpenseService = {
	getRecurringExpenses: async (
		params?: RecurringExpenseParams,
	): Promise<GetRecurringExpensesResponse> => {
		const response = await httpClient.get<APIResponse<GetRecurringExpensesResponse>>(
			"/recurring-expenses",
			{ params },
		);
		return unwrap<GetRecurringExpensesResponse>(response);
	},

	getRecurringExpense: async (id: string): Promise<RecurringExpense> => {
		const response = await httpClient.get<APIResponse<RecurringExpense>>(
			`/recurring-expenses/${id}`,
		);
		return unwrap<RecurringExpense>(response);
	},

	createRecurringExpense: async (
		payload: CreateRecurringExpensePayload,
	): Promise<RecurringExpense> => {
		const response = await httpClient.post<APIResponse<RecurringExpense>>(
			"/recurring-expenses",
			payload,
		);
		return unwrap<RecurringExpense>(response);
	},

	updateRecurringExpense: async (
		id: string,
		payload: UpdateRecurringExpensePayload,
	): Promise<RecurringExpense> => {
		const response = await httpClient.patch<APIResponse<RecurringExpense>>(
			`/recurring-expenses/${id}`,
			payload,
		);
		return unwrap<RecurringExpense>(response);
	},

	cancelRecurringExpense: async (id: string): Promise<void> => {
		await httpClient.delete(`/recurring-expenses/${id}`);
	},

	activateRecurringExpense: async (id: string): Promise<RecurringExpense> => {
		const response = await httpClient.patch<APIResponse<RecurringExpense>>(
			`/recurring-expenses/${id}/activate`,
		);
		return unwrap<RecurringExpense>(response);
	},

	deleteRecurringExpensePermanent: async (id: string): Promise<void> => {
		await httpClient.delete(`/recurring-expenses/${id}/permanent`);
	},
};
