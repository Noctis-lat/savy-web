import { useQuery } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";

type useQueryCreditCardsReturn = {
	creditCards: CreditCard[] | undefined;
	creditCardsInfo: CreditCardInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryCreditCards = (params?: CreditCardParams): useQueryCreditCardsReturn => {
	const creditCardsQuery = useQuery({
		queryKey: [creditCardKeys.creditCards, params],
		queryFn: () => creditCardService.getCreditCards(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		creditCards: creditCardsQuery.data?.data,
		creditCardsInfo: creditCardsQuery.data?.info,
		page: creditCardsQuery.data?.page,
		perPage: creditCardsQuery.data?.perPage,
		total: creditCardsQuery.data?.total,
		totalPages: creditCardsQuery.data?.totalPages,
		isLoading: creditCardsQuery.isLoading,
	};
};
