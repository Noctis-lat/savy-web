import { httpClient, unwrap } from "../http-client";

export const cardStatementService: CardStatementService = {
	getCardStatements: async (params?: CardStatementParams): Promise<CardStatement[]> => {
		const response = await httpClient.get<APIResponse<CardStatement[]>>("/card-statements", {
			params,
		});
		return unwrap<CardStatement[]>(response);
	},

	getCardStatement: async (id: string): Promise<CardStatement> => {
		const response = await httpClient.get<APIResponse<CardStatement>>(`/card-statements/${id}`);
		return unwrap<CardStatement>(response);
	},

	getCardStatementTransactions: async (id: string): Promise<StatementTransaction[]> => {
		const response = await httpClient.get<APIResponse<StatementTransaction[]>>(
			`/card-statements/${id}/transactions`,
		);
		return unwrap<StatementTransaction[]>(response);
	},

	createCardStatement: async (payload: CreateCardStatementPayload): Promise<CardStatement> => {
		const response = await httpClient.post<APIResponse<CardStatement>>("/card-statements", payload);
		return unwrap<CardStatement>(response);
	},

	updateCardStatement: async (
		id: string,
		payload: UpdateCardStatementPayload,
	): Promise<CardStatement> => {
		const response = await httpClient.patch<APIResponse<CardStatement>>(
			`/card-statements/${id}`,
			payload,
		);
		return unwrap<CardStatement>(response);
	},

	deleteCardStatement: async (id: string): Promise<void> => {
		await httpClient.delete(`/card-statements/${id}`);
	},
};
