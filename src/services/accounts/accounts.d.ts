// ====================== ENUMS =========================

type AccountType = "DEBIT" | "CREDIT" | "LOAN" | "CASH";

// ====================== ENTITY =========================

type Account = {
	id: string;
	profileId: string;
	bankId: string | null;
	name: string;
	type: AccountType;
	currency: string;
	balance: number;
	color: string | null;
	icon: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type AccountService = {
	getAccounts: (params?: AccountParams) => Promise<Account[]>;
	getAccount: (id: string) => Promise<Account>;
	createAccount: (payload: CreateAccountPayload) => Promise<Account>;
	updateAccount: (id: string, payload: UpdateAccountPayload) => Promise<Account>;
	deleteAccount: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type AccountParams = {
	type?: AccountType;
	bankId?: string;
	isActive?: boolean;
	sortBy?: "balance" | "name" | "createdAt";
	order?: "asc" | "desc";
};

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