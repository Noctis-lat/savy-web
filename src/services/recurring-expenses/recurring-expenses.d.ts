//* ====================== ENUMS =========================

type RecurringExpenseType = "SUBSCRIPTION" | "SERVICE" | "UNCLASSIFIED";
type RecurringExpenseFrequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
type RecurringExpenseSortBy = "name" | "amount" | "createdAt";

//* ====================== ENTITY =========================

type RecurringExpense = {
	id: string;
	profileId: string;
	name: string;
	amount: number;
	frequency: RecurringExpenseFrequency;
	billingDays: number[];
	type: RecurringExpenseType;
	accountId: string;
	categoryId?: string;
	url?: string;
	color?: string;
	icon?: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type RecurringByTypeInfo = {
	total: number;
	totalEstimated: number;
};

//* ====================== SERVICE =========================

type RecurringExpenseService = {
	getRecurringExpenses: (params?: RecurringExpenseParams) => Promise<RecurringExpense[]>;
	getRecurringExpense: (id: string) => Promise<RecurringExpense>;
	createRecurringExpense: (payload: CreateRecurringExpensePayload) => Promise<RecurringExpense>;
	updateRecurringExpense: (
		id: string,
		payload: UpdateRecurringExpensePayload,
	) => Promise<RecurringExpense>;
	cancelRecurringExpense: (id: string) => Promise<void>;
	deleteRecurringExpensePermanent: (id: string) => Promise<void>;
};

//* ====================== GET RECURRING EXPENSES =========================

type RecurringExpenseParams = {
	type?: RecurringExpenseType;
	isActive?: boolean;
	sortBy?: RecurringExpenseSortBy;
	order?: "asc" | "desc";
};

//* ====================== CREATE RECURRING EXPENSE =========================

type CreateRecurringExpensePayload = {
	name: string;
	amount: number;
	frequency: RecurringExpenseFrequency;
	billingDays: number[];
	type?: RecurringExpenseType;
	accountId: string;
	categoryId?: string;
	url?: string;
	color?: string;
	icon?: string;
};

//* ====================== UPDATE RECURRING EXPENSE =========================

type UpdateRecurringExpensePayload = {
	name?: string;
	amount?: number;
	frequency?: RecurringExpenseFrequency;
	billingDays?: number[];
	type?: RecurringExpenseType;
	accountId?: string;
	categoryId?: string;
	url?: string;
	color?: string;
	icon?: string;
};