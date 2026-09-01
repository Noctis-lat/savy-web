import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";

export const useQueryTransactions = (params?: TransactionParams) => {
	return useQuery({
		queryKey: [transactionKeys.transactions, params ?? {}],
		queryFn: () => transactionService.getTransactions(params),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
