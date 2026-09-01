import { httpClient, unwrap } from "../http-client";

export const BUDGETS_QUERY_KEY = ["budgets"] as const;

export const budgetService: BudgetService = {
	getBudgets: async (params?: BudgetParams): Promise<Budget[]> => {
		const response = await httpClient.get<APIResponse<Budget[]>>("/budgets", {
			params,
		});
		return unwrap<Budget[]>(response);
	},

	getBudget: async (id: string): Promise<Budget> => {
		const response = await httpClient.get<APIResponse<Budget>>(`/budgets/${id}`);
		return unwrap<Budget>(response);
	},

	createBudget: async (payload: CreateBudgetPayload): Promise<Budget> => {
		const response = await httpClient.post<APIResponse<Budget>>("/budgets", payload);
		return unwrap<Budget>(response);
	},

	updateBudget: async (id: string, payload: UpdateBudgetPayload): Promise<Budget> => {
		const response = await httpClient.patch<APIResponse<Budget>>(`/budgets/${id}`, payload);
		return unwrap<Budget>(response);
	},

	deleteBudget: async (id: string): Promise<void> => {
		await httpClient.delete(`/budgets/${id}`);
	},

	getBudgetProgress: async (id: string): Promise<BudgetProgress> => {
		const response = await httpClient.get<APIResponse<BudgetProgress>>(`/budgets/${id}/progress`);
		return unwrap<BudgetProgress>(response);
	},
};
