import { httpClient, unwrap } from "../http-client";

export const budgetService: BudgetService = {
	getBudgets: async (params?: getBudgetsParams): Promise<getBudgetsResponse> => {
		const response = await httpClient.get<APIResponse<getBudgetsResponse>>("/budgets", {
			params,
		});
		return unwrap<getBudgetsResponse>(response);
	},
};
