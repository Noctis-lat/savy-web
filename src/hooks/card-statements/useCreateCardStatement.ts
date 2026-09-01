import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateCardStatement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateCardStatementPayload) =>
			cardStatementService.createCardStatement(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: cardStatementKeys.cardStatements() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el estado de cuenta");
		},
	});
};
