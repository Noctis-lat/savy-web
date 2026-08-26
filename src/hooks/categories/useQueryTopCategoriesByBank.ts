import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories";

export const useQueryTopCategoriesByBank = (bankId: string, limit = 5) => {
	return useQuery({
		queryKey: ["categories", "top", "banks", bankId, { limit }] as const,
		queryFn: () => categoryService.getTopByBank(bankId, limit),
		enabled: !!bankId,
	});
};
