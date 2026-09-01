import { httpClient, unwrap } from "../http-client";

export const bankService: BankService = {
	getBanks: async (params?: BankParams): Promise<Bank[] | BankWithInfo[]> => {
		const response = await httpClient.get<APIResponse<Bank[] | BankWithInfo[]>>("/banks", {
			params: {
				...params,
				info: params?.info ? "true" : undefined,
			},
		});
		return unwrap<Bank[] | BankWithInfo[]>(response);
	},

	getBank: async (id: string, info = false): Promise<Bank | BankWithInfo> => {
		const response = await httpClient.get<APIResponse<Bank | BankWithInfo>>(`/banks/${id}`, {
			params: info ? { info: "true" } : undefined,
		});
		return unwrap<Bank | BankWithInfo>(response);
	},

	createBank: async (payload: CreateBankPayload): Promise<Bank> => {
		const response = await httpClient.post<APIResponse<Bank>>("/banks", payload);
		return unwrap<Bank>(response);
	},

	updateBank: async (id: string, payload: UpdateBankPayload): Promise<Bank> => {
		const response = await httpClient.patch<APIResponse<Bank>>(`/banks/${id}`, payload);
		return unwrap<Bank>(response);
	},

	deleteBank: async (id: string): Promise<void> => {
		await httpClient.delete(`/banks/${id}`);
	},

	getBankIncomeVsExpenses: async (id: string, period: PeriodType): Promise<IncomeVsExpenses> => {
		const response = await httpClient.get<APIResponse<IncomeVsExpenses>>(
			`/banks/${id}/income-vs-expenses`,
			{
				params: { period },
			},
		);
		return unwrap<IncomeVsExpenses>(response);
	},

	getBankAccounts: async (id: string): Promise<import("../accounts/accounts").Account[]> => {
		const response = await httpClient.get<APIResponse<import("../accounts/accounts").Account[]>>(
			`/banks/${id}/accounts`,
		);
		const raw = unwrap<import("../accounts/accounts").Account[]>(response);
		// Normalize Decimal-as-string balance from Prisma
		return raw.map((account) => ({
			...account,
			balance: Number(account.balance),
		}));
	},

	getBankCreditCards: async (id: string): Promise<BankCreditCard[]> => {
		const response = await httpClient.get<APIResponse<BankCreditCard[]>>(
			`/banks/${id}/credit-cards`,
		);
		const raw = unwrap<BankCreditCard[]>(response);
		// Normalize Decimal-as-string fields from Prisma
		return raw.map((card) => ({
			...card,
			balance: Number(card.balance),
			creditLimit: Number(card.creditLimit),
			interestRate: Number(card.interestRate),
		}));
	},

	getBankLoans: async (id: string): Promise<BankLoan[]> => {
		const response = await httpClient.get<APIResponse<BankLoan[]>>(`/banks/${id}/loans`);
		return unwrap<BankLoan[]>(response);
	},
};
