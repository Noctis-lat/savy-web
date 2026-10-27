import { useQuery } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";

export const useQueryRecurringExpense = (
	id: string | undefined,
): {
	recurringExpense: RecurringExpense | undefined;
	isLoading: boolean;
} => {
	const recurringExpenseQuery = useQuery({
		queryKey: [recurringExpenseKeys.recurringExpense, id],
		queryFn: () => recurringExpenseService.getRecurringExpense(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		recurringExpense: recurringExpenseQuery.data,
		isLoading: recurringExpenseQuery.isLoading,
	};
};
