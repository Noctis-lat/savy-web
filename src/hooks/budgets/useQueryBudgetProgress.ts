import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

export const useQueryBudgetProgress = (id: string) => {
	return useQuery({
		queryKey: [budgetKeys.budgetProgress, id],
		queryFn: () => budgetService.getBudgetProgress(id),
		enabled: !!id,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
