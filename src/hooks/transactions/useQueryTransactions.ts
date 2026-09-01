import { useQuery } from "@tanstack/react-query";
import { TRANSACTIONS_QUERY_KEY, transactionService } from "@/services/transactions";

export const useQueryTransactions = (filters?: TransactionFilters) => {
	return useQuery({
		queryKey: [...TRANSACTIONS_QUERY_KEY, filters ?? {}] as const,
		queryFn: () => transactionService.getAll(filters),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
