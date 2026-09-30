import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";

type useQueryTransactionsReturn = {
	transactions: Transaction[] | undefined;
	transactionsInfo: TransactionsInfo | undefined;
	total: number | undefined;
	page: number | undefined;
	limit: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryTransactions = (params?: TransactionParams): useQueryTransactionsReturn => {
	const transactionsQuery = useQuery({
		queryKey: [transactionKeys.transactions, params ?? {}],
		queryFn: () => transactionService.getTransactions(params),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});

	return {
		transactions: transactionsQuery.data?.data,
		transactionsInfo: transactionsQuery.data?.info,
		total: transactionsQuery.data?.total,
		page: transactionsQuery.data?.page,
		limit: transactionsQuery.data?.limit,
		totalPages: transactionsQuery.data?.totalPages,
		isLoading: transactionsQuery.isLoading,
	};
};
