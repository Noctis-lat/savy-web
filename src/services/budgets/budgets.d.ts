//* ====================== ENUMS =========================

type BudgetPeriod = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
type BudgetKind = "RECURRING" | "ONE_TIME";
type BudgetTransactionsSortBy = "date" | "amount" | "createdAt";

//* ====================== ENTITY =========================

type Budget = {
	id: string;
	profileId: string;
	name: string;
	kind: BudgetKind;
	period: BudgetPeriod | null;
	startDate: string;
	endDate: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	items: BudgetItem[];
	totalExpenses: number;
	periodExpenses: number;
	percentage: number;
	icon: string;
	color: string;
};

type BudgetItem = {
	id: string;
	budgetId: string;
	categoryId: string;
	amount: number;
	category: Pick<Category, "id" | "name" | "type">;
	createdAt: string;
	updatedAt: string;
};

type BudgetsInfo = {
	totalExpenses: number;
	totalIncomes: number;
};

//* ====================== SERVICE =========================

type BudgetService = {
	getBudgets: (params?: BudgetParams) => Promise<GetBudgetsResponse>;
	getBudget: (id: string) => Promise<Budget>;
	createBudget: (payload: CreateBudgetPayload) => Promise<Budget>;
	updateBudget: (id: string, payload: UpdateBudgetPayload) => Promise<Budget>;
	deleteBudget: (id: string) => Promise<void>;
	getBudgetProgress: (id: string) => Promise<BudgetProgress>;
	getBudgetHistory: (id: string) => Promise<BudgetHistory[]>;
	getBudgetTransactions: (
		id: string,
		params?: BudgetTransactionsParams,
	) => Promise<GetBudgetTransactionsResponse>;
};

//* ====================== GET BUDGETS =========================

type BudgetParams = {
	isActive?: boolean;
	kind?: BudgetKind;
	period?: BudgetPeriod;
	sortBy?: "name" | "startDate" | "createdAt";
	order?: "asc" | "desc";
	page?: number;
	perPage?: number;
	search?: string;
};

type GetBudgetsResponse = {
	budgets: Budget[];
	info: BudgetsInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

//* ====================== CREATE BUDGET =========================

type BudgetItemPayload = {
	categoryId: string;
	amount: number;
};

type CreateBudgetPayload = {
	name: string;
	kind: BudgetKind;
	period?: BudgetPeriod;
	startDate: string;
	endDate?: string;
	items: BudgetItemPayload[];
};

//* ====================== UPDATE BUDGET =========================

type UpdateBudgetPayload = {
	name?: string;
	kind?: BudgetKind;
	period?: BudgetPeriod | null;
	startDate?: string;
	endDate?: string | null;
	isActive?: boolean;
	items?: BudgetItemPayload[];
};

//* ====================== GET BUDGET PROGRESS =========================

type BudgetProgress = {
	id: string;
	name: string;
	kind: BudgetKind;
	period: BudgetPeriod | null;
	periodStart: string;
	periodEnd: string;
	totalPlanned: number;
	totalSpent: number;
	totalRemaining: number;
	totalPercentage: number;
	items: BudgetItemProgress[];
};

type BudgetItemProgress = {
	categoryId: string;
	categoryName: string;
	categoryType: CategoryType;
	plannedAmount: number;
	spentAmount: number;
	remaining: number;
	percentage: number;
};

//* ====================== GET BUDGET HISTORY =========================

type BudgetHistory = {
	id: string;
	periodStart: string;
	periodEnd: string;
	totalPlanned: number;
	totalSpent: number;
	items: BudgetHistoryItem[];
	createdAt: string;
};

type BudgetHistoryItem = {
	budgetItemId: string;
	categoryId: string;
	plannedAmount: number;
	spentAmount: number;
};

//* ====================== GET BUDGET TRANSACTIONS =========================

type BudgetTransactionsParams = {
	type?: TransactionType;
	categoryId?: string;
	search?: string;
	from?: string;
	to?: string;
	page?: number;
	limit?: number;
	sortBy?: BudgetTransactionsSortBy;
	order?: "asc" | "desc";
};

type GetBudgetTransactionsResponse = {
	data: Transaction[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};
