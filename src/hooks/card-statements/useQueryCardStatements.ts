import { useQuery } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";

type useQueryCardStatementsReturn = {
	cardStatements: CardStatement[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const useQueryCardStatements = (
	params?: CardStatementParams,
): useQueryCardStatementsReturn => {
	const cardStatementsQuery = useQuery({
		queryKey: [cardStatementKeys.cardStatements, params],
		queryFn: () => cardStatementService.getCardStatements(params),
		enabled: params?.creditCardId !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		cardStatements: cardStatementsQuery.data,
		isLoading: cardStatementsQuery.isLoading,
		isError: cardStatementsQuery.isError,
	};
};
