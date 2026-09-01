import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY, categoryService } from "@/services/categories";

export const useQueryCategories = (type?: CategoryType) => {
	return useQuery({
		queryKey: [...CATEGORIES_QUERY_KEY, { type: type ?? "all" }] as const,
		queryFn: () => categoryService.getAll({ type }),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
