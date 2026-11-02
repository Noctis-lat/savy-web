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

// The backend's /banks/:id/credit-cards endpoint returns this shape
// (BankCreditCardResponseDto). It differs from CreditCard: `balance` instead
// of `currentBalance`, Decimals serialized as strings, and missing
// `overLimitTolerance`/`nextPaymentDueDate`. Mapped to CreditCard in the service.
// TODO: remove when backend returns CreditCardResponseDto from this endpoint.
type BankCreditCardRaw = {
	id: string;
	accountId: string;
	accountName: string;
	name: string;
	color: string | null;
	icon: string | null;
	balance: string | number;
	creditLimit: string | number;
	cutDay: number;
	paymentDueDays: number;
	paymentDay: number | null;
	interestRate: string | number;
	availableCredit: string | number;
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
	getBankCreditCards: (id: string) => Promise<CreditCard[]>;
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