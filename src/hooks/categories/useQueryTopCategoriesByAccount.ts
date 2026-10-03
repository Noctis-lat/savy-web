import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

type UseQueryTopCategoriesByAccountReturn = {
	totalExpenses: number | undefined;
	categories: TopCategory[] | undefined;
	isLoading: boolean;
};

export const useQueryTopCategoriesByAccount = (
	accountId: string,
	limit = 5,
): UseQueryTopCategoriesByAccountReturn => {
	const topAccountCategoriesQuery = useQuery({
		queryKey: [categoryKeys.topCategoriesByAccount, accountId, { limit }],
		queryFn: () => categoryService.getTopCategoriesByAccount(accountId, limit),
		enabled: !!accountId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});

	return {
		totalExpenses: topAccountCategoriesQuery.data?.totalExpenses,
		categories: topAccountCategoriesQuery.data?.categories,
		isLoading: topAccountCategoriesQuery.isLoading,
	};
};
