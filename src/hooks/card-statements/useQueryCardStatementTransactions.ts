import { useQuery } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";

type useQueryCardStatementTransactionsReturn = {
	statementTransactions: StatementTransaction[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const useQueryCardStatementTransactions = (
	id?: string,
): useQueryCardStatementTransactionsReturn => {
	const statementTransactionsQuery = useQuery({
		queryKey: [cardStatementKeys.cardStatementTransactions, id],
		queryFn: () => cardStatementService.getCardStatementTransactions(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		statementTransactions: statementTransactionsQuery.data,
		isLoading: statementTransactionsQuery.isLoading,
		isError: statementTransactionsQuery.isError,
	};
};
