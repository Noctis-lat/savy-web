import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankCreditCards = (id: string) => {
	return useQuery({
		queryKey: ["banks", id, "credit-cards"] as const,
		queryFn: () => bankService.getBankCreditCards(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
