import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

type useQueryAccountIncomesExpensesReturn = {
	income: number | undefined;
	expenses: number | undefined;
	period: string | undefined;
	periodLabel: string | undefined;
	isLoading: boolean;
};

export const useQueryAccountIncomesExpenses = (
	params: AccountIncomesExpensesParams,
): useQueryAccountIncomesExpensesReturn => {
	const accountIncomesExpensesQuery = useQuery({
		queryKey: [accountKeys.accountIncomesExpenses, params],
		queryFn: () => accountService.getIncomesExpenses(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		income: accountIncomesExpensesQuery.data?.income,
		expenses: accountIncomesExpensesQuery.data?.expenses,
		period: accountIncomesExpensesQuery.data?.period,
		periodLabel: accountIncomesExpensesQuery.data?.periodLabel,
		isLoading: accountIncomesExpensesQuery.isLoading,
	};
};
