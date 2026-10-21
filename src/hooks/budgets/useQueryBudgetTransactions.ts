import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";

type useQueryBudgetTransactionsReturn = {
	transactions: Transaction[] | undefined;
	page: number | undefined;
	limit: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryBudgetTransactions = (
	budgetId?: string,
	params?: BudgetTransactionsParams,
): useQueryBudgetTransactionsReturn => {
	const budgetTransactionsQuery = useQuery({
		queryKey: [budgetKeys.budgetTransactions, budgetId, params],
		queryFn: () => budgetService.getBudgetTransactions(budgetId as string, params),
		enabled: !!budgetId,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});

	return {
		transactions: budgetTransactionsQuery.data?.data,
		page: budgetTransactionsQuery.data?.page,
		limit: budgetTransactionsQuery.data?.limit,
		total: budgetTransactionsQuery.data?.total,
		totalPages: budgetTransactionsQuery.data?.totalPages,
		isLoading: budgetTransactionsQuery.isLoading,
	};
};
