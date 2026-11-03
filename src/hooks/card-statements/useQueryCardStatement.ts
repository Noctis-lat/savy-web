import { useQuery } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";

type useQueryCardStatementReturn = {
	cardStatement: CardStatement | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const useQueryCardStatement = (id?: string): useQueryCardStatementReturn => {
	const cardStatementQuery = useQuery({
		queryKey: [cardStatementKeys.cardStatement, id],
		queryFn: () => cardStatementService.getCardStatement(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		cardStatement: cardStatementQuery.data,
		isLoading: cardStatementQuery.isLoading,
		isError: cardStatementQuery.isError,
	};
};
