import { httpClient, unwrap } from "../http-client";

export const savingsGoalService: SavingsGoalService = {
	getSavingsGoals: async (params?: SavingsGoalParams): Promise<SavingsGoalsResponse> => {
		const response = await httpClient.get<APIResponse<SavingsGoalsResponse>>("/savings-goals", {
			params,
		});
		return unwrap<SavingsGoalsResponse>(response);
	},

	getSavingsGoal: async (id: string): Promise<SavingsGoal> => {
		const response = await httpClient.get<APIResponse<SavingsGoal>>(`/savings-goals/${id}`);
		return unwrap<SavingsGoal>(response);
	},

	getSavingsGoalByAccountId: async (accountId: string): Promise<SavingsGoal> => {
		const response = await httpClient.get<APIResponse<SavingsGoal>>(
			`/savings-goals/account/${accountId}`,
		);
		return unwrap<SavingsGoal>(response);
	},

	createSavingsGoal: async (payload: CreateSavingsGoalPayload): Promise<SavingsGoal> => {
		const response = await httpClient.post<APIResponse<SavingsGoal>>("/savings-goals", payload);
		return unwrap<SavingsGoal>(response);
	},

	updateSavingsGoal: async (
		id: string,
		payload: UpdateSavingsGoalPayload,
	): Promise<SavingsGoal> => {
		const response = await httpClient.patch<APIResponse<SavingsGoal>>(
			`/savings-goals/${id}`,
			payload,
		);
		return unwrap<SavingsGoal>(response);
	},

	deleteSavingsGoal: async (id: string): Promise<void> => {
		await httpClient.delete(`/savings-goals/${id}`);
	},
};
