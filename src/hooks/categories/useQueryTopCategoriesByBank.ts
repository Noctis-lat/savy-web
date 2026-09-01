import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories";

export const useQueryTopCategoriesByBank = (bankId: string, limit = 5) => {
	return useQuery({
		queryKey: ["categories", "top", "banks", bankId, { limit }] as const,
		queryFn: () => categoryService.getTopCategoriesByBank(bankId, limit),
		enabled: !!bankId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
