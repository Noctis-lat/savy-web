// ====================== ENUMS =========================

type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "PAYMENT";

// ====================== ENTITY =========================

type Transaction = {
	id: string;
	accountId: string;
	destinationAccountId: string | null;
	categoryId: string | null;
	type: TransactionType;
	amount: number;
	description: string | null;
	note: string | null;
	date: string;
	createdAt: string;
	updatedAt: string;
};

type PaginatedResponse<T> = {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};

// ====================== SERVICE =========================

type TransactionService = {
	getTransactions: (params?: TransactionParams) => Promise<PaginatedResponse<Transaction>>;
	getTransaction: (id: string) => Promise<Transaction>;
	createTransaction: (payload: CreateTransactionPayload) => Promise<Transaction>;
	updateTransaction: (id: string, payload: UpdateTransactionPayload) => Promise<Transaction>;
	deleteTransaction: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type TransactionParams = {
	accountId?: string;
	type?: TransactionType;
	categoryId?: string;
	bankId?: string;
	search?: string;
	from?: string;
	to?: string;
	sortBy?: "date" | "amount" | "createdAt";
	order?: "asc" | "desc";
	page?: number;
	limit?: number;
};

type CreateTransactionPayload = {
	accountId: string;
	type: TransactionType;
	amount: number;
	destinationAccountId?: string | null;
	categoryId?: string;
	description?: string;
	note?: string;
	date?: string;
};

type UpdateTransactionPayload = {
	accountId?: string;
	destinationAccountId?: string | null;
	categoryId?: string | null;
	type?: TransactionType;
	amount?: number;
	description?: string | null;
	note?: string | null;
	date?: string;
};