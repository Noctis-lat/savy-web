import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

export const useQueryTopCategoriesByBank = (bankId: string, limit = 5) => {
	return useQuery({
		queryKey: categoryKeys.topCategoriesByBank(bankId, limit),
		queryFn: () => categoryService.getTopCategoriesByBank(bankId, limit),
		enabled: !!bankId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
