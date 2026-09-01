import { httpClient, unwrap } from "../http-client";

export const incomeSourceService: IncomeSourceService = {
	getIncomeSources: async (params?: IncomeSourceParams): Promise<IncomeSource[]> => {
		const response = await httpClient.get<APIResponse<IncomeSource[]>>("/income-sources", {
			params,
		});
		return unwrap<IncomeSource[]>(response);
	},

	createIncomeSource: async (payload: CreateIncomeSourcePayload): Promise<IncomeSource> => {
		const response = await httpClient.post<APIResponse<IncomeSource>>("/income-sources", payload);
		return unwrap<IncomeSource>(response);
	},

	bulkCreateIncomeSources: async (payload: {
		sources: CreateIncomeSourcePayload[];
	}): Promise<BulkCreateResponse> => {
		const response = await httpClient.post<APIResponse<BulkCreateResponse>>(
			"/income-sources/bulk",
			payload,
		);
		return unwrap<BulkCreateResponse>(response);
	},

	updateIncomeSource: async (
		id: string,
		payload: UpdateIncomeSourcePayload,
	): Promise<IncomeSource> => {
		const response = await httpClient.patch<APIResponse<IncomeSource>>(
			`/income-sources/${id}`,
			payload,
		);
		return unwrap<IncomeSource>(response);
	},

	deleteIncomeSource: async (id: string): Promise<void> => {
		await httpClient.delete(`/income-sources/${id}`);
	},
};
