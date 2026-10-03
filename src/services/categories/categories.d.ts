// ====================== ENUMS =========================

type CategoryType = "INCOME" | "EXPENSE";

// ====================== ENTITY =========================

type Category = {
	id: string;
	profileId: string;
	name: string;
	type: CategoryType;
	color: string | null;
	icon: string | null;
	createdAt: string;
	amount?: number;
	percentage?: number;
};

type TopCategory = {
	id: string;
	profileId: string;
	name: string;
	type: CategoryType;
	color: string | null;
	icon: string | null;
	createdAt: string;
	amount: number;
	percentage: number;
};

// ====================== SERVICE =========================

type CategoryService = {
	getCategories: (params?: CategoryParams) => Promise<Category[]>;
	getCategory: (id: string) => Promise<Category>;
	createCategory: (payload: CreateCategoryPayload) => Promise<Category>;
	updateCategory: (id: string, payload: UpdateCategoryPayload) => Promise<Category>;
	deleteCategory: (id: string) => Promise<void>;
	getTopCategoriesByBank: (bankId: string, limit?: number) => Promise<TopCategoriesByBankResponse>;
	getTopCategoriesByAccount: (accountId: string, limit?: number) => Promise<TopCategoriesByAccountResponse>;
};

// ====================== METHOD TYPES =========================

type CategoryParams = {
	type?: CategoryType;
	sortBy?: "name" | "createdAt";
	order?: "asc" | "desc";
};

type CreateCategoryPayload = {
	name: string;
	type: CategoryType;
	color?: string;
	icon?: string;
};

type UpdateCategoryPayload = {
	name?: string;
	color?: string;
	icon?: string;
};

type TopCategoriesByBankResponse = {
	totalExpenses: number;
	categories: TopCategory[];
};

type TopCategoriesByAccountResponse = {
	totalExpenses: number;
	categories: TopCategory[];
};