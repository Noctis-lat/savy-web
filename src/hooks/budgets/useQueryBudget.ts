import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

type useQueryBudgetReturn = {
	budget: Budget | undefined;
	isLoading: boolean;
};

export const useQueryBudget = (budgetId?: string): useQueryBudgetReturn => {
	const budgetQuery = useQuery({
		queryKey: [budgetKeys.budget, budgetId],
		queryFn: () => budgetService.getBudget(budgetId as string),
		enabled: !!budgetId,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		budget: budgetQuery.data,
		isLoading: budgetQuery.isLoading,
	};
};
