import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

export const useQueryTopCategoriesByAccount = (accountId: string, limit = 5) => {
	return useQuery({
		queryKey: [categoryKeys.topCategoriesByAccount, accountId, { limit }],
		queryFn: () => categoryService.getTopCategoriesByAccount(accountId, limit),
		enabled: !!accountId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
