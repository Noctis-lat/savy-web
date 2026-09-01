import { httpClient, unwrap } from "../http-client";

export const LOANS_QUERY_KEY = ["loans"] as const;

export const loanService: LoanService = {
	getLoans: async (params?: LoanParams): Promise<Loan[]> => {
		const response = await httpClient.get<APIResponse<Loan[]>>("/loans", {
			params,
		});
		return unwrap<Loan[]>(response);
	},

	getLoan: async (id: string): Promise<Loan> => {
		const response = await httpClient.get<APIResponse<Loan>>(`/loans/${id}`);
		return unwrap<Loan>(response);
	},

	createLoan: async (payload: CreateLoanPayload): Promise<Loan> => {
		const response = await httpClient.post<APIResponse<Loan>>("/loans", payload);
		return unwrap<Loan>(response);
	},

	updateLoan: async (id: string, payload: UpdateLoanPayload): Promise<Loan> => {
		const response = await httpClient.patch<APIResponse<Loan>>(`/loans/${id}`, payload);
		return unwrap<Loan>(response);
	},

	deleteLoan: async (id: string): Promise<void> => {
		await httpClient.delete(`/loans/${id}`);
	},
};
