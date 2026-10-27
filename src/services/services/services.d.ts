//* ====================== ENUMS =========================

// RecurringExpenseType, RecurringExpenseFrequency, RecurringExpenseSortBy defined in
// src/services/recurring-expenses/recurring-expenses.d.ts (shared entity).

//* ====================== ENTITY =========================

// RecurringExpense and RecurringByTypeInfo defined in
// src/services/recurring-expenses/recurring-expenses.d.ts (shared entity).

//* ====================== SERVICE =========================

type ServiceService = {
	getServices: (params?: ServiceParams) => Promise<GetServicesResponse>;
	getService: (id: string) => Promise<RecurringExpense>;
	createService: (payload: CreateServicePayload) => Promise<RecurringExpense>;
	updateService: (id: string, payload: UpdateServicePayload) => Promise<RecurringExpense>;
	cancelService: (id: string) => Promise<void>;
	activateService: (id: string) => Promise<RecurringExpense>;
	deleteServicePermanent: (id: string) => Promise<void>;
};

//* ====================== GET SERVICES =========================

type ServiceParams = {
	isActive?: boolean;
	sortBy?: RecurringExpenseSortBy;
	order?: "asc" | "desc";
	search?: string;
	page?: number;
	perPage?: number;
};

type GetServicesResponse = {
	data: RecurringExpense[];
	info: RecurringByTypeInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

//* ====================== CREATE SERVICE =========================

type CreateServicePayload = {
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

//* ====================== UPDATE SERVICE =========================

type UpdateServicePayload = {
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