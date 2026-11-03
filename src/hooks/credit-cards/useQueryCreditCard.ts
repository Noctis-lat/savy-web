import { useQuery } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";

type useQueryCreditCardReturn = {
	creditCard: CreditCard | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const useQueryCreditCard = (id?: string, byAccountId = false): useQueryCreditCardReturn => {
	const creditCardQuery = useQuery({
		queryKey: [creditCardKeys.creditCard, id, byAccountId ? { by: "account_id" } : {}],
		queryFn: () =>
			byAccountId
				? creditCardService.getCreditCardByAccountId(id as string)
				: creditCardService.getCreditCard(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		creditCard: creditCardQuery.data,
		isLoading: creditCardQuery.isLoading,
		isError: creditCardQuery.isError,
	};
};
