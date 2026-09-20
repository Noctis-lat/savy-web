// ====================== ENUMS =========================

type AccountType = "DEBIT" | "CREDIT" | "LOAN" | "CASH";

type AccountGrouped = "all" | "banks" | "types";

// ====================== ENTITY =========================

type Account = {
	id: string;
	profileId: string;
	bankId: string | undefined;
	name: string;
	type: AccountType;
	currency: string;
	balance: number;
	color: string | undefined;
	icon: string | undefined;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type AccountService = {
	getAccounts: (params?: AccountParams) => Promise<getAccountsResponse>;
	getAccount: (id: string) => Promise<Account>;
	createAccount: (payload: CreateAccountPayload) => Promise<Account>;
	updateAccount: (id: string, payload: UpdateAccountPayload) => Promise<Account>;
	deleteAccount: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type AccountParams = {
	search?: string;
	type?: AccountType;
	bankId?: string;
	isActive?: boolean;
	sortBy?: "balance" | "name" | "createdAt";
	order?: "asc" | "desc";
	page?: number;
	perPage?: number;
	info?: boolean;
	groupedBy?: AccountGrouped;
};

type getAccountsResponse = {
	accounts: Account[];
	info?: AccountsInfo,
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}

type AccountsInfo = {
	netWorth: number;
	liquidity: number;
	debt: number;
	balanceBreakdown: {
		assets: number;
		liabilities: number;
	}
}

type CreateAccountPayload = {
	name: string;
	type: AccountType;
	bankId?: string | null;
	currency?: string;
	balance?: number;
	color?: string;
	icon?: string;
};

type UpdateAccountPayload = {
	name?: string;
	bankId?: string | null;
	currency?: string;
	balance?: number;
	color?: string;
	icon?: string;
};