import { httpClient, unwrap } from "../http-client";

export const serviceService: ServiceService = {
	getServices: async (params?: ServiceParams): Promise<GetServicesResponse> => {
		const response = await httpClient.get<APIResponse<GetServicesResponse>>("/services", {
			params,
		});
		return unwrap<GetServicesResponse>(response);
	},

	getService: async (id: string): Promise<RecurringExpense> => {
		const response = await httpClient.get<APIResponse<RecurringExpense>>(`/services/${id}`);
		return unwrap<RecurringExpense>(response);
	},

	createService: async (payload: CreateServicePayload): Promise<RecurringExpense> => {
		const response = await httpClient.post<APIResponse<RecurringExpense>>("/services", payload);
		return unwrap<RecurringExpense>(response);
	},

	updateService: async (id: string, payload: UpdateServicePayload): Promise<RecurringExpense> => {
		const response = await httpClient.patch<APIResponse<RecurringExpense>>(
			`/services/${id}`,
			payload,
		);
		return unwrap<RecurringExpense>(response);
	},

	cancelService: async (id: string): Promise<void> => {
		await httpClient.delete(`/services/${id}`);
	},

	deleteServicePermanent: async (id: string): Promise<void> => {
		await httpClient.delete(`/services/${id}/permanent`);
	},
};
