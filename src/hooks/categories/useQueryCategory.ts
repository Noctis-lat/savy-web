import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories";

export const useQueryCategory = (id: string) => {
	return useQuery({
		queryKey: ["categories", id] as const,
		queryFn: () => categoryService.getCategory(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
