import { useQueryCardStatements } from "./useQueryCardStatements";

type useQueryPendingCardStatementReturn = {
	pendingStatement: CardStatement | undefined;
	isLoading: boolean;
	isError: boolean;
};

/** Latest unpaid statement of a card. Shares the cache entry across every caller with the same id. */
export const useQueryPendingCardStatement = (
	creditCardId?: string,
): useQueryPendingCardStatementReturn => {
	const { cardStatements, isLoading, isError } = useQueryCardStatements({
		creditCardId,
		isPaid: false,
		sortBy: "periodEnd",
		order: "desc",
	});

	return {
		pendingStatement: cardStatements?.[0],
		isLoading,
		isError,
	};
};
