import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

export const useQueryBudgets = () => {
	return useQuery({
		queryKey: [budgetKeys.budgets],
		queryFn: () => budgetService.getBudgets(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
