import { useQuery } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";

type useQueryRecurringExpensesReturn = {
	recurringExpenses: RecurringExpense[] | undefined;
	recurringExpensesInfo: RecurringByTypeInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryRecurringExpenses = (
	params?: RecurringExpenseParams,
): useQueryRecurringExpensesReturn => {
	const recurringExpensesQuery = useQuery({
		queryKey: [recurringExpenseKeys.recurringExpenses, params],
		queryFn: () => recurringExpenseService.getRecurringExpenses(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		recurringExpenses: recurringExpensesQuery.data?.data,
		recurringExpensesInfo: recurringExpensesQuery.data?.info,
		page: recurringExpensesQuery.data?.page,
		perPage: recurringExpensesQuery.data?.perPage,
		total: recurringExpensesQuery.data?.total,
		totalPages: recurringExpensesQuery.data?.totalPages,
		isLoading: recurringExpensesQuery.isLoading,
	};
};
