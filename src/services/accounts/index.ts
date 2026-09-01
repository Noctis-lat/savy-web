import { httpClient, unwrap } from "../http-client";

export const accountService: AccountService = {
	getAccounts: async (params?: AccountParams): Promise<Account[]> => {
		const response = await httpClient.get<APIResponse<Account[]>>("/accounts", {
			params,
		});
		return unwrap<Account[]>(response);
	},

	getAccount: async (id: string): Promise<Account> => {
		const response = await httpClient.get<APIResponse<Account>>(`/accounts/${id}`);
		return unwrap<Account>(response);
	},

	createAccount: async (payload: CreateAccountPayload): Promise<Account> => {
		const response = await httpClient.post<APIResponse<Account>>("/accounts", payload);
		return unwrap<Account>(response);
	},

	updateAccount: async (id: string, payload: UpdateAccountPayload): Promise<Account> => {
		const response = await httpClient.patch<APIResponse<Account>>(`/accounts/${id}`, payload);
		return unwrap<Account>(response);
	},

	deleteAccount: async (id: string): Promise<void> => {
		await httpClient.delete(`/accounts/${id}`);
	},
};
