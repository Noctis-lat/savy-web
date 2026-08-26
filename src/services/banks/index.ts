import { httpClient, unwrap } from "../http-client";

export const BANKS_QUERY_KEY = ["banks"] as const;

type BankFilters = {
	isActive?: boolean;
	sortBy?: "name" | "createdAt";
	order?: "asc" | "desc";
	info?: boolean;
};

type BankService = {
	getAll: (filters?: BankFilters) => Promise<Bank[] | BankWithInfo[]>;
	getById: (id: string, info?: boolean) => Promise<Bank | BankWithInfo>;
	create: (payload: CreateBankPayload) => Promise<Bank>;
	update: (id: string, payload: UpdateBankPayload) => Promise<Bank>;
	remove: (id: string) => Promise<void>;
	getIncomeVsExpenses: (id: string, period: PeriodType) => Promise<IncomeVsExpenses>;
	getAccounts: (id: string) => Promise<import("../accounts/accounts").Account[]>;
	getCreditCards: (id: string) => Promise<BankCreditCard[]>;
	getLoans: (id: string) => Promise<BankLoan[]>;
};

export const bankService: BankService = {
	getAll: async (filters?: BankFilters): Promise<Bank[] | BankWithInfo[]> => {
		const response = await httpClient.get<APIResponse<Bank[] | BankWithInfo[]>>("/banks", {
			params: {
				...filters,
				info: filters?.info ? "true" : undefined,
			},
		});
		return unwrap<Bank[] | BankWithInfo[]>(response);
	},

	getById: async (id: string, info = false): Promise<Bank | BankWithInfo> => {
		const response = await httpClient.get<APIResponse<Bank | BankWithInfo>>(`/banks/${id}`, {
			params: info ? { info: "true" } : undefined,
		});
		return unwrap<Bank | BankWithInfo>(response);
	},

	create: async (payload: CreateBankPayload): Promise<Bank> => {
		const response = await httpClient.post<APIResponse<Bank>>("/banks", payload);
		return unwrap<Bank>(response);
	},

	update: async (id: string, payload: UpdateBankPayload): Promise<Bank> => {
		const response = await httpClient.patch<APIResponse<Bank>>(`/banks/${id}`, payload);
		return unwrap<Bank>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/banks/${id}`);
	},

	getIncomeVsExpenses: async (id: string, period: PeriodType): Promise<IncomeVsExpenses> => {
		const response = await httpClient.get<APIResponse<IncomeVsExpenses>>(
			`/banks/${id}/income-vs-expenses`,
			{
				params: { period },
			},
		);
		return unwrap<IncomeVsExpenses>(response);
	},

	getAccounts: async (id: string): Promise<import("../accounts/accounts").Account[]> => {
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

	getCreditCards: async (id: string): Promise<BankCreditCard[]> => {
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

	getLoans: async (id: string): Promise<BankLoan[]> => {
		const response = await httpClient.get<APIResponse<BankLoan[]>>(`/banks/${id}/loans`);
		return unwrap<BankLoan[]>(response);
	},
};
