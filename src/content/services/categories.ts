export const categoryKeys = {
	categories: () => ["categories"] as const,
	categoriesByParams: (params?: CategoryParams) =>
		[...categoryKeys.categories(), params ?? {}] as const,
	category: (id: string) => [...categoryKeys.categories(), id] as const,
	topCategoriesByBank: (bankId: string, limit?: number) =>
		[...categoryKeys.categories(), "top", "banks", bankId, { limit }] as const,
	topCategoriesByAccount: (accountId: string, limit?: number) =>
		[...categoryKeys.categories(), "top", "accounts", accountId, { limit }] as const,
};
