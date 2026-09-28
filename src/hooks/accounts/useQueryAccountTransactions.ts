import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

type useQueryAccountTransactionsReturn = {
	transactions: Transaction[] | undefined;
	page: number | undefined;
	limit: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryAccountTransactions = (
	accountId: string,
	params?: AccountTransactionsParams,
): useQueryAccountTransactionsReturn => {
	const accountTransactionsQuery = useQuery({
		queryKey: [accountKeys.accountTransactions, accountId, params],
		queryFn: () => accountService.getAccountTransactions(accountId, params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	const meta = accountTransactionsQuery.data?.meta;

	return {
		transactions: accountTransactionsQuery.data?.data,
		page: meta?.page,
		limit: meta?.limit,
		total: meta?.total,
		totalPages: meta?.totalPages,
		isLoading: accountTransactionsQuery.isLoading,
	};
};
