import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CARD_STATEMENTS_QUERY_KEY, cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateCardStatement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateCardStatementPayload }) =>
			cardStatementService.updateCardStatement(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CARD_STATEMENTS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el estado de cuenta");
		},
	});
};
