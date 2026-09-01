import { httpClient, unwrap } from "../http-client";

export const savingsGoalService: SavingsGoalService = {
	getSavingsGoals: async (params?: SavingsGoalParams): Promise<SavingsGoal[]> => {
		const response = await httpClient.get<APIResponse<SavingsGoal[]>>("/savings-goals", {
			params,
		});
		return unwrap<SavingsGoal[]>(response);
	},

	getSavingsGoal: async (id: string): Promise<SavingsGoal> => {
		const response = await httpClient.get<APIResponse<SavingsGoal>>(`/savings-goals/${id}`);
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
