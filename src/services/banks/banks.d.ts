// ====================== ENUMS =========================



// ====================== ENTITY =========================

type Bank = {
	id: string;
	profileId: string;
	name: string;
	color: string | null;
	logo: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	info?: BankInfo;
};

type BankInfo = {
	netWorth: number;
	liquidity: number;
	debt: number;
	balanceBreakdown: {
		assets: number;
		liabilities: number;
	}
};

type BankCreditCard = {
	id: string;
	accountId: string;
	accountName: string;
	balance: number;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths: number;
	createdAt: string;
	updatedAt: string;
};

type BankLoan = {
	id: string;
	accountId: string;
	accountName: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining: number;
	progress: number;
	createdAt: string;
	updatedAt: string;
};

type IncomeVsExpenses = {
	income: number;
	expenses: number;
	period: string;
	periodLabel: string;
};

// ====================== SERVICE =========================

type BankService = {
	getBanks: (params?: BankParams) => Promise<GetBanksResponse>;
	getBank: (id: string, info?: boolean) => Promise<Bank>;
	createBank: (payload: CreateBankPayload) => Promise<Bank>;
	updateBank: (id: string, payload: UpdateBankPayload) => Promise<Bank>;
	deleteBank: (id: string) => Promise<void>;
	getBankIncomeVsExpenses: (id: string, period: PeriodType) => Promise<IncomeVsExpenses>;
	getBankAccounts: (id: string) => Promise<import("../accounts/accounts").Account[]>;
	getBankCreditCards: (id: string) => Promise<BankCreditCard[]>;
	getBankLoans: (id: string) => Promise<BankLoan[]>;
};

// ====================== METHOD TYPES =========================

type BankParams = {
	isActive?: boolean;
	search?: string;
	sortBy?: "name" | "createdAt";
	order?: "asc" | "desc";
	page?: number;
	perPage?: number;
	info?: boolean;
};

type GetBanksResponse = {
	banks: Bank[];
	info?: BankInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}

type CreateBankPayload = {
	name: string;
	color?: string;
	logo?: string;
};

type UpdateBankPayload = {
	name?: string;
	color?: string;
	logo?: string;
};