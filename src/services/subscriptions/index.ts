import { httpClient, unwrap } from "../http-client";

export const subscriptionService: SubscriptionService = {
	getSubscriptions: async (params?: SubscriptionParams): Promise<GetSubscriptionsResponse> => {
		const response = await httpClient.get<APIResponse<GetSubscriptionsResponse>>("/subscriptions", {
			params,
		});
		return unwrap<GetSubscriptionsResponse>(response);
	},

	getSubscription: async (id: string): Promise<RecurringExpense> => {
		const response = await httpClient.get<APIResponse<RecurringExpense>>(`/subscriptions/${id}`);
		return unwrap<RecurringExpense>(response);
	},

	createSubscription: async (payload: CreateSubscriptionPayload): Promise<RecurringExpense> => {
		const response = await httpClient.post<APIResponse<RecurringExpense>>(
			"/subscriptions",
			payload,
		);
		return unwrap<RecurringExpense>(response);
	},

	updateSubscription: async (
		id: string,
		payload: UpdateSubscriptionPayload,
	): Promise<RecurringExpense> => {
		const response = await httpClient.patch<APIResponse<RecurringExpense>>(
			`/subscriptions/${id}`,
			payload,
		);
		return unwrap<RecurringExpense>(response);
	},

	cancelSubscription: async (id: string): Promise<void> => {
		await httpClient.delete(`/subscriptions/${id}`);
	},

	deleteSubscriptionPermanent: async (id: string): Promise<void> => {
		await httpClient.delete(`/subscriptions/${id}/permanent`);
	},
};
