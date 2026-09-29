import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

type useQueryCategoriesReturn = {
	categories: Category[] | undefined;
	isLoading: boolean;
};

export const useQueryCategories = (type?: CategoryType): useQueryCategoriesReturn => {
	const categoriesQuery = useQuery({
		queryKey: [categoryKeys.categories, { type }],
		queryFn: () => categoryService.getCategories({ type }),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		categories: categoriesQuery.data,
		isLoading: categoriesQuery.isLoading,
	};
};
