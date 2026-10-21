import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

type useQueryBudgetHistoryReturn = {
	budgetHistory: BudgetHistory[] | undefined;
	isLoading: boolean;
};

export const useQueryBudgetHistory = (budgetId?: string): useQueryBudgetHistoryReturn => {
	const budgetHistoryQuery = useQuery({
		queryKey: [budgetKeys.budgetHistory, budgetId],
		queryFn: () => budgetService.getBudgetHistory(budgetId as string),
		enabled: !!budgetId,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		budgetHistory: budgetHistoryQuery.data,
		isLoading: budgetHistoryQuery.isLoading,
	};
};
