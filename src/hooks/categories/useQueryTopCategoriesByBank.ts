import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

type UseQueryTopCategoriesByBankReturn = {
	totalExpenses: number | undefined;
	categories: TopCategory[] | undefined;
	isLoading: boolean;
};

export const useQueryTopCategoriesByBank = (
	bankId: string,
	limit = 5,
): UseQueryTopCategoriesByBankReturn => {
	const topCategoriesBankQuery = useQuery({
		queryKey: [categoryKeys.topCategoriesByBank, bankId, { limit }],
		queryFn: () => categoryService.getTopCategoriesByBank(bankId, limit),
		enabled: !!bankId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});

	return {
		totalExpenses: topCategoriesBankQuery.data?.totalExpenses,
		categories: topCategoriesBankQuery.data?.categories,
		isLoading: topCategoriesBankQuery.isLoading,
	};
};
