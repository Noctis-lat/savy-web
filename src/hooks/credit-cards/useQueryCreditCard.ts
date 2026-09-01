import { useQuery } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";

export const useQueryCreditCard = (id: string) => {
	return useQuery({
		queryKey: [creditCardKeys.creditCard, id],
		queryFn: () => creditCardService.getCreditCard(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
