import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteCardStatement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => cardStatementService.deleteCardStatement(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [cardStatementKeys.cardStatements] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el estado de cuenta");
		},
	});
};
