//* ====================== ENUMS =========================

type BudgetPeriod = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
type BudgetKind = "RECURRING" | "ONE_TIME";

//* ====================== ENTITY =========================

type Budget = {
	id: string;
	profileId: string;
	name: string;
	kind: BudgetKind;
	period: BudgetPeriod;
	startDate: string;
	endDate: string;
	isActive: boolean;
	items: BudgetItem[];
	createdAt: string;
	updatedAt: string;
};

type BudgetItem = {
	id: string;
	budgetId: string;
	categoryId: string;
	amount: number;
	category: Pick<Category, "id" | "name" | "type">;
	createdAt: string;
	updatedAt: string;
}

type BudgetsInfo = {
	totalExpenses: number;
	totalIncomes: number;
}

//* ====================== SERVICE =========================

type BudgetService = {
	getBudgets: (params?: getBudgetsParams) => Promise<getBudgetsResponse>;
	getBudget: (id: string) => Promise<Budget>;
	createBudget: (payload: CreateBudgetPayload) => Promise<Budget>;
	updateBudget: (id: string, payload: UpdateBudgetPayload) => Promise<Budget>;
	deleteBudget: (id: string) => Promise<void>;
	getBudgetProgress: (id: string) => Promise<BudgetProgress>;
};

//* ====================== GET BUDGETS =========================

type getBudgetsParams = {
	isActive?: boolean;
	kind?: BudgetKind;
	period?: BudgetPeriod;
	sortBy?: "name" | "startDate" | "createdAt";
	order?: "asc" | "desc";
}

type getBudgetsResponse = {
	budgets: Budget[];
	info: BudgetsInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}