import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cardStatementKeys } from "@/content/services";
import { cardStatementService } from "@/services/card-statements";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteCardStatementPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => cardStatementService.deleteCardStatementPermanent(id),
		onSuccess: () => {
			toast.success("Estado de cuenta eliminado permanentemente.");
			queryClient.invalidateQueries({ queryKey: [cardStatementKeys.cardStatements] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente el estado de cuenta");
		},
	});
};
