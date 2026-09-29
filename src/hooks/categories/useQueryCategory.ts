import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

type UseQueryCategoryReturn = {
	category: Category | undefined;
	isLoading: boolean;
};

export const useQueryCategory = (id: string): UseQueryCategoryReturn => {
	const categoryQuery = useQuery({
		queryKey: [categoryKeys.category, id],
		queryFn: () => categoryService.getCategory(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		category: categoryQuery.data,
		isLoading: categoryQuery.isLoading,
	};
};
