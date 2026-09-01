// ====================== ENTITY =========================

type DashboardNetWorth = {
	total: number;
	assets: number;
	liabilities: number;
	currency: string;
	monthDelta: number | null;
};

type DashboardAccountDistribution = {
	type: AccountType;
	count: number;
	totalBalance: number;
	percentage: number;
};

type DashboardRecentTransaction = {
	id: string;
	type: TransactionType;
	amount: number;
	description: string | null;
	date: string;
	accountName: string;
	categoryName: string | null;
};

type DashboardActiveBudget = {
	id: string;
	categoryName: string;
	spent: number;
	budget: number;
	percentage: number;
	remaining: number;
};

type DashboardSavingsGoal = {
	id: string;
	name: string;
	currentAmount: number;
	targetAmount: number;
	percentage: number;
	deadline: string | null;
	isCompleted: boolean;
};

type DashboardCreditCard = {
	id: string;
	creditLimit: number;
	available: number | null;
	nextPaymentDue: string | null;
	minPayment: number | null;
};

type DashboardLoan = {
	id: string;
	principal: number;
	remaining: number;
	monthlyPayment: number;
	nextPaymentDue: string | null;
};

type DashboardCreditOverview = {
	creditCards: DashboardCreditCard[];
	loans: DashboardLoan[];
};

type DashboardBank = {
	id: string;
	name: string;
	color: string | null;
	logo: string | null;
	accountCount: number;
};

type DashboardSummary = {
	netWorth: DashboardNetWorth;
	accountsDistribution: DashboardAccountDistribution[];
	recentTransactions: DashboardRecentTransaction[];
	activeBudgets: DashboardActiveBudget[];
	savingsGoals: DashboardSavingsGoal[];
	creditOverview: DashboardCreditOverview;
	banks: DashboardBank[];
	generatedAt: string;
};

// ====================== SERVICE =========================

type DashboardService = {
	getSummary: () => Promise<DashboardSummary>;
};