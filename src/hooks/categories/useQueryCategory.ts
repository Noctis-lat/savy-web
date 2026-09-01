import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";

export const useQueryCategory = (id: string) => {
	return useQuery({
		queryKey: categoryKeys.category(id),
		queryFn: () => categoryService.getCategory(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
