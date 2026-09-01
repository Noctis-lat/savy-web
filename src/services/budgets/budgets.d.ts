// ====================== ENUMS =========================

type BudgetPeriod = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";

// ====================== ENTITY =========================

type Budget = {
	id: string;
	profileId: string;
	categoryId: string;
	amount: number;
	period: BudgetPeriod;
	startDate: string;
	endDate: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BudgetProgress = {
	spent: number;
	budget: number;
	remaining: number;
	percentage: number;
	periodStart: string;
	periodEnd: string;
};

// ====================== SERVICE =========================

type BudgetService = {
	getBudgets: (params?: BudgetParams) => Promise<Budget[]>;
	getBudget: (id: string) => Promise<Budget>;
	createBudget: (payload: CreateBudgetPayload) => Promise<Budget>;
	updateBudget: (id: string, payload: UpdateBudgetPayload) => Promise<Budget>;
	deleteBudget: (id: string) => Promise<void>;
	getBudgetProgress: (id: string) => Promise<BudgetProgress>;
};

// ====================== METHOD TYPES =========================

type BudgetParams = {
	isActive?: boolean;
	period?: BudgetPeriod;
	sortBy?: "amount" | "startDate";
	order?: "asc" | "desc";
};

type CreateBudgetPayload = {
	categoryId: string;
	amount: number;
	period: BudgetPeriod;
	startDate: string;
	endDate?: string;
};

type UpdateBudgetPayload = {
	categoryId?: string;
	amount?: number;
	period?: BudgetPeriod;
	startDate?: string;
	endDate?: string;
};