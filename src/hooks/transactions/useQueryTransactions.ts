import { useQuery } from "@tanstack/react-query";
import { TRANSACTIONS_QUERY_KEY, transactionService } from "@/services/transactions";

export const useQueryTransactions = (params?: TransactionParams) => {
	return useQuery({
		queryKey: [...TRANSACTIONS_QUERY_KEY, params ?? {}] as const,
		queryFn: () => transactionService.getTransactions(params),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
