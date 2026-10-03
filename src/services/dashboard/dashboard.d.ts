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

// ====================== INCOME SOURCES =========================

type DashboardIncomeSource = {
	id: string;
	name: string;
	amount: number;
	frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY";
	destinationAccountId: string;
};

type DashboardIncomeSourcesSummary = {
	sources: DashboardIncomeSource[];
	estimatedMonthlyTotal: number;
};

// ====================== RECURRING EXPENSES =========================

type DashboardRecurringExpense = {
	id: string;
	name: string;
	amount: number;
	frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
	type: "SUBSCRIPTION" | "SERVICE" | "UNCLASSIFIED";
	accountId: string;
	url: string | null;
};

type DashboardRecurringExpensesSummary = {
	expenses: DashboardRecurringExpense[];
	estimatedMonthlyTotal: number;
};

// ====================== SUMMARY =========================

type DashboardSummary = {
	netWorth: DashboardNetWorth;
	accountsDistribution: DashboardAccountDistribution[];
	recentTransactions: Transaction[];
	activeBudgets: DashboardActiveBudget[];
	savingsGoals: DashboardSavingsGoal[];
	creditOverview: DashboardCreditOverview;
	banks: DashboardBank[];
	incomeSources: DashboardIncomeSourcesSummary;
	recurringExpenses: DashboardRecurringExpensesSummary;
	generatedAt: string;
};

// ====================== SERVICE =========================

type DashboardService = {
	getSummary: () => Promise<DashboardSummary>;
};