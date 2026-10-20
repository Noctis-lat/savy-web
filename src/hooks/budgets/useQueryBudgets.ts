import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

type useQueryBudgetsReturn = {
	budgets: Budget[] | undefined;
	budgetsInfo: BudgetsInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryBudgets = (params?: BudgetParams): useQueryBudgetsReturn => {
	const budgetsQuery = useQuery({
		queryKey: [budgetKeys.budgets, params],
		queryFn: () => budgetService.getBudgets(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		budgets: budgetsQuery.data?.budgets,
		budgetsInfo: budgetsQuery.data?.info,
		page: budgetsQuery.data?.page,
		perPage: budgetsQuery.data?.perPage,
		total: budgetsQuery.data?.total,
		totalPages: budgetsQuery.data?.totalPages,
		isLoading: budgetsQuery.isLoading,
	};
};
