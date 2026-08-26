import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankCreditCards = (id: string) => {
	return useQuery({
		queryKey: ["banks", id, "credit-cards"] as const,
		queryFn: () => bankService.getCreditCards(id),
		enabled: !!id,
	});
};
