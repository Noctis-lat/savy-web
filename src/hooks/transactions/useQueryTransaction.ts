import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";

export const useQueryTransaction = (id: string) => {
	return useQuery({
		queryKey: transactionKeys.transaction(id),
		queryFn: () => transactionService.getTransaction(id),
		enabled: !!id,
	});
};
