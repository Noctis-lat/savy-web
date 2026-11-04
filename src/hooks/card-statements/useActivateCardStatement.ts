import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateCardStatement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => cardStatementService.activateCardStatement(id),
		onSuccess: () => {
			toast.success("Estado de cuenta reactivado.");
			queryClient.invalidateQueries({ queryKey: [cardStatementKeys.cardStatements] });
			queryClient.invalidateQueries({ queryKey: [cardStatementKeys.cardStatement] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar el estado de cuenta");
		},
	});
};
