import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactions";

export const useQueryTransaction = (id: string) => {
	return useQuery({
		queryKey: ["transactions", id] as const,
		queryFn: () => transactionService.getTransaction(id),
		enabled: !!id,
	});
};
