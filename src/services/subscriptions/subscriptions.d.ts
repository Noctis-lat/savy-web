//* ====================== ENUMS =========================

// RecurringExpenseType, RecurringExpenseFrequency, RecurringExpenseSortBy defined in
// src/services/recurring-expenses/recurring-expenses.d.ts (shared entity).

//* ====================== ENTITY =========================

// RecurringExpense and RecurringByTypeInfo defined in
// src/services/recurring-expenses/recurring-expenses.d.ts (shared entity).

//* ====================== SERVICE =========================

type SubscriptionService = {
	getSubscriptions: (params?: SubscriptionParams) => Promise<GetSubscriptionsResponse>;
	getSubscription: (id: string) => Promise<RecurringExpense>;
	createSubscription: (payload: CreateSubscriptionPayload) => Promise<RecurringExpense>;
	updateSubscription: (
		id: string,
		payload: UpdateSubscriptionPayload,
	) => Promise<RecurringExpense>;
	cancelSubscription: (id: string) => Promise<void>;
	activateSubscription: (id: string) => Promise<RecurringExpense>;
	deleteSubscriptionPermanent: (id: string) => Promise<void>;
};

//* ====================== GET SUBSCRIPTIONS =========================

type SubscriptionParams = {
	isActive?: boolean;
	sortBy?: RecurringExpenseSortBy;
	order?: "asc" | "desc";
	search?: string;
	page?: number;
	perPage?: number;
};

type GetSubscriptionsResponse = {
	data: RecurringExpense[];
	info: RecurringByTypeInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

//* ====================== CREATE SUBSCRIPTION =========================

type CreateSubscriptionPayload = {
	name: string;
	amount: number;
	frequency: RecurringExpenseFrequency;
	billingDays: number[];
	accountId: string;
	categoryId?: string;
	url?: string;
	color?: string;
	icon?: string;
};

//* ====================== UPDATE SUBSCRIPTION =========================

type UpdateSubscriptionPayload = {
	name?: string;
	amount?: number;
	frequency?: RecurringExpenseFrequency;
	billingDays?: number[];
	accountId?: string;
	categoryId?: string;
	url?: string;
	color?: string;
	icon?: string;
};