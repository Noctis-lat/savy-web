import { useQuery } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";

export const useQueryCreditCards = () => {
	return useQuery({
		queryKey: creditCardKeys.creditCards(),
		queryFn: () => creditCardService.getCreditCards(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
