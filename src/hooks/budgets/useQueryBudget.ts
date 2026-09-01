import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

export const useQueryBudget = (id: string) => {
	return useQuery({
		queryKey: [budgetKeys.budget, id],
		queryFn: () => budgetService.getBudget(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
