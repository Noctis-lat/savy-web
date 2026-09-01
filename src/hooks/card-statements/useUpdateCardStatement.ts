import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateCardStatement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateCardStatementPayload }) =>
			cardStatementService.updateCardStatement(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: cardStatementKeys.cardStatements() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el estado de cuenta");
		},
	});
};
