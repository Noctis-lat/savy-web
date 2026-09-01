import { httpClient, unwrap } from "../http-client";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export const categoryService: CategoryService = {
	getCategories: async (params?: CategoryParams): Promise<Category[]> => {
		const response = await httpClient.get<APIResponse<Category[]>>("/categories", {
			params,
		});
		return unwrap<Category[]>(response);
	},

	getCategory: async (id: string): Promise<Category> => {
		const response = await httpClient.get<APIResponse<Category>>(`/categories/${id}`);
		return unwrap<Category>(response);
	},

	createCategory: async (payload: CreateCategoryPayload): Promise<Category> => {
		const response = await httpClient.post<APIResponse<Category>>("/categories", payload);
		return unwrap<Category>(response);
	},

	updateCategory: async (id: string, payload: UpdateCategoryPayload): Promise<Category> => {
		const response = await httpClient.patch<APIResponse<Category>>(`/categories/${id}`, payload);
		return unwrap<Category>(response);
	},

	deleteCategory: async (id: string): Promise<void> => {
		await httpClient.delete(`/categories/${id}`);
	},

	getTopCategoriesByBank: async (bankId: string, limit = 5): Promise<TopCategory[]> => {
		const response = await httpClient.get<APIResponse<TopCategory[]>>(
			`/categories/top/banks/${bankId}`,
			{
				params: { limit },
			},
		);
		return unwrap<TopCategory[]>(response);
	},

	getTopCategoriesByAccount: async (accountId: string, limit = 5): Promise<TopCategory[]> => {
		const response = await httpClient.get<APIResponse<TopCategory[]>>(
			`/categories/top/accounts/${accountId}`,
			{
				params: { limit },
			},
		);
		return unwrap<TopCategory[]>(response);
	},
};
