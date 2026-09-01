import { useQuery } from "@tanstack/react-query";
import { BUDGETS_QUERY_KEY, budgetService } from "@/services/budgets";

export const useQueryBudgets = () => {
	return useQuery({
		queryKey: BUDGETS_QUERY_KEY,
		queryFn: () => budgetService.getAll(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
