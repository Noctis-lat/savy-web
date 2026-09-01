import { useQuery } from "@tanstack/react-query";
import { creditCardService } from "@/services/credit-cards";

export const useQueryCreditCard = (id: string) => {
	return useQuery({
		queryKey: ["credit-cards", id] as const,
		queryFn: () => creditCardService.getCreditCard(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
