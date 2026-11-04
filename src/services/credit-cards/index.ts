import { httpClient, unwrap } from "../http-client";

export const creditCardService: CreditCardService = {
	getCreditCards: async (params?: CreditCardParams): Promise<GetCreditCardsResponse> => {
		const response = await httpClient.get<APIResponse<GetCreditCardsResponse>>("/credit-cards", {
			params,
		});
		return unwrap<GetCreditCardsResponse>(response);
	},

	getCreditCard: async (id: string): Promise<CreditCard> => {
		const response = await httpClient.get<APIResponse<CreditCard>>(`/credit-cards/${id}`);
		return unwrap<CreditCard>(response);
	},

	getCreditCardByAccountId: async (accountId: string): Promise<CreditCard> => {
		const response = await httpClient.get<APIResponse<CreditCard>>(
			`/credit-cards/account/${accountId}`,
		);
		return unwrap<CreditCard>(response);
	},

	createCreditCard: async (payload: CreateCreditCardPayload): Promise<CreditCard> => {
		const response = await httpClient.post<APIResponse<CreditCard>>("/credit-cards", payload);
		return unwrap<CreditCard>(response);
	},

	updateCreditCard: async (id: string, payload: UpdateCreditCardPayload): Promise<CreditCard> => {
		const response = await httpClient.patch<APIResponse<CreditCard>>(
			`/credit-cards/${id}`,
			payload,
		);
		return unwrap<CreditCard>(response);
	},

	deleteCreditCard: async (id: string): Promise<void> => {
		await httpClient.delete(`/credit-cards/${id}`);
	},
	deleteCreditCardPermanent: async (id: string): Promise<void> => {
		await httpClient.delete(`/credit-cards/${id}/permanent`);
	},

	activateCreditCard: async (id: string): Promise<CreditCard> => {
		const response = await httpClient.patch<APIResponse<CreditCard>>(
			`/credit-cards/${id}/activate`,
		);
		return unwrap<CreditCard>(response);
	},
};
