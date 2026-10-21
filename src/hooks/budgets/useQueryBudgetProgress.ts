import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

type useQueryBudgetProgressReturn = {
	budgetProgress: BudgetProgress | undefined;
	isLoading: boolean;
};

export const useQueryBudgetProgress = (budgetId?: string): useQueryBudgetProgressReturn => {
	const budgetProgressQuery = useQuery({
		queryKey: [budgetKeys.budgetProgress, budgetId],
		queryFn: () => budgetService.getBudgetProgress(budgetId as string),
		enabled: !!budgetId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});

	return {
		budgetProgress: budgetProgressQuery.data,
		isLoading: budgetProgressQuery.isLoading,
	};
};
