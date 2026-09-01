import { useQuery } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";

export const useQueryCardStatements = (creditCardId?: string) => {
	return useQuery({
		queryKey: cardStatementKeys.cardStatementsByParams({ creditCardId }),
		queryFn: () => cardStatementService.getCardStatements({ creditCardId }),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
