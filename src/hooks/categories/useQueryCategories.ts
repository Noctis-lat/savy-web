import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

export const useQueryCategories = (type?: CategoryType) => {
	return useQuery({
		queryKey: categoryKeys.categoriesByParams({ type }),
		queryFn: () => categoryService.getCategories({ type }),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
