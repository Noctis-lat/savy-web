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
};

type TopCategory = {
	categoryId: string;
	categoryName: string;
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
	getTopCategoriesByBank: (bankId: string, limit?: number) => Promise<TopCategory[]>;
	getTopCategoriesByAccount: (accountId: string, limit?: number) => Promise<TopCategory[]>;
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